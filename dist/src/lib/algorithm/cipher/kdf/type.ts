import type {Hasher} from "../../Hasher";
import type {CipherParams} from "../CipherParams";
import type {Word32Array} from "../../../Word32Array";

export interface KDFParams extends Pick<CipherParams, "toString"> {
  key: Word32Array;
  iv: Word32Array;
  salt: Word32Array;
}

export interface KDFProps {
  KDF: typeof BaseKDFModule;
  Hasher: typeof Hasher;
  iterations: number;
}

export interface KDF {
  execute: (
    password: Word32Array|string,
    keySize: number,
    ivSize: number,
    salt?: Word32Array,
    props?: Partial<KDFProps>,
  ) => KDFParams;
}

export interface BaseKDFModuleProps {
  keySize: number;
  Hasher: typeof Hasher;
  iterations: number;
}

export class BaseKDFModule<P extends BaseKDFModuleProps> {
  protected _props?: Partial<P>;
  
  public constructor(props?: Partial<P>) {
    this._props = props;
  }
  
  public compute(password: Word32Array|string, salt: Word32Array|string): Word32Array {
    throw new Error("Not implemented");
  }
  
  public static getKey<P2 extends BaseKDFModuleProps>(
    password: Word32Array|string,
    salt: Word32Array|string,
    props?: Partial<P2>
  ): Word32Array {
    throw new Error("Not implemented");
  }
}
