import type { Formatter } from "./formatter/type";
import type { Word32Array } from "../../Word32Array";
import type { BlockCipher, BlockCipherProps } from "./BlockCipher";
import { CipherParams } from "./CipherParams";
export interface SerializableCipherProps extends BlockCipherProps {
    formatter: Formatter;
}
export interface ISerializableCipher<K extends Word32Array | string> {
    encrypt: (cipher: typeof BlockCipher, message: Word32Array | string, key: K, props?: Partial<SerializableCipherProps>) => CipherParams;
    decrypt: (cipher: typeof BlockCipher, cipherText: CipherParams | string, key: K, props?: Partial<SerializableCipherProps>) => Word32Array;
}
/**
 * Converts serialized ciphertext to CipherParams,
 * else assumed CipherParams already and returns ciphertext unchanged.
 * @param {CipherParams|string} cipherTextParams The ciphertext.
 * @param {Formatter} formatter The formatting strategy to use to parse serialized ciphertext.
 * @return {CipherParams} The un-serialized ciphertext.
 * @example
 *   var ciphertextParams = JsCrypto.SerializableCipher.parse(ciphertextStringOrParams, format);
 */
export declare function parseCipherText(cipherTextParams: CipherParams | string, formatter: Formatter): CipherParams;
export declare const SerializableCipher: ISerializableCipher<Word32Array>;
