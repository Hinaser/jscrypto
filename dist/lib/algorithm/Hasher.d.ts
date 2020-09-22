import { BufferedBlockAlgorithm, BufferedBlockAlgorithmProps } from "./BufferedBlockAlgorithm";
import type { Word32Array } from "../Word32Array";
export interface HasherProps extends BufferedBlockAlgorithmProps {
    blockSize: number;
}
export declare class Hasher extends BufferedBlockAlgorithm {
    protected _props?: Partial<HasherProps>;
    protected _blockSize: number;
    constructor(props?: Partial<HasherProps>);
    get blockSize(): number;
    /**
     * Resets this hasher to its initial state.
     *
     * @example
     *   hasher.reset();
     */
    reset(data?: Word32Array, nBytes?: number): void;
    /**
     * Updates this hasher with a message.
     *
     * @param {Word32Array|string} messageUpdate The message to append.
     * @return {Hasher} This hasher.
     * @example
     *   hasher.update('message');
     *   hasher.update(wordArray);
     */
    update(messageUpdate: Word32Array | string): this;
    /**
     * Finalizes the hash computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param {Word32Array|string?} messageUpdate (Optional) A final message update.
     * @return {Word32Array} The hash.
     * @example
     *   var hash = hasher.finalize();
     *   var hash = hasher.finalize('message');
     *   var hash = hasher.finalize(wordArray);
     */
    finalize(messageUpdate?: Word32Array | string): Word32Array;
    /**
     * @abstract
     */
    protected _doReset(): void;
    /**
     * @abstract
     */
    protected _doFinalize(): Word32Array;
}
