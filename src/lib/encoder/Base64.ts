import {IEncoder} from "../type";
import {Word32Array} from "../Word32Array";

const map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

export const Base64: IEncoder = {
  /**
   * Converts a word array to a hex string.
   *
   * @param {Word32Array} w An array of 32-bit words.
   * @return {string} The hex string.
   * @example
   *   var hexString = Hex.stringify([0x293892], 6);
   */
  stringify(w: Word32Array){
    // Shortcuts
    const words = w.raw();
    const sigBytes = w.length();
  
    // Clamp excess bits
    w.clamp();
  
    // Convert
    const base64Chars = [];
    for (let i = 0; i < sigBytes; i += 3) {
      const byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
      const byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
      const byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;
  
      const triplet = (byte1 << 16) | (byte2 << 8) | byte3;
    
      for (let j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
        base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
      }
    }
  
    // Add padding
    const paddingChar = map.charAt(64);
    if (paddingChar) {
      while (base64Chars.length % 4) {
        base64Chars.push(paddingChar);
      }
    }
  
    return base64Chars.join("");
  },
  
  /**
   * Converts a hex string to a word array.
   *
   * @param {string} base64Str The hex string.
   * @return {Word32Array} The word array.
   * @example
   *   var wordArray = Hex.parse(hexString);
   */
  parse(base64Str: string){
    const Len = base64Str.length;
    const words: number[] = [];
    
    for(let i=0;i<Len;i+=2){
      words[i >>> 3] |= parseInt(base64Str.substr(i, 2), 16) << (24 - (i % 8) * 4);
    }
    
    return new Word32Array(words, Len / 2);
  }
}
