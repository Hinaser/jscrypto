import { Word64Array } from "./lib/Word64Array";
import { IWordArray } from "./lib/type";
import SHA512 from "./SHA512";
import { HasherProps } from "./lib/algorithm/Hasher";
export interface SHA384Props extends HasherProps {
    hash: Word64Array;
}
export default class SHA384 extends SHA512 {
    protected _props?: Partial<SHA384Props>;
    protected _hash: Word64Array;
    constructor(props?: Partial<SHA384Props>);
    protected doReset(): void;
    protected doFinalize(): IWordArray;
    clone(): SHA384;
    static hash(message: IWordArray | string, props?: SHA384Props): IWordArray;
}
