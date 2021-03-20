import {
  ISerializableCipher,
  parseCipherText,
  SerializableCipher,
  SerializableCipherProps,
} from "./SerializableCipher";
import type {KDF as KDFType, KDFProps, BaseKDFModule} from "./kdf/type";
import {OpenSSLKDF} from "./kdf/OpenSSLKDF";
import type {Word32Array} from "../../Word32Array";
import {CipherParams} from "./CipherParams";
import {OpenSSLFormatter} from "./formatter/OpenSSLFormatter";
import type {Cipher as BaseCipher} from "./Cipher";
import type {Hasher} from "../Hasher";

export interface PasswordBasedCipherProps extends SerializableCipherProps {
  salt: Word32Array;
  KDF: KDFType;
  kdfModule: typeof BaseKDFModule;
  kdfHasher: typeof Hasher;
  kdfIterations: number;
}

export const PasswordBasedCipher: ISerializableCipher<string> = {
  /**
   * Encrypts a message using a password.
   *
   * @param {typeof Cipher} Cipher The cipher algorithm to use.
   * @param {Word32Array|string} message The message to encrypt.
   * @param {string} password The password.
   * @param {Partial<PasswordBasedCipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {CipherParams} A cipher params object.
   * @example
   *   var params = PasswordBasedCipher.encrypt(AES, message, 'password');
   *   var params = PasswordBasedCipher.encrypt(AES, message, 'password', { format: OpenSSLFormatter });
   */
  encrypt(
    Cipher: typeof BaseCipher,
    message: Word32Array|string,
    password: string,
    props?: Partial<PasswordBasedCipherProps>,
  ){
    const cipherProps = props ? {...props} : {};
    const KDF = props && props.KDF ? props.KDF : OpenSSLKDF;
    const kdfProps: Partial<KDFProps> = {};
    if(props && props.kdfHasher){
      kdfProps.kdfHasher = props.kdfHasher;
    }
    if(props && props.kdfIterations){
      kdfProps.kdfIterations = props.kdfIterations;
    }
    if(props && props.kdfModule){
      kdfProps.kdfModule = props.kdfModule;
    }
    const derivedParams = KDF.execute(password, Cipher.keySize, Cipher.ivSize, cipherProps.salt, kdfProps);
    
    cipherProps.iv = derivedParams.iv;
    const cipherParams = SerializableCipher.encrypt(Cipher, message, derivedParams.key, cipherProps);
    
    return new CipherParams({
      ...cipherParams,
      key: derivedParams.key,
      iv: derivedParams.iv,
      salt: derivedParams.salt,
    });
  },
  
  /**
   * Decrypts serialized ciphertext using a password.
   *
   * @param {typeof Cipher} Cipher The cipher algorithm to use.
   * @param {CipherParams|string} cipherParams The ciphertext to decrypt.
   * @param {string} password The password.
   * @param {Partial<PasswordBasedCipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {Word32Array} The plaintext.
   * @example
   *   var plaintext = PasswordBasedCipher.decrypt(
   *     AES,
   *     formattedCiphertext,
   *     'password',
   *     { format: OpenSSLFormatter }
   *   );
   *   var plaintext = PasswordBasedCipher.decrypt(
   *     AES,
   *     ciphertextParams,
   *     'password',
   *     { format: OpenSSLFormatter }
   *   );
   */
  decrypt(
    Cipher: typeof BaseCipher,
    cipherParams: CipherParams|string,
    password: string,
    props?: Partial<PasswordBasedCipherProps>,
  ){
    const p = props ? {...props} : {};
    const KDF = p.KDF ? p.KDF : OpenSSLKDF;
    const formatter = p.formatter ? p.formatter : OpenSSLFormatter;
    const cipherParamsObj = parseCipherText(cipherParams, formatter);
    const kdfProps: Partial<KDFProps> = {};
    if(props && props.kdfHasher){
      kdfProps.kdfHasher = props.kdfHasher;
    }
    if(props && props.kdfIterations){
      kdfProps.kdfIterations = props.kdfIterations;
    }
    if(props && props.kdfModule){
      kdfProps.kdfModule = props.kdfModule;
    }
    
    const derivedParams = KDF.execute(password, Cipher.keySize, Cipher.ivSize, cipherParamsObj.salt, kdfProps);
    
    p.iv = derivedParams.iv;
    return SerializableCipher.decrypt(Cipher, cipherParamsObj, derivedParams.key, p);
  }
}
