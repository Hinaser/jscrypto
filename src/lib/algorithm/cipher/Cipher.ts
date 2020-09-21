import {BufferedBlockAlgorithm, BufferedBlockAlgorithmProps} from "../BufferedBlockAlgorithm";
import {Word32Array} from "../../Word32Array";

export interface CipherProps extends BufferedBlockAlgorithmProps {
  key: Word32Array;
  iv: Word32Array;
  keySize: number;
  ivSize: number;
  transformMode: number;
}

export class Cipher extends BufferedBlockAlgorithm {
  protected static ENC_TRANSFORM_MODE = 1;
  protected static DEC_TRANSFORM_MODE = 2;
  
  protected _props?: Partial<CipherProps>;
  protected _transformMode: number = 1;
  protected _key: Word32Array = new Word32Array();
  protected _iv: Word32Array = new Word32Array();
  protected _keySize = 128/32;
  protected _ivSize = 128/32;
  
  public constructor(props?: Partial<CipherProps>) {
    super(props);
    this._props = props;
    
    if(props){
      this._key = typeof props.key !== "undefined" ? props.key : this._key;
      this._iv = typeof props.iv !== "undefined" ? props.iv : this._iv;
      this._keySize = typeof props.keySize !== "undefined" ? props.keySize : this._keySize;
      this._ivSize = typeof props.ivSize !== "undefined" ? props.ivSize : this._ivSize;
      this._transformMode = typeof props.transformMode !== "undefined" ? props.transformMode : this._transformMode;
    }
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
   * @param {Word32Array|string} dataUpdate The final data to encrypt or decrypt.
   * @return {Word32Array} The data after final processing.
   * @example
   *   var encrypted = cipher.finalize();
   *   var encrypted = cipher.finalize('data');
   *   var encrypted = cipher.finalize(wordArray);
   */
  public finalize(dataUpdate: Word32Array|string){
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
  protected _doReset(){
    // Abstract
  }
  
  /**
   * @abstract
   */
  protected _doProcess(){
    // Abstract
  }
  
  /**
   * @abstract
   */
  protected _doProcessBlock(words: number[], offset: number) {
    // Abstract
  }
  
  /**
   * @abstract
   */
  protected _doFinalize(){
    // Abstract
    return new Word32Array();
  }
  
  /**
   * @abstract
   */
  public encryptBlock(words: number[], offset: number){
    return;
  }
  
  /**
   * @abstract
   */
  public decryptBlock(words: number[], offset: number){
    return;
  }
  
  /**
   * Creates this cipher in encryption mode.
   *
   * @param {Word32Array} key The key.
   * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {Cipher} A cipher instance.
   * @example
   *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
   */
  public static createEncryptor(key: Word32Array, props?: Partial<CipherProps>){
    if(typeof props === "undefined"){
      props = {};
    }
    props = {...props, key, transformMode: Cipher.ENC_TRANSFORM_MODE};
    return new Cipher(props);
  }
  
  /**
   * Creates this cipher in decryption mode.
   * @param {Word32Array} key The key.
   * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {Cipher} A cipher instance.
   * @example
   *   var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
   */
  public static createDecryptor(key: Word32Array, props?: Partial<CipherProps>){
    if(typeof props === "undefined"){
      props = {};
    }
    props = {...props, key, transformMode: Cipher.DEC_TRANSFORM_MODE};
    return new Cipher(props);
  }
}
