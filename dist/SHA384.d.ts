import { Word64Array } from "./lib/Word64Array";
import { IWordArray } from "./lib/type";
import SHA512 from "./SHA512";
export default class SHA384 extends SHA512 {
    protected _hash: Word64Array;
    constructor(hash?: Word64Array, blockSize?: number, data?: IWordArray, nBytes?: number);
    protected doReset(): void;
    protected doFinalize(): IWordArray;
    clone(): SHA384;
    static hash(message: IWordArray | string): IWordArray;
}
