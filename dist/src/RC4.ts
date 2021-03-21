import {PropsWithKey} from "./lib/algorithm/cipher/Cipher";
import type {Word32Array} from "./lib/Word32Array";
import {StreamCipher, StreamCipherProps} from "./lib/algorithm/cipher/StreamCipher";
import {PasswordBasedCipher} from "./lib/algorithm/cipher/PasswordBasedCipher";
import {SerializableCipher} from "./lib/algorithm/cipher/SerializableCipher";
import {CipherParams} from "./lib/algorithm/cipher/CipherParams";

export interface RC4Props extends StreamCipherProps {
}

export class RC4 extends StreamCipher {
  public static readonly ivSize = 0;
  public static readonly keySize = 256/32;
  protected _props: PropsWithKey<RC4Props>;
  protected S: number[] = [];
  protected i: number = 0;
  protected j: number = 0;
  
  public constructor(props: PropsWithKey<RC4Props>) {
    super(props);
    this._props = props;
    
    this._doReset();
  }
  
  protected _doReset() {
    // Shortcuts
    const key = this._key;
    const keyWords = key.words;
    const keySigBytes = key.nSigBytes;
  
    // Init sbox
    this.S = [];
    for (let i = 0; i < 256; i++) {
      this.S[i] = i;
    }
  
    // Key setup
    for (let i = 0, j = 0; i < 256; i++) {
      const keyByteIndex = i % keySigBytes;
      const keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;
    
      j = (j + this.S[i] + keyByte) % 256;
    
      // Swap
      const t = this.S[i];
      this.S[i] = this.S[j];
      this.S[j] = t;
    }
  
    // Counters
    this.i = this.j = 0;
  }
  
  protected _doProcessBlock(words: number[], offset: number) {
    words[offset] ^= this.generateKeyStreamWord();
  }
  
  protected generateKeyStreamWord(){
    // Shortcuts
    const S = this.S;
    let i = this.i;
    let j = this.j;
  
    // Generate keyStream word
    let keyStreamWord = 0;
    for (let n = 0; n < 4; n++) {
      i = (i + 1) % 256;
      j = (j + S[i]) % 256;
    
      // Swap
      const t = S[i];
      S[i] = S[j];
      S[j] = t;
    
      keyStreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
    }
  
    // Update counters
    this.i = i;
    this.j = j;
  
    return keyStreamWord;
  }
  
  /**
   * Creates this cipher in encryption mode.
   *
   * @param {Word32Array} key The key.
   * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {Cipher} A cipher instance.
   * @example
   *   var cipher = RC4.createEncryptor(keyWordArray);
   */
  public static createEncryptor(key: Word32Array, props?: Partial<StreamCipherProps>){
    props = typeof props === "undefined" ? {} : props;
    return new RC4({...props, key});
  }
  
  /**
   * Creates this cipher in decryption mode.
   *
   * @param {Word32Array} key The key.
   * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {Cipher} A cipher instance.
   * @example
   *   var cipher = RC4.createDecryptor(keyWordArray, { iv: ivWordArray });
   */
  public static createDecryptor(key: Word32Array, props?: Partial<StreamCipherProps>){
    props = typeof props === "undefined" ? {} : props;
    return new RC4({...props, key});
  }
  
  /**
   * Encrypt a message with key
   * 
   * @param {Word32Array|string} message
   * @param {Word32Array|string} key
   * @param {Partial<AESProps>?} props
   * @example
   *   var encryptedMessage = RC4.encrypt("test", "pass");
   */
  public static encrypt(message: Word32Array|string, key: Word32Array|string, props?: Partial<RC4Props>){
    if(typeof key === "string"){
      return PasswordBasedCipher.encrypt(RC4, message, key, props);
    }
    return SerializableCipher.encrypt(RC4, message, key, props);
  }
  
  /**
   * Encrypt a encrypted message with key
   *
   * @param {CipherParams} cipherText
   * @param {Word32Array|string} key
   * @param {Partial<AESProps>?} props
   * @example
   *   var encryptedMessage = RC4.decrypt(cipherProps, "pass");
   */
  public static decrypt(cipherText: CipherParams, key: Word32Array|string, props?: Partial<RC4Props>){
    if(typeof key === "string"){
      return PasswordBasedCipher.decrypt(RC4, cipherText, key, props);
    }
    return SerializableCipher.decrypt(RC4, cipherText, key, props);
  }
}
