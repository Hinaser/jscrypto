/**
 * A noop padding strategy
 *
 * @param {Word32Array} data The data to pad.
 * @param {number} blockSize The multiple that the data should be padded to.
 * @example
 *   Noop.pad(wordArray, 4);
 */
function pad(data, blockSize) {
    // Noop
}
/**
 * Unpads data that had been padded with Noop strategy.
 *
 * @param {Word32Array} data The data to unpad.
 * @example
 *   Noop.unpad(wordArray);
 */
function unpad(data) {
    // Noop
}
export const Noop = {
    pad,
    unpad,
};
