import { Utf8 } from "./lib/encoder/Utf8";
import { Word32Array } from "./lib/Word32Array";
import { AES } from "./AES";
import { GCM } from "./mode/GCM";
export function GMAC(message, key, iv, tagLength, props) {
    const aad = typeof message === "string" ? Utf8.parse(message) : message;
    const initializingVector = iv ? iv : new Word32Array([0, 0, 0, 0]);
    const Cipher = (props && props.Cipher) ? props.Cipher : AES;
    const wKey = typeof key === "string" ? Utf8.parse(key) : key;
    const t = tagLength || 16;
    return GCM.mac(Cipher, wKey, initializingVector, aad, undefined, t);
}
