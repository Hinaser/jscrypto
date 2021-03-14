import { Word32Array } from "../../../Word32Array";
import { Zero } from "./Zero";
/**
 * ISO/IEC 9797-1 Padding Method 2. padding strategy
 *
 * @param {Word32Array} data The data to pad.
 * @param {number} blockSize The multiple that the data should be padded to.
 * @example
 *   ISO97971.pad(wordArray, 4);
 */
function pad(data, blockSize) {
    // Add 0x80 byte
    data.concat(new Word32Array([0x80000000], 1));
    // Zero pad the rest
    Zero.pad(data, blockSize);
}
/**
 * Unpads data that had been padded with ISO/IEC 9797-1 Padding Method 2 strategy.
 *
 * @param {Word32Array} data The data to unpad.
 * @example
 *   ISO97971.unpad(wordArray);
 */
function unpad(data) {
    // Remove zero padding
    Zero.unpad(data);
    // Remove one more byte -- the 0x80 byte
    data.nSigBytes -= 1;
}
export const ISO97971 = {
    pad,
    unpad,
};
