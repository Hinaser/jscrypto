export interface IWordArray {
    /**
     * Converts this word array to a string.
     *
     * @param {IEncoder} encoder The encoding strategy to use. Default: CryptoJS.enc.Hex
     * @return {string} The stringified word array.
     * @example
     *   var string = wordArray + '';
     *   var string = wordArray.toString();
     *   var string = wordArray.toString(Utf8);
     */
    toString: (encoder?: IEncoder) => string;
    /**
     * Concatenates a word array to this word array.
     *
     * @param {IWordArray} w The word array to append.
     * @return {IWordArray} This word array.
     * @example
     *   wordArray1.concat(wordArray2);
     */
    concat: (w: IWordArray) => IWordArray;
    /**
     * Removes insignificant bits.
     *
     * @example
     *   wordArray.clamp();
     */
    clamp: () => void;
    /**
     * Creates a copy of this word array.
     *
     * @return {IWordArray} The clone.
     * @example
     *   var clone = wordArray.clone();
     */
    clone: () => IWordArray;
    /**
     * Get raw reference of internal words.
     * Modification of this raw array will affect internal words.
     */
    raw: () => number[];
    /**
     * Return a copy of an array of 32-bit words.
     */
    slice: () => number[];
    /**
     * Return significantBytes
     */
    length: () => number;
    /**
     * Set significant bytes
     * @param {number} n - significant bytes
     */
    setSignificantBytes: (n: number) => void;
}
export interface IEncoder {
    stringify: (words: number[], nSignificantBytes: number) => string;
    parse: (s: string) => IWordArray;
}
