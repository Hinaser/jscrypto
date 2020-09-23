import {BlockCipherMode, BlockCipherModeProps} from "./BlockCipherMode";

/**
 * Electronic Codebook block mode.
 */
export class ECB extends BlockCipherMode {
  /**
   * ECB encryptor.
   */
  public static Encrypter: typeof ECB = class Encrypter extends ECB {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    public processBlock(words: number[], offset: number){
      this._cipher.encryptBlock(words, offset);
    }
  };
  
  /**
   * ECB decryptor.
   */
  public static Decrypter: typeof ECB = class Decrypter extends ECB {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    public processBlock(words: number[], offset: number){
      this._cipher.decryptBlock(words, offset);
    }
    
  };
  
  public constructor(props: BlockCipherModeProps) {
    super(props);
  }
  
  /**
   * Creates this mode for encryption.
   * @param {BlockCipherModeProps} props
   * @example
   *   var mode = JsCrypto.ECB.createEncryptor(cipher, iv.words);
   */
  public static createEncrypter(props: BlockCipherModeProps){
    return new ECB.Encrypter(props);
  }
  
  /**
   * Creates this mode for decryption.
   * @param {BlockCipherModeProps} props
   * @example
   *   var mode = JsCrypto.ECB.createDecryptor(cipher, iv.words);
   */
  public static createDecrypter(props: BlockCipherModeProps){
    return new ECB.Decrypter(props);
  }
}