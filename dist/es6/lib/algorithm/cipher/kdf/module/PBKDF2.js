import { SHA256 } from "../../../../../SHA256";
import { Hmac } from "../../../../../Hmac";
import { Word32Array } from "../../../../Word32Array";
import { BaseKDFModule } from "../type";
/**
 * Password-Based Key Derivation Function 2 algorithm.
 *
 * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
 * @property {Hasher} hasher The hash algorithm to use. Default: SHA1
 * @property {number} iterations The number of iterations to perform. Default: 1
 */
export class PBKDF2 extends BaseKDFModule {
    constructor(props) {
        super(props);
        this._keySize = 128 / 32;
        this._Hasher = SHA256;
        this._iterations = 10000;
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
     *   var kdf = new PBKDF2();
     *   var key = kdf.compute(password, salt);
     */
    compute(password, salt) {
        // Init HMAC
        const hmac = new Hmac(new this._Hasher(), password);
        // Initial values
        const derivedKey = new Word32Array();
        const blockIndex = new Word32Array([0x00000001]);
        // Shortcuts
        const derivedKeyWords = derivedKey.words;
        const blockIndexWords = blockIndex.words;
        const keySize = this._keySize;
        const iterations = this._iterations;
        // Generate key
        while (derivedKeyWords.length < keySize) {
            const block = hmac.update(salt).finalize(blockIndex);
            hmac.reset();
            // Shortcuts
            const blockWords = block.words;
            const blockWordsLength = blockWords.length;
            // Iterations
            let intermediate = block;
            for (let i = 1; i < iterations; i++) {
                intermediate = hmac.finalize(intermediate);
                hmac.reset();
                // Shortcut
                const intermediateWords = intermediate.words;
                // XOR intermediate with block
                for (let j = 0; j < blockWordsLength; j++) {
                    blockWords[j] ^= intermediateWords[j];
                }
            }
            derivedKey.concat(block);
            blockIndexWords[0]++;
        }
        derivedKey.nSigBytes = keySize * 4;
        return derivedKey;
    }
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
    static getKey(password, salt, props) {
        return new PBKDF2(props).compute(password, salt);
    }
}
