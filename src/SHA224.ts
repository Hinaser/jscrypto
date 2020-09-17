import {IWordArray} from "./lib/type";
import {Word32Array} from "./lib/Word32Array";
import SHA256 from "./SHA256";

export default class SHA224 extends SHA256 {
  protected _hash: IWordArray = new Word32Array([
    0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
    0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
  ]);
  
  public constructor(hash?: IWordArray, blockSize?: number, data?: IWordArray, nBytes?: number) {
    super(hash, blockSize, data, nBytes);
    if(typeof hash !== "undefined"){
      this._hash = hash.clone();
    }
  }
  
  protected doReset() {
    this._hash = new Word32Array([
      0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
      0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
    ]);
  }
  
  protected doFinalize(): IWordArray {
    const hash = super.doFinalize.call(this);
    hash.setSignificantBytes(hash.length() - 4);
    return hash;
  }
  
  public clone(){
    return new SHA224(this._hash, this._blockSize, this._data, this._nBytes);
  }
  
  public static hash(message: IWordArray|string){
    return new SHA224().finalize(message);
  }
}
