import { BlockCipherMode } from "./BlockCipherMode";
import { Word32Array } from "../../../Word32Array";
import { lsb, msb } from "./commonLib";
/**
 * Counter/CBC-MAC
 */
export class CCM extends BlockCipherMode {
    constructor(props) {
        super(props);
        this._CBIndex = 1;
        const { cipher, iv } = props;
        if (cipher.blockSize !== 128 / 32) {
            throw new Error("In CCM, cipher block size must be 128bit");
        }
        else if (iv && (iv.nSigBytes > 13 || iv.nSigBytes < 7)) {
            throw new Error("Byte size of iv must be between 7 and 13");
        }
        this._N = iv || new Word32Array([0, 0], 8);
        this._q = 15 - this._N.nSigBytes;
    }
    /**
     * Generate first block of B.
     *
     * @param {boolean} hasAData - If payload has AData, true.
     * @param {number} t - Octet length of T(Auth tag)
     * @param {Word32Array} Q - Octet length of payload.
     * @param {Word32Array} N - Nonce.
     */
    static getB0(hasAData, t, Q, N) {
        if (Q.nSigBytes + N.nSigBytes !== 15) {
            throw new Error("LEN(Q)+LEN(N) must be 15");
        }
        const reservedBit = 0 << 7;
        const ADataBit = (hasAData ? 1 : 0) << 6;
        const tBit = (((t - 2) / 2) << 3); // 3bits
        const qBit = (Q.nSigBytes - 1); // 3bits
        const flags = (reservedBit | ADataBit | tBit | qBit) & 0x000000ff;
        const NQ = N.clone().concat(Q);
        const B00 = new Word32Array([flags << 24], 1);
        return B00.concat(NQ);
    }
    /**
     * Format associated data
     * @param {Word32Array} A - Associated data
     * @param {Word32Array} P - Payload
     */
    static formatAssociatedDataAndPayload(A, P) {
        const a = A.nSigBytes;
        let ad;
        if (a === 0) {
            ad = new Word32Array([0], 0);
        }
        else if (a < Math.pow(2, 16) - Math.pow(2, 8)) {
            ad = new Word32Array([a << 16], 2);
        }
        else if (a < Math.pow(2, 32)) {
            ad = new Word32Array([0xfffe0000], 2).concat(new Word32Array([a], 4));
        }
        else {
            throw new Error("LEN(A) larger than 2**32-1 is not supported");
        }
        // Format AdditionalData
        const nAd = Math.floor(A.nSigBytes / 4);
        for (let i = 0; i < nAd; i++) {
            ad.concat(new Word32Array([A.words[i]], 4));
        }
        if (A.nSigBytes % 4) {
            ad.concat(new Word32Array([A.words[nAd]], A.nSigBytes % 4));
            ad.concat(new Word32Array([0], 4 - A.nSigBytes % 4));
        }
        // Align to 16byte block
        if (ad.nSigBytes % 16) {
            ad.concat(new Word32Array([0], 16 - ad.nSigBytes % 16));
        }
        // Format Payload
        const nPayload = Math.floor(P.nSigBytes / 4);
        for (let i = 0; i < nPayload; i++) {
            ad.concat(new Word32Array([P.words[i]], 4));
        }
        if (P.nSigBytes % 4) {
            ad.concat(new Word32Array([P.words[nPayload]], P.nSigBytes % 4));
            ad.concat(new Word32Array([0], 4 - P.nSigBytes % 4));
        }
        // Align to 16byte block
        if (ad.nSigBytes % 16) {
            ad.concat(new Word32Array([0], 16 - ad.nSigBytes % 16));
        }
        return ad;
    }
    /**
     * Generate Counter Block
     * @param {number} q - LEN(Q)
     * @param {Word32Array} N - Nonce
     * @param {number} index - Block index of 32bit integer
     */
    static genCtr(q, N, index) {
        if (N.nSigBytes + q !== 15) {
            throw new Error("LEN(Q)+LEN(N) must be 15");
        }
        const flag = new Word32Array([((q - 1) & 0x00000007) << 24], 1);
        const indexBytes = new Word32Array([], 0);
        const nq = Math.floor(q / 4);
        for (let i = 0; i < nq - 1; i++) {
            indexBytes.concat(new Word32Array([0], 4));
        }
        if (q % 4) {
            if (q > 4) {
                indexBytes.concat(new Word32Array([0], q % 4));
                indexBytes.concat(new Word32Array([index], 4));
            }
            else {
                indexBytes.concat(new Word32Array([index << (32 - q * 8)], q));
            }
        }
        else {
            indexBytes.concat(new Word32Array([index], 4));
        }
        return flag.concat(N).concat(indexBytes);
    }
    /**
     * Generate Message Authentication Code
     *
     * @param {typeof BlockCipher} Cipher - 128 bit block Cipher i.e. AES
     * @param {Word32Array} key - Key
     * @param {Word32Array} iv - Nonce. iv less than or equal to 8byte(64bit) is supported.
     * @param {Word32Array?} authData - Associated data
     * @param {Word32Array?} plainText - Payload
     * @param {number?} tagLength - authTag size in octet length. If omitted, tagLength will be set to 16byte.
     */
    static mac(Cipher, key, iv, authData, plainText, tagLength) {
        const cipher = new Cipher({ key, iv });
        if (cipher.blockSize !== 128 / 32) {
            throw new Error("In CCM, cipher block size must be 128bit");
        }
        else if (iv && (iv.nSigBytes > 13 || iv.nSigBytes < 7)) {
            throw new Error("Byte size of iv must be between 7 and 13");
        }
        const N = iv || new Word32Array([0, 0], 8);
        const A = (authData === null || authData === void 0 ? void 0 : authData.clone()) || new Word32Array();
        const a = A.nSigBytes;
        const P = (plainText === null || plainText === void 0 ? void 0 : plainText.clone()) || new Word32Array();
        const p = P.nSigBytes;
        if ((p >>> 0) > 4294967295) {
            throw new Error("Byte length of Payload(plainText) larger than 2^32-1 (4,294,967,295byte) is not supported at this time.");
        }
        const q = 15 - N.nSigBytes;
        const Q = lsb(new Word32Array([0, p], 8), q);
        const t = tagLength || 16;
        const B0 = CCM.getB0(Boolean(a), t, Q, N);
        const Bi = CCM.formatAssociatedDataAndPayload(A, P);
        const Y0 = B0.words.slice();
        cipher.encryptBlock(Y0, 0);
        const n = Bi.nSigBytes / 16;
        const wordsBi = Bi.words;
        let Y = Y0;
        for (let i = 0; i < n; i++) {
            const Yi0 = wordsBi[i * 4] ^ Y[0];
            const Yi1 = wordsBi[i * 4 + 1] ^ Y[1];
            const Yi2 = wordsBi[i * 4 + 2] ^ Y[2];
            const Yi3 = wordsBi[i * 4 + 3] ^ Y[3];
            const Yi = [Yi0, Yi1, Yi2, Yi3];
            cipher.encryptBlock(Yi, 0);
            Y = Yi;
        }
        const T = new Word32Array(Y, t);
        const ctr0 = CCM.genCtr(q, N, 0);
        cipher.encryptBlock(ctr0.words, 0);
        for (let i = 0; i < 4; i++) {
            T.words[i] ^= ctr0.words[i];
        }
        T.clamp();
        return T;
    }
    static combineCipherTextAndAuthTag(cipherText, authTag) {
        return cipherText.clone().concat(authTag);
    }
    static splitCipherTextAndAuthTag(cipherTextWithAuthTag, tLen) {
        const t = tLen || 16;
        const cipherText = msb(cipherTextWithAuthTag, cipherTextWithAuthTag.nSigBytes - t);
        const authTag = lsb(cipherTextWithAuthTag, t);
        return { cipherText, authTag };
    }
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = CTR.createEncryptor(cipher, iv.words);
     */
    static createEncryptor(props) {
        return new CCM.Encryptor(props);
    }
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = CTR.createDecryptor(cipher, iv.words);
     */
    static createDecryptor(props) {
        return new CCM.Decryptor(props);
    }
}
/**
 * CTR encryptor.
 */
CCM.Encryptor = class Encryptor extends CCM {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    processBlock(words, offset) {
        // Shortcuts
        const cipher = this._cipher;
        const blockSize = cipher.blockSize;
        const CBi = CCM.genCtr(this._q, this._N, this._CBIndex);
        cipher.encryptBlock(CBi.words, 0);
        for (let i = 0; i < blockSize; i++) {
            words[offset + i] ^= CBi.words[i];
        }
        this._CBIndex++;
    }
};
/**
 * CTR decryptor.
 */
CCM.Decryptor = class Decryptor extends CCM {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    processBlock(words, offset) {
        // Shortcuts
        const cipher = this._cipher;
        const blockSize = cipher.blockSize;
        const CBi = CCM.genCtr(this._q, this._N, this._CBIndex);
        cipher.encryptBlock(CBi.words, 0);
        for (let i = 0; i < blockSize; i++) {
            words[offset + i] ^= CBi.words[i];
        }
        this._CBIndex++;
    }
};
