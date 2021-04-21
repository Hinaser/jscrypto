import { BlockCipherMode, BlockCipherModeProps } from "./BlockCipherMode";
import { Word32Array } from "../../../Word32Array";
import type { BlockCipher } from "../BlockCipher";
/**
 * Counter/CBC-MAC
 */
export declare class CCM extends BlockCipherMode {
    protected _N: Word32Array;
    protected _CBIndex: number;
    protected readonly _q: number;
    constructor(props: BlockCipherModeProps);
    /**
     * Generate first block of B.
     *
     * @param {boolean} hasAData - If payload has AData, true.
     * @param {number} t - Octet length of T(Auth tag)
     * @param {Word32Array} Q - Octet length of payload.
     * @param {Word32Array} N - Nonce.
     */
    static getB0(hasAData: boolean, t: number, Q: Word32Array, N: Word32Array): Word32Array;
    /**
     * Format associated data
     * @param {Word32Array} A - Associated data
     * @param {Word32Array} P - Payload
     */
    static formatAssociatedDataAndPayload(A: Word32Array, P: Word32Array): Word32Array;
    /**
     * Generate Counter Block
     * @param {number} q - LEN(Q)
     * @param {Word32Array} N - Nonce
     * @param {number} index - Block index of 32bit integer
     */
    static genCtr(q: number, N: Word32Array, index: number): Word32Array;
    /**
     * Generate Message Authentication Code
     *
     * @param {typeof BlockCipher} Cipher - 128 bit block Cipher i.e. AES
     * @param {Word32Array} key - Key
     * @param {Word32Array} iv - Nonce. iv less than or equal to 8byte(64bit) is supported.
     * @param {Word32Array?} authData - Associated data
     * @param {Word32Array?} plainText - Payload
     * @param {number?} tagLength - authTag size in octet length. If omitted, tagLength will be set to 16byte.
     */
    static mac(Cipher: typeof BlockCipher, key: Word32Array, iv: Word32Array, authData?: Word32Array, plainText?: Word32Array, tagLength?: number): Word32Array;
    static combineCipherTextAndAuthTag(cipherText: Word32Array, authTag: Word32Array): Word32Array;
    static splitCipherTextAndAuthTag(cipherTextWithAuthTag: Word32Array, tLen?: number): {
        cipherText: Word32Array;
        authTag: Word32Array;
    };
    /**
     * CTR encryptor.
     */
    static Encryptor: typeof CCM;
    /**
     * CTR decryptor.
     */
    static Decryptor: typeof CCM;
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = CTR.createEncryptor(cipher, iv.words);
     */
    static createEncryptor(props: BlockCipherModeProps): CCM;
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = CTR.createDecryptor(cipher, iv.words);
     */
    static createDecryptor(props: BlockCipherModeProps): CCM;
}
