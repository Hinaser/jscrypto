import { CipherProps } from "./lib/algorithm/cipher/Cipher";
import { Word32Array } from "./lib/Word32Array";
import { BlockCipher, BlockCipherProps } from "./lib/algorithm/cipher/BlockCipher";
import type { CipherParams } from "./lib/algorithm/cipher/CipherParams";
export interface AESProps extends BlockCipherProps {
}
export declare class AES extends BlockCipher {
    protected _props?: Partial<AESProps>;
    protected _nRounds: number;
    protected _keyPriorReset: Word32Array;
    protected _key: Word32Array;
    protected _keySchedule: number[];
    protected _invKeySchedule: number[];
    protected _keySize: number;
    constructor(props?: Partial<AESProps>);
    protected _doReset(): void;
    encryptBlock(words: number[], offset: number): void;
    decryptBlock(words: number[], offset: number): void;
    protected _doCryptBlock(words: number[], offset: number, keySchedule: number[], subMix0: number[], subMix1: number[], subMix2: number[], subMix3: number[], sBox: number[]): void;
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = JsCrypto.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
     */
    static createEncryptor(key: Word32Array, props?: Partial<CipherProps>): AES;
    /**
     * Creates this cipher in decryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = JsCrypto.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecrypter(key: Word32Array, props?: Partial<CipherProps>): AES;
    /**
     * Encrypt a message with key
     *
     * @param {Word32Array|string} message
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = JsCrypt.AES.encrypt("test", "pass");
     */
    static encrypt(message: Word32Array | string, key: Word32Array | string, props?: Partial<AESProps>): CipherParams;
    /**
     * Encrypt a encrypted message with key
     *
     * @param {CipherParams} cipherText
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = JsCrypt.AES.decrypt(cipherProps, "pass");
     */
    static decrypt(cipherText: CipherParams, key: Word32Array | string, props?: Partial<AESProps>): Word32Array;
}
