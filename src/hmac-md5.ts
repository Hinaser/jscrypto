import {IWord32Array} from "./lib/type";
import HMAC from "./hmac";
import MD5 from "./md5";

export default function HmacMD5(message: IWord32Array|string, key: IWord32Array|string){
  return new HMAC(new MD5(), key).finalize(message);
}
