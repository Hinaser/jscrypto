import {IEncoder} from "../type";
import {Latin1} from "./Latin1";

export const Utf8: IEncoder = {
  /**
   * Converts a word array to a UTF-8 string.
   *
   * @param {number[]} words An array of 32-bit words.
   * @param {number} nSig Significant bytes
   * @return {string} The UTF-8 string.
   * @example
   *   var utf8String = Utf8.stringify([0x293892], 6);
   */
  stringify(words: number[], nSig: number){
    try {
      return decodeURIComponent(escape(Latin1.stringify(words, nSig)));
    }
    catch (e) {
      throw new Error("Malformed UTF-8 data");
    }
  },
  
  /**
   * Converts a UTF-8 string to a word array.
   *
   * @param {string} utf8Str The UTF-8 string.
   * @return {Word32Array} The word array.
   * @example
   *   var wordArray = Utf8.parse(utf8Str);
   */
  parse(utf8Str: string){
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
}
