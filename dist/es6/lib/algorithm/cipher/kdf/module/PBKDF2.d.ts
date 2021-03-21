import type { Hasher } from "../../../Hasher";
import { Word32Array } from "../../../../Word32Array";
import { BaseKDFModule, BaseKDFModuleProps } from "../type";
export interface PBKDF2Props extends BaseKDFModuleProps {
}
/**
 * Password-Based Key Derivation Function 2 algorithm.
 *
 * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
 * @property {Hasher} hasher The hash algorithm to use. Default: SHA1
 * @property {number} iterations The number of iterations to perform. Default: 1
 */
export declare class PBKDF2 extends BaseKDFModule<PBKDF2Props> {
    protected _keySize: number;
    protected _Hasher: typeof Hasher;
    protected _iterations: number;
    constructor(props?: Partial<PBKDF2Props>);
    /**
     * Derives a key from a password.
     *
     * @param {Word32Array|string} password The password.
     * @param {Word32Array|string} salt A salt.
     * @return {Word32Array} The derived key.
     * @example
     *   var kdf = new PBKDF2();
     *   var key = kdf.compute(password, salt);
     */
    compute(password: Word32Array | string, salt: Word32Array | string): Word32Array;
    /**
     * Derives a key from a password.
     *
     * @param {Word32Array|string} password The password.
     * @param {Word32Array|string} salt A salt.
     * @param {Partial<PBKDF2Props>?} props (Optional) The configuration options to use for this computation.
     * @return {Word32Array} The derived key.
     * @static
     * @example
     *     var key = PBKDF2.getKey(password, salt);
     *     var key = PBKDF2.getKey(password, salt, { keySize: 8 });
     *     var key = PBKDF2.getKey(password, salt, { keySize: 8, iterations: 1000 });
     */
    static getKey(password: Word32Array | string, salt: Word32Array | string, props?: Partial<PBKDF2Props>): Word32Array;
}
