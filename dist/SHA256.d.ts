import { Hasher, HasherProps } from "./lib/algorithm/Hasher";
import { Word32Array } from "./lib/Word32Array";
export interface SHA256Props extends HasherProps {
    hash: Word32Array;
}
export declare class SHA256 extends Hasher {
    protected _props?: Partial<SHA256Props>;
    protected _hash: Word32Array;
    constructor(props?: SHA256Props);
    protected _doReset(): void;
    protected _doProcessBlock(words: number[], offset: number): void;
    protected _doFinalize(): Word32Array;
    clone(): SHA256;
    static hash(message: Word32Array | string, props?: SHA256Props): Word32Array;
}
