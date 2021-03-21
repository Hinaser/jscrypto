import { StreamCipher } from "./lib/algorithm/cipher/StreamCipher";
import { PasswordBasedCipher } from "./lib/algorithm/cipher/PasswordBasedCipher";
import { SerializableCipher } from "./lib/algorithm/cipher/SerializableCipher";
export class Rabbit extends StreamCipher {
    constructor(props) {
        super(props);
        this._blockSize = 128 / 32;
        this.S = [];
        this.C = [];
        this.G = [];
        this._X = [];
        this._C = [];
        this._b = 0;
        this._props = props;
        this._doReset();
    }
    _doReset() {
        // Shortcuts
        const K = this._key.words;
        const iv = this._iv;
        // Swap endian
        for (let i = 0; i < 4; i++) {
            K[i] = (((K[i] << 8) | (K[i] >>> 24)) & 0x00ff00ff)
                | (((K[i] << 24) | (K[i] >>> 8)) & 0xff00ff00);
        }
        // Generate initial state values
        const X = this._X = [
            K[0], (K[3] << 16) | (K[2] >>> 16),
            K[1], (K[0] << 16) | (K[3] >>> 16),
            K[2], (K[1] << 16) | (K[0] >>> 16),
            K[3], (K[2] << 16) | (K[1] >>> 16)
        ];
        // Generate initial counter values
        const C = this._C = [
            (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
            (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
            (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
            (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
        ];
        // Carry bit
        this._b = 0;
        // Iterate the system four times
        for (let i = 0; i < 4; i++) {
            this.nextState();
        }
        // Modify the counters
        for (let i = 0; i < 8; i++) {
            C[i] ^= X[(i + 4) & 7];
        }
        // IV setup
        if (!iv) {
            return;
        }
        // Shortcuts
        const IV = iv.words;
        const IV_0 = IV[0];
        const IV_1 = IV[1];
        // Generate four sub vectors
        const i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
        const i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
        const i1 = (i0 >>> 16) | (i2 & 0xffff0000);
        const i3 = (i2 << 16) | (i0 & 0x0000ffff);
        // Modify counter values
        C[0] ^= i0;
        C[1] ^= i1;
        C[2] ^= i2;
        C[3] ^= i3;
        C[4] ^= i0;
        C[5] ^= i1;
        C[6] ^= i2;
        C[7] ^= i3;
        // Iterate the system four times
        for (let i = 0; i < 4; i++) {
            this.nextState();
        }
    }
    _doProcessBlock(words, offset) {
        // Shortcut
        const X = this._X;
        // Iterate the system
        this.nextState();
        // Generate four key stream words
        this.S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
        this.S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
        this.S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
        this.S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);
        for (let i = 0; i < 4; i++) {
            // Swap endian
            this.S[i] = (((this.S[i] << 8) | (this.S[i] >>> 24)) & 0x00ff00ff) |
                (((this.S[i] << 24) | (this.S[i] >>> 8)) & 0xff00ff00);
            // Encrypt
            words[offset + i] ^= this.S[i];
        }
    }
    nextState() {
        // Shortcuts
        const X = this._X;
        const C = this._C;
        // Save old counter values
        for (let i = 0; i < 8; i++) {
            this.C[i] = C[i];
        }
        // Calculate new counter values
        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (this.C[0] >>> 0) ? 1 : 0)) | 0;
        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (this.C[1] >>> 0) ? 1 : 0)) | 0;
        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (this.C[2] >>> 0) ? 1 : 0)) | 0;
        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (this.C[3] >>> 0) ? 1 : 0)) | 0;
        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (this.C[4] >>> 0) ? 1 : 0)) | 0;
        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (this.C[5] >>> 0) ? 1 : 0)) | 0;
        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (this.C[6] >>> 0) ? 1 : 0)) | 0;
        this._b = (C[7] >>> 0) < (this.C[7] >>> 0) ? 1 : 0;
        // Calculate the g-values
        for (let i = 0; i < 8; i++) {
            const gx = X[i] + C[i];
            // Construct high and low argument for squaring
            const ga = gx & 0xffff;
            const gb = gx >>> 16;
            // Calculate high and low result of squaring
            const gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
            const gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);
            // High XOR low
            this.G[i] = gh ^ gl;
        }
        const G = this.G;
        // Calculate new state values
        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
        X[1] = (G[1] + ((G[0] << 8) | (G[0] >>> 24)) + G[7]) | 0;
        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
        X[3] = (G[3] + ((G[2] << 8) | (G[2] >>> 24)) + G[1]) | 0;
        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
        X[5] = (G[5] + ((G[4] << 8) | (G[4] >>> 24)) + G[3]) | 0;
        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
        X[7] = (G[7] + ((G[6] << 8) | (G[6] >>> 24)) + G[5]) | 0;
    }
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = Rabbit.createEncryptor(keyWordArray);
     */
    static createEncryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new Rabbit(Object.assign(Object.assign({}, props), { key }));
    }
    /**
     * Creates this cipher in decryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = Rabbit.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new Rabbit(Object.assign(Object.assign({}, props), { key }));
    }
    /**
     * Encrypt a message with key
     *
     * @param {Word32Array|string} message
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = Rabbit.encrypt("test", "pass");
     */
    static encrypt(message, key, props) {
        if (typeof key === "string") {
            return PasswordBasedCipher.encrypt(Rabbit, message, key, props);
        }
        return SerializableCipher.encrypt(Rabbit, message, key, props);
    }
    /**
     * Encrypt a encrypted message with key
     *
     * @param {CipherParams} cipherText
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = Rabbit.decrypt(cipherProps, "pass");
     */
    static decrypt(cipherText, key, props) {
        if (typeof key === "string") {
            return PasswordBasedCipher.decrypt(Rabbit, cipherText, key, props);
        }
        return SerializableCipher.decrypt(Rabbit, cipherText, key, props);
    }
}
Rabbit.ivSize = 128 / 32;
