import { PasswordBasedCipher } from "./lib/algorithm/cipher/PasswordBasedCipher";
import { SerializableCipher } from "./lib/algorithm/cipher/SerializableCipher";
import { RC4 } from "./RC4";
export class RC4Drop extends RC4 {
    constructor(props) {
        super(props);
        this.drop = 192;
        this._props = props;
        if (props && typeof props.drop === "number") {
            this.drop = props.drop;
        }
        this._doReset();
    }
    _doReset() {
        super._doReset();
        // Drop
        for (let i = this.drop; i > 0; i--) {
            this.generateKeyStreamWord();
        }
    }
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = RC4Drop.createEncryptor(keyWordArray);
     */
    static createEncryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new RC4Drop(Object.assign(Object.assign({}, props), { key }));
    }
    /**
     * Creates this cipher in decryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = RC4Drop.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new RC4Drop(Object.assign(Object.assign({}, props), { key }));
    }
    /**
     * Encrypt a message with key
     *
     * @param {Word32Array|string} message
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = RC4Drop.encrypt("test", "pass");
     */
    static encrypt(message, key, props) {
        if (typeof key === "string") {
            return PasswordBasedCipher.encrypt(RC4Drop, message, key, props);
        }
        return SerializableCipher.encrypt(RC4Drop, message, key, props);
    }
    /**
     * Encrypt a encrypted message with key
     *
     * @param {CipherParams} cipherText
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = RC4Drop.decrypt(cipherProps, "pass");
     */
    static decrypt(cipherText, key, props) {
        if (typeof key === "string") {
            return PasswordBasedCipher.decrypt(RC4Drop, cipherText, key, props);
        }
        return SerializableCipher.decrypt(RC4Drop, cipherText, key, props);
    }
}
