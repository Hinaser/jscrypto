import { parseCipherText, SerializableCipher, } from "./SerializableCipher";
import { OpenSSLKDF } from "./kdf/OpenSSLKDF";
import { CipherParams } from "./CipherParams";
import { OpenSSLFormatter } from "./formatter/OpenSSLFormatter";
export const PasswordBasedCipher = {
    /**
     * Encrypts a message using a password.
     *
     * @param {typeof Cipher} Cipher The cipher algorithm to use.
     * @param {Word32Array|string} message The message to encrypt.
     * @param {string} password The password.
     * @param {Partial<PasswordBasedCipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {CipherParams} A cipher params object.
     * @example
     *   var params = JsCrypto.PasswordBasedCipher.encrypt(JsCrypto.AES, message, 'password');
     *   var params = JsCrypto.PasswordBasedCipher.encrypt(JsCrypto.AES, message, 'password', { format: JsCrypto.OpenSSLFormatter });
     */
    encrypt(Cipher, message, password, props) {
        const p = props ? Object.assign({}, props) : {};
        const KDF = props && props.KDF ? props.KDF : OpenSSLKDF;
        const derivedParams = KDF.execute(password, Cipher.keySize, Cipher.ivSize);
        p.iv = derivedParams.iv;
        const cipherParams = SerializableCipher.encrypt(Cipher, message, derivedParams.key, p);
        return new CipherParams(Object.assign(Object.assign({}, cipherParams), { key: derivedParams.key, iv: derivedParams.iv, salt: derivedParams.salt }));
    },
    /**
     * Decrypts serialized ciphertext using a password.
     *
     * @param {typeof Cipher} Cipher The cipher algorithm to use.
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
    decrypt(Cipher, cipherText, password, props) {
        const p = props ? Object.assign({}, props) : {};
        const KDF = p.KDF ? p.KDF : OpenSSLKDF;
        const formatter = p.formatter ? p.formatter : OpenSSLFormatter;
        const cipherTextParams = parseCipherText(cipherText, formatter);
        const derivedParams = KDF.execute(password, Cipher.keySize, Cipher.ivSize);
        p.iv = derivedParams.iv;
        return SerializableCipher.decrypt(Cipher, cipherTextParams, derivedParams.key, props);
    }
};
