import {BlockCipherMode, BlockCipherModeProps} from "./BlockCipherMode";

export interface CBCProps extends BlockCipherModeProps {
}

export class CBC extends BlockCipherMode {
  protected _prevBlock: number[] = [];
  /**
   * CBC encryptor.
   */
  public static Encryptor: typeof CBC = class Encryptor extends CBC {
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
      const cipher = this._cipher;
      const blockSize = cipher.blockSize;
  
      // XOR and encrypt
      this.xorBlock(words, offset, blockSize);
      cipher.encryptBlock(words, offset);
  
      // Remember this block to use with next block
      this._prevBlock = words.slice(offset, offset + blockSize);
    }
  };
  
  /**
   * CBC decryptor.
   */
  public static Decryptor: typeof CBC = class Decryptor extends CBC {
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
      const cipher = this._cipher;
      const blockSize = cipher.blockSize;
    
      // Remember this block to use with next block
      const thisBlock = words.slice(offset, offset + blockSize);
    
      // Decrypt and XOR
      cipher.decryptBlock(words, offset);
      this.xorBlock(words, offset, blockSize);
    
      // This block becomes the previous block
      this._prevBlock = thisBlock;
    }
    
  };
  
  public constructor(props: CBCProps) {
    super(props);
  }
  
  public xorBlock(words: number[], offset: number, blockSize: number){
    let block: number[];
  
    // Shortcut
    const iv = this._iv;
  
    // Choose mixing block
    if (iv){
      block = iv;
    
      // Remove IV for subsequent blocks
      this._iv = undefined;
    }
    else {
      block = this._prevBlock;
    }
  
    // XOR blocks
    for (let i = 0; i < blockSize; i++) {
      words[offset + i] ^= block[i];
    }
  }
  
  /**
   * Creates this mode for encryption.
   * @param {BlockCipherModeProps} props
   * @example
   *   var mode = CBC.createEncryptor(cipher, iv.words);
   */
  public static createEncryptor(props: CBCProps){
    return new CBC.Encryptor(props);
  }
  
  /**
   * Creates this mode for decryption.
   * @param {BlockCipherModeProps} props
   * @example
   *   var mode = CBC.createDecryptor(cipher, iv.words);
   */
  public static createDecryptor(props: CBCProps){
    return new CBC.Decryptor(props);
  }
}
