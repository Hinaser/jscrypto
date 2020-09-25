import type {Word32Array} from "../../../Word32Array";
import type {Pad} from "./type";

/**
 * Pads data with zero padding strategy.
 *
 * @param {Word32Array} data The data to pad.
 * @param {number} blockSize The multiple that the data should be padded to.
 * @example
 *   JsCrypto.pad.Zero.pad(wordArray, 4);
 */
function pad(data: Word32Array, blockSize: number){
  // Shortcut
  const blockSizeBytes = blockSize * 4;
  
  // Pad
  data.clamp();
  data.setSignificantBytes(data.length() + blockSizeBytes - ((data.length() % blockSizeBytes) || blockSizeBytes));
}

/**
 * Unpads data that had been padded with zero padding strategy.
 *
 * @param {Word32Array} data The data to unpad.
 * @example
 *   JsCrypto.pad.Zero.unpad(wordArray);
 */
function unpad(data: Word32Array){
  // Shortcut
  const dataWords = data.raw();
  
  // Unpad
  for (let i=data.length()-1;i>=0;i--){
    if((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff){
      data.setSignificantBytes(i+1);
      break;
    }
  }
}

export const Zero: Pad = {
  pad,
  unpad,
};
