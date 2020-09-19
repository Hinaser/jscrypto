import { BufferedBlockAlgorithm, BufferedBlockAlgorithmProps } from "./BufferedBlockAlgorithm";
import { IWordArray } from "../type";
export interface HasherProps extends BufferedBlockAlgorithmProps {
    blockSize: number;
}
export declare abstract class Hasher extends BufferedBlockAlgorithm {
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
    reset(data?: IWordArray, nBytes?: number): void;
    /**
     * Updates this hasher with a message.
     *
     * @param {IWordArray|string} messageUpdate The message to append.
     * @return {Hasher} This hasher.
     * @example
     *   hasher.update('message');
     *   hasher.update(wordArray);
     */
    update(messageUpdate: IWordArray | string): this;
    /**
     * Finalizes the hash computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param {IWordArray|string?} messageUpdate (Optional) A final message update.
     * @return {IWordArray} The hash.
     * @example
     *   var hash = hasher.finalize();
     *   var hash = hasher.finalize('message');
     *   var hash = hasher.finalize(wordArray);
     */
    finalize(messageUpdate?: IWordArray | string): IWordArray;
    protected abstract doReset(): void;
    protected abstract doFinalize(): IWordArray;
}
