import {Utf8} from "./lib/encoder/Utf8";
import {Word32Array} from "./lib/Word32Array";
import {AES} from "./AES";
import {GCM} from "./mode/GCM";
import {BlockCipher} from "./lib/algorithm/cipher/BlockCipher";

export type GMACProps = {
  Cipher: typeof BlockCipher;
};

export function GMAC(
  message: Word32Array|string,
  key: Word32Array|string,
  iv?: Word32Array,
  props?: Partial<GMACProps>,
){
  const aad = typeof message === "string" ? Utf8.parse(message) : message;
  const initializingVector = iv ? iv : new Word32Array([0, 0, 0, 0]);
  const Cipher = (props && props.Cipher) ? props.Cipher : AES;
  const wKey = typeof key === "string" ? Utf8.parse(key) : key;
  
  return GCM.hash(Cipher, wKey, initializingVector, aad);
}