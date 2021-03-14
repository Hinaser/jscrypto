import { CipherProps, PropsWithKey } from "./lib/algorithm/cipher/Cipher";
import type { Word32Array } from "./lib/Word32Array";
import { StreamCipher } from "./lib/algorithm/cipher/StreamCipher";
import { CipherParams } from "./lib/algorithm/cipher/CipherParams";
export interface RabbitProps extends CipherProps {
}
export declare class Rabbit extends StreamCipher {
    protected _blockSize: number;
    static readonly ivSize: number;
    protected _props: PropsWithKey<RabbitProps>;
    protected S: number[];
    protected C: number[];
    protected G: number[];
    protected _X: number[];
    protected _C: number[];
    protected _b: number;
    constructor(props: PropsWithKey<RabbitProps>);
    protected _doReset(): void;
    protected _doProcessBlock(words: number[], offset: number): void;
    protected nextState(): void;
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = Rabbit.createEncryptor(keyWordArray);
     */
    static createEncryptor(key: Word32Array, props?: Partial<CipherProps>): Rabbit;
    /**
     * Creates this cipher in decryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = Rabbit.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key: Word32Array, props?: Partial<CipherProps>): Rabbit;
    /**
     * Encrypt a message with key
     *
     * @param {Word32Array|string} message
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = Rabbit.encrypt("test", "pass");
     */
    static encrypt(message: Word32Array | string, key: Word32Array | string, props?: Partial<RabbitProps>): CipherParams;
    /**
     * Encrypt a encrypted message with key
     *
     * @param {CipherParams} cipherText
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = Rabbit.decrypt(cipherProps, "pass");
     */
    static decrypt(cipherText: CipherParams, key: Word32Array | string, props?: Partial<RabbitProps>): Word32Array;
}
