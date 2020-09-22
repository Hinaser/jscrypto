import { BufferedBlockAlgorithm, BufferedBlockAlgorithmProps } from "../BufferedBlockAlgorithm";
import { Word32Array } from "../../Word32Array";
export interface CipherProps extends BufferedBlockAlgorithmProps {
    key: Word32Array;
    iv: Word32Array;
    keySize: number;
    ivSize: number;
    transformMode: number;
}
export declare class Cipher extends BufferedBlockAlgorithm {
    protected static ENC_TRANSFORM_MODE: number;
    protected static DEC_TRANSFORM_MODE: number;
    protected _props?: Partial<CipherProps>;
    protected _transformMode: number;
    protected _key: Word32Array;
    protected _iv: Word32Array;
    protected _keySize: number;
    protected _ivSize: number;
    constructor(props?: Partial<CipherProps>);
    get keySize(): number;
    get ivSize(): number;
    /**
     * Resets this cipher to its initial state.
     * @example
     *   cipher.reset();
     */
    reset(data?: Word32Array, nBytes?: number): void;
    /**
     * Adds data to be encrypted or decrypted.
     * @param {Word32Array|string} dataUpdate The data to encrypt or decrypt.
     * @return {Word32Array} The data after processing.
     * @example
     *   var encrypted = cipher.process('data');
     *   var encrypted = cipher.process(wordArray);
     */
    process(dataUpdate: Word32Array | string): Word32Array;
    /**
     * Finalizes the encryption or decryption process.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     * @param {Word32Array|string} dataUpdate The final data to encrypt or decrypt.
     * @return {Word32Array} The data after final processing.
     * @example
     *   var encrypted = cipher.finalize();
     *   var encrypted = cipher.finalize('data');
     *   var encrypted = cipher.finalize(wordArray);
     */
    finalize(dataUpdate: Word32Array | string): Word32Array;
    /**
     * @abstract
     */
    protected _doReset(): void;
    /**
     * @abstract
     */
    protected _doProcess(): void;
    /**
     * @abstract
     */
    protected _doProcessBlock(words: number[], offset: number): void;
    /**
     * @abstract
     */
    protected _doFinalize(): Word32Array;
    /**
     * @abstract
     */
    encryptBlock(words: number[], offset: number): void;
    /**
     * @abstract
     */
    decryptBlock(words: number[], offset: number): void;
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
     */
    static createEncryptor(key: Word32Array, props?: Partial<CipherProps>): Cipher;
    /**
     * Creates this cipher in decryption mode.
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key: Word32Array, props?: Partial<CipherProps>): Cipher;
}
