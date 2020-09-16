import {Hasher} from "./lib/algorithm/Hasher";
import {IWord32Array} from "./lib/type";
import {Word32Array} from "./lib/Word32Array";

// Reusable object
const W: number[] = [];

export default class SHA1 extends Hasher {
  private _hash: IWord32Array = new Word32Array([
    0x67452301, 0xefcdab89,
    0x98badcfe, 0x10325476,
    0xc3d2e1f0
  ]);
  
  public constructor(hash?: IWord32Array, blockSize?: number, data?: IWord32Array, nBytes?: number) {
    super(blockSize, data, nBytes);
    if(typeof hash !== "undefined"){
      this._hash = hash.clone();
    }
  }
  
  protected doReset() {
    this._hash = new Word32Array([
      0x67452301, 0xefcdab89,
      0x98badcfe, 0x10325476,
      0xc3d2e1f0
    ]);
  }
  
  protected doProcessBlock(words: number[], offset: number) {
    const H = this._hash.raw();
  
    // Working variables
    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];
  
    // Computation
    for(let i=0;i<80;i++){
      if (i < 16) {
        W[i] = words[offset + i] | 0;
      }
      else {
        const n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
        W[i] = (n << 1) | (n >>> 31);
      }
    
      let t = ((a << 5) | (a >>> 27)) + e + W[i];
      if (i < 20) {
        t += ((b & c) | (~b & d)) + 0x5a827999;
      }
      else if (i < 40) {
        t += (b ^ c ^ d) + 0x6ed9eba1;
      }
      else if (i < 60) {
        t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
      }
      else /* if (i < 80) */ {
        t += (b ^ c ^ d) - 0x359d3e2a;
      }
    
      e = d;
      d = c;
      c = (b << 30) | (b >>> 2);
      b = a;
      a = t;
    }
  
    // Intermediate hash value
    H[0] = (H[0] + a) | 0;
    H[1] = (H[1] + b) | 0;
    H[2] = (H[2] + c) | 0;
    H[3] = (H[3] + d) | 0;
    H[4] = (H[4] + e) | 0;
  }
  
  protected doFinalize(): IWord32Array {
    // Shortcuts
    const dataWords = this._data.raw();
  
    const nBitsTotal = this._nBytes * 8;
    const nBitsLeft = this._data.length() * 8;
  
    // Add padding
    dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
    dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
    dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
    this._data.setSignificantBytes(dataWords.length * 4);
  
    // Hash final blocks
    this.process();
  
    // Return final computed hash
    return this._hash;
  }
  
  public clone(){
    return new SHA1(this._hash, this._blockSize, this._data, this._nBytes);
  }
  
  public static hash(message: IWord32Array|string){
    return new SHA1().finalize(message);
  }
}
