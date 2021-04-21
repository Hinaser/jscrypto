import { BlockCipherMode } from "./BlockCipherMode";
export class CBC extends BlockCipherMode {
    constructor(props) {
        super(props);
        this._prevBlock = [];
    }
    xorBlock(words, offset, blockSize) {
        let block;
        // Shortcut
        const iv = this._iv;
        // Choose mixing block
        if (iv) {
            block = iv.words;
            // Remove IV for subsequent blocks
            this._iv = undefined;
        }
        else {
            block = this._prevBlock;
        }
        // XOR blocks
        for (let i = 0; i < blockSize; i++) {
            words[offset + i] ^= block[i];
        }
    }
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = CBC.createEncryptor(cipher, iv.words);
     */
    static createEncryptor(props) {
        return new CBC.Encryptor(props);
    }
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = CBC.createDecryptor(cipher, iv.words);
     */
    static createDecryptor(props) {
        return new CBC.Decryptor(props);
    }
}
/**
 * CBC encryptor.
 */
CBC.Encryptor = class Encryptor extends CBC {
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
        // XOR and encrypt
        this.xorBlock(words, offset, blockSize);
        cipher.encryptBlock(words, offset);
        // Remember this block to use with next block
        this._prevBlock = words.slice(offset, offset + blockSize);
    }
};
/**
 * CBC decryptor.
 */
CBC.Decryptor = class Decryptor extends CBC {
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
        // Remember this block to use with next block
        const thisBlock = words.slice(offset, offset + blockSize);
        // Decrypt and XOR
        cipher.decryptBlock(words, offset);
        this.xorBlock(words, offset, blockSize);
        // This block becomes the previous block
        this._prevBlock = thisBlock;
    }
};
