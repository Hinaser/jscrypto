import { BlockCipher, BlockCipherProps } from "./lib/algorithm/cipher/BlockCipher";
import { CipherProps, PropsWithKey } from "./lib/algorithm/cipher/Cipher";
import { Word32Array } from "./lib/Word32Array";
import { CipherParams } from "./lib/algorithm/cipher/CipherParams";
export interface DESProps extends BlockCipherProps {
}
export declare class DES extends BlockCipher {
    static readonly keySize: number;
    static readonly ivSize: number;
    protected _blockSize: number;
    _props: PropsWithKey<DESProps>;
    protected _subKeys: number[][];
    protected _invSubKeys: number[][];
    protected _lBlock: number;
    protected _rBlock: number;
    constructor(props: PropsWithKey<DESProps>);
    protected _doReset(): void;
    encryptBlock(words: number[], offset: number): void;
    decryptBlock(words: number[], offset: number): void;
    protected _doCryptoBlock(words: number[], offset: number, subKeys: number[][]): void;
    protected _exchangeLR(offset: number, mask: number): void;
    protected _exchangeRL(offset: number, mask: number): void;
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = DES.createEncryptor(keyWordArray, { iv: ivWordArray });
     */
    static createEncryptor(key: Word32Array, props?: Partial<CipherProps>): DES;
    /**
     * Creates this cipher in decryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = DES.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key: Word32Array, props?: Partial<CipherProps>): DES;
    /**
     * Encrypt a message with key
     *
     * @param {Word32Array|string} message
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = DES.encrypt("test", "pass");
     */
    static encrypt(message: Word32Array | string, key: Word32Array | string, props?: Partial<DESProps>): CipherParams;
    /**
     * Encrypt a encrypted message with key
     *
     * @param {CipherParams} cipherText
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = DES.decrypt(cipherProps, "pass");
     */
    static decrypt(cipherText: CipherParams, key: Word32Array | string, props?: Partial<DESProps>): Word32Array;
}
