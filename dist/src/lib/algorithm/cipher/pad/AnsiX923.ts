import type {Word32Array} from "../../../Word32Array";
import type {Pad} from "./type";

/**
 * ANSI X.923 padding strategy
 *
 * @param {Word32Array} data The data to pad.
 * @param {number} blockSize The multiple that the data should be padded to.
 * @example
 *   JsCrypto.pad.AnsiX923.pad(wordArray, 4);
 */
function pad(data: Word32Array, blockSize: number){
  // Shortcuts
  const dataSigBytes = data.length();
  const blockSizeBytes = blockSize * 4;
  
  // Count padding bytes
  const nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
  
  // Compute last byte position
  const lastBytePos = dataSigBytes + nPaddingBytes - 1;
  
  // Pad
  data.clamp();
  data.raw()[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
  data.setSignificantBytes(data.length() + nPaddingBytes);
}

/**
 * Unpads data that had been padded with ANSI X.923 padding strategy
 *
 * @param {Word32Array} data The data to unpad.
 * @example
 *   JsCrypto.pad.AnsiX923.unpad(wordArray);
 */
function unpad(data: Word32Array){
  // Get number of padding bytes from last byte
  const nPaddingBytes = data.raw()[(data.length() - 1) >>> 2] & 0xff;
  
  // Remove padding
  data.setSignificantBytes(data.length() - nPaddingBytes);
}

export const AnsiX923: Pad = {
  pad,
  unpad,
};
