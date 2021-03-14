import { MD5 } from "../../../../../MD5";
import { Word32Array } from "../../../../Word32Array";
import { BaseKDFModule } from "../type";
/**
 * This key derivation function is meant to conform with EVP_BytesToKey.
 * https://www.openssl.org/docs/man1.1.1/man3/EVP_BytesToKey.html
 *
 * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
 * @property {Hasher} hasher The hash algorithm to use. Default: MD5
 * @property {number} iterations The number of iterations to perform. Default: 1
 */
export class EvpKDF extends BaseKDFModule {
    constructor(props) {
        super(props);
        this._keySize = 128 / 32;
        this._Hasher = MD5;
        this._iterations = 1;
        if (props) {
            this._keySize = typeof props.keySize !== "undefined" ? props.keySize : this._keySize;
            this._Hasher = typeof props.Hasher !== "undefined" ? props.Hasher : this._Hasher;
            this._iterations = typeof props.iterations !== "undefined" ? props.iterations : this._iterations;
        }
    }
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
    compute(password, salt) {
        let block;
        // Init hasher
        const hasher = new this._Hasher();
        // Initial values
        const derivedKey = new Word32Array();
        // Shortcuts
        const derivedKeyWords = derivedKey.words;
        const keySize = this._keySize;
        const iterations = this._iterations;
        // Generate key
        while (derivedKeyWords.length < keySize) {
            if (block) {
                hasher.update(block);
            }
            block = hasher.update(password).finalize(salt);
            hasher.reset();
            // Iterations
            for (let i = 1; i < iterations; i++) {
                block = hasher.finalize(block);
                hasher.reset();
            }
            derivedKey.concat(block);
        }
        derivedKey.nSigBytes = keySize * 4;
        return derivedKey;
    }
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
    static getKey(password, salt, props) {
        return new EvpKDF(props).compute(password, salt);
    }
}
