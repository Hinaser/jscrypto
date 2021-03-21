/**
 * Pads data with zero padding strategy.
 *
 * @param {Word32Array} data The data to pad.
 * @param {number} blockSize The multiple that the data should be padded to.
 * @example
 *   Zero.pad(wordArray, 4);
 */
function pad(data, blockSize) {
    // Shortcut
    const blockSizeBytes = blockSize * 4;
    // Pad
    data.clamp();
    data.nSigBytes += blockSizeBytes - ((data.nSigBytes % blockSizeBytes) || blockSizeBytes);
}
/**
 * Unpads data that had been padded with zero padding strategy.
 *
 * @param {Word32Array} data The data to unpad.
 * @example
 *   Zero.unpad(wordArray);
 */
function unpad(data) {
    // Shortcut
    const dataWords = data.words;
    // Unpad
    for (let i = data.nSigBytes - 1; i >= 0; i--) {
        if ((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff) {
            data.nSigBytes = i + 1;
            break;
        }
    }
}
export const Zero = {
    pad,
    unpad,
};
