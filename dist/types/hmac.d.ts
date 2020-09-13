import { Hasher } from "./lib/algorithm/hasher";
import { IWord32Array } from "./lib/type";
export default class HMAC {
    private _hasher;
    private _oKey;
    private _iKey;
    constructor(hasher: Hasher, key: IWord32Array | string);
    /**
     * Resets this HMAC to its initial state.
     *
     * @example
     *   hmacHasher.reset();
     */
    reset(): void;
    /**
     * Updates this HMAC with a message.
     *
     * @param {IWord32Array|string} messageUpdate The message to append.
     * @return {HMAC} This HMAC instance.
     * @example
     *   hmacHasher.update('message');
     *   hmacHasher.update(wordArray);
     */
    update(messageUpdate: IWord32Array | string): this;
    /**
     * Finalizes the HMAC computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param {IWord32Array|string} messageUpdate (Optional) A final message update.
     * @return {IWord32Array} The HMAC.
     * @example
     *   var hmac = hmacHasher.finalize();
     *   var hmac = hmacHasher.finalize('message');
     *   var hmac = hmacHasher.finalize(wordArray);
     */
    finalize(messageUpdate: IWord32Array | string): IWord32Array;
}
