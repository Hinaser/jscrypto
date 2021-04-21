import { Word32Array } from "./lib/Word32Array";
import { BlockCipher } from "./lib/algorithm/cipher/BlockCipher";
export declare type GMACProps = {
    Cipher: typeof BlockCipher;
};
export declare function GMAC(message: Word32Array | string, key: Word32Array | string, iv?: Word32Array, tagLength?: number, props?: Partial<GMACProps>): Word32Array;
