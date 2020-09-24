import { BlockCipherMode, BlockCipherModeProps } from "./BlockCipherMode";
/**
 * Output Feedback Block mode
 */
export declare class OFB extends BlockCipherMode {
    protected _keyStream: number[];
    /**
     * OFB encryptor.
     */
    static Encrypter: typeof OFB;
    /**
     * OFB decryptor.
     */
    static Decrypter: typeof OFB;
    constructor(props: BlockCipherModeProps);
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.OFB.createEncryptor(cipher, iv.words);
     */
    static createEncrypter(props: BlockCipherModeProps): OFB;
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.OFB.createDecryptor(cipher, iv.words);
     */
    static createDecrypter(props: BlockCipherModeProps): OFB;
}
