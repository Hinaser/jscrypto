import { BlockCipherMode, BlockCipherModeProps } from "./BlockCipherMode";
/**
 * Output Feedback Block mode
 */
export declare class OFB extends BlockCipherMode {
    protected _keyStream: number[];
    /**
     * OFB encryptor.
     */
    static Encryptor: typeof OFB;
    /**
     * OFB decryptor.
     */
    static Decryptor: typeof OFB;
    constructor(props: BlockCipherModeProps);
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = OFB.createEncryptor(cipher, iv.words);
     */
    static createEncryptor(props: BlockCipherModeProps): OFB;
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = OFB.createDecryptor(cipher, iv.words);
     */
    static createDecryptor(props: BlockCipherModeProps): OFB;
}
