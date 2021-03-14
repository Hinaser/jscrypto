import { BlockCipherMode } from "./BlockCipherMode";
/**
 * Electronic Codebook block mode.
 */
export class ECB extends BlockCipherMode {
    constructor(props) {
        super(props);
    }
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = ECB.createEncryptor(cipher, iv.words);
     */
    static createEncryptor(props) {
        return new ECB.Encryptor(props);
    }
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = ECB.createDecryptor(cipher, iv.words);
     */
    static createDecryptor(props) {
        return new ECB.Decryptor(props);
    }
}
/**
 * ECB encryptor.
 */
ECB.Encryptor = class Encryptor extends ECB {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    processBlock(words, offset) {
        this._cipher.encryptBlock(words, offset);
    }
};
/**
 * ECB decryptor.
 */
ECB.Decryptor = class Decryptor extends ECB {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    processBlock(words, offset) {
        this._cipher.decryptBlock(words, offset);
    }
};
