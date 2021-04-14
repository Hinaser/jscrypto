import {BlockCipherMode, BlockCipherModeProps} from "./BlockCipherMode";
import {Word32Array} from "../../../Word32Array";
import type {BlockCipher} from "../BlockCipher";

/**
 * Counter/CBC-MAC
 */
export class CCM extends BlockCipherMode {
  protected _J0: number[] = [];
  protected _CB: number[] = []; // Counter Block
  
  public constructor(props: BlockCipherModeProps) {
    super(props);
    
    if(props.cipher.blockSize !== 128/32){
      throw new Error("In CCM, cipher block size must be 128bit");
    }
  
    // const {cipher, iv} = props;
  }
  
  /**
   * Generate first block of B.
   * 
   * @param {boolean} hasAData - If payload has AData, true.
   * @param {number} t - Octet length of T(Auth tag)
   * @param {number} q - Octet length -f Q(Octet length of Payload size)
   * @param {[number, number]} Q - Octet length of payload. If Q=2^32(~4GB), Q=[1,0]. If Q=2^32+260, Q=[1,0x00000104]
   * @param {[number, number]} N - Nonce. If N=2^32, N=[1,0]. If N=260, N=[0x00000104]
   */
  public static getB0(hasAData: boolean, t: number, q: number, Q: number[], N: number[]){
    if(q > 8){
      throw new Error("q must be less than or equal to 8");
    }
    else if(q < 2){
      throw new Error("q must be larger than or equal to 2");
    }
    
    const reservedBit = 0 << 7;
    const ADataBit = (hasAData ? 1 : 0) << 6;
    const tBit = (((t-2)/2) << 3); // 3bits
    const qBit = (q-1); // 3bits
    const flags = (reservedBit | ADataBit | tBit | qBit) & 0x000000ff;
  
    const n = 15 - q;
    const lsbN = CCM.getLSB(N, n);
    const lsbQ = CCM.getLSB(Q, q);
    const NQ = CCM.concatBytes(lsbN, n, lsbQ, q);
    
    const B00 = [flags];
    return CCM.concatBytes(B00, 1, NQ, 15);
  }
  
  public static getB02(hasData: boolean, t: number, Q: Word32Array, N: Word32Array){
    
  }
  
  /**
   * Format associated data
   * @param {Word32Array} A - Associated data
   */
  public static formatAssociatedData(A: Word32Array){
    const a = A.nSigBytes;
  }
  
  /**
   * Extract LSB(n) from N.
   * 
   * @param {number[]} N - 32bit int array. Must be BigEndian.
   * @param {number} n - Number of bytes to extract
   */
  public static getLSB(N: number[], n: number){
    if(n <= 0){
      throw new Error("Invalid argument n. n must be greater than 0");
    }
    
    const lsbN: number[] = [];
    const maxI = Math.ceil(n / 4);
    const N2 = N.slice();
    while(N2.length < maxI){
      N2.unshift(0);
    }
    
    for(let i=maxI-1;i>0;i--){
      lsbN[i] = (N2[i] | 0);
    }
    
    if(n%4 > 0){
      lsbN[0] = (N2[0] | 0) & (0xffffffff >>> (4 - n%4)*8);
    }
    else{
      lsbN[0] = (N2[0] | 0);
    }
    
    return lsbN;
  }
  
  /**
   * Concat two byte array as B1 || B2. The size of output byte array is `b1+b2`.
   * 
   * @param {number[]} B1 - Byte array 1
   * @param {number} b1 - Number of bytes of B1
   * @param {number[]} B2 - Byte array 2
   * @param {number} b2 - Number of bytes of B1
   */
  public static concatBytes(B1: number[], b1: number, B2: number[], b2: number){
    if(b1 === 0){
      return B2.slice();
    }
    else if(b2 === 0){
      return B1.slice();
    }
    
    const B3: number[] = [];
    const b3 = b1 + b2;
    const lastIndexB1 = B1.length-1;
    const lastIndexB2 = B2.length-1;
    const lastIndexB3 = Math.ceil(b3/4)-1;
  
    for(let i=0;i<b2;i++){
      const nShift = (i % 4) * 8;
      const indexB2 = lastIndexB2 - (i>>>2);
      const b = (B2[indexB2] >>> nShift) & 0xff;
    
      const indexB3 = lastIndexB3 - (i>>>2);
      B3[indexB3] = (B3[indexB3] | 0) | (b << nShift);
    }
    
    const r = b2 % 4;
    for(let i=0;i<b1;i++){
      const nShift = (i % 4) * 8;
      const indexB1 = lastIndexB1 - (i>>>2);
      const b = (B1[indexB1] >>> nShift) & 0xff;
    
      const indexB3 = lastIndexB3 - ((b2+i)>>>2);
      if(r){
        B3[indexB3] = (B3[indexB3] | 0) | (b << ((i % 4 + r) * 8)%32);
      }
      else{
        B3[indexB3] = (B3[indexB3] | 0) | (b << ((i % 4) * 8));
      }
    }
    
    return B3;
  }
  
  public static hash(Cipher: typeof BlockCipher, key: Word32Array, iv: Word32Array, authData?: Word32Array, cipherText?: Word32Array){
    return;
  }
  
  /**
   * Generate authentication tag for ciphertext with inner GCM parameters.
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
      // const cipher = this._cipher
      // const blockSize = cipher.blockSize;
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
      // const cipher = this._cipher
      // const blockSize = cipher.blockSize;
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