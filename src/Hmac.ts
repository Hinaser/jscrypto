import {Utf8} from "./lib/encoder/Utf8";
import {Hasher} from "./lib/algorithm/Hasher";
import {IWordArray} from "./lib/type";

export class Hmac {
  private _hasher: Hasher;
  private _oKey: IWordArray;
  private _iKey: IWordArray;
  
  public constructor(hasher: Hasher, key: IWordArray|string) {
    this._hasher = hasher;
  
    // Convert string to WordArray, else assume WordArray already
    if (typeof key == "string") {
      key = Utf8.parse(key);
    }
    
    const hasherBlockSize = hasher.blockSize;
    const hasherBlockSizeBytes = hasherBlockSize * 4;
    
    // Allow arbitrary length keys
    if(key.length() > hasherBlockSizeBytes){
      key = hasher.finalize(key);
    }
  
    // Clamp excess bits
    key.clamp();
    
    const oKey = this._oKey = key.clone();
    const iKey = this._iKey = key.clone();
    
    const oKeyWords = oKey.raw();
    const iKeyWords = iKey.raw();
    
    for(let i=0;i<hasherBlockSize;i++){
      oKeyWords[i] ^= 0x5c5c5c5c;
      iKeyWords[i] ^= 0x36363636;
    }
    iKey.setSignificantBytes(hasherBlockSizeBytes);
    oKey.setSignificantBytes(hasherBlockSizeBytes);
    
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
   * @param {IWordArray|string} messageUpdate The message to append.
   * @return {Hmac} This Hmac instance.
   * @example
   *   hmacHasher.update('message');
   *   hmacHasher.update(wordArray);
   */
  public update(messageUpdate: IWordArray|string){
    this._hasher.update(messageUpdate);
    return this;
  }
  
  /**
   * Finalizes the Hmac computation.
   * Note that the finalize operation is effectively a destructive, read-once operation.
   *
   * @param {IWordArray|string} messageUpdate (Optional) A final message update.
   * @return {IWordArray} The Hmac.
   * @example
   *   var hmac = hmacHasher.finalize();
   *   var hmac = hmacHasher.finalize('message');
   *   var hmac = hmacHasher.finalize(wordArray);
   */
  public finalize(messageUpdate: IWordArray|string){
    const innerHash = this._hasher.finalize(messageUpdate);
    this._hasher.reset();
    return this._hasher.finalize(this._oKey.clone().concat(innerHash));
  }
}
