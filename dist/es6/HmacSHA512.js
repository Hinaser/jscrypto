import { Hmac } from "./Hmac";
import { SHA512 } from "./SHA512";
export function HmacSHA512(message, key) {
    return new Hmac(new SHA512(), key).finalize(message);
}
