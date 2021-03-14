import { Hmac } from "./Hmac";
import { SHA256 } from "./SHA256";
export function HmacSHA256(message, key) {
    return new Hmac(new SHA256(), key).finalize(message);
}
