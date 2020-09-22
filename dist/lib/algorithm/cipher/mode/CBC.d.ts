import { BlockCipherMode, BlockCipherModeProps } from "./BlockCipherMode";
export interface CBCProps extends BlockCipherModeProps {
}
declare class CBCEncrypter extends BlockCipherMode {
    protected _prevBlock: number[];
    constructor(props: CBCProps);
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    processBlock(words: number[], offset: number): void;
}
declare class CBCDecrypter extends BlockCipherMode {
    protected _prevBlock: number[];
    constructor(props: CBCProps);
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    processBlock(words: number[], offset: number): void;
}
export declare class CBC extends BlockCipherMode {
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.CBC.createEncryptor(cipher, iv.words);
     */
    static createEncrypter(props: CBCProps): CBCEncrypter;
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.CBC.createDecryptor(cipher, iv.words);
     */
    static createDecrypter(props: CBCProps): CBCDecrypter;
}
export {};
