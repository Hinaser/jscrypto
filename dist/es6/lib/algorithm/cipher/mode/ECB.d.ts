import { BlockCipherMode, BlockCipherModeProps } from "./BlockCipherMode";
/**
 * Electronic Codebook block mode.
 */
export declare class ECB extends BlockCipherMode {
    /**
     * ECB encryptor.
     */
    static Encryptor: typeof ECB;
    /**
     * ECB decryptor.
     */
    static Decryptor: typeof ECB;
    constructor(props: BlockCipherModeProps);
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = ECB.createEncryptor(cipher, iv.words);
     */
    static createEncryptor(props: BlockCipherModeProps): ECB;
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = ECB.createDecryptor(cipher, iv.words);
     */
    static createDecryptor(props: BlockCipherModeProps): ECB;
}
