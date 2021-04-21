import { Word32Array } from "../../../Word32Array";
/**
 * Pad word array to multiple of 128bit(4byte)
 * @param {Word32Array} w - Padding target. This w will be modified directly.
 * @returns {void}
 */
export declare function padTo128m(w: Word32Array): void;
/**
 * Extract Most Significant Bit.
 * @param {Word32Array} w
 * @param {number} bytes - Number of bytes to extract
 * @example
 *   const w = new Word32Array([0x11223344, 0x55667788]);
 *   msb(w, 2).toString() === "1122"; // true
 */
export declare function msb(w: Word32Array, bytes: number): Word32Array;
/**
 * Extract Least Significant Bit.
 * @param {Word32Array} w
 * @param {number} bytes - Number of bytes to extract
 * @example
 *   const w = new Word32Array([0x11223344, 0x55667788, 0x99aabb00], 11);
 *   lsb(w, 5).toString() === "778899aabb"; // true
 */
export declare function lsb(w: Word32Array, bytes: number): Word32Array;
