import {Word32Array} from "../../../Word32Array";

/**
 * Pad word array to multiple of 128bit(4byte)
 * @param {Word32Array} w - Padding target. This w will be modified directly.
 * @returns {void}
 */
export function padTo128m(w: Word32Array){
  const remainder = w.nSigBytes % 16;
  if(remainder === 0){
    return;
  }
  const nPaddingBytes = 16 - remainder;
  
  // Pad Ciphertext
  const pad = [];
  const maxI = Math.floor(nPaddingBytes/4);
  for(let i=0;i<maxI;i++){
    pad.push(0);
  }
  
  if(nPaddingBytes % 4 > 0){
    pad.push(0);
  }
  
  w.concat(new Word32Array(pad, nPaddingBytes));
}
