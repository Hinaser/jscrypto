import {Cipher, CipherProps} from "./Cipher";
import {BlockCipherMode, BlockCipherModeProps} from "./mode/BlockCipherMode";
import {Pad} from "./pad/pad";
import {CBC} from "./mode/CBC";
import {Pkcs7} from "./pad/Pkcs7";
import {Word32Array} from "../../Word32Array";

export interface BlockCipherProps extends CipherProps {
  mode: typeof BlockCipherMode;
  padding: Pad;
}

export class BlockCipher extends Cipher {
  protected _props?: Partial<BlockCipherProps>;
  protected _blockSize = 128/32;
  protected _Mode: typeof BlockCipherMode = CBC;
  protected _mode?: BlockCipherMode;
  protected _padding: Pad = Pkcs7;
  protected _modeCreator?: (props: BlockCipherModeProps) => BlockCipherMode;
  
  /**
   * @see https://github.com/Microsoft/TypeScript/issues/3841#issuecomment-337560146
   */
  ["constructor"]!: typeof BlockCipher;
  
  public constructor(props?: Partial<BlockCipherProps>) {
    super(props);
    this._props = props;
    
    if(props){
      this._Mode = typeof props.mode !== "undefined" ? props.mode : this._Mode;
      this._padding = typeof props.padding !== "undefined" ? props.padding : this._padding;
    }
  
    this.reset(props?.data, props?.nBytes);
  }
  
  public get iv(){
    return this._iv;
  }
  
  public get mode(){
    return this._mode;
  }
  
  public get padding(){
    return this._padding;
  }
  
  reset(data?: Word32Array, nBytes?: number) {
    super.reset(data, nBytes);
    
    let modeCreator: (props: BlockCipherModeProps) => BlockCipherMode;
    if(this._transformMode === Cipher.ENC_TRANSFORM_MODE){
      modeCreator = this._Mode.createEncrypter;
    }
    else{
      modeCreator = this._Mode.createDecrypter;
      // Keep at least one block in the buffer for unpadding
      this._minBufferSize = 1;
    }
    
    if(this._Mode && this._modeCreator=== modeCreator){
      this._mode = new this._Mode({cipher: this, iv: this._iv && this._iv.raw()});
    }
    else{
      this._mode = modeCreator.call(this._Mode, {cipher: this, iv: this._iv && this._iv.raw()});
      this._modeCreator = modeCreator;
    }
  }
  
  protected _doProcessBlock(words: number[], offset: number) {
    this._mode?.processBlock(words, offset);
  }
  
  protected _doFinalize(): Word32Array {
    let finalProcessedBlocks: Word32Array;
  
    // Shortcut
    const padding = this._padding;
  
    // Finalize
    if (this._transformMode === Cipher.ENC_TRANSFORM_MODE) {
      // Pad data
      padding.pad(this._data, this.blockSize);
    
      // Process final blocks
      finalProcessedBlocks = this._process(true);
    }
    else /* if (this._transformMode == Cipher._DEC_TRANSFORM_MODE) */ {
      // Process final blocks
      finalProcessedBlocks = this._process(true);
    
      // Unpad data
      padding.unpad(finalProcessedBlocks);
    }
  
    return finalProcessedBlocks;
  }
  
  /**
   * Creates this cipher in encryption mode.
   *
   * @param {Word32Array} key The key.
   * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {Cipher} A cipher instance.
   * @example
   *     var cipher = JsCrypto.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
   */
  public static createEncryptor(key: Word32Array, props?: Partial<BlockCipherProps>){
    if(typeof props === "undefined"){
      props = {};
    }
    props = {...props, key, transformMode: Cipher.ENC_TRANSFORM_MODE};
    return new BlockCipher(props);
  }
  
  /**
   * Creates this cipher in decryption mode.
   * @param {Word32Array} key The key.
   * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {Cipher} A cipher instance.
   * @example
   *   var cipher = JsCrypto.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
   */
  public static createDecryptor(key: Word32Array, props?: Partial<BlockCipherProps>){
    if(typeof props === "undefined"){
      props = {};
    }
    props = {...props, key, transformMode: Cipher.DEC_TRANSFORM_MODE};
    return new BlockCipher(props);
  }
}
