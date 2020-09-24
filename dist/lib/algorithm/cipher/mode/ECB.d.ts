import { BlockCipherMode, BlockCipherModeProps } from "./BlockCipherMode";
/**
 * Electronic Codebook block mode.
 */
export declare class ECB extends BlockCipherMode {
    /**
     * ECB encryptor.
     */
    static Encrypter: typeof ECB;
    /**
     * ECB decryptor.
     */
    static Decrypter: typeof ECB;
    constructor(props: BlockCipherModeProps);
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.ECB.createEncryptor(cipher, iv.words);
     */
    static createEncrypter(props: BlockCipherModeProps): ECB;
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.ECB.createDecryptor(cipher, iv.words);
     */
    static createDecrypter(props: BlockCipherModeProps): ECB;
}
