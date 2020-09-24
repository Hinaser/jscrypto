import {BlockCipherMode, BlockCipherModeProps} from "./BlockCipherMode";
import {Cipher} from "../Cipher";

/**
 * Cipher Feedback Block mode
 */
export class CFB extends BlockCipherMode {
  protected _prevBlock: number[] = [];
  
  /**
   * CFB encryptor.
   */
  public static Encrypter: typeof CFB = class Encrypter extends CFB {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    public processBlock(words: number[], offset: number){
      this.generateKeyStreamAndEncrypt(words, offset, this._cipher.blockSize, this._cipher);
  
      // Remember this block to use with next block
      this._prevBlock = words.slice(offset, offset + this._cipher.blockSize);
    }
  };
  
  /**
   * CFB decryptor.
   */
  public static Decrypter: typeof CFB = class Encrypter extends CFB {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    public processBlock(words: number[], offset: number){
      // Remember this block to use with next block
      const thisBlock = words.slice(offset, offset + this._cipher.blockSize);
  
      this.generateKeyStreamAndEncrypt(words, offset, this._cipher.blockSize, this._cipher);
  
      // This block becomes the previous block
      this._prevBlock = thisBlock;
    }
  };
  
  public constructor(props: BlockCipherModeProps) {
    super(props);
  }
  
  public generateKeyStreamAndEncrypt(words: number[], offset: number, blockSize: number, cipher: Cipher){
    let keyStream;
  
    // Shortcut
    const iv = this._iv;
  
    // Generate keyStream
    if (iv) {
      keyStream = iv.slice(0);
    
      // Remove IV for subsequent blocks
      this._iv = undefined;
    }
    else {
      keyStream = this._prevBlock;
    }
    cipher.encryptBlock(keyStream, 0);
  
    // Encrypt
    for (let i = 0; i < blockSize; i++) {
      words[offset + i] ^= keyStream[i];
    }
  }
  
  /**
   * Creates this mode for encryption.
   * @param {BlockCipherModeProps} props
   * @example
   *   var mode = JsCrypto.CFB.createEncryptor(cipher, iv.words);
   */
  public static createEncrypter(props: BlockCipherModeProps){
    return new CFB.Encrypter(props);
  }
  
  /**
   * Creates this mode for decryption.
   * @param {BlockCipherModeProps} props
   * @example
   *   var mode = JsCrypto.CFB.createDecryptor(cipher, iv.words);
   */
  public static createDecrypter(props: BlockCipherModeProps){
    return new CFB.Decrypter(props);
  }
}