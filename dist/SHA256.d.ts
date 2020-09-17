import { Hasher } from "./lib/algorithm/Hasher";
import { IWordArray } from "./lib/type";
export default class SHA256 extends Hasher {
    protected _hash: IWordArray;
    constructor(hash?: IWordArray, blockSize?: number, data?: IWordArray, nBytes?: number);
    protected doReset(): void;
    protected doProcessBlock(words: number[], offset: number): void;
    protected doFinalize(): IWordArray;
    clone(): SHA256;
    static hash(message: IWordArray | string): IWordArray;
}
