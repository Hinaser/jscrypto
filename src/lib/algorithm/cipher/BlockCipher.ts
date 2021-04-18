import {Cipher, CipherProps, PropsWithKey} from "./Cipher";
import type {BlockCipherMode, BlockCipherModeProps} from "./mode/BlockCipherMode";
import {CBC} from "./mode/CBC";
import type {Pad} from "./pad/type";
import {Pkcs7} from "./pad/Pkcs7";
import type {Word32Array} from "../../Word32Array";
import type {BaseKDFModule} from "./kdf/type";
import type {Hasher} from "../Hasher";

export interface BlockCipherProps extends CipherProps {
  mode: typeof BlockCipherMode;
  padding: Pad;
  kdfSalt: Word32Array; // 64bit. word32Array. 8words.
  kdfModule: typeof BaseKDFModule;
  kdfHasher: typeof Hasher;
  kdfIterations: number;
}

export class BlockCipher extends Cipher {
  protected _props: PropsWithKey<BlockCipherProps>;
  protected _blockSize = 128/32;
  protected _Mode: typeof BlockCipherMode = CBC;
  protected _mode?: BlockCipherMode;
  protected _padding: Pad = Pkcs7;
  protected _modeCreator?: (props: BlockCipherModeProps) => BlockCipherMode;
  
  /**
   * @see https://github.com/Microsoft/TypeScript/issues/3841#issuecomment-337560146
   */
  ["constructor"]!: typeof BlockCipher;
  
  public constructor(props: PropsWithKey<BlockCipherProps>) {
    super(props);
    this._props = props;
  
    this._Mode = typeof props.mode !== "undefined" ? props.mode : this._Mode;
    this._padding = typeof props.padding !== "undefined" ? props.padding : this._padding;
  
    this.reset(props?.data, props?.nBytes);
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
      modeCreator = this._Mode.createEncryptor;
    }
    else{
      modeCreator = this._Mode.createDecryptor;
      // Keep at least one block in the buffer for unpadding
      this._minBufferSize = 1;
    }
    
    if(this._Mode && this._modeCreator=== modeCreator){
      this._mode = new this._Mode({cipher: this, iv: this._iv});
    }
    else{
      this._mode = modeCreator.call(this._Mode, {cipher: this, iv: this._iv});
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
   * @abstract
   */
  public encryptBlock(words: number[], offset: number): void {
    throw new Error("Not implemented");
  }
  
  /**
   * @abstract
   */
  public decryptBlock(words: number[], offset: number): void {
    throw new Error("Not implemented");
  }
  
  /**
   * Creates this cipher in encryption mode.
   *
   * @param {Word32Array} key The key.
   * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {Cipher} A cipher instance.
   * @example
   *     var cipher = AES.createEncryptor(keyWordArray, { iv: ivWordArray });
   */
  public static createEncryptor(key: Word32Array, props?: Partial<BlockCipherProps>){
    props = typeof props === "undefined" ? {} : props;
    return new BlockCipher({...props, key, transformMode: Cipher.ENC_TRANSFORM_MODE});
  }
  
  /**
   * Creates this cipher in decryption mode.
   * @param {Word32Array} key The key.
   * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {Cipher} A cipher instance.
   * @example
   *   var cipher = AES.createDecryptor(keyWordArray, { iv: ivWordArray });
   */
  public static createDecryptor(key: Word32Array, props?: Partial<BlockCipherProps>){
    props = typeof props === "undefined" ? {} : props;
    return new BlockCipher({...props, key, transformMode: Cipher.DEC_TRANSFORM_MODE});
  }
}
