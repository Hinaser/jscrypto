import { Word32Array } from "./lib/Word32Array";
import { Hasher, HasherProps } from "./lib/algorithm/Hasher";
export interface MD5Props extends HasherProps {
    hash: Word32Array;
}
/**
 * MD5 hash algorithm
 */
export declare class MD5 extends Hasher {
    private _hash;
    constructor(props?: MD5Props);
    protected _doReset(): void;
    protected _doProcessBlock(words: number[], offset: number): void;
    protected _doFinalize(): Word32Array;
    clone(): MD5;
    static hash(message: Word32Array | string): Word32Array;
}
