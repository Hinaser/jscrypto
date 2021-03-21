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
     *   var params = PasswordBasedCipher.encrypt(AES, message, 'password');
     *   var params = PasswordBasedCipher.encrypt(AES, message, 'password', { format: OpenSSLFormatter });
     */
    encrypt(Cipher, message, password, props) {
        const cipherProps = props ? Object.assign({}, props) : {};
        const KDF = props && props.KDF ? props.KDF : OpenSSLKDF;
        const kdfProps = {};
        if (props && props.kdfHasher) {
            kdfProps.kdfHasher = props.kdfHasher;
        }
        if (props && props.kdfIterations) {
            kdfProps.kdfIterations = props.kdfIterations;
        }
        if (props && props.kdfModule) {
            kdfProps.kdfModule = props.kdfModule;
        }
        const derivedParams = KDF.execute(password, Cipher.keySize, Cipher.ivSize, cipherProps.kdfSalt, kdfProps);
        cipherProps.iv = derivedParams.iv;
        const cipherParams = SerializableCipher.encrypt(Cipher, message, derivedParams.key, cipherProps);
        return new CipherParams(Object.assign(Object.assign({}, cipherParams), { key: derivedParams.key, iv: derivedParams.iv, salt: derivedParams.salt }));
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
    decrypt(Cipher, cipherParams, password, props) {
        const p = props ? Object.assign({}, props) : {};
        const KDF = p.KDF ? p.KDF : OpenSSLKDF;
        const formatter = p.formatter ? p.formatter : OpenSSLFormatter;
        const cipherParamsObj = parseCipherText(cipherParams, formatter);
        const kdfProps = {};
        if (props && props.kdfHasher) {
            kdfProps.kdfHasher = props.kdfHasher;
        }
        if (props && props.kdfIterations) {
            kdfProps.kdfIterations = props.kdfIterations;
        }
        if (props && props.kdfModule) {
            kdfProps.kdfModule = props.kdfModule;
        }
        const derivedParams = KDF.execute(password, Cipher.keySize, Cipher.ivSize, cipherParamsObj.salt, kdfProps);
        p.iv = derivedParams.iv;
        return SerializableCipher.decrypt(Cipher, cipherParamsObj, derivedParams.key, p);
    }
};
