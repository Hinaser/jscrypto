import { BlockCipherMode } from "./BlockCipherMode";
/**
 * Output Feedback Block mode
 */
export class CTR extends BlockCipherMode {
    constructor(props) {
        super(props);
        this._counter = [];
    }
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = CTR.createEncryptor(cipher, iv.words);
     */
    static createEncryptor(props) {
        return new CTR.Encryptor(props);
    }
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = CTR.createDecryptor(cipher, iv.words);
     */
    static createDecryptor(props) {
        return new CTR.Decryptor(props);
    }
}
/**
 * CTR encryptor.
 */
CTR.Encryptor = class Encryptor extends CTR {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    processBlock(words, offset) {
        // Shortcuts
        const cipher = this._cipher;
        const blockSize = cipher.blockSize;
        const iv = this._iv;
        let counter = this._counter;
        // Generate keyStream
        if (iv) {
            counter = this._counter = iv.words.slice(0);
            // Remove IV for subsequent blocks
            this._iv = undefined;
        }
        const keyStream = counter.slice(0);
        cipher.encryptBlock(keyStream, 0);
        // Increment counter
        counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0;
        // Encrypt
        for (let i = 0; i < blockSize; i++) {
            words[offset + i] ^= keyStream[i];
        }
    }
};
/**
 * CTR decryptor.
 */
CTR.Decryptor = CTR.Encryptor;
