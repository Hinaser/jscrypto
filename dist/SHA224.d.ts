import { IWordArray } from "./lib/type";
import { SHA256 } from "./SHA256";
import { HasherProps } from "./lib/algorithm/Hasher";
export interface SHA224Props extends HasherProps {
    hash: IWordArray;
}
export declare class SHA224 extends SHA256 {
    protected _props?: Partial<SHA224Props>;
    protected _hash: IWordArray;
    constructor(props?: SHA224Props);
    protected doReset(): void;
    protected doFinalize(): IWordArray;
    clone(): SHA224;
    static hash(message: IWordArray | string, props?: SHA224Props): IWordArray;
}
