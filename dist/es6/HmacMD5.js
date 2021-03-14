import { Hmac } from "./Hmac";
import { MD5 } from "./MD5";
export function HmacMD5(message, key) {
    return new Hmac(new MD5(), key).finalize(message);
}
