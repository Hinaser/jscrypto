import {Hmac} from "./Hmac";
import {SHA384} from "./SHA384";
import {Word32Array} from "./lib/Word32Array";

export function HmacSHA384(message: Word32Array|string, key: Word32Array|string){
  return new Hmac(new SHA384(), key).finalize(message);
}
