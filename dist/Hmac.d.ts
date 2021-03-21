import type { Hasher } from "./lib/algorithm/Hasher";
import type { Word32Array } from "./lib/Word32Array";
export declare class Hmac {
    private _hasher;
    private _oKey;
    private _iKey;
    constructor(hasher: Hasher, key: Word32Array | string);
    /**
     * Resets this Hmac to its initial state.
     *
     * @example
     *   hmacHasher.reset();
     */
    reset(): void;
    /**
     * Updates this Hmac with a message.
     *
     * @param {Word32Array|string} messageUpdate The message to append.
     * @return {Hmac} This Hmac instance.
     * @example
     *   hmacHasher.update('message');
     *   hmacHasher.update(wordArray);
     */
    update(messageUpdate: Word32Array | string): this;
    /**
     * Finalizes the Hmac computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param {Word32Array|string} messageUpdate (Optional) A final message update.
     * @return {Word32Array} The Hmac.
     * @example
     *   var hmac = hmacHasher.finalize();
     *   var hmac = hmacHasher.finalize('message');
     *   var hmac = hmacHasher.finalize(wordArray);
     */
    finalize(messageUpdate: Word32Array | string): Word32Array;
}
