import { Word64Array } from "./lib/Word64Array";
import { SHA512 } from "./SHA512";
import type { HasherProps } from "./lib/algorithm/Hasher";
import type { Word32Array } from "./lib/Word32Array";
export interface SHA384Props extends HasherProps {
    hash: Word64Array;
}
export declare class SHA384 extends SHA512 {
    protected _props?: Partial<SHA384Props>;
    protected _hash: Word64Array;
    constructor(props?: Partial<SHA384Props>);
    protected _doReset(): void;
    protected _doFinalize(): Word32Array;
    clone(): SHA384;
    static hash(message: Word32Array | string, props?: SHA384Props): Word32Array;
}
