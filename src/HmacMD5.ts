import {IWordArray} from "./lib/type";
import {Hmac} from "./Hmac";
import {MD5} from "./MD5";

export function HmacMD5(message: IWordArray|string, key: IWordArray|string){
  return new Hmac(new MD5(), key).finalize(message);
}
