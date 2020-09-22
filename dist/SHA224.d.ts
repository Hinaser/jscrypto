import { Word32Array } from "./lib/Word32Array";
import { SHA256 } from "./SHA256";
import type { HasherProps } from "./lib/algorithm/Hasher";
export interface SHA224Props extends HasherProps {
    hash: Word32Array;
}
export declare class SHA224 extends SHA256 {
    protected _props?: Partial<SHA224Props>;
    protected _hash: Word32Array;
    constructor(props?: SHA224Props);
    protected _doReset(): void;
    protected _doFinalize(): Word32Array;
    clone(): SHA224;
    static hash(message: Word32Array | string, props?: SHA224Props): Word32Array;
}
