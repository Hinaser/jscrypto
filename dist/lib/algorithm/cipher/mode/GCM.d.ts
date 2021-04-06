import { BlockCipherMode, BlockCipherModeProps } from "./BlockCipherMode";
import { Word32Array } from "../../../Word32Array";
import type { BlockCipher } from "../BlockCipher";
/**
 * Galois Counter Mode
 */
export declare class GCM extends BlockCipherMode {
    protected _H: number[];
    protected _J0: number[];
    protected _CB: number[];
    protected _A: Word32Array;
    protected _lenA: number[];
    constructor(props: BlockCipherModeProps);
    /**
     * Initialize Initial Counter Block J0.
     * @param {[number, number, number, number]} H - 128bit(4word) block
     * @param {number[]} iv - Initializing Vector which must be multiple of 32bit(4byte)
     */
    static getJ0(H: number[], iv?: number[]): number[];
    /**
     * https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
     * 6.2 Incrementing Function
     * inc(s=32, X) = MSB(len(X)-s, X) || [int(LSB(s, X)+1 mod 2^s]
     *
     * @param {number[]} X - [32bit int, 32bit int, 32bit int, 32bit int].
     * @example
     *   inc32([0,0,0,0]) = [0,0,0,1]
     *   inc32([0,0,0,1]) = [0,0,0,2]
     *   inc32([0,0,0,0xffffffff]) = [0,0,1,0]
     *   inc32([0,0,0xffffffff,0xffffffff]) = [0,1,0,0]
     *   inc32([0,0xffffffff,0xffffffff,0xffffffff]) = [0,0,0,0]
     */
    static inc32(X: number[]): number[];
    /**
     * https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
     * 6.3 Multiplication Operation on Blocks
     *
     * @param {number[]} X - [32bit int, 32bit int, 32bit int, 32bit int], 128bit block.
     * @param {number[]} Y - [32bit int, 32bit int, 32bit int, 32bit int], 128bit block.
     * @returns 128bit block
     */
    static mul(X: number[], Y: number[]): number[];
    /**
     * https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
     * 6.4 GHASH Function
     *
     * @param {number[]} H - The hash sub key block of 128bit.
     * @param {number[]} X - X.length must be multiple of 4. (multiple of 128bit)
     * @returns 128bit block
     */
    static GHASH(H: number[], X: number[]): number[];
    /**
     * https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
     * 6.5 GCTR Function
     *
     * @param {BlockCipher} cipher
     * @param {number[]} ICB - Initial Code Block. Required to be 128bit(4word).
     * @param {Word32Array} X - Arbitrary length block
     */
    static GCTR(cipher: BlockCipher, ICB: number[], X: Word32Array): Word32Array;
    /**
     * Pad word array to multiple of 128bit(4byte)
     * @param {Word32Array} w - Padding target. This w will be modified directly.
     * @returns {void}
     */
    static padTo128m(w: Word32Array): void;
    static hash(Cipher: typeof BlockCipher, key: Word32Array, iv: Word32Array, authData?: Word32Array, cipherText?: Word32Array): Word32Array;
    /**
     * Generate authentication tag for ciphertext with inner GCM parameters.
     * @param {Word32Array} cipherText
     * @returns {Word32Array}
     */
    generateAuthTag(cipherText: Word32Array): Word32Array;
    /**
     * CTR encryptor.
     */
    static Encryptor: typeof GCM;
    /**
     * CTR decryptor.
     */
    static Decryptor: typeof GCM;
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = CTR.createEncryptor(cipher, iv.words);
     */
    static createEncryptor(props: BlockCipherModeProps): GCM;
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = CTR.createDecryptor(cipher, iv.words);
     */
    static createDecryptor(props: BlockCipherModeProps): GCM;
}
