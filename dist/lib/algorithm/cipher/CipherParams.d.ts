import type { Word32Array } from "../../Word32Array";
import type { BlockCipherMode } from "./mode/BlockCipherMode";
import type { Pad } from "./pad/pad";
import type { Formatter } from "./formatter/type";
import type { BlockCipher } from "./BlockCipher";
/**
 * A collection of cipher parameters.
 *
 * @property {Word32Array} ciphertext The raw ciphertext.
 * @property {Word32Array} key The key to this ciphertext.
 * @property {Word32Array} iv The IV used in the ciphering operation.
 * @property {Word32Array} salt The salt used with a key derivation function.
 * @property {typeof BufferedBlockAlgorithm} algorithm The cipher algorithm.
 * @property {BlockCipherMode} mode The block mode used in the ciphering operation.
 * @property {Pad} padding The padding scheme used in the ciphering operation.
 * @property {number} blockSize The block size of the cipher.
 * @property {Formatter} formatter The default formatting strategy to convert this cipher params object to a string.
 */
export declare class CipherParams {
    cipherText?: Word32Array;
    key?: Word32Array;
    iv?: Word32Array;
    salt?: Word32Array;
    algorithm?: BlockCipher;
    mode?: BlockCipherMode;
    padding?: Pad;
    blockSize?: number;
    formatter: Formatter;
    /**
     * Initializes a newly created cipher params object.
     *
     * @param {Partial<CipherParams>} cp An object with any of the possible cipher parameters.
     * @example
     *   var cipherParams = CryptoJS.lib.CipherParams.create({
     *       ciphertext: ciphertextWordArray,
     *       key: keyWordArray,
     *       iv: ivWordArray,
     *       salt: saltWordArray,
     *       algorithm: CryptoJS.algo.AES,
     *       mode: CryptoJS.mode.CBC,
     *       padding: CryptoJS.pad.PKCS7,
     *       blockSize: 4,
     *       formatter: CryptoJS.format.OpenSSL
     *     });
     */
    constructor(cp?: Partial<CipherParams>);
    /**
     * Converts this cipher params object to a string.
     *
     * @param {Formatter?} formatter (Optional) The formatting strategy to use.
     * @return {string} The stringified cipher params.
     * @throws Error If neither the formatter nor the default formatter is set.
     * @example
     *   var string = cipherParams + '';
     *   var string = cipherParams.toString();
     *   var string = cipherParams.toString(CryptoJS.format.OpenSSL);
     */
    toString(formatter?: Formatter): string;
}
