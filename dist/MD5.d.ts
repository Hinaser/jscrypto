import { Hasher } from "./lib/algorithm/Hasher";
import { IWordArray } from "./lib/type";
/**
 * MD5 hash algorithm
 */
export default class MD5 extends Hasher {
    private _hash;
    constructor(hash?: IWordArray, blockSize?: number, data?: IWordArray, nBytes?: number);
    protected doReset(): void;
    protected doProcessBlock(words: number[], offset: number): void;
    protected doFinalize(): IWordArray;
    clone(): MD5;
    static hash(message: IWordArray | string): IWordArray;
}
