import type {IEncoder} from "./type";
import {Hex} from "./encoder/Hex";
import {random} from "./random";

/**
 * An array of 32bit words
 */
export class Word32Array {
  private readonly _words: number[];
  private _nSignificantBytes: number;
  
  /**
   * Initializes a newly created word array.
   *
   * @param {Array} words (Optional) An array of 32-bit words.
   * @param {number} nSignificantBytes (Optional) The number of significant bytes in the words.
   *
   * @example
   *   var wordArray = new Word32Array();
   *   var wordArray = new Word32Array([0x00010203, 0x04050607]);
   *   var wordArray = new Word32Array([0x00010203, 0x04050607], 6);
   */
  public constructor(words?: number[], nSignificantBytes?: number) {
    this._words = words || [];
    this._nSignificantBytes = typeof nSignificantBytes === "number" ? nSignificantBytes : this._words.length * 4;
  }
  
  public get nSigBytes(){
    return this._nSignificantBytes;
  }
  
  /**
   * Set significant bytes
   * @param {number} n - significant bytes
   */
  public set nSigBytes(n: number){
    this._nSignificantBytes = n;
  }
  
  /**
   * Get raw reference of internal words.
   * Modification of this raw array will affect internal words.
   */
  public get words(){
    return this._words;
  }
  
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
  public toString(encoder?: IEncoder){
    if(!encoder){
      return Hex.stringify(this);
    }
    return encoder.stringify(this);
  }
  
  /**
   * Concatenates a word array to this word array.
   *
   * @param {Word32Array} w The word array to append.
   * @return {Word32Array} This word array.
   * @example
   *   wordArray1.concat(wordArray2);
   */
  public concat(w: Word32Array){
    const words = w.words.slice();
    const N = w.nSigBytes;
    
    this.clamp();
  
    if(this._nSignificantBytes % 4){
      // Copy one byte at a time
      for(let i=0;i<N;i++){
        const b = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        this._words[(this._nSignificantBytes + i) >>> 2] |= b << (24 - ((this._nSignificantBytes + i) % 4) * 8);
      }
    }
    else {
      // Copy one word at a time
      for(let i=0;i<N;i+=4) {
        this._words[(this._nSignificantBytes + i) >>> 2] = words[i >>> 2];
      }
    }
    
    this._nSignificantBytes += N;
  
    // Chainable
    return this;
  }
  
  /**
   * Removes insignificant bits.
   *
   * @example
   *   wordArray.clamp();
   */
  public clamp(){
    const n = this._nSignificantBytes;
    this._words[n >>> 2] &= 0xffffffff << (32 - (n % 4) * 8);
    this._words.length = Math.ceil(n / 4);
  }
  
  /**
   * Creates a copy of this word array.
   *
   * @return {Word32Array} The clone.
   * @example
   *   var clone = word32Array.clone();
   */
  public clone(){
    return new Word32Array(this._words.slice(), this._nSignificantBytes);
  }
  
  /**
   * Creates a word array filled with random bytes.
   *
   * @param {number} nBytes The number of random bytes to generate.
   * @return {Word32Array} The random word array.
   * @static
   * @example
   *   var wordArray = Word32Array.random(16);
   */
  public static random(nBytes: number){
    const words: number[] = [];
    
    for(let i=0;i<nBytes;i++){
      words.push(random());
    }
    
    return new Word32Array(words, nBytes);
  }
}
