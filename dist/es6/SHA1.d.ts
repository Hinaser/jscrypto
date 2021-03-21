import { Hasher, HasherProps } from "./lib/algorithm/Hasher";
import { Word32Array } from "./lib/Word32Array";
export interface SHA1Props extends HasherProps {
    hash: Word32Array;
}
export declare class SHA1 extends Hasher {
    protected _props?: Partial<SHA1Props>;
    private _hash;
    constructor(props?: SHA1Props);
    protected _doReset(): void;
    protected _doProcessBlock(words: number[], offset: number): void;
    protected _doFinalize(): Word32Array;
    clone(): SHA1;
    static hash(message: Word32Array | string, props?: SHA1Props): Word32Array;
}
