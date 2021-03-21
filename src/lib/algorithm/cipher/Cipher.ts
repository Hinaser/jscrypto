import {BufferedBlockAlgorithm, BufferedBlockAlgorithmProps} from "../BufferedBlockAlgorithm";
import type {Word32Array} from "../../Word32Array";

export interface CipherProps extends BufferedBlockAlgorithmProps {
  key: Word32Array;
  iv: Word32Array;
  transformMode: number;
}

export type PropsWithKey<T extends CipherProps> = Partial<T> & Pick<T, "key">;

export class Cipher extends BufferedBlockAlgorithm {
  public static readonly ENC_TRANSFORM_MODE = 1;
  public static readonly DEC_TRANSFORM_MODE = 2;
  public static readonly keySize = 128/32;
  public static readonly ivSize = 128/32;
  
  protected _props: PropsWithKey<CipherProps>;
  protected _transformMode: number = 1;
  protected _key: Word32Array;
  protected _iv?: Word32Array;
  
  public constructor(props: PropsWithKey<CipherProps>) {
    super(props);
    this._props = props;
  
    this._key = props.key;
    this._iv = typeof props.iv !== "undefined" ? props.iv : this._iv;
    this._transformMode = typeof props.transformMode !== "undefined" ? props.transformMode : this._transformMode;
  }
  
  public get iv(){
    return this._iv;
  }
  
  /**
   * Resets this cipher to its initial state.
   * @example
   *   cipher.reset();
   */
  public reset(data?: Word32Array, nBytes?: number) {
    super.reset(data, nBytes);
    this._doReset();
  }
  
  /**
   * Adds data to be encrypted or decrypted.
   * @param {Word32Array|string} dataUpdate The data to encrypt or decrypt.
   * @return {Word32Array} The data after processing.
   * @example
   *   var encrypted = cipher.process('data');
   *   var encrypted = cipher.process(wordArray);
   */
  public process(dataUpdate: Word32Array|string){
    this._append(dataUpdate);
    return this._process();
  }
  
  /**
   * Finalizes the encryption or decryption process.
   * Note that the finalize operation is effectively a destructive, read-once operation.
   * @param {Word32Array|string?} dataUpdate The final data to encrypt or decrypt.
   * @return {Word32Array} The data after final processing.
   * @example
   *   var encrypted = cipher.finalize();
   *   var encrypted = cipher.finalize('data');
   *   var encrypted = cipher.finalize(wordArray);
   */
  public finalize(dataUpdate?: Word32Array|string){
    // Final data update
    if (dataUpdate) {
      this._append(dataUpdate);
    }
  
    // Perform concrete-cipher logic
    return this._doFinalize();
  }
  
  /**
   * @abstract
   */
  protected _doReset(): void {
    throw new Error("Not implemented");
  }
  
  /**
   * @abstract
   */
  protected _doProcessBlock(words: number[], offset: number): void {
    throw new Error("Not implemented");
  }
  
  /**
   * @abstract
   */
  protected _doFinalize(): Word32Array {
    throw new Error("Not implemented");
  }
  
  /**
   * Creates this cipher in encryption mode.
   *
   * @param {Word32Array} key The key.
   * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {Cipher} A cipher instance.
   * @example
   *     var cipher = AES.createEncryptor(keyWordArray, { iv: ivWordArray });
   */
  public static createEncryptor(key: Word32Array, props?: Partial<CipherProps>){
    props = typeof props === "undefined" ? {} : props;
    return new Cipher({...props, key, transformMode: Cipher.ENC_TRANSFORM_MODE});
  }
  
  /**
   * Creates this cipher in decryption mode.
   * @param {Word32Array} key The key.
   * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {Cipher} A cipher instance.
   * @example
   *   var cipher = AES.createDecryptor(keyWordArray, { iv: ivWordArray });
   */
  public static createDecryptor(key: Word32Array, props?: Partial<CipherProps>){
    props = typeof props === "undefined" ? {} : props;
    return new Cipher({...props, key, transformMode: Cipher.DEC_TRANSFORM_MODE});
  }
}
