import { Word32Array } from "./lib/Word32Array";
import { BlockCipher } from "./lib/algorithm/cipher/BlockCipher";
export declare type CBCMACProps = {
    Cipher: typeof BlockCipher;
};
export declare function CBCMAC(plainText: Word32Array | string, associatedData: Word32Array | string, key: Word32Array | string, iv: Word32Array | null, tagLength?: number, props?: Partial<CBCMACProps>): Word32Array;
