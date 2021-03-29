import { Cipher } from "./lib/algorithm/cipher/Cipher";
import { BlockCipher } from "./lib/algorithm/cipher/BlockCipher";
import { PasswordBasedCipher } from "./lib/algorithm/cipher/PasswordBasedCipher";
import { SerializableCipher } from "./lib/algorithm/cipher/SerializableCipher";
// Lookup tables
const SBOX = [];
const INV_SBOX = [];
const SUB_MIX_0 = [];
const SUB_MIX_1 = [];
const SUB_MIX_2 = [];
const SUB_MIX_3 = [];
const INV_SUB_MIX_0 = [];
const INV_SUB_MIX_1 = [];
const INV_SUB_MIX_2 = [];
const INV_SUB_MIX_3 = [];
(function computeLookupTables() {
    // Compute double table
    const d = [];
    for (let i = 0; i < 256; i++) {
        if (i < 128) {
            d[i] = i << 1;
        }
        else {
            d[i] = (i << 1) ^ 0x11b;
        }
    }
    // Walk GF(2^8)
    let x = 0;
    let xi = 0;
    for (let i = 0; i < 256; i++) {
        // Compute sbox
        let sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
        sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
        SBOX[x] = sx;
        INV_SBOX[sx] = x;
        // Compute multiplication
        const x2 = d[x];
        const x4 = d[x2];
        const x8 = d[x4];
        // Compute sub bytes, mix columns tables
        let t = (d[sx] * 0x101) ^ (sx * 0x1010100);
        SUB_MIX_0[x] = (t << 24) | (t >>> 8);
        SUB_MIX_1[x] = (t << 16) | (t >>> 16);
        SUB_MIX_2[x] = (t << 8) | (t >>> 24);
        SUB_MIX_3[x] = t;
        // Compute inv sub bytes, inv mix columns tables
        t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
        INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
        INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
        INV_SUB_MIX_2[sx] = (t << 8) | (t >>> 24);
        INV_SUB_MIX_3[sx] = t;
        // Compute next counter
        if (!x) {
            x = xi = 1;
        }
        else {
            x = x2 ^ d[d[d[x8 ^ x2]]];
            xi ^= d[d[xi]];
        }
    }
}());
// Precomputed Rcon lookup
const RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
export class AES extends BlockCipher {
    constructor(props) {
        super(props);
        this._nRounds = 0;
        this._keySchedule = [];
        this._invKeySchedule = [];
        this._props = props;
        this._doReset();
    }
    _doReset() {
        let t;
        // Skip reset of nRounds has been set before and key did not change
        if (this._nRounds && this._keyPriorReset === this._key) {
            return;
        }
        // Shortcuts
        const key = this._keyPriorReset = this._key;
        const keyWords = key.words;
        const keySize = key.nSigBytes / 4;
        // Compute number of rounds
        const nRounds = this._nRounds = keySize + 6;
        // Compute number of key schedule rows
        const ksRows = (nRounds + 1) * 4;
        // Compute key schedule
        const keySchedule = this._keySchedule = [];
        for (let ksRow = 0; ksRow < ksRows; ksRow++) {
            if (ksRow < keySize) {
                keySchedule[ksRow] = keyWords[ksRow];
            }
            else {
                t = keySchedule[ksRow - 1];
                if (!(ksRow % keySize)) {
                    // Rot word
                    t = (t << 8) | (t >>> 24);
                    // Sub word
                    t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
                    // Mix Rcon
                    t ^= RCON[(ksRow / keySize) | 0] << 24;
                }
                else if (keySize > 6 && ksRow % keySize === 4) {
                    // Sub word
                    t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
                }
                keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
            }
        }
        // Compute inv key schedule
        this._invKeySchedule = [];
        for (let invKsRow = 0; invKsRow < ksRows; invKsRow++) {
            const ksRow = ksRows - invKsRow;
            if (invKsRow % 4) {
                t = keySchedule[ksRow];
            }
            else {
                t = keySchedule[ksRow - 4];
            }
            if (invKsRow < 4 || ksRow <= 4) {
                this._invKeySchedule[invKsRow] = t;
            }
            else {
                this._invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
                    INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
            }
        }
    }
    encryptBlock(words, offset) {
        this._doCryptBlock(words, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
    }
    decryptBlock(words, offset) {
        // Swap 2nd and 4th rows
        let t = words[offset + 1];
        words[offset + 1] = words[offset + 3];
        words[offset + 3] = t;
        this._doCryptBlock(words, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
        // Inv swap 2nd and 4th rows
        t = words[offset + 1];
        words[offset + 1] = words[offset + 3];
        words[offset + 3] = t;
    }
    _doCryptBlock(words, offset, keySchedule, subMix0, subMix1, subMix2, subMix3, sBox) {
        // Shortcut
        const nRounds = this._nRounds;
        // Get input, add round key
        let s0 = words[offset] ^ keySchedule[0];
        let s1 = words[offset + 1] ^ keySchedule[1];
        let s2 = words[offset + 2] ^ keySchedule[2];
        let s3 = words[offset + 3] ^ keySchedule[3];
        // Key schedule row counter
        let ksRow = 4;
        // Rounds
        for (let round = 1; round < nRounds; round++) {
            // Shift rows, sub bytes, mix columns, add round key
            const _s0 = subMix0[s0 >>> 24] ^ subMix1[(s1 >>> 16) & 0xff]
                ^ subMix2[(s2 >>> 8) & 0xff] ^ subMix3[s3 & 0xff] ^ keySchedule[ksRow++];
            const _s1 = subMix0[s1 >>> 24] ^ subMix1[(s2 >>> 16) & 0xff]
                ^ subMix2[(s3 >>> 8) & 0xff] ^ subMix3[s0 & 0xff] ^ keySchedule[ksRow++];
            const _s2 = subMix0[s2 >>> 24] ^ subMix1[(s3 >>> 16) & 0xff]
                ^ subMix2[(s0 >>> 8) & 0xff] ^ subMix3[s1 & 0xff] ^ keySchedule[ksRow++];
            const _s3 = subMix0[s3 >>> 24] ^ subMix1[(s0 >>> 16) & 0xff]
                ^ subMix2[(s1 >>> 8) & 0xff] ^ subMix3[s2 & 0xff] ^ keySchedule[ksRow++];
            // Update state
            s0 = _s0;
            s1 = _s1;
            s2 = _s2;
            s3 = _s3;
        }
        // Shift rows, sub bytes, add round key
        const t0 = ((sBox[s0 >>> 24] << 24) | (sBox[(s1 >>> 16) & 0xff] << 16)
            | (sBox[(s2 >>> 8) & 0xff] << 8) | sBox[s3 & 0xff]) ^ keySchedule[ksRow++];
        const t1 = ((sBox[s1 >>> 24] << 24) | (sBox[(s2 >>> 16) & 0xff] << 16)
            | (sBox[(s3 >>> 8) & 0xff] << 8) | sBox[s0 & 0xff]) ^ keySchedule[ksRow++];
        const t2 = ((sBox[s2 >>> 24] << 24) | (sBox[(s3 >>> 16) & 0xff] << 16)
            | (sBox[(s0 >>> 8) & 0xff] << 8) | sBox[s1 & 0xff]) ^ keySchedule[ksRow++];
        const t3 = ((sBox[s3 >>> 24] << 24) | (sBox[(s0 >>> 16) & 0xff] << 16)
            | (sBox[(s1 >>> 8) & 0xff] << 8) | sBox[s2 & 0xff]) ^ keySchedule[ksRow++];
        // Set output
        words[offset] = t0;
        words[offset + 1] = t1;
        words[offset + 2] = t2;
        words[offset + 3] = t3;
    }
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = AES.createEncryptor(keyWordArray, { iv: ivWordArray });
     */
    static createEncryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new AES(Object.assign(Object.assign({}, props), { key, transformMode: Cipher.ENC_TRANSFORM_MODE }));
    }
    /**
     * Creates this cipher in decryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = AES.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new AES(Object.assign(Object.assign({}, props), { key, transformMode: Cipher.DEC_TRANSFORM_MODE }));
    }
    /**
     * Encrypt a message with key
     *
     * @param {Word32Array|string} message
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = AES.encrypt("test", "pass");
     */
    static encrypt(message, key, props) {
        if (typeof key === "string") {
            return PasswordBasedCipher.encrypt(AES, message, key, props);
        }
        if (key.nSigBytes % 4 !== 0) {
            throw new Error("Key size must be multiple of 32bit/4byte/1word");
        }
        return SerializableCipher.encrypt(AES, message, key, props);
    }
    /**
     * Encrypt a encrypted message with key
     *
     * @param {CipherParams|string} cipherParams
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = AES.decrypt(cipherProps, "pass");
     */
    static decrypt(cipherParams, key, props) {
        if (typeof key === "string") {
            return PasswordBasedCipher.decrypt(AES, cipherParams, key, props);
        }
        if (key.nSigBytes % 4 !== 0) {
            throw new Error("Key size must be multiple of 32bit/4byte/1word");
        }
        return SerializableCipher.decrypt(AES, cipherParams, key, props);
    }
}
AES.keySize = 256 / 32;
