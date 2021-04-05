import {BlockCipherMode, BlockCipherModeProps} from "./BlockCipherMode";
import {Word32Array} from "../../../Word32Array";

/**
 * Galois Counter Mode
 */
export class GCM extends BlockCipherMode {
  protected _H: number[] = [];
  protected _J: number[] = [];
  protected _A: Word32Array;
  protected _lenA: number[];
  
  public constructor(props: BlockCipherModeProps) {
    super(props);
    
    if(props.cipher.blockSize !== 128/32){
      throw new Error("In GCM block cipher mode, cipher block size must be 128bit");
    }
  
    const {cipher, iv} = props;
    const H = [0,0,0,0];
    cipher.encryptBlock(H, 0);
    this._H = H;
  
    let J0 = [];
    // iv should be array of 32bit int
    if(!iv || iv.length === 0){
      J0 = [0, 0, 0, 1];
    }
    else if(iv.length === 3){
      J0 = [iv[0], iv[1], iv[2], 1];
    }
    else{
      const remainderOf4Word = (iv.length % 4) > 0 ? 4 - (iv.length % 4) : 0;
      const iv2 = iv.slice();
      
      for(let i=0;i<remainderOf4Word+2;i++){
        iv2.push(0); // append 32bit 0
      }
    
      // This should be upper 32bit of len(iv),
      // But iv.length > 4294967295(0xffffffff, unsigned 32bit int max) is not supported for now.
      iv2.push(0);
    
      iv2.push(iv.length * 32); // An element of `iv` is 4byte = 32bit.
    
      J0 = this.GHASH(H, iv2);
    }
    
    this._J = J0;
  
    const A = cipher.authData?.clone() || new Word32Array();
    // Pad AuthData
    const v = 16 - (A.nSigBytes % 16);
    if(v < 16){
      const padA = [];
      let nPadABytes = 0;
      for(let i=0;i<Math.floor(v/4);i++){
        padA.push(0);
        nPadABytes += 4;
      }
      if(v % 4 > 0){
        padA.push(0);
        nPadABytes += v % 4;
      }
      A.concat(new Word32Array(padA, nPadABytes));
    }
    
    this._A = A;
    this._lenA = [0, A.nSigBytes*8];
  }
  
  /**
   * https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
   * 6.2 Incrementing Function  
   * inc(s=32, X) = MSB(len(X)-s, X) || [int(LSB(s, X)+1 mod 2^s]
   * 
   * @param {number[]} X - [32bit int, 32bit int, 32bit int, 32bit int].
   * @example
   *   inc32([0,0,0,0]) = [0,0,0,1]
   *   inc32([0,0,0,1]) = [0,0,0,2]
   *   inc32([0,0,0,0xffffffff]) = [0,0,1,0]
   *   inc32([0,0,0xffffffff,0xffffffff]) = [0,1,0,0]
   *   inc32([0,0xffffffff,0xffffffff,0xffffffff]) = [0,0,0,0]
   */
  public inc32(X: number[]){
    const A = X.slice();
    const unsignedX3 = (A[3] >>> 0);
    const carry3 = ((unsignedX3+1)>>>0) < unsignedX3;
    A[3] = (A[3] + 1) | 0;
    if(carry3){
      const unsignedX2 = (A[2] >>> 0);
      const carry2 = ((unsignedX2+1)>>>0) < unsignedX2;
      A[2] = (A[2] + 1) | 0;
      if(carry2){
        A[1] = (A[1] + 1) | 0;
      }
    }
    
    return A;
  }
  
  /**
   * https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
   * 6.3 Multiplication Operation on Blocks
   *
   * @param {number[]} X - [32bit int, 32bit int, 32bit int, 32bit int], 128bit block.
   * @param {number[]} Y - [32bit int, 32bit int, 32bit int, 32bit int], 128bit block.
   */
  public mul(X: number[], Y: number[]){
    const R = [0xe1000000, 0, 0, 0];
    const Z = [0, 0, 0, 0];
    const V = Y.slice();
    
    for(let i=0;i<128;i++){
      const xIndex = i >>> 5;
      const xi = (X[xIndex] >>> (31-i%32)) & 1;
      if(xi > 0){
        Z[0] = Z[0] ^ V[0];
        Z[1] = Z[1] ^ V[1];
        Z[2] = Z[2] ^ V[2];
        Z[3] = Z[3] ^ V[3];
      }
      const LSBVi = (V[3]&1) >>> 0;
      const carry0 = (V[0]&1) >>> 0;
      const carry1 = (V[1]&1) >>> 0;
      const carry2 = (V[2]&1) >>> 0;
      V[0] = V[0] >>> 1;
      V[1] = (V[1] >>> 1) | (carry0 ? 0x80000000 : 0);
      V[2] = (V[2] >>> 1) | (carry1 ? 0x80000000 : 0);
      V[3] = (V[3] >>> 1) | (carry2 ? 0x80000000 : 0);
      
      if(LSBVi > 0){
        V[0] ^= R[0];
        V[1] ^= R[1];
        V[2] ^= R[2];
        V[3] ^= R[3];
      }
    }
    
    return Z;
  }
  
  /**
   * https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
   * 6.4 GHASH Function
   * 
   * @param {number[]} H - The hash sub key block of 128bit.
   * @param {number[]} X - X.length must be multiple of 4. (multiple of 128bit)
   */
  public GHASH(H: number[], X: number[]){
    if(H.length % 4 !== 0){
      throw new Error("Length of 32bit word array 'H' must be multiple of 4(128bit)");
    }
    else if(X.length % 4 !== 0){
      throw new Error("Length of 32bit word array 'X' must be multiple of 4(128bit)");
    }
    
    const m = X.length;
    let Y = [0, 0, 0, 0];
    for(let i=0;i<m;i+=4){
      Y[0] = (Y[0] ^ X[i]);
      Y[1] = (Y[1] ^ X[i+1]);
      Y[2] = (Y[2] ^ X[i+2]);
      Y[3] = (Y[3] ^ X[i+3]);
      Y = this.mul(Y, H);
    }
    return Y;
  }
  
  /**
   * https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
   * 6.5 GCTR Function
   * 
   * @param {number[]} ICB - Initial Code Block. Required to be 128bit(4word).
   * @param {Word32Array} X - Arbitrary length block
   */
  public GCTR(ICB: number[], X: Word32Array){
    if(X.nSigBytes === 0){
      return X.clone();
    }
    if(ICB.length !== 4){
      throw new Error("Initial Counter Block size must be 128bit");
    }
    
    const cipher = this._cipher;
    const words = X.words;
    const n = Math.ceil(X.nSigBytes / 16);
    const CB = [ICB.slice()];
    
    for(let i=1;i<n;i++){
      const CBi = this.inc32(CB[i-1]);
      CB.push(CBi);
    }
    
    const Y = new Word32Array();
    for(let i=0;i<n;i++){
      cipher.encryptBlock(CB[i], 0);
      const remainderOf16Bytes = X.nSigBytes % 16;
      
      if(i < n-1 || /* i === n-1 && */ remainderOf16Bytes === 0){
        const Yi0 = words[i] ^ CB[i][0];
        const Yi1 = words[i+1] ^ CB[i][1];
        const Yi2 = words[i+2] ^ CB[i][2];
        const Yi3 = words[i+3] ^ CB[i][3];
        const Yi = new Word32Array([Yi0, Yi1, Yi2, Yi3]);
        Y.concat(Yi);
        continue;
      }
      
      // i === n-1
      const w = [];
      let nSigBytes = 0;
      const nMaxAligned = Math.floor(remainderOf16Bytes/4);
      for(let k=0;k<nMaxAligned;k++){
        const Ynk = words[i+k] ^ CB[i][k];
        w.push(Ynk);
        nSigBytes += 4;
      }
      
      const remaining0to3Bytes = remainderOf16Bytes % 4;
      if(remaining0to3Bytes > 0){
        const Ynr = (words[i+nMaxAligned] << (32-8*remaining0to3Bytes)) ^ CB[i][nMaxAligned];
        w.push(Ynr);
        nSigBytes += remaining0to3Bytes;
      }
      
      const Yn = new Word32Array(w, nSigBytes);
      Y.concat(Yn);
    }
    
    Y.nSigBytes = X.nSigBytes;
    Y.clamp();
    return Y;
  }
  
  /**
   * CTR encryptor.
   */
  public static Encryptor: typeof GCM = class Encryptor extends GCM {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    public processBlock(words: number[], offset: number){
      // Shortcuts
      const cipher = this._cipher
      const blockSize = cipher.blockSize;
      const A = this._A;
      const H = this._H;
      
      // Encrypt with CTR mode
      this._J = this.inc32(this._J);
      const plainText = new Word32Array(words.slice(offset, offset+blockSize));
      const C = this.GCTR(this._J, plainText);
      for(let i=0;i<blockSize;i++){
        words[offset + i] = C.words[i];
      }
      
      // Generate auth tag
      const u = 16 - (C.nSigBytes % 16);
      if(u < 16){
        // Pad Ciphertext
        const padC = [];
        let nPadCBytes = 0;
        for(let i=0;i<Math.floor(u/4);i++){
          padC.push(0);
          nPadCBytes += 4;
        }
        if(u % 4 > 0){
          padC.push(0);
          nPadCBytes += u % 4;
        }
        C.concat(new Word32Array(padC, nPadCBytes));
      }
  
      const s = A.words.concat(C.words).concat(this._lenA).concat([0, C.nSigBytes*8]);
      const S = this.GHASH(H, s);
      return this.GCTR(this._J, new Word32Array(S));
    }
  };
  
  /**
   * CTR decryptor.
   */
  public static Decryptor: typeof GCM = class Decryptor extends GCM {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    public processBlock(words: number[], offset: number){
      // Shortcuts
      const cipher = this._cipher
      const blockSize = cipher.blockSize;
      const A = this._A;
      const H = this._H;
    
      // Decrypt with CTR mode
      this._J = this.inc32(this._J);
      const C = new Word32Array(words.slice(offset, offset+blockSize));
      const P = this.GCTR(this._J, C);
      for(let i=0;i<blockSize;i++){
        words[offset + i] = P.words[i];
      }
    
      // Generate auth tag
      const u = 16 - (C.nSigBytes % 16);
      if(u < 16){
        // Pad Ciphertext
        const padC = [];
        let nPadCBytes = 0;
        for(let i=0;i<Math.floor(u/4);i++){
          padC.push(0);
          nPadCBytes += 4;
        }
        if(u % 4 > 0){
          padC.push(0);
          nPadCBytes += u % 4;
        }
        C.concat(new Word32Array(padC, nPadCBytes));
      }
    
      const s = A.words.concat(C.words).concat(this._lenA).concat([0, C.nSigBytes*8]);
      const S = this.GHASH(H, s);
      return this.GCTR(this._J, new Word32Array(S));
    }
  };
  
  /**
   * Creates this mode for encryption.
   * @param {BlockCipherModeProps} props
   * @example
   *   var mode = CTR.createEncryptor(cipher, iv.words);
   */
  public static createEncryptor(props: BlockCipherModeProps){
    return new GCM.Encryptor(props);
  }
  
  /**
   * Creates this mode for decryption.
   * @param {BlockCipherModeProps} props
   * @example
   *   var mode = CTR.createDecryptor(cipher, iv.words);
   */
  public static createDecryptor(props: BlockCipherModeProps){
    return new GCM.Decryptor(props);
  }
}