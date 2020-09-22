import { Word32Array } from "../Word32Array";
export interface BufferedBlockAlgorithmProps {
    data: Word32Array;
    nBytes: number;
}
export declare class BufferedBlockAlgorithm {
    protected _props?: Partial<BufferedBlockAlgorithmProps>;
    protected _data: Word32Array;
    protected _nBytes: number;
    protected _minBufferSize: number;
    protected _blockSize: number;
    constructor(props?: Partial<BufferedBlockAlgorithmProps>);
    get blockSize(): number;
    /**
     * Resets this block algorithm's data buffer to its initial state.
     *
     * @example
     *   bufferedBlockAlgorithm.reset();
     */
    reset(data?: Word32Array, nBytes?: number): void;
    /**
     * Adds new data to this block algorithm's buffer.
     *
     * @param {Word32Array|string} data The data to append. Strings are converted to a WordArray using UTF-8.
     * @example
     *   bufferedBlockAlgorithm.append('data');
     *   bufferedBlockAlgorithm.append(wordArray);
     */
    protected _append(data: Word32Array | string): void;
    /**
     * Processes available data blocks.
     * This method invokes doProcessBlock(offset), which must be implemented by a concrete subtype.
     *
     * @param {boolean?} doFlush Whether all blocks and partial blocks should be processed.
     * @return {Word32Array} The processed data.
     * @example
     *   var processedData = bufferedBlockAlgorithm.process();
     *   var processedData = bufferedBlockAlgorithm.process(!!'flush');
     */
    protected _process(doFlush?: boolean): Word32Array;
    /**
     * @abstract
     */
    protected _doProcessBlock(words: number[], offset: number): void;
}
