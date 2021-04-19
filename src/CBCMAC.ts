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
  plainText: Word32Array|string,
  key: Word32Array|string,
  iv: Word32Array|null,
  associatedData: Word32Array|string,
  props?: Partial<CBCMACProps>,
){
  const Cipher = (props && props.Cipher) ? props.Cipher : AES;
  const K = typeof key === "string" ? Utf8.parse(key) : key;
  const N = iv ? iv : new Word32Array([0, 0]);
  const P = typeof plainText === "string" ? Utf8.parse(plainText) : plainText;
  const A = typeof associatedData === "string" ? Utf8.parse(associatedData) : associatedData;
  const t = props && props.tagLength || 16;
  
  return CCM.mac(Cipher, K, N, A, P, t);
}