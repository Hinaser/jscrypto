import {Hmac} from "./Hmac";
import {SHA512} from "./SHA512";
import {Word32Array} from "./lib/Word32Array";

export function HmacSHA512(message: Word32Array|string, key: Word32Array|string){
  return new Hmac(new SHA512(), key).finalize(message);
}
