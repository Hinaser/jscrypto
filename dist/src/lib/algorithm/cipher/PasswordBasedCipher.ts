import {
  ISerializableCipher,
  parseCipherText,
  SerializableCipher,
  SerializableCipherProps,
} from "./SerializableCipher";
import type {KDF as KDFType} from "./kdf/type";
import {OpenSSLKDF} from "./kdf/OpenSSLKDF";
import type {BlockCipher} from "./BlockCipher";
import type {Word32Array} from "../../Word32Array";
import type {CipherParams} from "./CipherParams";
import {OpenSSLFormatter} from "./formatter/OpenSSLFormatter";

export interface PasswordBasedCipherProps extends SerializableCipherProps {
  KDF: KDFType;
}

export const PasswordBasedCipher: ISerializableCipher<string> = {
  /**
   * Encrypts a message using a password.
   *
   * @param {typeof BlockCipher} Cipher The cipher algorithm to use.
   * @param {Word32Array|string} message The message to encrypt.
   * @param {string} password The password.
   * @param {Partial<PasswordBasedCipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {CipherParams} A cipher params object.
   * @example
   *   var params = JsCrypto.PasswordBasedCipher.encrypt(JsCrypto.AES, message, 'password');
   *   var params = JsCrypto.PasswordBasedCipher.encrypt(JsCrypto.AES, message, 'password', { format: JsCrypto.OpenSSLFormatter });
   */
  encrypt(
    Cipher: typeof BlockCipher,
    message: Word32Array|string,
    password: string,
    props?: Partial<PasswordBasedCipherProps>,
  ){
    const p = props ? {...props} : {};
    const KDF = props && props.KDF ? props.KDF : OpenSSLKDF;
    const derivedParams = KDF.execute(password, Cipher.keySize, Cipher.ivSize);
    
    p.iv = derivedParams.iv;
    const cipherParams = SerializableCipher.encrypt(Cipher, message, derivedParams.key, p);
    
    return {
      ...cipherParams,
      ...derivedParams,
    };
  },
  
  /**
   * Decrypts serialized ciphertext using a password.
   *
   * @param {typeof BlockCipher} Cipher The cipher algorithm to use.
   * @param {CipherParams|string} cipherText The ciphertext to decrypt.
   * @param {string} password The password.
   * @param {Partial<PasswordBasedCipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {Word32Array} The plaintext.
   * @example
   *   var plaintext = JsCrypto.PasswordBasedCipher.decrypt(
   *     JsCrypto.AES,
   *     formattedCiphertext,
   *     'password',
   *     { format: JsCrypto.OpenSSLFormatter }
   *   );
   *   var plaintext = JsCrypto.PasswordBasedCipher.decrypt(
   *     JsCrypto.AES,
   *     ciphertextParams,
   *     'password',
   *     { format: JsCrypto.OpenSSLFormatter }
   *   );
   */
  decrypt(
    Cipher: typeof BlockCipher,
    cipherText: CipherParams|string,
    password: string,
    props?: Partial<PasswordBasedCipherProps>,
  ){
    const p = props ? {...props} : {};
    const KDF = p.KDF ? p.KDF : OpenSSLKDF;
    const formatter = p.formatter ? p.formatter : OpenSSLFormatter;
    const cipherTextParams = parseCipherText(cipherText, formatter);
    const derivedParams = KDF.execute(password, Cipher.keySize, Cipher.ivSize);
    
    p.iv = derivedParams.iv;
    return SerializableCipher.decrypt(Cipher, cipherTextParams, derivedParams.key, props);
  }
}
