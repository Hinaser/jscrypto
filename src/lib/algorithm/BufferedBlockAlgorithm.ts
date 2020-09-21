import {Word32Array} from "../Word32Array";
import {Utf8} from "../encoder/Utf8";

export interface BufferedBlockAlgorithmProps {
  data: Word32Array;
  nBytes: number;
}

export abstract class BufferedBlockAlgorithm {
  protected _props?: Partial<BufferedBlockAlgorithmProps>;
  protected _data: Word32Array;
  protected _nBytes: number;
  protected _minBufferSize: number = 0;
  protected _blockSize: number = 0;
  
  public constructor(props?: Partial<BufferedBlockAlgorithmProps>) {
    this._props = props;
    this._data = props && typeof props.data !== "undefined" ? props.data.clone() : new Word32Array();
    this._nBytes = props && typeof props.nBytes === "number" ? props.nBytes : 0;
  }
  
  public get blockSize(){
    return this._blockSize;
  }
  
  /**
   * Resets this block algorithm's data buffer to its initial state.
   *
   * @example
   *   bufferedBlockAlgorithm.reset();
   */
  public reset(data?: Word32Array, nBytes?: number){
    this._data = typeof data !== "undefined" ? data.clone() : new Word32Array();
    this._nBytes = typeof nBytes === "number" ? nBytes : 0;
  }
  
  /**
   * Adds new data to this block algorithm's buffer.
   *
   * @param {Word32Array|string} data The data to append. Strings are converted to a WordArray using UTF-8.
   * @example
   *   bufferedBlockAlgorithm.append('data');
   *   bufferedBlockAlgorithm.append(wordArray);
   */
  protected _append(data: Word32Array|string){
    if(typeof data === "string"){
      data = Utf8.parse(data);
    }
    
    this._data.concat(data);
    this._nBytes += data.length();
  }
  
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
  protected _process(doFlush?: boolean){
    let processedWords: number[]|undefined;
    const words = this._data.raw();
    const nSigBytes = this._data.length();
    const blockSize = this._blockSize;
    const blockSizeByte = this._blockSize * 4;
    
    let nBlocksReady = nSigBytes / blockSizeByte;
    if(doFlush){
      // Round up to include partial blocks
      nBlocksReady = Math.ceil(nBlocksReady);
    }
    else{
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    
    // Count words ready
    const nWordsReady = nBlocksReady * blockSize;
    
    // Count bytes ready
    const nBytesReady = Math.min(nWordsReady * 4, nSigBytes);
    
    // Process blocks
    if(nWordsReady){
      for(let offset=0;offset<nWordsReady;offset+=blockSize){
        // Perform concrete-algorithm logic
        this._doProcessBlock(words, offset);
      }
      
      // Remove processed words
      processedWords = words.splice(0, nWordsReady);
      this._data.setSignificantBytes(this._data.length() - nBytesReady);
    }
    
    // Return processed words
    return new Word32Array(processedWords, nBytesReady);
  }
  
  protected abstract _doProcessBlock(words: number[], offset: number): void;
}