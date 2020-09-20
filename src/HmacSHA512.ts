import {IWordArray} from "./lib/type";
import Hmac from "./Hmac";
import SHA512 from "./SHA512";

export default function HmacSHA512(message: IWordArray|string, key: IWordArray|string){
  return new Hmac(new SHA512(), key).finalize(message);
}
