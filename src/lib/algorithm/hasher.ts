import {BufferedBlockAlgorithm} from "./bufferedBlockAlgorithm";
import {IWord32Array} from "../type";

export abstract class Hasher extends BufferedBlockAlgorithm {
  protected _blockSize: number = 512/32;
  
  public constructor(blockSize?: number, data?: IWord32Array, nBytes?: number){
    super(data, nBytes);
    if(typeof blockSize === "number"){
      this._blockSize = blockSize;
    }
    this.reset(data, nBytes);
  }
  
  public get blockSize(){
    return this._blockSize;
  }
  
  /**
   * Resets this hasher to its initial state.
   *
   * @example
   *   hasher.reset();
   */
  public reset(data?: IWord32Array, nBytes?: number){
    // Reset data buffer
    super.reset.call(this, data, nBytes);
    // Perform concrete-hasher logic
    this.doReset();
  }
  
  /**
   * Updates this hasher with a message.
   *
   * @param {IWord32Array|string} messageUpdate The message to append.
   * @return {Hasher} This hasher.
   * @example
   *   hasher.update('message');
   *   hasher.update(wordArray);
   */
  public update(messageUpdate: IWord32Array|string){
    this.append(messageUpdate);
    this.process();
    return this;
  }
  
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
  public finalize(messageUpdate?: IWord32Array|string){
    // Final message update
    if (messageUpdate) {
      this.append(messageUpdate);
    }
  
    // Perform concrete-hasher logic
    return this.doFinalize();
  }
  
  protected abstract doReset(): void;
  protected abstract doFinalize(): IWord32Array;
}
