import { Hmac } from "./Hmac";
import { SHA384 } from "./SHA384";
export function HmacSHA384(message, key) {
    return new Hmac(new SHA384(), key).finalize(message);
}
