import {IEncoder} from "../type";
import {Word32Array} from "../Word32Array";

export const Hex: IEncoder = {
  /**
   * Converts a word array to a hex string.
   *
   * @param {number[]} words An array of 32-bit words.
   * @param {number} nSig Significant bytes
   * @return {string} The hex string.
   * @example
   *   var hexString = Hex.stringify([0x293892], 6);
   */
  stringify(words: number[], nSig: number){
    const hexChars: string[] = [];
    
    for(let i=0;i<nSig;i++){
      const byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
      hexChars.push((byte >>> 4).toString(16));
      hexChars.push((byte & 0x0f).toString(16));
    }
    
    return hexChars.join("");
  },
  
  /**
   * Converts a hex string to a word array.
   *
   * @param {string} hexStr The hex string.
   * @return {Word32Array} The word array.
   * @example
   *   var wordArray = Hex.parse(hexString);
   */
  parse(hexStr: string){
    const Len = hexStr.length;
    const words: number[] = [];
    
    for(let i=0;i<Len;i+=2){
      words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
    }
    
    return new Word32Array(words, Len / 2);
  }
}
