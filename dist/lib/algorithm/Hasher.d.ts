import { BufferedBlockAlgorithm } from "./BufferedBlockAlgorithm";
import { IWord32Array } from "../type";
export declare abstract class Hasher extends BufferedBlockAlgorithm {
    protected _blockSize: number;
    constructor(blockSize?: number, data?: IWord32Array, nBytes?: number);
    get blockSize(): number;
    /**
     * Resets this hasher to its initial state.
     *
     * @example
     *   hasher.reset();
     */
    reset(data?: IWord32Array, nBytes?: number): void;
    /**
     * Updates this hasher with a message.
     *
     * @param {IWord32Array|string} messageUpdate The message to append.
     * @return {Hasher} This hasher.
     * @example
     *   hasher.update('message');
     *   hasher.update(wordArray);
     */
    update(messageUpdate: IWord32Array | string): this;
    /**
     * Finalizes the hash computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param {IWord32Array|string?} messageUpdate (Optional) A final message update.
     * @return {IWord32Array} The hash.
     * @example
     *   var hash = hasher.finalize();
     *   var hash = hasher.finalize('message');
     *   var hash = hasher.finalize(wordArray);
     */
    finalize(messageUpdate?: IWord32Array | string): IWord32Array;
    protected abstract doReset(): void;
    protected abstract doFinalize(): IWord32Array;
}
