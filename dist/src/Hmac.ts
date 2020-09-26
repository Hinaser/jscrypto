import {Utf8} from "./lib/encoder/Utf8";
import type {Hasher} from "./lib/algorithm/Hasher";
import type {Word32Array} from "./lib/Word32Array";

export class Hmac {
  private _hasher: Hasher;
  private _oKey: Word32Array;
  private _iKey: Word32Array;
  
  public constructor(hasher: Hasher, key: Word32Array|string) {
    this._hasher = hasher;
  
    // Convert string to WordArray, else assume WordArray already
    if (typeof key == "string") {
      key = Utf8.parse(key);
    }
    
    const hasherBlockSize = hasher.blockSize;
    const hasherBlockSizeBytes = hasherBlockSize * 4;
    
    // Allow arbitrary length keys
    if(key.nSigBytes > hasherBlockSizeBytes){
      key = hasher.finalize(key);
    }
  
    // Clamp excess bits
    key.clamp();
    
    const oKey = this._oKey = key.clone();
    const iKey = this._iKey = key.clone();
    
    const oKeyWords = oKey.words;
    const iKeyWords = iKey.words;
    
    for(let i=0;i<hasherBlockSize;i++){
      oKeyWords[i] ^= 0x5c5c5c5c;
      iKeyWords[i] ^= 0x36363636;
    }
    iKey.nSigBytes = hasherBlockSizeBytes;
    oKey.nSigBytes = hasherBlockSizeBytes;
    
    // Set initial values
    this.reset();
  }
  
  /**
   * Resets this Hmac to its initial state.
   *
   * @example
   *   hmacHasher.reset();
   */
  public reset(){
    this._hasher.reset();
    this._hasher.update(this._iKey);
  }
  
  /**
   * Updates this Hmac with a message.
   *
   * @param {Word32Array|string} messageUpdate The message to append.
   * @return {Hmac} This Hmac instance.
   * @example
   *   hmacHasher.update('message');
   *   hmacHasher.update(wordArray);
   */
  public update(messageUpdate: Word32Array|string){
    this._hasher.update(messageUpdate);
    return this;
  }
  
  /**
   * Finalizes the Hmac computation.
   * Note that the finalize operation is effectively a destructive, read-once operation.
   *
   * @param {Word32Array|string} messageUpdate (Optional) A final message update.
   * @return {Word32Array} The Hmac.
   * @example
   *   var hmac = hmacHasher.finalize();
   *   var hmac = hmacHasher.finalize('message');
   *   var hmac = hmacHasher.finalize(wordArray);
   */
  public finalize(messageUpdate: Word32Array|string){
    const innerHash = this._hasher.finalize(messageUpdate);
    this._hasher.reset();
    return this._hasher.finalize(this._oKey.clone().concat(innerHash));
  }
}
