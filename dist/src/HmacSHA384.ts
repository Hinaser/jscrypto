import {IWordArray} from "./lib/type";
import Hmac from "./Hmac";
import SHA384 from "./SHA384";

export default function HmacSHA384(message: IWordArray|string, key: IWordArray|string){
  return new Hmac(new SHA384(), key).finalize(message);
}
