export interface IWord32Array {
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
   * @param {IWord32Array} w The word array to append.
   * @return {IWord32Array} This word array.
   * @example
   *   wordArray1.concat(wordArray2);
   */
  concat: (w: IWord32Array) => IWord32Array;
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
   * @return {IWord32Array} The clone.
   * @example
   *   var clone = wordArray.clone();
   */
  clone: () => IWord32Array;
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
  parse: (s: string) => IWord32Array;
}
