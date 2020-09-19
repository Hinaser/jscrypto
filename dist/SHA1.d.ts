import { Hasher, HasherProps } from "./lib/algorithm/Hasher";
import { IWordArray } from "./lib/type";
export interface SHA1Props extends HasherProps {
    hash: IWordArray;
}
export default class SHA1 extends Hasher {
    protected _props?: Partial<SHA1Props>;
    private _hash;
    constructor(props?: SHA1Props);
    protected doReset(): void;
    protected doProcessBlock(words: number[], offset: number): void;
    protected doFinalize(): IWordArray;
    clone(): SHA1;
    static hash(message: IWordArray | string, props?: SHA1Props): IWordArray;
}
