import {Hmac} from "./Hmac";
import {SHA1} from "./SHA1";
import type {Word32Array} from "./lib/Word32Array";

export function HmacSHA1(message: Word32Array|string, key: Word32Array|string){
  return new Hmac(new SHA1(), key).finalize(message);
}
