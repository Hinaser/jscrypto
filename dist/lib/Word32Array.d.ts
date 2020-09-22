import { IEncoder } from "./type";
/**
 * An array of 32bit words
 */
export declare class Word32Array {
    private readonly _words;
    private _nSignificantBytes;
    /**
     * Initializes a newly created word array.
     *
     * @param {Array} words (Optional) An array of 32-bit words.
     * @param {number} nSignificantBytes (Optional) The number of significant bytes in the words.
     *
     * @example
     *   var wordArray = new WordArray();
     *   var wordArray = new WordArray([0x00010203, 0x04050607]);
     *   var wordArray = new WordArray([0x00010203, 0x04050607], 6);
     */
    constructor(words?: number[], nSignificantBytes?: number);
    /**
     * Get raw reference of internal words.
     * Modification of this raw array will affect internal words.
     */
    raw(): number[];
    /**
     * Return a copy of an array of 32-bit words.
     */
    slice(start?: number, end?: number): number[];
    /**
     * Return significantBytes
     */
    length(): number;
    /**
     * Set significant bytes
     * @param {number} n - significant bytes
     */
    setSignificantBytes(n: number): void;
    /**
     * Converts this word array to a string.
     *
     * @param {IEncoder?} encoder The encoding strategy to use. Default: CryptoJS.enc.Hex
     * @return {string} The stringified word array.
     * @example
     *   var string = wordArray + '';
     *   var string = wordArray.toString();
     *   var string = wordArray.toString(CryptoJS.enc.Utf8);
     */
    toString(encoder?: IEncoder): string;
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
     *   var clone = wordArray.clone();
     */
    clone(): Word32Array;
    /**
     * Creates a word array filled with random bytes.
     *
     * @param {number} nBytes The number of random bytes to generate.
     * @return {Word32Array} The random word array.
     * @static
     * @example
     *   var wordArray = CryptoJS.lib.WordArray.random(16);
     */
    static random(nBytes: number): Word32Array;
}
