import { BlockCipherMode, BlockCipherModeProps } from "./BlockCipherMode";
export interface CBCProps extends BlockCipherModeProps {
}
export declare class CBC extends BlockCipherMode {
    protected _prevBlock: number[];
    /**
     * CBC encryptor.
     */
    static Encryptor: typeof CBC;
    /**
     * CBC decryptor.
     */
    static Decryptor: typeof CBC;
    constructor(props: CBCProps);
    xorBlock(words: number[], offset: number, blockSize: number): void;
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = CBC.createEncryptor(cipher, iv.words);
     */
    static createEncryptor(props: CBCProps): CBC;
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = CBC.createDecryptor(cipher, iv.words);
     */
    static createDecryptor(props: CBCProps): CBC;
}
