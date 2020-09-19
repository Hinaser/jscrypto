import { Word64 } from "./lib/Word64Array";
import { Hasher, HasherProps } from "./lib/algorithm/Hasher";
import { IWordArray } from "./lib/type";
export interface SHA3Props extends HasherProps {
    state: Word64[];
    outputLength: number;
}
export default class SHA3 extends Hasher {
    protected _props?: Partial<SHA3Props>;
    protected _blockSize: number;
    protected _state: Word64[];
    protected _outputLength: number;
    constructor(props?: Partial<SHA3Props>);
    protected doReset(): void;
    protected doProcessBlock(words: number[], offset: number): void;
    protected doFinalize(): IWordArray;
    clone(): SHA3;
    static hash(message: IWordArray | string, props?: SHA3Props): IWordArray;
}
