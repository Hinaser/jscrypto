import {IWordArray} from "./lib/type";
import Hmac from "./Hmac";
import SHA224 from "./SHA224";

export default function HmacSHA224(message: IWordArray|string, key: IWordArray|string){
  return new Hmac(new SHA224(), key).finalize(message);
}
