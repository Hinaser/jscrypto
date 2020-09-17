import { IEncoder } from "./type";
import { Word32Array } from "./Word32Array";
export declare class Word64 {
    high: number;
    low: number;
    constructor(high: number, low: number);
    clone(): Word64;
}
/**
 * An array of 64bit words
 */
export declare class Word64Array {
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
    constructor(words?: Word64[], nSignificantBytes?: number);
    /**
     * Converts this 64-bit word array to a 32-bit word array.
     *
     * @return {Word32Array} This word array's data as a 32-bit word array.
     *
     * @example
     *
     *     var x32WordArray = x64WordArray.toX32();
     */
    to32(): Word32Array;
    /**
     * Get raw reference of internal words.
     * Modification of this raw array will affect internal words.
     */
    raw(): Word64[];
    /**
     * Return a copy of an array of 32-bit words.
     */
    slice(): Word64[];
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
     * Creates a copy of this word array.
     *
     * @return {Word64Array} The clone.
     * @example
     *   var clone = wordArray.clone();
     */
    clone(): Word64Array;
}
