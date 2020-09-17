import { IWordArray } from "./lib/type";
import SHA256 from "./SHA256";
export default class SHA224 extends SHA256 {
    protected _hash: IWordArray;
    constructor(hash?: IWordArray, blockSize?: number, data?: IWordArray, nBytes?: number);
    protected doReset(): void;
    protected doFinalize(): IWordArray;
    clone(): SHA224;
    static hash(message: IWordArray | string): IWordArray;
}
