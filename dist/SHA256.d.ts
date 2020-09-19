import { Hasher, HasherProps } from "./lib/algorithm/Hasher";
import { IWordArray } from "./lib/type";
export interface SHA256Props extends HasherProps {
    hash: IWordArray;
}
export default class SHA256 extends Hasher {
    protected _props?: Partial<SHA256Props>;
    protected _hash: IWordArray;
    constructor(props?: SHA256Props);
    protected doReset(): void;
    protected doProcessBlock(words: number[], offset: number): void;
    protected doFinalize(): IWordArray;
    clone(): SHA256;
    static hash(message: IWordArray | string, props?: SHA256Props): IWordArray;
}
