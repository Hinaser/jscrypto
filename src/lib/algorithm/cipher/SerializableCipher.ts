import type {Formatter} from "./formatter/type";
import {OpenSSLFormatter} from "./formatter/OpenSSLFormatter";
import type {Word32Array} from "../../Word32Array";
import type {BlockCipher, BlockCipherProps} from "./BlockCipher";
import {CipherParams} from "./CipherParams";
import {Cipher as BaseCipher} from "./Cipher";

export interface SerializableCipherProps extends BlockCipherProps {
  formatter: Formatter;
}

export interface ISerializableCipher<K extends Word32Array|string> {
  encrypt: (
    cipher: typeof BaseCipher,
    message: Word32Array|string,
    key: K,
    props?: Partial<SerializableCipherProps>,
  ) => CipherParams;
  decrypt: (
    cipher: typeof BaseCipher,
    cipherText: CipherParams|string,
    key: K,
    props?: Partial<SerializableCipherProps>,
  ) => Word32Array;
}

/**
 * Converts serialized ciphertext to CipherParams,
 * else assumed CipherParams already and returns ciphertext unchanged.
 * @param {CipherParams|string} cipherTextParams The ciphertext.
 * @param {Formatter} formatter The formatting strategy to use to parse serialized ciphertext.
 * @return {CipherParams} The un-serialized ciphertext.
 * @example
 *   var ciphertextParams = SerializableCipher.parse(ciphertextStringOrParams, format);
 */
export function parseCipherText(cipherTextParams: CipherParams|string, formatter: Formatter){
  if(typeof cipherTextParams === "string"){
    return formatter.parse(cipherTextParams);
  }
  return cipherTextParams;
}

export const SerializableCipher: ISerializableCipher<Word32Array> = {
  /**
   * Encrypts a message.
   *
   * @param {typeof Cipher} Cipher The cipher algorithm to use.
   * @param {Word32Array|string} message The message to encrypt.
   * @param {Word32Array} key The key.
   * @param {Partial<SerializableCipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {CipherParams} A cipher params object.
   * @example
   *   var ciphertextParams = SerializableCipher.encrypt(AES, message, key);
   *   var ciphertextParams = SerializableCipher.encrypt(AES, message, key, { iv: iv });
   */
  encrypt(
    Cipher: typeof BaseCipher,
    message: Word32Array|string,
    key: Word32Array,
    props?: Partial<SerializableCipherProps>,
  ){
    const encryptor = Cipher.createEncryptor(key, props);
    const cipherText = encryptor.finalize(message);
    
    return new CipherParams({
      cipherText,
      key,
      iv: encryptor.iv,
      Algorithm: Cipher,
      mode: (encryptor as BlockCipher).mode,
      padding: (encryptor as BlockCipher).padding,
      blockSize: encryptor.blockSize,
      formatter: props?.formatter || OpenSSLFormatter,
    });
  },
  
  /**
   * Decrypts serialized ciphertext.
   *
   * @param {typeof Cipher} Cipher The cipher algorithm to use.
   * @param {CipherParams|string} cipherText The ciphertext to decrypt.
   * @param {Word32Array} key The key.
   * @param {Partial<SerializableCipherProps>} props (Optional) The configuration options to use for this operation.
   * @return {Word32Array} The plaintext.
   * @example
   *     var plaintext = SerializableCipher.decrypt(AES, formattedCiphertext, key, { iv: iv, format: OpenSSLFormatter });
   *     var plaintext = SerializableCipher.decrypt(AES, ciphertextParams, key, { iv: iv, format: OpenSSLFormatter });
   */
  decrypt(
    Cipher: typeof BaseCipher,
    cipherText: CipherParams|string,
    key: Word32Array,
    props?: Partial<SerializableCipherProps>,
  ){
    const decryptor = Cipher.createDecryptor(key, props);
    const cipherParams = parseCipherText(cipherText, props?.formatter || OpenSSLFormatter);
    return decryptor.finalize(cipherParams.cipherText || "");
  }
}
