import { Hasher, HasherProps } from "./lib/algorithm/Hasher";
import { Word64Array } from "./lib/Word64Array";
import { IWordArray } from "./lib/type";
export interface SHA512Props extends HasherProps {
    hash: Word64Array;
}
export declare class SHA512 extends Hasher {
    protected _props?: Partial<SHA512Props>;
    protected _blockSize: number;
    protected _hash: Word64Array;
    constructor(props?: Partial<SHA512Props>);
    protected doReset(): void;
    protected doProcessBlock(words: number[], offset: number): void;
    protected doFinalize(): IWordArray;
    clone(): SHA512;
    static hash(message: IWordArray | string, props?: SHA512Props): IWordArray;
}
