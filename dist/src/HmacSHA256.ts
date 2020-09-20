import {IWordArray} from "./lib/type";
import Hmac from "./Hmac";
import SHA256 from "./SHA256";

export default function HmacSHA256(message: IWordArray|string, key: IWordArray|string){
  return new Hmac(new SHA256(), key).finalize(message);
}
