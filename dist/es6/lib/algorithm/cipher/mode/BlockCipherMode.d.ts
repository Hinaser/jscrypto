import type { BlockCipher } from "../BlockCipher";
import type { Word32Array } from "../../../Word32Array";
export interface BlockCipherModeProps {
    cipher: BlockCipher;
    iv: number[] | undefined;
}
/**
 * Abstract base block cipher mode template.
 * @abstract
 */
export declare class BlockCipherMode {
    protected _props: BlockCipherModeProps;
    protected _cipher: BlockCipher;
    protected _iv?: number[];
    constructor(props: BlockCipherModeProps);
    /**
     * @abstract
     */
    processBlock(words: number[], offset: number): void;
    /**
     * @abstract
     */
    generateAuthTag(cipherText: Word32Array): Word32Array | undefined;
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @abstract
     * @example
     *   var mode = CBC.createEncryptor(cipher, iv.words);
     */
    static createEncryptor(props: BlockCipherModeProps): BlockCipherMode;
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @abstract
     * @example
     *   var mode = CBC.createDecryptor(cipher, iv.words);
     */
    static createDecryptor(props: BlockCipherModeProps): BlockCipherMode;
}
