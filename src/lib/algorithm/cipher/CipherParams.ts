import type {Word32Array} from "../../Word32Array";
import type {BlockCipherMode} from "./mode/BlockCipherMode";
import type {Pad} from "./pad/type";
import type {Formatter} from "./formatter/type";
import type {Cipher} from "./Cipher";
import {OpenSSLFormatter} from "./formatter/OpenSSLFormatter";

/**
 * A collection of cipher parameters.
 *
 * @property {Word32Array} ciphertext The raw ciphertext.
 * @property {Word32Array} key The key to this ciphertext.
 * @property {Word32Array} iv The IV used in the ciphering operation.
 * @property {Word32Array} salt The salt used with a key derivation function.
 * @property {typeof Cipher} algorithm The cipher algorithm.
 * @property {BlockCipherMode} mode The block mode used in the ciphering operation.
 * @property {Pad} padding The padding scheme used in the ciphering operation.
 * @property {number} blockSize The block size of the cipher.
 * @property {Word32Array} authTag Authentication tag for AAD.
 * @property {Formatter} formatter The default formatting strategy to convert this cipher params object to a string.
 */
export class CipherParams {
  public cipherText?: Word32Array;
  public key?: Word32Array;
  public iv?: Word32Array;
  public salt?: Word32Array;
  public Algorithm?: typeof Cipher;
  public mode?: BlockCipherMode;
  public padding?: Pad;
  public blockSize?: number;
  public authData?: Word32Array;
  public authTag?: Word32Array;
  public formatter: Formatter = OpenSSLFormatter;
  
  /**
   * Initializes a newly created cipher params object.
   *
   * @param {Partial<CipherParams>} cp An object with any of the possible cipher parameters.
   * @example
   *   var cipherParams = new CipherParams({
   *       ciphertext: ciphertextWordArray,
   *       key: keyWordArray,
   *       iv: ivWordArray,
   *       salt: saltWordArray,
   *       algorithm: AES,
   *       mode: CBC,
   *       padding: PKCS7,
   *       blockSize: 4,
   *       formatter: OpenSSLFormatter
   *     });
   */
  public constructor(cp?: Partial<CipherParams>) {
    if(cp){
      this.cipherText = cp.cipherText;
      this.key = cp.key;
      this.iv = cp.iv;
      this.salt = cp.salt;
      this.Algorithm = cp.Algorithm;
      this.mode = cp.mode;
      this.padding = cp.padding;
      this.blockSize = cp.blockSize;
      this.authData = cp.authData;
      this.authTag = cp.authTag;
      this.formatter = cp.formatter || OpenSSLFormatter;
    }
  }
  
  /**
   * Converts this cipher params object to a string.
   *
   * @param {Formatter?} formatter (Optional) The formatting strategy to use.
   * @return {string} The stringified cipher params.
   * @throws Error If neither the formatter nor the default formatter is set.
   * @example
   *   var string = cipherParams + '';
   *   var string = cipherParams.toString();
   *   var string = cipherParams.toString(OpenSSLFormatter);
   */
  public toString(formatter?: Formatter){
    return (formatter || this.formatter).stringify(this);
  }
}