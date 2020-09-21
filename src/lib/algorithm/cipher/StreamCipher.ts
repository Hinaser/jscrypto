import {Cipher} from "./Cipher";

export abstract class StreamCipher extends Cipher {
  protected _blockSize = 1;
  
  protected _doFinalize() {
    return this._process(true);
  }
}