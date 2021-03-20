import type { Hasher } from "../../Hasher";
import type { CipherParams } from "../CipherParams";
import type { Word32Array } from "../../../Word32Array";
export interface KDFParams extends Pick<CipherParams, "toString"> {
    key: Word32Array;
    iv: Word32Array;
    salt: Word32Array;
}
export interface KDFProps {
    kdfModule: typeof BaseKDFModule;
    kdfHasher: typeof Hasher;
    kdfIterations: number;
}
export interface KDF {
    execute: (password: Word32Array | string, keySize: number, ivSize: number, salt?: Word32Array, props?: Partial<KDFProps>) => KDFParams;
}
export interface BaseKDFModuleProps {
    keySize: number;
    Hasher: typeof Hasher;
    iterations: number;
}
export declare class BaseKDFModule<P extends BaseKDFModuleProps = BaseKDFModuleProps> {
    protected _props?: Partial<P>;
    constructor(props?: Partial<P>);
    compute(password: Word32Array | string, salt: Word32Array | string): Word32Array;
    static getKey<P2 extends BaseKDFModuleProps>(password: Word32Array | string, salt: Word32Array | string, props?: Partial<P2>): Word32Array;
}
