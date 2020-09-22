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
   * @param {Cipher} cipher The cipher algorithm to use.
   * @param {Word32Array|string} message The message to encrypt.
   * @param {string} password The password.
   * @param {Partial<PasswordBasedCipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {CipherParams} A cipher params object.
   * @example
   *   var params = JsCrypto.PasswordBasedCipher.encrypt(JsCrypto.AES, message, 'password');
   *   var params = JsCrypto.PasswordBasedCipher.encrypt(JsCrypto.AES, message, 'password', { format: JsCrypto.OpenSSLFormatter });
   */
  encrypt(
    cipher: BlockCipher,
    message: Word32Array|string,
    password: string,
    props?: Partial<PasswordBasedCipherProps>,
  ){
    const p = props ? {...props} : {};
    const KDF = props && props.KDF ? props.KDF : OpenSSLKDF;
    const derivedParams = KDF.execute(password, cipher.keySize, cipher.ivSize);
    
    p.iv = derivedParams.iv;
    const cipherParams = SerializableCipher.encrypt(cipher, message, derivedParams.key, p);
    
    return {
      ...cipherParams,
      ...derivedParams,
    };
  },
  
  /**
   * Decrypts serialized ciphertext using a password.
   *
   * @param {BlockCipher} cipher The cipher algorithm to use.
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
    cipher: BlockCipher,
    cipherText: CipherParams|string,
    password: string,
    props?: Partial<PasswordBasedCipherProps>,
  ){
    const p = props ? {...props} : {};
    const KDF = p.KDF ? p.KDF : OpenSSLKDF;
    const formatter = p.formatter ? p.formatter : OpenSSLFormatter;
    const cipherTextParams = parseCipherText(cipherText, formatter);
    const derivedParams = KDF.execute(password, cipher.keySize, cipher.ivSize);
    
    p.iv = derivedParams.iv;
    return SerializableCipher.decrypt(cipher, cipherTextParams, derivedParams.key, props);
  }
}
