/**
 * Abstract base block cipher mode template.
 * @abstract
 */
export class BlockCipherMode {
    constructor(props) {
        this._props = props;
        this._cipher = props.cipher;
        this._iv = props.iv;
    }
    /**
     * @abstract
     */
    processBlock(words, offset) {
        return;
    }
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @abstract
     * @example
     *   var mode = CBC.createEncryptor(cipher, iv.words);
     */
    static createEncryptor(props) {
        throw new Error("Not implemented yet");
    }
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @abstract
     * @example
     *   var mode = CBC.createDecryptor(cipher, iv.words);
     */
    static createDecryptor(props) {
        throw new Error("Not implemented yet");
    }
}
