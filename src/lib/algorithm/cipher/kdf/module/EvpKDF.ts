import type {Hasher} from "../../../Hasher";
import {MD5} from "../../../../../MD5";
import {Word32Array} from "../../../../Word32Array";
import {BaseKDFModule, BaseKDFModuleProps} from "../type";

export interface EvpKDFProps extends BaseKDFModuleProps {
}

/**
 * This key derivation function is meant to conform with EVP_BytesToKey.
 * https://www.openssl.org/docs/man1.1.1/man3/EVP_BytesToKey.html
 *
 * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
 * @property {Hasher} hasher The hash algorithm to use. Default: MD5
 * @property {number} iterations The number of iterations to perform. Default: 1
 */
export class EvpKDF extends BaseKDFModule<EvpKDFProps> {
  protected _keySize: number = 128/32;
  protected _Hasher: typeof Hasher = MD5;
  protected _iterations: number = 1;
  
  public constructor(props?: Partial<EvpKDFProps>) {
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
    let block: Word32Array|undefined;
  
    // Init hasher
    const hasher = new this._Hasher();
  
    // Initial values
    const derivedKey = new Word32Array();
  
    // Shortcuts
    const derivedKeyWords = derivedKey.words;
    const keySize = this._keySize;
    const iterations = this._iterations;
  
    // Generate key
    while (derivedKeyWords.length < keySize) {
      if (block) {
        hasher.update(block);
      }
      block = hasher.update(password).finalize(salt);
      hasher.reset();
    
      // Iterations
      for (let i = 1; i < iterations; i++) {
        block = hasher.finalize(block);
        hasher.reset();
      }
    
      derivedKey.concat(block);
    }
    derivedKey.nSigBytes = keySize * 4;
  
    return derivedKey;
  }
  
  /**
   * Derives a key from a password.
   *
   * @param {Word32Array|string} password The password.
   * @param {Word32Array|string} salt A salt.
   * @param {Partial<EvpKDFProps>?} props (Optional) The configuration options to use for this computation.
   *
   * @return {Word32Array} The derived key.
   *
   * @static
   *
   * @example
   *
   *     var key = EvpKDF.getKey(password, salt);
   *     var key = EvpKDF.getKey(password, salt, { keySize: 8 });
   *     var key = EvpKDF.getKey(password, salt, { keySize: 8, iterations: 1000 });
   */
  public static getKey(password: Word32Array|string, salt: Word32Array|string, props?: Partial<EvpKDFProps>){
    return new EvpKDF(props).compute(password, salt);
  }
}