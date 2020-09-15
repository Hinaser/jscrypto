import { Hasher } from "./lib/algorithm/Hasher";
import { IWord32Array } from "./lib/type";
export default class SHA256 extends Hasher {
    private _hash;
    constructor(hash?: IWord32Array, blockSize?: number, data?: IWord32Array, nBytes?: number);
    protected doReset(): void;
    protected doProcessBlock(words: number[], offset: number): void;
    protected doFinalize(): IWord32Array;
    clone(): SHA256;
    static hash(message: IWord32Array | string): IWord32Array;
}
