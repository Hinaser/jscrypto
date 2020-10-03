import type {Hasher} from "../../../Hasher";
import {SHA1} from "../../../../../SHA1";
import {Hmac} from "../../../../../Hmac";
import {Word32Array} from "../../../../Word32Array";
import {BaseKDFModule, BaseKDFModuleProps} from "../type";

export interface PBKDF2Props extends BaseKDFModuleProps {
}

/**
 * Password-Based Key Derivation Function 2 algorithm.
 *
 * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
 * @property {Hasher} hasher The hash algorithm to use. Default: SHA1
 * @property {number} iterations The number of iterations to perform. Default: 1
 */
export class PBKDF2 extends BaseKDFModule<PBKDF2Props> {
  protected _keySize: number = 128/32;
  protected _Hasher: typeof Hasher = SHA1;
  protected _iterations: number = 1;
  
  public constructor(props?: Partial<PBKDF2Props>) {
    super(props);
    
    if(props){
      this._keySize = typeof props.keySize !== "undefined" ? props.keySize : this._keySize;
      this._Hasher = typeof props.Hasher !== "undefined" ? props.Hasher : this._Hasher;
      this._iterations = typeof props.iterations !== "undefined" ? props.iterations : this._iterations;
    }
  }
  
  /**
   * Derives a key from a password.
   *
   * @param {Word32Array|string} password The password.
   * @param {Word32Array|string} salt A salt.
   * @return {Word32Array} The derived key.
   * @example
   *   var key = kdf.compute(password, salt);
   */
  public compute(password: Word32Array|string, salt: Word32Array|string){
    // Init HMAC
    const hmac = new Hmac(new this._Hasher(), password);
  
    // Initial values
    const derivedKey = new Word32Array();
    const blockIndex = new Word32Array([0x00000001]);
  
    // Shortcuts
    const derivedKeyWords = derivedKey.words;
    const blockIndexWords = blockIndex.words;
    const keySize = this._keySize;
    const iterations = this._iterations;
  
    // Generate key
    while(derivedKeyWords.length < keySize){
      const block = hmac.update(salt).finalize(blockIndex);
      hmac.reset();
    
      // Shortcuts
      const blockWords = block.words;
      const blockWordsLength = blockWords.length;
    
      // Iterations
      let intermediate = block;
      for (let i = 1; i < iterations; i++) {
        intermediate = hmac.finalize(intermediate);
        hmac.reset();
      
        // Shortcut
        const intermediateWords = intermediate.words;
      
        // XOR intermediate with block
        for (let j = 0; j < blockWordsLength; j++) {
          blockWords[j] ^= intermediateWords[j];
        }
      }
    
      derivedKey.concat(block);
      blockIndexWords[0]++;
    }
    derivedKey.nSigBytes = keySize * 4;
  
    return derivedKey;
  }
  
  /**
   * Derives a key from a password.
   *
   * @param {Word32Array|string} password The password.
   * @param {Word32Array|string} salt A salt.
   * @param {Partial<PBKDF2Props>?} props (Optional) The configuration options to use for this computation.
   *
   * @return {Word32Array} The derived key.
   *
   * @static
   *
   * @example
   *
   *     var key = PBKDF2.getKey(password, salt);
   *     var key = PBKDF2.getKey(password, salt, { keySize: 8 });
   *     var key = PBKDF2.getKey(password, salt, { keySize: 8, iterations: 1000 });
   */
  public static getKey(password: Word32Array|string, salt: Word32Array|string, props?: Partial<PBKDF2Props>){
    return new PBKDF2(props).compute(password, salt);
  }
}