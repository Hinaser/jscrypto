import type { IEncoder } from "./type";
declare type ByteArray = ArrayBuffer | Uint8Array | Int8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
/**
 * An array of 32bit words
 */
export declare class Word32Array {
    private readonly _words;
    private _nSignificantBytes;
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
    constructor(words?: number[] | Word32Array | ByteArray | unknown, nSignificantBytes?: number);
    get nSigBytes(): number;
    /**
     * Set significant bytes
     * @param {number} n - significant bytes
     */
    set nSigBytes(n: number);
    /**
     * Get raw reference of internal words.
     * Modification of this raw array will affect internal words.
     */
    get words(): number[];
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
    toString(encoder?: IEncoder): string;
    /**
     * Converts this 32bit word array to Uint8Array
     *
     * @return {Uint8Array} Unsigned int 8bit array
     * @example
     *   var word = new Word32Array([0x00102030]);
     *   var uint8 = word.toUint8Array(); // Uint8Array(4) [ 0, 16, 32, 48 ]
     */
    toUint8Array(): Uint8Array;
    /**
     * Concatenates a word array to this word array.
     *
     * @param {Word32Array} w The word array to append.
     * @return {Word32Array} This word array.
     * @example
     *   wordArray1.concat(wordArray2);
     */
    concat(w: Word32Array): this;
    /**
     * Removes insignificant bits.
     *
     * @example
     *   wordArray.clamp();
     */
    clamp(): void;
    /**
     * Creates a copy of this word array.
     *
     * @return {Word32Array} The clone.
     * @example
     *   var clone = word32Array.clone();
     */
    clone(): Word32Array;
    /**
     * Creates a word array filled with random bytes.
     *
     * @param {number} nBytes The number of random bytes to generate.
     * @return {Word32Array} The random word array.
     * @static
     * @example
     *   var wordArray = Word32Array.random(16);
     */
    static random(nBytes: number): Word32Array;
}
export {};
