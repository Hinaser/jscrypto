import type {Cipher} from "../Cipher";

export interface BlockCipherModeProps {
  cipher: Cipher;
  iv: number[]|undefined;
}

/**
 * Abstract base block cipher mode template.
 * @abstract
 */
export class BlockCipherMode {
  protected _props: BlockCipherModeProps;
  protected _cipher: Cipher;
  protected _iv?: number[];
  
  public constructor(props: BlockCipherModeProps) {
    this._props = props;
    this._cipher = props.cipher;
    this._iv = props.iv;
  }
  
  /**
   * @abstract
   */
  public processBlock(words: number[], offset: number){
    return;
  }
  
  /**
   * Creates this mode for encryption.
   * @param {BlockCipherModeProps} props
   * @abstract
   * @example
   *   var mode = JsCrypto.CBC.createEncryptor(cipher, iv.words);
   */
  public static createEncrypter(props: BlockCipherModeProps): BlockCipherMode {
    throw new Error("Not implemented yet");
  }
  
  /**
   * Creates this mode for decryption.
   * @param {BlockCipherModeProps} props
   * @abstract
   * @example
   *   var mode = JsCrypto.CBC.createDecryptor(cipher, iv.words);
   */
  public static createDecrypter(props: BlockCipherModeProps): BlockCipherMode {
    throw new Error("Not implemented yet");
  }
}