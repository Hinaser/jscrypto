import { BlockCipherMode, BlockCipherModeProps } from "./BlockCipherMode";
/**
 * Output Feedback Block mode
 */
export declare class CTR extends BlockCipherMode {
    protected _counter: number[];
    /**
     * CTR encryptor.
     */
    static Encryptor: typeof CTR;
    /**
     * CTR decryptor.
     */
    static Decryptor: typeof CTR;
    constructor(props: BlockCipherModeProps);
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.CTR.createEncryptor(cipher, iv.words);
     */
    static createEncryptor(props: BlockCipherModeProps): CTR;
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.CTR.createDecryptor(cipher, iv.words);
     */
    static createDecryptor(props: BlockCipherModeProps): CTR;
}
