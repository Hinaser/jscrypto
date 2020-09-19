import {BufferedBlockAlgorithm, BufferedBlockAlgorithmProps} from "./BufferedBlockAlgorithm";
import {IWordArray} from "../type";

export interface HasherProps extends BufferedBlockAlgorithmProps {
  blockSize: number;
}

export abstract class Hasher extends BufferedBlockAlgorithm {
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
  public reset(data?: IWordArray, nBytes?: number){
    // Reset data buffer
    super.reset.call(this, data, nBytes);
    // Perform concrete-hasher logic
    this.doReset();
  }
  
  /**
   * Updates this hasher with a message.
   *
   * @param {IWordArray|string} messageUpdate The message to append.
   * @return {Hasher} This hasher.
   * @example
   *   hasher.update('message');
   *   hasher.update(wordArray);
   */
  public update(messageUpdate: IWordArray|string){
    this.append(messageUpdate);
    this.process();
    return this;
  }
  
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
  public finalize(messageUpdate?: IWordArray|string){
    // Final message update
    if (messageUpdate) {
      this.append(messageUpdate);
    }
  
    // Perform concrete-hasher logic
    return this.doFinalize();
  }
  
  protected abstract doReset(): void;
  protected abstract doFinalize(): IWordArray;
}
