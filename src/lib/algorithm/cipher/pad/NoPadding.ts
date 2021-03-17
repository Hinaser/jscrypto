import type {Word32Array} from "../../../Word32Array";
import type {Pad} from "./type";

/**
 * A noop padding strategy
 *
 * @param {Word32Array} data The data to pad.
 * @param {number} blockSize The multiple that the data should be padded to.
 * @example
 *   NoPadding.pad(wordArray, 4);
 */
function pad(data: Word32Array, blockSize: number){
  // NoPadding
}

/**
 * Unpads data that had been padded with NoPadding strategy.
 *
 * @param {Word32Array} data The data to unpad.
 * @example
 *   NoPadding.unpad(wordArray);
 */
function unpad(data: Word32Array){
  // NoPadding
}

export const NoPadding: Pad = {
  pad,
  unpad,
};
