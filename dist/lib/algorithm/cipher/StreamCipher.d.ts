import { Cipher } from "./Cipher";
export declare abstract class StreamCipher extends Cipher {
    protected _blockSize: number;
    protected _doFinalize(): import("../../Word32Array").Word32Array;
}
