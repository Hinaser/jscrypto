import {IWord32Array} from "./lib/type";
import HMAC from "./hmac";
import SHA256 from "./sha256";

export default function HmacSHA256(message: IWord32Array|string, key: IWord32Array|string){
  return new HMAC(new SHA256(), key).finalize(message);
}
