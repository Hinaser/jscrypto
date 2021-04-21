import { BlockCipherMode } from "./BlockCipherMode";
/**
 * Cipher Feedback Block mode
 */
export class CFB extends BlockCipherMode {
    constructor(props) {
        super(props);
        this._prevBlock = [];
    }
    generateKeyStreamAndEncrypt(words, offset, blockSize, cipher) {
        let keyStream;
        // Shortcut
        const iv = this._iv;
        // Generate keyStream
        if (iv) {
            keyStream = iv.words.slice(0);
            // Remove IV for subsequent blocks
            this._iv = undefined;
        }
        else {
            keyStream = this._prevBlock;
        }
        cipher.encryptBlock(keyStream, 0);
        // Encrypt
        for (let i = 0; i < blockSize; i++) {
            words[offset + i] ^= keyStream[i];
        }
    }
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = CFB.createEncryptor(cipher, iv.words);
     */
    static createEncryptor(props) {
        return new CFB.Encryptor(props);
    }
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = CFB.createDecryptor(cipher, iv.words);
     */
    static createDecryptor(props) {
        return new CFB.Decryptor(props);
    }
}
/**
 * CFB encryptor.
 */
CFB.Encryptor = class Encryptor extends CFB {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    processBlock(words, offset) {
        this.generateKeyStreamAndEncrypt(words, offset, this._cipher.blockSize, this._cipher);
        // Remember this block to use with next block
        this._prevBlock = words.slice(offset, offset + this._cipher.blockSize);
    }
};
/**
 * CFB decryptor.
 */
CFB.Decryptor = class Encryptor extends CFB {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    processBlock(words, offset) {
        // Remember this block to use with next block
        const thisBlock = words.slice(offset, offset + this._cipher.blockSize);
        this.generateKeyStreamAndEncrypt(words, offset, this._cipher.blockSize, this._cipher);
        // This block becomes the previous block
        this._prevBlock = thisBlock;
    }
};
