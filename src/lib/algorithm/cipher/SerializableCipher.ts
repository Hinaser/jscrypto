import {Formatter} from "./formatter/type";
import {OpenSSLFormatter} from "./formatter/OpenSSLFormatter";
import {Word32Array} from "../../Word32Array";
import {BlockCipher, BlockCipherProps} from "./BlockCipher";
import {CipherParams} from "./CipherParams";

export interface SerializableCipherProps extends BlockCipherProps {
  formatter: Formatter;
}

function parseCipherText(cipherText: CipherParams|string, formatter: Formatter){
  if(typeof cipherText === "string"){
    return formatter.parse(cipherText);
  }
  return cipherText;
}

export class SerializableCipher {
  protected _props?: Partial<SerializableCipherProps>;
  protected _format: Formatter;
  
  public constructor(props?: Partial<SerializableCipherProps>) {
    this._props = props;
    this._format = props && props.formatter ? props.formatter : OpenSSLFormatter;
  }
  
  /**
   * Encrypts a message.
   *
   * @param {typeof Cipher} C The cipher algorithm to use.
   * @param {Word32Array|string} message The message to encrypt.
   * @param {Word32Array} key The key.
   * @param {Partial<SerializableCipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {CipherParams} A cipher params object.
   * @example
   *   var ciphertextParams = JsCrypto.SerializableCipher.encrypt(JsCrypto.AES, message, key);
   *   var ciphertextParams = JsCrypto.SerializableCipher.encrypt(JsCrypto.AES, message, key, { iv: iv });
   */
  public static encrypt(
    C: typeof BlockCipher,
    message: Word32Array|string,
    key: Word32Array,
    props?: Partial<SerializableCipherProps>,
  ){
    const encrypter = C.createEncryptor(key, props);
    const cipherText = encrypter.finalize(message);
    
    return new CipherParams({
      cipherText,
      key,
      iv: encrypter.iv,
      algorithm: C,
      mode: encrypter.mode,
      padding: encrypter.padding,
      blockSize: encrypter.blockSize,
      formatter: props?.formatter || OpenSSLFormatter,
    });
  }
  
  /**
   * Decrypts serialized ciphertext.
   *
   * @param {typeof BlockCipher} C The cipher algorithm to use.
   * @param {CipherParams|string} cipherText The ciphertext to decrypt.
   * @param {Word32Array} key The key.
   * @param {Partial<SerializableCipherProps>} props (Optional) The configuration options to use for this operation.
   * @return {Word32Array} The plaintext.
   * @example
   *     var plaintext = JsCrypto.SerializableCipher.decrypt(JsCrypto.AES, formattedCiphertext, key, { iv: iv, format: JsCrypto.OpenSSL });
   *     var plaintext = JsCrypto.SerializableCipher.decrypt(JsCrypto.AES, ciphertextParams, key, { iv: iv, format: JsCrypto.OpenSSL });
   */
  public static decrypt(
    C: typeof BlockCipher,
    cipherText: CipherParams|string,
    key: Word32Array,
    props?: Partial<SerializableCipherProps>,
  ){
    const decrypter = C.createDecryptor(key, props);
    const cipherParams = parseCipherText(cipherText, props?.formatter || OpenSSLFormatter);
    return decrypter.finalize(cipherParams.cipherText || "");
  }
}
