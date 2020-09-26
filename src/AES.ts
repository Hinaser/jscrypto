import {Cipher, CipherProps, PropsWithKey} from "./lib/algorithm/cipher/Cipher";
import type {Word32Array} from "./lib/Word32Array";
import {BlockCipher, BlockCipherProps} from "./lib/algorithm/cipher/BlockCipher";
import {PasswordBasedCipher} from "./lib/algorithm/cipher/PasswordBasedCipher";
import {SerializableCipher} from "./lib/algorithm/cipher/SerializableCipher";
import type {CipherParams} from "./lib/algorithm/cipher/CipherParams";

// Lookup tables
const SBOX: number[] = [];
const INV_SBOX: number[] = [];
const SUB_MIX_0: number[] = [];
const SUB_MIX_1: number[] = [];
const SUB_MIX_2: number[] = [];
const SUB_MIX_3: number[] = [];
const INV_SUB_MIX_0: number[] = [];
const INV_SUB_MIX_1: number[] = [];
const INV_SUB_MIX_2: number[] = [];
const INV_SUB_MIX_3: number[] = [];

(function computeLookupTables() {
  // Compute double table
  const d: number[] = [];
  for (let i = 0; i < 256; i++) {
    if (i < 128) {
      d[i] = i << 1;
    } else {
      d[i] = (i << 1) ^ 0x11b;
    }
  }
  
  // Walk GF(2^8)
  let x = 0;
  let xi = 0;
  for (let i = 0; i < 256; i++) {
    // Compute sbox
    let sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
    sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
    SBOX[x] = sx;
    INV_SBOX[sx] = x;
    
    // Compute multiplication
    const x2 = d[x];
    const x4 = d[x2];
    const x8 = d[x4];
    
    // Compute sub bytes, mix columns tables
    let t = (d[sx] * 0x101) ^ (sx * 0x1010100);
    SUB_MIX_0[x] = (t << 24) | (t >>> 8);
    SUB_MIX_1[x] = (t << 16) | (t >>> 16);
    SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
    SUB_MIX_3[x] = t;
    
    // Compute inv sub bytes, inv mix columns tables
    t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
    INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
    INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
    INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
    INV_SUB_MIX_3[sx] = t;
    
    // Compute next counter
    if (!x) {
      x = xi = 1;
    } else {
      x = x2 ^ d[d[d[x8 ^ x2]]];
      xi ^= d[d[xi]];
    }
  }
}());

// Precomputed Rcon lookup
const RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

export interface AESProps extends BlockCipherProps {
}

export class AES extends BlockCipher {
  public static readonly keySize = 256/32;
  protected _props: PropsWithKey<AESProps>;
  protected _nRounds: number = 0;
  protected _keyPriorReset: Word32Array|undefined;
  protected _keySchedule: number[] = [];
  protected _invKeySchedule: number[] = [];
  
  public constructor(props: PropsWithKey<AESProps>) {
    super(props);
    this._props = props;
    
    this._doReset();
  }
  
  protected _doReset() {
    let t;
  
    // Skip reset of nRounds has been set before and key did not change
    if (this._nRounds && this._keyPriorReset === this._key) {
      return;
    }
  
    // Shortcuts
    const key = this._keyPriorReset = this._key;
    const keyWords = key.words;
    const keySize = key.nSigBytes / 4;
  
    // Compute number of rounds
    const nRounds = this._nRounds = keySize + 6;
  
    // Compute number of key schedule rows
    const ksRows = (nRounds + 1) * 4;
  
    // Compute key schedule
    const keySchedule: number[] = this._keySchedule = [];
    for (let ksRow = 0; ksRow < ksRows; ksRow++) {
      if (ksRow < keySize) {
        keySchedule[ksRow] = keyWords[ksRow];
      }
      else {
        t = keySchedule[ksRow - 1];
      
        if (!(ksRow % keySize)) {
          // Rot word
          t = (t << 8) | (t >>> 24);
        
          // Sub word
          t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
        
          // Mix Rcon
          t ^= RCON[(ksRow / keySize) | 0] << 24;
        }
        else if (keySize > 6 && ksRow % keySize === 4) {
          // Sub word
          t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
        }
      
        keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
      }
    }
  
    // Compute inv key schedule
    this._invKeySchedule = [];
    for (let invKsRow = 0; invKsRow < ksRows; invKsRow++) {
      const ksRow = ksRows - invKsRow;
      
      if (invKsRow % 4) {
        t = keySchedule[ksRow];
      }
      else {
        t = keySchedule[ksRow - 4];
      }
    
      if (invKsRow < 4 || ksRow <= 4) {
        this._invKeySchedule[invKsRow] = t;
      }
      else {
        this._invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
          INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
      }
    }
  }
  
  public encryptBlock(words: number[], offset: number) {
    this._doCryptBlock(words, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
  }
  
  public decryptBlock(words: number[], offset: number) {
    // Swap 2nd and 4th rows
    let t = words[offset + 1];
    words[offset + 1] = words[offset + 3];
    words[offset + 3] = t;
  
    this._doCryptBlock(words, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
  
    // Inv swap 2nd and 4th rows
    t = words[offset + 1];
    words[offset + 1] = words[offset + 3];
    words[offset + 3] = t;
  }
  
  protected _doCryptBlock(
    words: number[],
    offset: number,
    keySchedule: number[],
    subMix0: number[],
    subMix1: number[],
    subMix2: number[],
    subMix3: number[],
    sBox: number[],
  ){
    // Shortcut
    const nRounds = this._nRounds;
  
    // Get input, add round key
    let s0 = words[offset]     ^ keySchedule[0];
    let s1 = words[offset + 1] ^ keySchedule[1];
    let s2 = words[offset + 2] ^ keySchedule[2];
    let s3 = words[offset + 3] ^ keySchedule[3];
  
    // Key schedule row counter
    let ksRow = 4;
  
    // Rounds
    for (let round = 1; round < nRounds; round++) {
      // Shift rows, sub bytes, mix columns, add round key
      const _s0 = subMix0[s0 >>> 24] ^ subMix1[(s1 >>> 16) & 0xff]
        ^ subMix2[(s2 >>> 8) & 0xff] ^ subMix3[s3 & 0xff] ^ keySchedule[ksRow++];
      const _s1 = subMix0[s1 >>> 24] ^ subMix1[(s2 >>> 16) & 0xff]
        ^ subMix2[(s3 >>> 8) & 0xff] ^ subMix3[s0 & 0xff] ^ keySchedule[ksRow++];
      const _s2 = subMix0[s2 >>> 24] ^ subMix1[(s3 >>> 16) & 0xff]
        ^ subMix2[(s0 >>> 8) & 0xff] ^ subMix3[s1 & 0xff] ^ keySchedule[ksRow++];
      const _s3 = subMix0[s3 >>> 24] ^ subMix1[(s0 >>> 16) & 0xff]
        ^ subMix2[(s1 >>> 8) & 0xff] ^ subMix3[s2 & 0xff] ^ keySchedule[ksRow++];
    
      // Update state
      s0 = _s0;
      s1 = _s1;
      s2 = _s2;
      s3 = _s3;
    }
  
    // Shift rows, sub bytes, add round key
    const t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16)
      | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
    const t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16)
      | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
    const t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16)
      | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
    const t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16)
      | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];
  
    // Set output
    words[offset]     = t0;
    words[offset + 1] = t1;
    words[offset + 2] = t2;
    words[offset + 3] = t3;
  }
  
  /**
   * Creates this cipher in encryption mode.
   *
   * @param {Word32Array} key The key.
   * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {Cipher} A cipher instance.
   * @example
   *   var cipher = JsCrypto.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
   */
  public static createEncryptor(key: Word32Array, props?: Partial<CipherProps>){
    props = typeof props === "undefined" ? {} : props;
    return new AES({...props, key, transformMode: Cipher.ENC_TRANSFORM_MODE});
  }
  
  /**
   * Creates this cipher in decryption mode.
   *
   * @param {Word32Array} key The key.
   * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
   * @return {Cipher} A cipher instance.
   * @example
   *   var cipher = JsCrypto.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
   */
  public static createDecrypter(key: Word32Array, props?: Partial<CipherProps>){
    props = typeof props === "undefined" ? {} : props;
    return new AES({...props, key, transformMode: Cipher.DEC_TRANSFORM_MODE});
  }
  
  /**
   * Encrypt a message with key
   * 
   * @param {Word32Array|string} message
   * @param {Word32Array|string} key
   * @param {Partial<AESProps>?} props
   * @example
   *   var encryptedMessage = JsCrypt.AES.encrypt("test", "pass");
   */
  public static encrypt(message: Word32Array|string, key: Word32Array|string, props?: Partial<AESProps>){
    if(typeof key === "string"){
      return PasswordBasedCipher.encrypt(AES, message, key, props);
    }
    return SerializableCipher.encrypt(AES, message, key, props);
  }
  
  /**
   * Encrypt a encrypted message with key
   *
   * @param {CipherParams} cipherText
   * @param {Word32Array|string} key
   * @param {Partial<AESProps>?} props
   * @example
   *   var encryptedMessage = JsCrypt.AES.decrypt(cipherProps, "pass");
   */
  public static decrypt(cipherText: CipherParams, key: Word32Array|string, props?: Partial<AESProps>){
    if(typeof key === "string"){
      return PasswordBasedCipher.decrypt(AES, cipherText, key, props);
    }
    return SerializableCipher.decrypt(AES, cipherText, key, props);
  }
}
