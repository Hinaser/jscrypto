import { Hasher, HasherProps } from "./lib/algorithm/Hasher";
import { IWordArray } from "./lib/type";
export interface MD5Props extends HasherProps {
    hash: IWordArray;
}
/**
 * MD5 hash algorithm
 */
export default class MD5 extends Hasher {
    private _hash;
    constructor(props?: MD5Props);
    protected doReset(): void;
    protected doProcessBlock(words: number[], offset: number): void;
    protected doFinalize(): IWordArray;
    clone(): MD5;
    static hash(message: IWordArray | string): IWordArray;
}
