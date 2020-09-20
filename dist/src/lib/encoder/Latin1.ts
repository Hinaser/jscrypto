import {IEncoder} from "../type";
import {Word32Array} from "../Word32Array";

export const Latin1: IEncoder = {
  /**
   * Converts a word array to a Latin1 string.
   *
   * @param {number[]} words An array of 32-bit words.
   * @param {number} nSig Significant bytes
   * @return {string} The Latin1 string.
   * @example
   *   var latin1String = Latin1.stringify([0x293892], 6);
   */
  stringify(words: number[], nSig: number){
    const latin1Chars: string[] = [];
    
    for(let i=0;i<nSig;i++){
      const byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
      latin1Chars.push(String.fromCharCode(byte));
    }
    
    return latin1Chars.join("");
  },
  
  /**
   * Converts a latin1 string to a word array.
   *
   * @param {string} latin1Str The latin1 string.
   * @return {IWordArray} The word array.
   * @example
   *   var wordArray = Latin1.parse(latin1Str);
   */
  parse(latin1Str: string){
    const Len = latin1Str.length;
    const words: number[] = [];
    
    for(let i=0;i<Len;i++){
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
    }
    
    return new Word32Array(words, Len);
  }
}
