import type {Word32Array} from "../../../Word32Array";
import type {Pad} from "./type";

/**
 * A noop padding strategy
 *
 * @param {Word32Array} data The data to pad.
 * @param {number} blockSize The multiple that the data should be padded to.
 * @example
 *   Noop.pad(wordArray, 4);
 */
function pad(data: Word32Array, blockSize: number){
  // Noop
}

/**
 * Unpads data that had been padded with Noop strategy.
 *
 * @param {Word32Array} data The data to unpad.
 * @example
 *   Noop.unpad(wordArray);
 */
function unpad(data: Word32Array){
  // Noop
}

export const Noop: Pad = {
  pad,
  unpad,
};
