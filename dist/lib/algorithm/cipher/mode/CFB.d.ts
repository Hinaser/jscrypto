import { BlockCipherMode, BlockCipherModeProps } from "./BlockCipherMode";
import { Cipher } from "../Cipher";
/**
 * Cipher Feedback Block mode
 */
export declare class CFB extends BlockCipherMode {
    protected _prevBlock: number[];
    /**
     * CFB encryptor.
     */
    static Encryptor: typeof CFB;
    /**
     * CFB decryptor.
     */
    static Decryptor: typeof CFB;
    constructor(props: BlockCipherModeProps);
    generateKeyStreamAndEncrypt(words: number[], offset: number, blockSize: number, cipher: Cipher): void;
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.CFB.createEncryptor(cipher, iv.words);
     */
    static createEncryptor(props: BlockCipherModeProps): CFB;
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.CFB.createDecryptor(cipher, iv.words);
     */
    static createDecryptor(props: BlockCipherModeProps): CFB;
}
