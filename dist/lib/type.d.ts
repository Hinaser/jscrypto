import type { Word32Array } from "./Word32Array";
export interface IEncoder {
    stringify: (w: Word32Array) => string;
    parse: (s: string) => Word32Array;
}
