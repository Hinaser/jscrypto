import { Hasher } from "./lib/algorithm/Hasher";
import { IWordArray } from "./lib/type";
export default class SHA1 extends Hasher {
    private _hash;
    constructor(hash?: IWordArray, blockSize?: number, data?: IWordArray, nBytes?: number);
    protected doReset(): void;
    protected doProcessBlock(words: number[], offset: number): void;
    protected doFinalize(): IWordArray;
    clone(): SHA1;
    static hash(message: IWordArray | string): IWordArray;
}
