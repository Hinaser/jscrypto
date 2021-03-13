import {Cipher, CipherProps, PropsWithKey} from "./Cipher";

export interface StreamCipherProps extends CipherProps {
}

export abstract class StreamCipher extends Cipher {
  protected _blockSize = 1;
  
  protected constructor(props: PropsWithKey<StreamCipherProps>) {
    super(props);
  }
  
  protected _doFinalize() {
    return this._process(true);
  }
}