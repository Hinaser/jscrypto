import { OpenSSLFormatter } from "./formatter/OpenSSLFormatter";
import { CipherParams } from "./CipherParams";
/**
 * Converts serialized ciphertext to CipherParams,
 * else assumed CipherParams already and returns ciphertext unchanged.
 * @param {CipherParams|string} cipherTextParams The ciphertext.
 * @param {Formatter} formatter The formatting strategy to use to parse serialized ciphertext.
 * @return {CipherParams} The un-serialized ciphertext.
 * @example
 *   var ciphertextParams = JsCrypto.SerializableCipher.parse(ciphertextStringOrParams, format);
 */
export function parseCipherText(cipherTextParams, formatter) {
    if (typeof cipherTextParams === "string") {
        return formatter.parse(cipherTextParams);
    }
    return cipherTextParams;
}
export const SerializableCipher = {
    /**
     * Encrypts a message.
     *
     * @param {typeof Cipher} Cipher The cipher algorithm to use.
     * @param {Word32Array|string} message The message to encrypt.
     * @param {Word32Array} key The key.
     * @param {Partial<SerializableCipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {CipherParams} A cipher params object.
     * @example
     *   var ciphertextParams = JsCrypto.SerializableCipher.encrypt(JsCrypto.AES, message, key);
     *   var ciphertextParams = JsCrypto.SerializableCipher.encrypt(JsCrypto.AES, message, key, { iv: iv });
     */
    encrypt(Cipher, message, key, props) {
        const encryptor = Cipher.createEncryptor(key, props);
        const cipherText = encryptor.finalize(message);
        return new CipherParams({
            cipherText,
            key,
            iv: encryptor.iv,
            Algorithm: Cipher,
            mode: encryptor.mode,
            padding: encryptor.padding,
            blockSize: encryptor.blockSize,
            formatter: (props === null || props === void 0 ? void 0 : props.formatter) || OpenSSLFormatter,
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
     *     var plaintext = JsCrypto.SerializableCipher.decrypt(JsCrypto.AES, formattedCiphertext, key, { iv: iv, format: JsCrypto.OpenSSL });
     *     var plaintext = JsCrypto.SerializableCipher.decrypt(JsCrypto.AES, ciphertextParams, key, { iv: iv, format: JsCrypto.OpenSSL });
     */
    decrypt(Cipher, cipherText, key, props) {
        const decryptor = Cipher.createDecryptor(key, props);
        const cipherParams = parseCipherText(cipherText, (props === null || props === void 0 ? void 0 : props.formatter) || OpenSSLFormatter);
        return decryptor.finalize(cipherParams.cipherText || "");
    }
};
