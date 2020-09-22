import type {CipherParams} from "../CipherParams";
import type {Word32Array} from "../../../Word32Array";

export interface KDFParams extends CipherParams {
  key: Word32Array;
  iv: Word32Array;
  salt: Word32Array;
}

export interface KDF {
  execute: (password: Word32Array|string, keySize: number, ivSize: number, salt?: Word32Array) => KDFParams;
}
