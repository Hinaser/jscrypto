import type { Word32Array } from "../../../Word32Array";
export interface Pad {
    pad: (data: Word32Array, blockSize: number) => void;
    unpad: (data: Word32Array) => void;
}
