import {CipherProps, PropsWithKey} from "./lib/algorithm/cipher/Cipher";
import type {Word32Array} from "./lib/Word32Array";
import {PasswordBasedCipher} from "./lib/algorithm/cipher/PasswordBasedCipher";
import {SerializableCipher} from "./lib/algorithm/cipher/SerializableCipher";
import {CipherParams} from "./lib/algorithm/cipher/CipherParams";
import {RC4} from "./RC4";

export interface RC4DropProps extends CipherProps {
  drop?: number;
}

export class RC4Drop extends RC4 {
  protected drop: number = 192;
  
  public constructor(props: PropsWithKey<RC4DropProps>) {
    super(props);
    this._props = props;
    
    if(props && typeof props.drop === "number"){
      this.drop = props.drop;
    }
    
    this._doReset();
  }
  
  protected _doReset() {
    super._doReset();
    
    // Drop
    for(let i=this.drop;i>0;i--){
      this.generateKeyStreamWord();
    }
  }
  
  /**
   * Creates this cipher in encryption mode.
   *
   * @param {Word32Array} key The key.
   * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {Cipher} A cipher instance.
   * @example
   *   var cipher = JsCrypto.RC4Drop.createEncryptor(keyWordArray);
   */
  public static createEncryptor(key: Word32Array, props?: Partial<CipherProps>){
    props = typeof props === "undefined" ? {} : props;
    return new RC4Drop({...props, key});
  }
  
  /**
   * Creates this cipher in decryption mode.
   *
   * @param {Word32Array} key The key.
   * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {Cipher} A cipher instance.
   * @example
   *   var cipher = JsCrypto.RC4Drop.createDecryptor(keyWordArray, { iv: ivWordArray });
   */
  public static createDecryptor(key: Word32Array, props?: Partial<CipherProps>){
    props = typeof props === "undefined" ? {} : props;
    return new RC4Drop({...props, key});
  }
  
  /**
   * Encrypt a message with key
   * 
   * @param {Word32Array|string} message
   * @param {Word32Array|string} key
   * @param {Partial<AESProps>?} props
   * @example
   *   var encryptedMessage = JsCrypt.RC4Drop.encrypt("test", "pass");
   */
  public static encrypt(message: Word32Array|string, key: Word32Array|string, props?: Partial<RC4DropProps>){
    if(typeof key === "string"){
      return PasswordBasedCipher.encrypt(RC4Drop, message, key, props);
    }
    return SerializableCipher.encrypt(RC4Drop, message, key, props);
  }
  
  /**
   * Encrypt a encrypted message with key
   *
   * @param {CipherParams} cipherText
   * @param {Word32Array|string} key
   * @param {Partial<AESProps>?} props
   * @example
   *   var encryptedMessage = JsCrypt.RC4Drop.decrypt(cipherProps, "pass");
   */
  public static decrypt(cipherText: CipherParams, key: Word32Array|string, props?: Partial<RC4DropProps>){
    if(typeof key === "string"){
      return PasswordBasedCipher.decrypt(RC4Drop, cipherText, key, props);
    }
    return SerializableCipher.decrypt(RC4Drop, cipherText, key, props);
  }
}
