import {IEncoder} from "./type";
import {Hex} from "./encoder/Hex";
import {Word32Array} from "./Word32Array";

export class Word64 {
  public high: number;
  public low: number;
  
  public constructor(high: number, low: number) {
    this.high = high;
    this.low = low;
  }
  
  public clone(){
    return new Word64(this.high, this.low);
  }
}

/**
 * An array of 64bit words
 */
export class Word64Array {
  private readonly _words: Word64[];
  private _nSignificantBytes: number;
  
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
  public constructor(words?: Word64[], nSignificantBytes?: number) {
    this._words = words || [];
    this._nSignificantBytes = typeof nSignificantBytes === "number" ? nSignificantBytes : this._words.length * 8;
  }
  
  /**
   * Converts this 64-bit word array to a 32-bit word array.
   *
   * @return {Word32Array} This word array's data as a 32-bit word array.
   *
   * @example
   *
   *     var x32WordArray = x64WordArray.toX32();
   */
  public to32(){
    const words32: number[] = [];
    for(let i=0;i<this._words.length;i++){
      const word64 = this._words[i];
      words32.push(word64.high);
      words32.push(word64.low);
    }
    return new Word32Array(words32, this._nSignificantBytes);
  }
  
  /**
   * Get raw reference of internal words.
   * Modification of this raw array will affect internal words.
   */
  public raw(){
    return this._words;
  }
  
  /**
   * Return a copy of an array of 32-bit words.
   */
  public slice(){
    return this._words.slice();
  }
  
  /**
   * Return significantBytes
   */
  public length(){
    return this._nSignificantBytes;
  }
  
  /**
   * Set significant bytes
   * @param {number} n - significant bytes
   */
  public setSignificantBytes(n: number){
    this._nSignificantBytes = n;
  }
  
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
  public toString(encoder?: IEncoder){
    if(!encoder){
      return Hex.stringify(this.to32().slice(), this._nSignificantBytes);
    }
    return encoder.stringify(this.to32().slice(), this._nSignificantBytes);
  }
  
  /**
   * Creates a copy of this word array.
   *
   * @return {Word64Array} The clone.
   * @example
   *   var clone = wordArray.clone();
   */
  public clone(){
    const words = this._words.slice();
    for(let i=0;i<words.length;i++){
      words[i] = words[i].clone();
    }
    return new Word64Array(words, this._nSignificantBytes);
  }
}
