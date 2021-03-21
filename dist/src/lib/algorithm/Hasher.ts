import {BufferedBlockAlgorithm, BufferedBlockAlgorithmProps} from "./BufferedBlockAlgorithm";
import type {Word32Array} from "../Word32Array";

export interface HasherProps extends BufferedBlockAlgorithmProps {
  blockSize: number;
}

export class Hasher extends BufferedBlockAlgorithm {
  protected _props?: Partial<HasherProps>;
  protected _blockSize: number = 512/32;
  
  public constructor(props?: Partial<HasherProps>){
    super(props);
    this._props = props;
    if(props && typeof props.blockSize === "number"){
      this._blockSize = props.blockSize;
    }
    this.reset(props ? props.data : undefined, props ? props.nBytes : undefined);
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
  public reset(data?: Word32Array, nBytes?: number){
    // Reset data buffer
    super.reset.call(this, data, nBytes);
    // Perform concrete-hasher logic
    this._doReset();
  }
  
  /**
   * Updates this hasher with a message.
   *
   * @param {Word32Array|string} messageUpdate The message to append.
   * @return {Hasher} This hasher.
   * @example
   *   hasher.update('message');
   *   hasher.update(wordArray);
   */
  public update(messageUpdate: Word32Array|string){
    this._append(messageUpdate);
    this._process();
    return this;
  }
  
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
  public finalize(messageUpdate?: Word32Array|string){
    // Final message update
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  
    // Perform concrete-hasher logic
    return this._doFinalize();
  }
  
  /**
   * @abstract
   */
  protected _doReset(): void {
    throw new Error("Not implemented");
  }
  
  /**
   * @abstract
   */
  protected _doFinalize(): Word32Array {
    throw new Error("Not implemented");
  }
}
