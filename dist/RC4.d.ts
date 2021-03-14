import { PropsWithKey } from "./lib/algorithm/cipher/Cipher";
import type { Word32Array } from "./lib/Word32Array";
import { StreamCipher, StreamCipherProps } from "./lib/algorithm/cipher/StreamCipher";
import { CipherParams } from "./lib/algorithm/cipher/CipherParams";
export interface RC4Props extends StreamCipherProps {
}
export declare class RC4 extends StreamCipher {
    static readonly ivSize = 0;
    static readonly keySize: number;
    protected _props: PropsWithKey<RC4Props>;
    protected S: number[];
    protected i: number;
    protected j: number;
    constructor(props: PropsWithKey<RC4Props>);
    protected _doReset(): void;
    protected _doProcessBlock(words: number[], offset: number): void;
    protected generateKeyStreamWord(): number;
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = RC4.createEncryptor(keyWordArray);
     */
    static createEncryptor(key: Word32Array, props?: Partial<StreamCipherProps>): RC4;
    /**
     * Creates this cipher in decryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = RC4.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key: Word32Array, props?: Partial<StreamCipherProps>): RC4;
    /**
     * Encrypt a message with key
     *
     * @param {Word32Array|string} message
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = RC4.encrypt("test", "pass");
     */
    static encrypt(message: Word32Array | string, key: Word32Array | string, props?: Partial<RC4Props>): CipherParams;
    /**
     * Encrypt a encrypted message with key
     *
     * @param {CipherParams} cipherText
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = RC4.decrypt(cipherProps, "pass");
     */
    static decrypt(cipherText: CipherParams, key: Word32Array | string, props?: Partial<RC4Props>): Word32Array;
}
