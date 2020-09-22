import {Word32Array} from "./lib/Word32Array";
import {SHA256} from "./SHA256";
import type {HasherProps} from "./lib/algorithm/Hasher";

export interface SHA224Props extends HasherProps {
  hash: Word32Array;
}

export class SHA224 extends SHA256 {
  protected _props?: Partial<SHA224Props>;
  protected _hash: Word32Array = new Word32Array([
    0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
    0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
  ]);
  
  public constructor(props?: SHA224Props) {
    super(props);
    this._props = props;
    if(props && typeof props.hash !== "undefined"){
      this._hash = props.hash.clone();
    }
  }
  
  protected _doReset() {
    this._hash = new Word32Array([
      0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
      0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
    ]);
  }
  
  protected _doFinalize(): Word32Array {
    const hash = super._doFinalize.call(this);
    hash.setSignificantBytes(hash.length() - 4);
    return hash;
  }
  
  public clone(){
    const props = {hash: this._hash, blockSize: this._blockSize, data: this._data, nBytes: this._nBytes};
    return new SHA224(props);
  }
  
  public static hash(message: Word32Array|string, props?: SHA224Props){
    return new SHA224(props).finalize(message);
  }
}
