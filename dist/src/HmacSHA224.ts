import {Hmac} from "./Hmac";
import {SHA224} from "./SHA224";
import {Word32Array} from "./lib/Word32Array";

export function HmacSHA224(message: Word32Array|string, key: Word32Array|string){
  return new Hmac(new SHA224(), key).finalize(message);
}
