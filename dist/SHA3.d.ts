import { Word64 } from "./lib/Word64Array";
import { Hasher } from "./lib/algorithm/Hasher";
import { IWordArray } from "./lib/type";
export default class SHA3 extends Hasher {
    protected _blockSize: number;
    protected _state: Word64[];
    protected _outputLength: number;
    constructor(outputLength?: number, state?: Word64[], blockSize?: number, data?: IWordArray, nBytes?: number);
    protected doReset(): void;
    protected doProcessBlock(words: number[], offset: number): void;
    protected doFinalize(): IWordArray;
    clone(): SHA3;
    static hash(message: IWordArray | string, outputLength?: number): IWordArray;
}
