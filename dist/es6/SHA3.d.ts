import { Word64 } from "./lib/Word64Array";
import { Hasher, HasherProps } from "./lib/algorithm/Hasher";
import { Word32Array } from "./lib/Word32Array";
export interface SHA3Props extends HasherProps {
    state: Word64[];
    outputLength: number;
}
export declare class SHA3 extends Hasher {
    protected _props?: Partial<SHA3Props>;
    protected _blockSize: number;
    protected _state: Word64[];
    protected _outputLength: number;
    constructor(props?: Partial<SHA3Props>);
    protected _doReset(): void;
    protected _doProcessBlock(words: number[], offset: number): void;
    protected _doFinalize(): Word32Array;
    clone(): SHA3;
    static hash(message: Word32Array | string, props?: SHA3Props): Word32Array;
}
