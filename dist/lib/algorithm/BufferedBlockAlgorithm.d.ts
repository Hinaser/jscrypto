import { IWordArray } from "../type";
import { Word32Array } from "../Word32Array";
export declare abstract class BufferedBlockAlgorithm {
    protected _data: IWordArray;
    protected _nBytes: number;
    protected _minBufferSize: number;
    protected _blockSize: number;
    constructor(data?: IWordArray, nBytes?: number);
    /**
     * Resets this block algorithm's data buffer to its initial state.
     *
     * @example
     *   bufferedBlockAlgorithm.reset();
     */
    reset(data?: IWordArray, nBytes?: number): void;
    /**
     * Adds new data to this block algorithm's buffer.
     *
     * @param {IWordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
     * @example
     *   bufferedBlockAlgorithm.append('data');
     *   bufferedBlockAlgorithm.append(wordArray);
     */
    protected append(data: IWordArray | string): void;
    /**
     * Processes available data blocks.
     * This method invokes doProcessBlock(offset), which must be implemented by a concrete subtype.
     *
     * @param {boolean?} doFlush Whether all blocks and partial blocks should be processed.
     * @return {IWordArray} The processed data.
     * @example
     *   var processedData = bufferedBlockAlgorithm.process();
     *   var processedData = bufferedBlockAlgorithm.process(!!'flush');
     */
    protected process(doFlush?: boolean): Word32Array;
    protected abstract doProcessBlock(words: number[], offset: number): void;
}
