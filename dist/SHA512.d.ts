import { Hasher, HasherProps } from "./lib/algorithm/Hasher";
import { Word64Array } from "./lib/Word64Array";
import type { Word32Array } from "./lib/Word32Array";
export interface SHA512Props extends HasherProps {
    hash: Word64Array;
}
export declare class SHA512 extends Hasher {
    protected _props?: Partial<SHA512Props>;
    protected _blockSize: number;
    protected _hash: Word64Array;
    constructor(props?: Partial<SHA512Props>);
    protected _doReset(): void;
    protected _doProcessBlock(words: number[], offset: number): void;
    protected _doFinalize(): Word32Array;
    clone(): SHA512;
    static hash(message: Word32Array | string, props?: SHA512Props): Word32Array;
}
