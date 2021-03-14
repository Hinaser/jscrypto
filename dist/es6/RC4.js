import { StreamCipher } from "./lib/algorithm/cipher/StreamCipher";
import { PasswordBasedCipher } from "./lib/algorithm/cipher/PasswordBasedCipher";
import { SerializableCipher } from "./lib/algorithm/cipher/SerializableCipher";
export class RC4 extends StreamCipher {
    constructor(props) {
        super(props);
        this.S = [];
        this.i = 0;
        this.j = 0;
        this._props = props;
        this._doReset();
    }
    _doReset() {
        // Shortcuts
        const key = this._key;
        const keyWords = key.words;
        const keySigBytes = key.nSigBytes;
        // Init sbox
        this.S = [];
        for (let i = 0; i < 256; i++) {
            this.S[i] = i;
        }
        // Key setup
        for (let i = 0, j = 0; i < 256; i++) {
            const keyByteIndex = i % keySigBytes;
            const keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;
            j = (j + this.S[i] + keyByte) % 256;
            // Swap
            const t = this.S[i];
            this.S[i] = this.S[j];
            this.S[j] = t;
        }
        // Counters
        this.i = this.j = 0;
    }
    _doProcessBlock(words, offset) {
        words[offset] ^= this.generateKeyStreamWord();
    }
    generateKeyStreamWord() {
        // Shortcuts
        const S = this.S;
        let i = this.i;
        let j = this.j;
        // Generate keyStream word
        let keyStreamWord = 0;
        for (let n = 0; n < 4; n++) {
            i = (i + 1) % 256;
            j = (j + S[i]) % 256;
            // Swap
            const t = S[i];
            S[i] = S[j];
            S[j] = t;
            keyStreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
        }
        // Update counters
        this.i = i;
        this.j = j;
        return keyStreamWord;
    }
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = RC4.createEncryptor(keyWordArray);
     */
    static createEncryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new RC4(Object.assign(Object.assign({}, props), { key }));
    }
    /**
     * Creates this cipher in decryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = RC4.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new RC4(Object.assign(Object.assign({}, props), { key }));
    }
    /**
     * Encrypt a message with key
     *
     * @param {Word32Array|string} message
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = RC4.encrypt("test", "pass");
     */
    static encrypt(message, key, props) {
        if (typeof key === "string") {
            return PasswordBasedCipher.encrypt(RC4, message, key, props);
        }
        return SerializableCipher.encrypt(RC4, message, key, props);
    }
    /**
     * Encrypt a encrypted message with key
     *
     * @param {CipherParams} cipherText
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = RC4.decrypt(cipherProps, "pass");
     */
    static decrypt(cipherText, key, props) {
        if (typeof key === "string") {
            return PasswordBasedCipher.decrypt(RC4, cipherText, key, props);
        }
        return SerializableCipher.decrypt(RC4, cipherText, key, props);
    }
}
RC4.ivSize = 0;
RC4.keySize = 256 / 32;
