import {Hasher, HasherProps} from "./lib/algorithm/Hasher";
import {Word32Array} from "./lib/Word32Array";

export interface SHA1Props extends HasherProps {
  hash: Word32Array;
}

// Reusable object
const W: number[] = [];

export class SHA1 extends Hasher {
  protected _props?: Partial<SHA1Props>;
  private _hash: Word32Array = new Word32Array([
    0x67452301, 0xefcdab89,
    0x98badcfe, 0x10325476,
    0xc3d2e1f0
  ]);
  
  public constructor(props?: SHA1Props) {
    super(props);
    this._props = props;
    if(props && typeof props.hash !== "undefined"){
      this._hash = props.hash.clone();
    }
  }
  
  protected _doReset() {
    this._hash = new Word32Array([
      0x67452301, 0xefcdab89,
      0x98badcfe, 0x10325476,
      0xc3d2e1f0
    ]);
  }
  
  protected _doProcessBlock(words: number[], offset: number) {
    const H = this._hash.words;
  
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
  
  protected _doFinalize(): Word32Array {
    // Shortcuts
    const dataWords = this._data.words;
  
    const nBitsTotal = this._nBytes * 8;
    const nBitsLeft = this._data.nSigBytes * 8;
  
    // Add padding
    dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
    dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
    dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
    this._data.nSigBytes = dataWords.length * 4;
  
    // Hash final blocks
    this._process();
  
    // Return final computed hash
    return this._hash;
  }
  
  public clone(){
    const props = {hash: this._hash, blockSize: this._blockSize, data: this._data, nBytes: this._nBytes};
    return new SHA1(props);
  }
  
  public static hash(message: Word32Array|string, props?: SHA1Props){
    return new SHA1(props).finalize(message);
  }
}
