import { Hmac } from "./Hmac";
import { SHA224 } from "./SHA224";
export function HmacSHA224(message, key) {
    return new Hmac(new SHA224(), key).finalize(message);
}
