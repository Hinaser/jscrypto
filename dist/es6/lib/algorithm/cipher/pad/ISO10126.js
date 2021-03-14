import { Word32Array } from "../../../Word32Array";
/**
 * ISO10126 padding strategy
 *
 * @param {Word32Array} data The data to pad.
 * @param {number} blockSize The multiple that the data should be padded to.
 * @example
 *   ISO10126.pad(wordArray, 4);
 */
function pad(data, blockSize) {
    // Shortcut
    const blockSizeBytes = blockSize * 4;
    // Count padding bytes
    const nPaddingBytes = blockSizeBytes - data.nSigBytes % blockSizeBytes;
    // Pad
    data
        .concat(Word32Array.random(nPaddingBytes - 1))
        .concat(new Word32Array([nPaddingBytes << 24], 1));
}
/**
 * Unpads data that had been padded with ISO10126 padding strategy.
 *
 * @param {Word32Array} data The data to unpad.
 * @example
 *   ISO10126.unpad(wordArray);
 */
function unpad(data) {
    // Get number of padding bytes from last byte
    const nPaddingBytes = data.words[(data.nSigBytes - 1) >>> 2] & 0xff;
    // Remove padding
    data.nSigBytes -= nPaddingBytes;
}
export const ISO10126 = {
    pad,
    unpad,
};
