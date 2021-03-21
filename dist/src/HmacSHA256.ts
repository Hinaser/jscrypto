import {Hmac} from "./Hmac";
import {SHA256} from "./SHA256";
import type {Word32Array} from "./lib/Word32Array";

export function HmacSHA256(message: Word32Array|string, key: Word32Array|string){
  return new Hmac(new SHA256(), key).finalize(message);
}
