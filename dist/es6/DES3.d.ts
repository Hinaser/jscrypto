import { BlockCipher, BlockCipherProps } from "./lib/algorithm/cipher/BlockCipher";
import { CipherProps, PropsWithKey } from "./lib/algorithm/cipher/Cipher";
import { DES } from "./DES";
import { Word32Array } from "./lib/Word32Array";
import { CipherParams } from "./lib/algorithm/cipher/CipherParams";
export interface DES3Props extends BlockCipherProps {
}
export declare class DES3 extends BlockCipher {
    static readonly keySize: number;
    static readonly ivSize: number;
    protected _blockSize: number;
    protected _des1: DES;
    protected _des2: DES;
    protected _des3: DES;
    constructor(props: PropsWithKey<DES3Props>);
    protected _get3DES(): DES[];
    protected _doReset(): void;
    encryptBlock(words: number[], offset: number): void;
    decryptBlock(words: number[], offset: number): void;
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = DES3.createEncryptor(keyWordArray, { iv: ivWordArray });
     */
    static createEncryptor(key: Word32Array, props?: Partial<CipherProps>): DES3;
    /**
     * Creates this cipher in decryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = DES3.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key: Word32Array, props?: Partial<CipherProps>): DES3;
    /**
     * Encrypt a message with key
     *
     * @param {Word32Array|string} message
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = DES3.encrypt("test", "pass");
     */
    static encrypt(message: Word32Array | string, key: Word32Array | string, props?: Partial<DES3Props>): CipherParams;
    /**
     * Encrypt a encrypted message with key
     *
     * @param {CipherParams} cipherText
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = DES3.decrypt(cipherProps, "pass");
     */
    static decrypt(cipherText: CipherParams, key: Word32Array | string, props?: Partial<DES3Props>): Word32Array;
}
