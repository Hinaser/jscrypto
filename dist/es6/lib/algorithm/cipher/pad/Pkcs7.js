import { Word32Array } from "../../../Word32Array";
/**
 * Pads data using the algorithm defined in PKCS #5/7.
 *
 * @param {Word32Array} data The data to pad.
 * @param {number} blockSize The multiple that the data should be padded to.
 * @example
 *   Pkcs7.pad(wordArray, 4);
 */
function pad(data, blockSize) {
    // Shortcut
    const blockSizeBytes = blockSize * 4;
    // Count padding bytes
    const nPaddingBytes = blockSizeBytes - data.nSigBytes % blockSizeBytes;
    // Create padding word
    const paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;
    // Create padding
    const paddingWords = [];
    for (let i = 0; i < nPaddingBytes; i += 4) {
        paddingWords.push(paddingWord);
    }
    const padding = new Word32Array(paddingWords, nPaddingBytes);
    // Add padding
    data.concat(padding);
}
/**
 * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
 *
 * @param {Word32Array} data The data to unpad.
 * @example
 *   Pkcs7.unpad(wordArray);
 */
function unpad(data) {
    // Get number of padding bytes from last byte
    const nPaddingBytes = data.words[(data.nSigBytes - 1) >>> 2] & 0xff;
    // Remove padding
    data.nSigBytes -= nPaddingBytes;
}
export const Pkcs7 = {
    pad,
    unpad,
};
