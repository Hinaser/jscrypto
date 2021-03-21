import { CipherProps, PropsWithKey } from "./lib/algorithm/cipher/Cipher";
import type { Word32Array } from "./lib/Word32Array";
import { CipherParams } from "./lib/algorithm/cipher/CipherParams";
import { RC4 } from "./RC4";
export interface RC4DropProps extends CipherProps {
    drop?: number;
}
export declare class RC4Drop extends RC4 {
    protected drop: number;
    constructor(props: PropsWithKey<RC4DropProps>);
    protected _doReset(): void;
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = RC4Drop.createEncryptor(keyWordArray);
     */
    static createEncryptor(key: Word32Array, props?: Partial<CipherProps>): RC4Drop;
    /**
     * Creates this cipher in decryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = RC4Drop.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key: Word32Array, props?: Partial<CipherProps>): RC4Drop;
    /**
     * Encrypt a message with key
     *
     * @param {Word32Array|string} message
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = RC4Drop.encrypt("test", "pass");
     */
    static encrypt(message: Word32Array | string, key: Word32Array | string, props?: Partial<RC4DropProps>): CipherParams;
    /**
     * Encrypt a encrypted message with key
     *
     * @param {CipherParams} cipherText
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = RC4Drop.decrypt(cipherProps, "pass");
     */
    static decrypt(cipherText: CipherParams, key: Word32Array | string, props?: Partial<RC4DropProps>): Word32Array;
}
