import {BlockCipherMode, BlockCipherModeProps} from "./BlockCipherMode";

/**
 * Output Feedback Block mode
 */
export class OFB extends BlockCipherMode {
  protected _keyStream: number[] = [];
  
  /**
   * OFB encryptor.
   */
  public static Encrypter: typeof OFB = class Encrypter extends OFB {
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
      const iv = this._iv;
      let keyStream = this._keyStream;
  
      // Generate key stream
      if (iv) {
        keyStream = this._keyStream = iv.slice(0);
    
        // Remove IV for subsequent blocks
        this._iv = undefined;
      }
      cipher.encryptBlock(keyStream, 0);
  
      // Encrypt
      for (let i = 0; i < blockSize; i++) {
        words[offset + i] ^= keyStream[i];
      }
    }
  };
  
  /**
   * OFB decryptor.
   */
  public static Decrypter: typeof OFB = OFB.Encrypter;
  
  public constructor(props: BlockCipherModeProps) {
    super(props);
  }
  
  /**
   * Creates this mode for encryption.
   * @param {BlockCipherModeProps} props
   * @example
   *   var mode = JsCrypto.OFB.createEncryptor(cipher, iv.words);
   */
  public static createEncrypter(props: BlockCipherModeProps){
    return new OFB.Encrypter(props);
  }
  
  /**
   * Creates this mode for decryption.
   * @param {BlockCipherModeProps} props
   * @example
   *   var mode = JsCrypto.OFB.createDecryptor(cipher, iv.words);
   */
  public static createDecrypter(props: BlockCipherModeProps){
    return new OFB.Decrypter(props);
  }
}