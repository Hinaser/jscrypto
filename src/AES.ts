import {Cipher, CipherProps} from "./lib/algorithm/cipher/Cipher";
import {Word32Array} from "./lib/Word32Array";

export class AES extends Cipher {
  /**
   * Creates this cipher in encryption mode.
   *
   * @param {Word32Array} key The key.
   * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {Cipher} A cipher instance.
   * @example
   *   var cipher = JsCrypto.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
   */
  public static createEncryptor(key: Word32Array, props?: Partial<CipherProps>){
    if(typeof props === "undefined"){
      props = {};
    }
    props = {...props, key, transformMode: Cipher.ENC_TRANSFORM_MODE}
    return new AES(props)
  }
  
  /**
   * Creates this cipher in decryption mode.
   *
   * @param {Word32Array} key The key.
   * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {Cipher} A cipher instance.
   * @example
   *   var cipher = JsCrypto.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
   */
  public static createDecrypter(key: Word32Array, props?: Partial<CipherProps>){
    if(typeof props === "undefined"){
      props = {};
    }
    props = {...props, key, transformMode: Cipher.DEC_TRANSFORM_MODE}
    return new AES(props)
  }
}