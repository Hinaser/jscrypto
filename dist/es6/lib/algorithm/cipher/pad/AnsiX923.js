/**
 * ANSI X.923 padding strategy
 *
 * @param {Word32Array} data The data to pad.
 * @param {number} blockSize The multiple that the data should be padded to.
 * @example
 *   AnsiX923.pad(wordArray, 4);
 */
function pad(data, blockSize) {
    // Shortcuts
    const dataSigBytes = data.nSigBytes;
    const blockSizeBytes = blockSize * 4;
    // Count padding bytes
    const nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
    // Compute last byte position
    const lastBytePos = dataSigBytes + nPaddingBytes - 1;
    // Pad
    data.clamp();
    data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
    data.nSigBytes += nPaddingBytes;
}
/**
 * Unpads data that had been padded with ANSI X.923 padding strategy
 *
 * @param {Word32Array} data The data to unpad.
 * @example
 *   AnsiX923.unpad(wordArray);
 */
function unpad(data) {
    // Get number of padding bytes from last byte
    const nPaddingBytes = data.words[(data.nSigBytes - 1) >>> 2] & 0xff;
    // Remove padding
    data.nSigBytes -= nPaddingBytes;
}
export const AnsiX923 = {
    pad,
    unpad,
};
