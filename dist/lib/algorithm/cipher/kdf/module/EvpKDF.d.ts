import type { Hasher } from "../../../Hasher";
import { Word32Array } from "../../../../Word32Array";
import { BaseKDFModule, BaseKDFModuleProps } from "../type";
export interface EvpKDFProps extends BaseKDFModuleProps {
}
/**
 * This key derivation function is meant to conform with EVP_BytesToKey.
 * https://www.openssl.org/docs/man1.1.1/man3/EVP_BytesToKey.html
 *
 * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
 * @property {Hasher} hasher The hash algorithm to use. Default: MD5
 * @property {number} iterations The number of iterations to perform. Default: 1
 */
export declare class EvpKDF extends BaseKDFModule<EvpKDFProps> {
    protected _keySize: number;
    protected _Hasher: typeof Hasher;
    protected _iterations: number;
    constructor(props?: Partial<EvpKDFProps>);
    /**
     * Derives a key from a password.
     *
     * @param {Word32Array|string} password The password.
     * @param {Word32Array|string} salt A salt.
     * @return {Word32Array} The derived key.
     * @example
     *   var kdf = new EvpKDF();
     *   var key = kdf.compute(password, salt);
     */
    compute(password: Word32Array | string, salt: Word32Array | string): Word32Array;
    /**
     * Derives a key from a password.
     *
     * @param {Word32Array|string} password The password.
     * @param {Word32Array|string} salt A salt.
     * @param {Partial<EvpKDFProps>?} props (Optional) The configuration options to use for this computation.
     * @return {Word32Array} The derived key.
     * @static
     * @example
     *
     *     var key = EvpKDF.getKey(password, salt);
     *     var key = EvpKDF.getKey(password, salt, { keySize: 8 });
     *     var key = EvpKDF.getKey(password, salt, { keySize: 8, iterations: 1000 });
     */
    static getKey(password: Word32Array | string, salt: Word32Array | string, props?: Partial<EvpKDFProps>): Word32Array;
}
