import { CipherParams } from "../CipherParams";
import { Word32Array } from "../../../Word32Array";
import { Base64 } from "../../../encoder/Base64";
export const OpenSSLFormatter = {
    /**
     * Converts a cipher params object to an OpenSSL-compatible string.
     *
     * @param {CipherParams} cipherParams The cipher params object.
     * @return {string} The OpenSSL-compatible string.
     * @example
     *   var openSSLString = OpenSSLFormatter.stringify(cipherParams);
     */
    stringify(cipherParams) {
        // Shortcuts
        const cipherText = cipherParams.cipherText;
        const salt = cipherParams.salt;
        if (!cipherText) {
            return "";
        }
        // Format
        if (salt) {
            const wordArray = new Word32Array([0x53616c74, 0x65645f5f]).concat(salt).concat(cipherText);
            return wordArray.toString(Base64);
        }
        return cipherText.toString(Base64);
    },
    /**
     * Converts an OpenSSL-compatible string to a cipher params object.
     *
     * @param {string} openSSLStr The OpenSSL-compatible string.
     * @return {CipherParams} The cipher params object.
     * @example
     *   var cipherParams = OpenSSLFormatter.parse(openSSLString);
     */
    parse(openSSLStr) {
        let salt;
        // Parse base64
        const cipherText = Base64.parse(openSSLStr);
        // Shortcut
        const ciphertextWords = cipherText.words;
        // Test for salt
        if (ciphertextWords[0] === 0x53616c74 && ciphertextWords[1] === 0x65645f5f) {
            // Extract salt
            salt = new Word32Array(ciphertextWords.slice(2, 4));
            // Remove salt from ciphertext
            ciphertextWords.splice(0, 4);
            cipherText.nSigBytes -= 16;
        }
        return new CipherParams({ cipherText, salt });
    }
};
