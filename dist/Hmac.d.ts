import { Hasher } from "./lib/algorithm/Hasher";
import { IWordArray } from "./lib/type";
export default class Hmac {
    private _hasher;
    private _oKey;
    private _iKey;
    constructor(hasher: Hasher, key: IWordArray | string);
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
     * @param {IWordArray|string} messageUpdate The message to append.
     * @return {Hmac} This Hmac instance.
     * @example
     *   hmacHasher.update('message');
     *   hmacHasher.update(wordArray);
     */
    update(messageUpdate: IWordArray | string): this;
    /**
     * Finalizes the Hmac computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param {IWordArray|string} messageUpdate (Optional) A final message update.
     * @return {IWordArray} The Hmac.
     * @example
     *   var hmac = hmacHasher.finalize();
     *   var hmac = hmacHasher.finalize('message');
     *   var hmac = hmacHasher.finalize(wordArray);
     */
    finalize(messageUpdate: IWordArray | string): IWordArray;
}
