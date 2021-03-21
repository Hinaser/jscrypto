/**
 * A noop padding strategy
 *
 * @param {Word32Array} data The data to pad.
 * @param {number} blockSize The multiple that the data should be padded to.
 * @example
 *   NoPadding.pad(wordArray, 4);
 */
function pad(data, blockSize) {
    // NoPadding
}
/**
 * Unpads data that had been padded with NoPadding strategy.
 *
 * @param {Word32Array} data The data to unpad.
 * @example
 *   NoPadding.unpad(wordArray);
 */
function unpad(data) {
    // NoPadding
}
export const NoPadding = {
    pad,
    unpad,
};
