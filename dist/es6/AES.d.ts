import { CipherProps, PropsWithKey } from "./lib/algorithm/cipher/Cipher";
import type { Word32Array } from "./lib/Word32Array";
import { BlockCipher, BlockCipherProps } from "./lib/algorithm/cipher/BlockCipher";
import type { CipherParams } from "./lib/algorithm/cipher/CipherParams";
export interface AESProps extends BlockCipherProps {
}
export declare class AES extends BlockCipher {
    static readonly keySize: number;
    protected _props: PropsWithKey<AESProps>;
    protected _nRounds: number;
    protected _keyPriorReset: Word32Array | undefined;
    protected _keySchedule: number[];
    protected _invKeySchedule: number[];
    constructor(props: PropsWithKey<AESProps>);
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
     *   var cipher = AES.createEncryptor(keyWordArray, { iv: ivWordArray });
     */
    static createEncryptor(key: Word32Array, props?: Partial<CipherProps>): AES;
    /**
     * Creates this cipher in decryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = AES.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key: Word32Array, props?: Partial<CipherProps>): AES;
    /**
     * Encrypt a message with key
     *
     * @param {Word32Array|string} message
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = AES.encrypt("test", "pass");
     */
    static encrypt(message: Word32Array | string, key: Word32Array | string, props?: Partial<AESProps>): CipherParams;
    /**
     * Encrypt a encrypted message with key
     *
     * @param {CipherParams|string} cipherParams
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = AES.decrypt(cipherProps, "pass");
     */
    static decrypt(cipherParams: CipherParams | string, key: Word32Array | string, props?: Partial<AESProps>): Word32Array;
}
