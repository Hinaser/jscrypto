import {BlockCipherMode, BlockCipherModeProps} from "./BlockCipherMode";
import type {BlockCipher} from "../BlockCipher";

/**
 * Cipher Feedback Block mode
 */
export class CFB extends BlockCipherMode {
  protected _prevBlock: number[] = [];
  
  /**
   * CFB encryptor.
   */
  public static Encryptor: typeof CFB = class Encryptor extends CFB {
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
      return undefined;
    }
  };
  
  /**
   * CFB decryptor.
   */
  public static Decryptor: typeof CFB = class Encryptor extends CFB {
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
      return undefined;
    }
  };
  
  public constructor(props: BlockCipherModeProps) {
    super(props);
  }
  
  public generateKeyStreamAndEncrypt(words: number[], offset: number, blockSize: number, cipher: BlockCipher){
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
   *   var mode = CFB.createEncryptor(cipher, iv.words);
   */
  public static createEncryptor(props: BlockCipherModeProps){
    return new CFB.Encryptor(props);
  }
  
  /**
   * Creates this mode for decryption.
   * @param {BlockCipherModeProps} props
   * @example
   *   var mode = CFB.createDecryptor(cipher, iv.words);
   */
  public static createDecryptor(props: BlockCipherModeProps){
    return new CFB.Decryptor(props);
  }
}