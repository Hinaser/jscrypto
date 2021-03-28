import { Hex } from "./encoder/Hex";
import { random } from "./random";
/**
 * An array of 32bit words
 */
export class Word32Array {
    /**
     * Initializes a newly created word array.
     *
     * ByteArray Support thanks to
     * https://github.com/entronad/crypto-es/blob/master/lib/core.js
     * MIT License Copyright(c) LIN Chen
     *
     * @param {Array} words (Optional) An array of 32-bit words.
     * @param {number} nSignificantBytes (Optional) The number of significant bytes in the words.
     * @example
     *   var words = new Word32Array();
     *   var words = new Word32Array([0x00010203, 0x04050607]);
     *   var words = new Word32Array([0x00010203, 0x04050607], 6);
     *   // Cloning wordArray can be done like below.
     *   var clone = (new Word32Array([0x00010203, 0x04050607])).clone();
     *   // or
     *   var clone = new Word32Array(new Word32Array([0x00010203, 0x04050607]));
     */
    constructor(words, nSignificantBytes) {
        if (Array.isArray(words) || !words) {
            this._words = Array.isArray(words) ? words : [];
            this._nSignificantBytes = typeof nSignificantBytes === "number" ? nSignificantBytes : this._words.length * 4;
            return;
        }
        else if (words instanceof Word32Array) {
            this._words = words.words.slice();
            this._nSignificantBytes = words.nSigBytes;
            return;
        }
        let uint8Array;
        // IE9 does not implement TypedArray. So catch exception for that case.
        try {
            if (words instanceof ArrayBuffer) {
                uint8Array = new Uint8Array(words);
            }
            else if (words instanceof Uint8Array
                || words instanceof Int8Array
                || words instanceof Uint8ClampedArray
                || words instanceof Int16Array
                || words instanceof Uint16Array
                || words instanceof Int32Array
                || words instanceof Uint32Array
                || words instanceof Float32Array
                || words instanceof Float64Array) {
                uint8Array = new Uint8Array(words.buffer, words.byteOffset, words.byteLength);
            }
        }
        catch (e) {
            throw new Error("Invalid argument");
        }
        if (!uint8Array) {
            throw new Error("Invalid argument");
        }
        const byteLen = uint8Array.byteLength;
        const w = [];
        for (let i = 0; i < byteLen; i++) {
            w[i >>> 2] |= uint8Array[i] << (24 - (i % 4) * 8);
        }
        this._words = w;
        this._nSignificantBytes = byteLen;
    }
    get nSigBytes() {
        return this._nSignificantBytes;
    }
    /**
     * Set significant bytes
     * @param {number} n - significant bytes
     */
    set nSigBytes(n) {
        this._nSignificantBytes = n;
    }
    /**
     * Get raw reference of internal words.
     * Modification of this raw array will affect internal words.
     */
    get words() {
        return this._words;
    }
    /**
     * Converts this word array to a string.
     *
     * @param {IEncoder?} encoder The encoding strategy to use. Default: CryptoJS.enc.Hex
     * @return {string} The stringified word array.
     * @example
     *   var string = wordArray + '';
     *   var string = wordArray.toString();
     *   var string = wordArray.toString(Utf8);
     */
    toString(encoder) {
        if (!encoder) {
            return Hex.stringify(this);
        }
        return encoder.stringify(this);
    }
    /**
     * Converts this 32bit word array to Uint8Array
     *
     * @return {Uint8Array} Unsigned int 8bit array
     * @example
     *   var word = new Word32Array([0x00102030]);
     *   var uint8 = word.toUint8Array(); // Uint8Array(4) [ 0, 16, 32, 48 ]
     */
    toUint8Array() {
        const words = this._words;
        const nB = this._nSignificantBytes;
        const uint8Array = new Uint8Array(nB);
        for (let i = 0; i < nB; i++) {
            uint8Array[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        }
        return uint8Array;
    }
    /**
     * Concatenates a word array to this word array.
     *
     * @param {Word32Array} w The word array to append.
     * @return {Word32Array} This word array.
     * @example
     *   wordArray1.concat(wordArray2);
     */
    concat(w) {
        const words = w.words.slice();
        const N = w.nSigBytes;
        this.clamp();
        if (this._nSignificantBytes % 4) {
            // Copy one byte at a time
            for (let i = 0; i < N; i++) {
                const b = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                this._words[(this._nSignificantBytes + i) >>> 2] |= b << (24 - ((this._nSignificantBytes + i) % 4) * 8);
            }
        }
        else {
            // Copy one word at a time
            for (let i = 0; i < N; i += 4) {
                this._words[(this._nSignificantBytes + i) >>> 2] = words[i >>> 2];
            }
        }
        this._nSignificantBytes += N;
        // Chainable
        return this;
    }
    /**
     * Removes insignificant bits.
     *
     * @example
     *   wordArray.clamp();
     */
    clamp() {
        const n = this._nSignificantBytes;
        this._words[n >>> 2] &= 0xffffffff << (32 - (n % 4) * 8);
        this._words.length = Math.ceil(n / 4);
    }
    /**
     * Creates a copy of this word array.
     *
     * @return {Word32Array} The clone.
     * @example
     *   var clone = word32Array.clone();
     */
    clone() {
        return new Word32Array(this._words.slice(), this._nSignificantBytes);
    }
    /**
     * Creates a word array filled with random bytes.
     *
     * @param {number} nBytes The number of random bytes to generate.
     * @return {Word32Array} The random word array.
     * @static
     * @example
     *   var wordArray = Word32Array.random(16);
     */
    static random(nBytes) {
        const words = [];
        for (let i = 0; i < nBytes; i += 4) {
            words.push(random());
        }
        return new Word32Array(words, nBytes);
    }
}
