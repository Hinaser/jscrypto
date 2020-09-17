import { Hasher } from "./lib/algorithm/Hasher";
import { Word64Array } from "./lib/Word64Array";
import { IWordArray } from "./lib/type";
export default class SHA512 extends Hasher {
    protected _blockSize: number;
    protected _hash: Word64Array;
    constructor(hash?: Word64Array, blockSize?: number, data?: IWordArray, nBytes?: number);
    protected doReset(): void;
    protected doProcessBlock(words: number[], offset: number): void;
    protected doFinalize(): IWordArray;
    clone(): SHA512;
    static hash(message: IWordArray | string): IWordArray;
}
