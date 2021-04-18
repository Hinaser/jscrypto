import {BlockCipherMode, BlockCipherModeProps} from "./BlockCipherMode";
import {Word32Array} from "../../../Word32Array";
import type {BlockCipher} from "../BlockCipher";
import {padTo128m} from "./commonLib";

/**
 * Counter/CBC-MAC
 */
export class CCM extends BlockCipherMode {
  protected _N: Word32Array;
  protected _CBIndex: number = 0;
  protected readonly _q = 7; // At this time, q=LEN(Q) is fixed to 7 and n=LEN(N) is fixed to 8;
  protected _A: Word32Array;
  protected _lenA: number[];
  
  public constructor(props: BlockCipherModeProps) {
    super(props);
  
    const {cipher, iv} = props;
    if(cipher.blockSize !== 128/32){
      throw new Error("In CCM, cipher block size must be 128bit");
    }
    
    let words: number[];
    if(iv && iv.words.length > 0){
      if(iv.words.length === 1){
        words = [0, iv.words[0]];
      }
      else if(iv.words.length === 2){
        words = iv.words.slice();
      }
      else{
        throw new Error("iv must be 0/4/8 bytes");
      }
    }
    else{
      words = [0, 0];
    }
    
    this._N = new Word32Array(words, 8);
  
    const A = cipher.authData?.clone() || new Word32Array();
    const lenA = [0, A.nSigBytes*8];
    // Pad AuthData
    padTo128m(A);
  
    this._A = A;
    this._lenA = lenA;
  }
  
  /**
   * Generate first block of B.
   *
   * @param {boolean} hasAData - If payload has AData, true.
   * @param {number} t - Octet length of T(Auth tag)
   * @param {Word32Array} Q - Octet length of payload.
   * @param {Word32Array} N - Nonce.
   */
  public static getB0(hasAData: boolean, t: number, Q: Word32Array, N: Word32Array){
    if(Q.nSigBytes + N.nSigBytes !== 15){
      throw new Error("LEN(Q)+LEN(N) must be 15");
    }
    
    const reservedBit = 0 << 7;
    const ADataBit = (hasAData ? 1 : 0) << 6;
    const tBit = (((t-2)/2) << 3); // 3bits
    const qBit = (Q.nSigBytes-1); // 3bits
    const flags = (reservedBit | ADataBit | tBit | qBit) & 0x000000ff;
    
    const NQ = N.clone().concat(Q);
  
    const B00 = new Word32Array([flags<<24], 1);
    return B00.concat(NQ);
  }
  
  /**
   * Format associated data
   * @param {Word32Array} A - Associated data
   * @param {Word32Array} P - Payload
   */
  public static formatAssociatedDataAndPayload(A: Word32Array, P: Word32Array){
    const a = A.nSigBytes;
    let ad: Word32Array;
    if(a === 0){
      ad = new Word32Array([0], 0);
    }
    else if(a < 2**16 - 2**8){
      ad = new Word32Array([a<<16], 16);
    }
    else if(a < 2**32){
      ad = new Word32Array([0xfffe0000], 2).concat(new Word32Array([a], 4));
    }
    else{
      throw new Error("LEN(A) larger than 2**32-1 is not supported");
    }
    
    // Format AdditionalData
    const nAd = Math.floor(A.nSigBytes / 4);
    for(let i=0;i<nAd;i++){
      ad.concat(new Word32Array([A.words[i]], 4));
    }
    
    if(A.nSigBytes % 4){
      ad.concat(new Word32Array([A.words[nAd]], A.nSigBytes % 4));
      ad.concat(new Word32Array([0], 4 - A.nSigBytes%4));
    }
    
    // Format Payload
    const nPayload = Math.floor(P.nSigBytes / 4);
    for(let i=0;i<nPayload;i++){
      ad.concat(new Word32Array([P.words[i]], 4));
    }
  
    if(P.nSigBytes % 4){
      ad.concat(new Word32Array([P.words[nAd]], P.nSigBytes % 4));
      ad.concat(new Word32Array([0], 4 - P.nSigBytes%4));
    }
    
    return ad;
  }
  
  /**
   * Generate Counter Block
   * @param {number} q - LEN(Q)
   * @param {Word32Array} N - Nonce
   * @param {number} index - Block index of 32bit integer
   */
  public static genCtr(q: number, N: Word32Array, index: number){
    if(N.nSigBytes + q !== 15){
      throw new Error("LEN(Q)+LEN(N) must be 15");
    }
    
    const flag = new Word32Array([((q-1) & 0x00000007) << 24], 1);
    const indexBytes = new Word32Array([], 0);
    const nq = Math.floor(q/4);
    for(let i=0;i<nq-1;i++){
      indexBytes.concat(new Word32Array([0], 4));
    }
    
    if(q % 4){
      if(q > 4){
        indexBytes.concat(new Word32Array([0], q%4));
        indexBytes.concat(new Word32Array([index], 4));
      }
      else{
        indexBytes.concat(new Word32Array([index << (32-q*8)], q));
      }
    }
    else{
      indexBytes.concat(new Word32Array([index], 4));
    }
    
    return flag.concat(N).concat(indexBytes);
  }
  
  public static hash(Cipher: typeof BlockCipher, key: Word32Array, iv: Word32Array, authData?: Word32Array, cipherText?: Word32Array){
    return;
  }
  
  /**
   * Generate authentication tag for ciphertext with inner CCM parameters.
   * @param {Word32Array} cipherText
   * @returns {Word32Array}
   */
  public generateAuthTag(cipherText: Word32Array){
    return undefined;
  }
  
  /**
   * CTR encryptor.
   */
  public static Encryptor: typeof CCM = class Encryptor extends CCM {
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
      
      const CBi = CCM.genCtr(this._q, this._N, this._CBIndex);
      
      for(let i=0;i<blockSize;i++){
        words[offset + i] ^= CBi.words[i];
      }
      
      this._CBIndex++;
    }
  };
  
  /**
   * CTR decryptor.
   */
  public static Decryptor: typeof CCM = class Decryptor extends CCM {
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
  
      const CBi = CCM.genCtr(this._q, this._N, this._CBIndex);
  
      for(let i=0;i<blockSize;i++){
        words[offset + i] ^= CBi.words[i];
      }
  
      this._CBIndex++;
    }
  };
  
  /**
   * Creates this mode for encryption.
   * @param {BlockCipherModeProps} props
   * @example
   *   var mode = CTR.createEncryptor(cipher, iv.words);
   */
  public static createEncryptor(props: BlockCipherModeProps){
    return new CCM.Encryptor(props);
  }
  
  /**
   * Creates this mode for decryption.
   * @param {BlockCipherModeProps} props
   * @example
   *   var mode = CTR.createDecryptor(cipher, iv.words);
   */
  public static createDecryptor(props: BlockCipherModeProps){
    return new CCM.Decryptor(props);
  }
}