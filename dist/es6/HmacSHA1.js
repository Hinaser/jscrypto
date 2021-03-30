import { Hmac } from "./Hmac";
import { SHA1 } from "./SHA1";
export function HmacSHA1(message, key) {
    return new Hmac(new SHA1(), key).finalize(message);
}
