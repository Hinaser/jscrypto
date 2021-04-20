import {Utf8} from "./lib/encoder/Utf8";
import {Word32Array} from "./lib/Word32Array";
import {AES} from "./AES";
import {CCM} from "./mode/CCM";
import {BlockCipher} from "./lib/algorithm/cipher/BlockCipher";

export type CBCMACProps = {
  Cipher: typeof BlockCipher;
  tagLength?: number;
};

export function CBCMAC(
  message: Word32Array|string,
  key: Word32Array|string,
  iv: Word32Array|null,
  props?: Partial<CBCMACProps>,
){
  const Cipher = (props && props.Cipher) ? props.Cipher : AES;
  const K = typeof key === "string" ? Utf8.parse(key) : key;
  const N = iv ? iv : new Word32Array([0, 0]);
  const A = typeof message === "string" ? Utf8.parse(message) : message;
  const t = props && props.tagLength || 16;
  
  return CCM.mac(Cipher, K, N, A, undefined, t);
}