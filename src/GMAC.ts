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
  
  const cipher = new Cipher({iv: initializingVector, key: wKey});
  if(cipher.blockSize !== 128/32){
    throw new Error("Block size of cipher must be 128bit. Consider to use AES as a block cipher");
  }
  
  return GCM.hash(cipher, aad);
}