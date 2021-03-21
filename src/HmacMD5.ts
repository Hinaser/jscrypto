import {Hmac} from "./Hmac";
import {MD5} from "./MD5";
import type {Word32Array} from "./lib/Word32Array";

export function HmacMD5(message: Word32Array|string, key: Word32Array|string){
  return new Hmac(new MD5(), key).finalize(message);
}
