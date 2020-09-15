import { IWord32Array } from "../type";
import { Word32Array } from "../Word32Array";
export declare abstract class BufferedBlockAlgorithm {
    protected _data: IWord32Array;
    protected _nBytes: number;
    protected _minBufferSize: number;
    protected _blockSize: number;
    constructor(data?: IWord32Array, nBytes?: number);
    /**
     * Resets this block algorithm's data buffer to its initial state.
     *
     * @example
     *   bufferedBlockAlgorithm.reset();
     */
    reset(data?: IWord32Array, nBytes?: number): void;
    /**
     * Adds new data to this block algorithm's buffer.
     *
     * @param {IWord32Array|string} data The data to append. Strings are converted to a WordArray using UTF-8.
     * @example
     *   bufferedBlockAlgorithm.append('data');
     *   bufferedBlockAlgorithm.append(wordArray);
     */
    protected append(data: IWord32Array | string): void;
    /**
     * Processes available data blocks.
     * This method invokes doProcessBlock(offset), which must be implemented by a concrete subtype.
     *
     * @param {boolean?} doFlush Whether all blocks and partial blocks should be processed.
     * @return {IWord32Array} The processed data.
     * @example
     *   var processedData = bufferedBlockAlgorithm.process();
     *   var processedData = bufferedBlockAlgorithm.process(!!'flush');
     */
    protected process(doFlush?: boolean): Word32Array;
    protected abstract doProcessBlock(words: number[], offset: number): void;
}
