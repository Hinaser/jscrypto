import type {BlockCipher} from "../BlockCipher";
import type {Word32Array} from "../../../Word32Array";

export interface BlockCipherModeProps {
  cipher: BlockCipher;
  iv: Word32Array|undefined;
}

/**
 * Abstract base block cipher mode template.
 * @abstract
 */
export class BlockCipherMode {
  protected _props: BlockCipherModeProps;
  protected _cipher: BlockCipher;
  protected _iv?: Word32Array;
  
  public constructor(props: BlockCipherModeProps) {
    this._props = props;
    this._cipher = props.cipher;
    this._iv = props.iv;
  }
  
  /**
   * @abstract
   */
  public processBlock(words: number[], offset: number) {
    return;
  }
  
  /**
   * Creates this mode for encryption.
   * @param {BlockCipherModeProps} props
   * @abstract
   * @example
   *   var mode = CBC.createEncryptor(cipher, iv.words);
   */
  public static createEncryptor(props: BlockCipherModeProps): BlockCipherMode {
    throw new Error("Not implemented yet");
  }
  
  /**
   * Creates this mode for decryption.
   * @param {BlockCipherModeProps} props
   * @abstract
   * @example
   *   var mode = CBC.createDecryptor(cipher, iv.words);
   */
  public static createDecryptor(props: BlockCipherModeProps): BlockCipherMode {
    throw new Error("Not implemented yet");
  }
}
