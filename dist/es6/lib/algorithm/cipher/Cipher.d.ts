import { BufferedBlockAlgorithm, BufferedBlockAlgorithmProps } from "../BufferedBlockAlgorithm";
import type { Word32Array } from "../../Word32Array";
export interface CipherProps extends BufferedBlockAlgorithmProps {
    key: Word32Array;
    iv: Word32Array;
    transformMode: number;
}
export declare type PropsWithKey<T extends CipherProps> = Partial<T> & Pick<T, "key">;
export declare class Cipher extends BufferedBlockAlgorithm {
    static readonly ENC_TRANSFORM_MODE = 1;
    static readonly DEC_TRANSFORM_MODE = 2;
    static readonly keySize: number;
    static readonly ivSize: number;
    protected _props: PropsWithKey<CipherProps>;
    protected _transformMode: number;
    protected _key: Word32Array;
    protected _iv?: Word32Array;
    constructor(props: PropsWithKey<CipherProps>);
    get iv(): Word32Array | undefined;
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
     * @param {Word32Array|string?} dataUpdate The final data to encrypt or decrypt.
     * @return {Word32Array} The data after final processing.
     * @example
     *   var encrypted = cipher.finalize();
     *   var encrypted = cipher.finalize('data');
     *   var encrypted = cipher.finalize(wordArray);
     */
    finalize(dataUpdate?: Word32Array | string): Word32Array;
    /**
     * @abstract
     */
    protected _doReset(): void;
    /**
     * @abstract
     */
    protected _doProcessBlock(words: number[], offset: number): void;
    /**
     * @abstract
     */
    protected _doFinalize(): Word32Array;
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *     var cipher = AES.createEncryptor(keyWordArray, { iv: ivWordArray });
     */
    static createEncryptor(key: Word32Array, props?: Partial<CipherProps>): Cipher;
    /**
     * Creates this cipher in decryption mode.
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = AES.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key: Word32Array, props?: Partial<CipherProps>): Cipher;
}
