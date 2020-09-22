import { BlockCipherMode, BlockCipherModeProps } from "./BlockCipherMode";
export interface CBCProps extends BlockCipherModeProps {
}
export declare class CBC extends BlockCipherMode {
    protected _prevBlock: number[];
    /**
     * CBC encryptor.
     */
    static Encrypter: typeof CBC;
    /**
     * CBC decryptor.
     */
    static Decrypter: typeof CBC;
    constructor(props: CBCProps);
    xorBlock(words: number[], offset: number, blockSize: number): void;
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.CBC.createEncryptor(cipher, iv.words);
     */
    static createEncrypter(props: CBCProps): CBC;
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.CBC.createDecryptor(cipher, iv.words);
     */
    static createDecrypter(props: CBCProps): CBC;
}
