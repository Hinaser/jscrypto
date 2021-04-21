import { BlockCipherMode } from "./BlockCipherMode";
import { Word32Array } from "../../../Word32Array";
import { msb, padTo128m } from "./commonLib";
/**
 * Galois Counter Mode
 */
export class GCM extends BlockCipherMode {
    constructor(props) {
        super(props);
        this._H = [];
        this._J0 = [];
        this._CB = []; // Counter Block
        if (props.cipher.blockSize !== 128 / 32) {
            throw new Error("In GCM block cipher mode, cipher block size must be 128bit");
        }
        const { cipher, iv } = props;
        const H = [0, 0, 0, 0];
        cipher.encryptBlock(H, 0);
        this._H = H;
        // iv should be array of 32bit int
        this._J0 = GCM.getJ0(H, iv === null || iv === void 0 ? void 0 : iv.words);
        this._CB = this._J0.slice();
    }
    /**
     * Initialize Initial Counter Block J0.
     * @param {[number, number, number, number]} H - 128bit(4word) block
     * @param {number[]} iv - Initializing Vector which must be multiple of 32bit(4byte)
     */
    static getJ0(H, iv) {
        let J0;
        if (!iv || iv.length === 0) {
            J0 = [0, 0, 0, 1];
        }
        else if (iv.length === 3) {
            J0 = [iv[0], iv[1], iv[2], 1];
        }
        else {
            const remainderOf4Word = (iv.length % 4) > 0 ? 4 - (iv.length % 4) : 0;
            const iv2 = iv.slice();
            for (let i = 0; i < remainderOf4Word + 2; i++) {
                iv2.push(0); // append 32bit 0
            }
            // This should be upper 32bit of len(iv),
            // But iv.length > 4294967295(0xffffffff, unsigned 32bit int max) is not supported for now.
            iv2.push(0);
            iv2.push(iv.length * 32); // An element of `iv` is 4byte = 32bit.
            J0 = GCM.GHASH(H, iv2);
        }
        return J0;
    }
    /**
     * https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
     * 6.2 Incrementing Function
     * inc(s=32, X) = MSB(len(X)-s, X) || [int(LSB(s, X)+1 mod 2^s]
     *
     * @param {number[]} X - [32bit int, 32bit int, 32bit int, 32bit int].
     * @example
     *   inc32([0,0,0,0]) = [0,0,0,1]
     *   inc32([0,0,0,1]) = [0,0,0,2]
     *   inc32([0,0,0,0xffffffff]) = [0,0,1,0]
     *   inc32([0,0,0xffffffff,0xffffffff]) = [0,1,0,0]
     *   inc32([0,0xffffffff,0xffffffff,0xffffffff]) = [0,0,0,0]
     */
    static inc32(X) {
        const A = X.slice();
        const unsignedX3 = (A[3] >>> 0);
        const carry3 = ((unsignedX3 + 1) >>> 0) < unsignedX3;
        A[3] = (A[3] + 1) | 0;
        if (carry3) {
            const unsignedX2 = (A[2] >>> 0);
            const carry2 = ((unsignedX2 + 1) >>> 0) < unsignedX2;
            A[2] = (A[2] + 1) | 0;
            if (carry2) {
                A[1] = (A[1] + 1) | 0;
            }
        }
        return A;
    }
    /**
     * https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
     * 6.3 Multiplication Operation on Blocks
     *
     * @param {number[]} X - [32bit int, 32bit int, 32bit int, 32bit int], 128bit block.
     * @param {number[]} Y - [32bit int, 32bit int, 32bit int, 32bit int], 128bit block.
     * @returns 128bit block
     */
    static mul(X, Y) {
        const R = [0xe1000000, 0, 0, 0];
        const Z = [0, 0, 0, 0];
        const V = Y.slice();
        for (let i = 0; i < 128; i++) {
            const xIndex = i >>> 5;
            const xi = (X[xIndex] >>> (31 - i % 32)) & 1;
            if (xi > 0) {
                Z[0] = Z[0] ^ V[0];
                Z[1] = Z[1] ^ V[1];
                Z[2] = Z[2] ^ V[2];
                Z[3] = Z[3] ^ V[3];
            }
            const LSBVi = (V[3] & 1) >>> 0;
            const carry0 = (V[0] & 1) >>> 0;
            const carry1 = (V[1] & 1) >>> 0;
            const carry2 = (V[2] & 1) >>> 0;
            V[0] = V[0] >>> 1;
            V[1] = (V[1] >>> 1) | (carry0 ? 0x80000000 : 0);
            V[2] = (V[2] >>> 1) | (carry1 ? 0x80000000 : 0);
            V[3] = (V[3] >>> 1) | (carry2 ? 0x80000000 : 0);
            if (LSBVi > 0) {
                V[0] ^= R[0];
                V[1] ^= R[1];
                V[2] ^= R[2];
                V[3] ^= R[3];
            }
        }
        return Z;
    }
    /**
     * https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
     * 6.4 GHASH Function
     *
     * @param {number[]} H - The hash sub key block of 128bit.
     * @param {number[]} X - X.length must be multiple of 4. (multiple of 128bit)
     * @returns 128bit block
     */
    static GHASH(H, X) {
        if (H.length % 4 !== 0) {
            throw new Error("Length of 32bit word array 'H' must be multiple of 4(128bit)");
        }
        else if (X.length % 4 !== 0) {
            throw new Error("Length of 32bit word array 'X' must be multiple of 4(128bit)");
        }
        const m = X.length;
        let Y = [0, 0, 0, 0];
        for (let i = 0; i < m; i += 4) {
            Y[0] = (Y[0] ^ X[i]);
            Y[1] = (Y[1] ^ X[i + 1]);
            Y[2] = (Y[2] ^ X[i + 2]);
            Y[3] = (Y[3] ^ X[i + 3]);
            Y = GCM.mul(Y, H);
        }
        return Y;
    }
    /**
     * https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
     * 6.5 GCTR Function
     *
     * @param {BlockCipher} cipher
     * @param {number[]} ICB - Initial Code Block. Required to be 128bit(4word).
     * @param {Word32Array} X - Arbitrary length block
     */
    static GCTR(cipher, ICB, X) {
        if (X.nSigBytes === 0) {
            return X.clone();
        }
        if (ICB.length !== 4) {
            throw new Error("Initial Counter Block size must be 128bit");
        }
        const words = X.words;
        const n = Math.ceil(X.nSigBytes / 16);
        const CB = [ICB.slice()];
        for (let i = 1; i < n; i++) {
            const CBi = GCM.inc32(CB[i - 1]);
            CB.push(CBi);
        }
        const Y = new Word32Array();
        for (let i = 0; i < n; i++) {
            cipher.encryptBlock(CB[i], 0);
            const remainderOf16Bytes = X.nSigBytes % 16;
            if (i < n - 1 || /* i === n-1 && */ remainderOf16Bytes === 0) {
                const Yi0 = words[i * 4] ^ CB[i][0];
                const Yi1 = words[i * 4 + 1] ^ CB[i][1];
                const Yi2 = words[i * 4 + 2] ^ CB[i][2];
                const Yi3 = words[i * 4 + 3] ^ CB[i][3];
                const Yi = new Word32Array([Yi0, Yi1, Yi2, Yi3]);
                Y.concat(Yi);
                continue;
            }
            // i === n-1
            const w = [];
            let nSigBytes = 0;
            const nMaxAligned = Math.floor(remainderOf16Bytes / 4);
            for (let k = 0; k < nMaxAligned; k++) {
                const Ynk = words[i * 4 + k] ^ CB[i][k];
                w.push(Ynk);
                nSigBytes += 4;
            }
            const remaining0to3Bytes = remainderOf16Bytes % 4;
            if (remaining0to3Bytes > 0) {
                const Ynr = (words[i * 4 + nMaxAligned] << (32 - 8 * remaining0to3Bytes)) ^ CB[i][nMaxAligned];
                w.push(Ynr);
                nSigBytes += remaining0to3Bytes;
            }
            const Yn = new Word32Array(w, nSigBytes);
            Y.concat(Yn);
        }
        Y.nSigBytes = X.nSigBytes;
        Y.clamp();
        return Y;
    }
    /**
     * Calculate Message Authentication Code with GCM
     *
     * @param {typeof BlockCipher} Cipher - 128 bit block Cipher i.e. AES
     * @param {Word32Array} key - key
     * @param {Word32Array} iv - iv should be 12byte length. i.e. `new Word32Array([0x11223344, 0x55667788, 0x99aabbcc], 12);`
     * @param {Word32Array?} aad - Additional Authenticated Data
     * @param {Word32Array?} cipherText - encrypted text
     * @param {number?} tagLength - authTag size in octet length. If omitted, tagLength will be set to 16byte.
     */
    static mac(Cipher, key, iv, aad, cipherText, tagLength) {
        const cipher = new Cipher({ key, iv });
        const H = [0, 0, 0, 0];
        cipher.encryptBlock(H, 0);
        const J0 = GCM.getJ0(H, iv.words);
        const A = (aad === null || aad === void 0 ? void 0 : aad.clone()) || new Word32Array();
        const lenA = [0, A.nSigBytes * 8];
        const C = (cipherText === null || cipherText === void 0 ? void 0 : cipherText.clone()) || new Word32Array();
        const lenC = [0, C.nSigBytes * 8];
        const lenT = tagLength || 16;
        // Pad
        padTo128m(A);
        padTo128m(C);
        const s = A.words.concat(C.words).concat(lenA).concat(lenC);
        const S = GCM.GHASH(H, s);
        const MAC = GCM.GCTR(cipher, J0, new Word32Array(S));
        return msb(MAC, lenT);
    }
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = CTR.createEncryptor(cipher, iv.words);
     */
    static createEncryptor(props) {
        return new GCM.Encryptor(props);
    }
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = CTR.createDecryptor(cipher, iv.words);
     */
    static createDecryptor(props) {
        return new GCM.Decryptor(props);
    }
}
/**
 * CTR encryptor.
 */
GCM.Encryptor = class Encryptor extends GCM {
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
        // Encrypt with CTR mode
        this._CB = GCM.inc32(this._CB);
        const plainText = new Word32Array(words.slice(offset, offset + blockSize));
        const C = GCM.GCTR(this._cipher, this._CB, plainText);
        for (let i = 0; i < blockSize; i++) {
            words[offset + i] = C.words[i];
        }
    }
};
/**
 * CTR decryptor.
 */
GCM.Decryptor = class Decryptor extends GCM {
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
        // Decrypt with CTR mode
        this._CB = GCM.inc32(this._CB);
        const C = new Word32Array(words.slice(offset, offset + blockSize));
        const P = GCM.GCTR(this._cipher, this._CB, C);
        for (let i = 0; i < blockSize; i++) {
            words[offset + i] = P.words[i];
        }
    }
};
