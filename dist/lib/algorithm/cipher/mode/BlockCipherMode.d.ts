import type { Cipher } from "../Cipher";
export interface BlockCipherModeProps {
    cipher: Cipher;
    iv: number[] | undefined;
}
/**
 * Abstract base block cipher mode template.
 * @abstract
 */
export declare class BlockCipherMode {
    protected _props: BlockCipherModeProps;
    protected _cipher: Cipher;
    protected _iv?: number[];
    constructor(props: BlockCipherModeProps);
    /**
     * @abstract
     */
    processBlock(words: number[], offset: number): void;
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @abstract
     * @example
     *   var mode = JsCrypto.CBC.createEncryptor(cipher, iv.words);
     */
    static createEncryptor(props: BlockCipherModeProps): BlockCipherMode;
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @abstract
     * @example
     *   var mode = JsCrypto.CBC.createDecryptor(cipher, iv.words);
     */
    static createDecryptor(props: BlockCipherModeProps): BlockCipherMode;
}
