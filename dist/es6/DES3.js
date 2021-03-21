import { SerializableCipher } from "./lib/algorithm/cipher/SerializableCipher";
import { BlockCipher } from "./lib/algorithm/cipher/BlockCipher";
import { Cipher } from "./lib/algorithm/cipher/Cipher";
import { DES } from "./DES";
import { Word32Array } from "./lib/Word32Array";
import { PasswordBasedCipher } from "./lib/algorithm/cipher/PasswordBasedCipher";
export class DES3 extends BlockCipher {
    constructor(props) {
        super(props);
        this._blockSize = 64 / 32;
        this._props = props;
        const TripleDES = this._get3DES();
        // Create DES instances
        this._des1 = TripleDES[0];
        this._des2 = TripleDES[1];
        this._des3 = TripleDES[2];
    }
    _get3DES() {
        // Shortcuts
        const key = this._key;
        const keyWords = key.words;
        // Make sure the key length is valid (64, 128 or >= 192 bit)
        if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
            throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
        }
        // Extend the key according to the keying options defined in 3DES standard
        const key1 = keyWords.slice(0, 2);
        const key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
        const key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);
        // Create DES instances
        const des1 = DES.createEncryptor(new Word32Array(key1));
        const des2 = DES.createEncryptor(new Word32Array(key2));
        const des3 = DES.createEncryptor(new Word32Array(key3));
        return [des1, des2, des3];
    }
    _doReset() {
        const TripleDES = this._get3DES();
        // Create DES instances
        this._des1 = TripleDES[0];
        this._des2 = TripleDES[1];
        this._des3 = TripleDES[2];
    }
    encryptBlock(words, offset) {
        this._des1.encryptBlock(words, offset);
        this._des2.decryptBlock(words, offset);
        this._des3.encryptBlock(words, offset);
    }
    decryptBlock(words, offset) {
        this._des3.decryptBlock(words, offset);
        this._des2.encryptBlock(words, offset);
        this._des1.decryptBlock(words, offset);
    }
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = DES3.createEncryptor(keyWordArray, { iv: ivWordArray });
     */
    static createEncryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new DES3(Object.assign(Object.assign({}, props), { key, transformMode: Cipher.ENC_TRANSFORM_MODE }));
    }
    /**
     * Creates this cipher in decryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = DES3.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new DES3(Object.assign(Object.assign({}, props), { key, transformMode: Cipher.DEC_TRANSFORM_MODE }));
    }
    /**
     * Encrypt a message with key
     *
     * @param {Word32Array|string} message
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = DES3.encrypt("test", "pass");
     */
    static encrypt(message, key, props) {
        if (typeof key === "string") {
            return PasswordBasedCipher.encrypt(DES3, message, key, props);
        }
        return SerializableCipher.encrypt(DES3, message, key, props);
    }
    /**
     * Encrypt a encrypted message with key
     *
     * @param {CipherParams} cipherText
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = DES3.decrypt(cipherProps, "pass");
     */
    static decrypt(cipherText, key, props) {
        if (typeof key === "string") {
            return PasswordBasedCipher.decrypt(DES3, cipherText, key, props);
        }
        return SerializableCipher.decrypt(DES3, cipherText, key, props);
    }
}
DES3.keySize = 192 / 32;
DES3.ivSize = 64 / 32;
