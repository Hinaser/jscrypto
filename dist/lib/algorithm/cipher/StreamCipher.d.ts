import { Cipher, CipherProps, PropsWithKey } from "./Cipher";
export interface StreamCipherProps extends CipherProps {
}
export declare abstract class StreamCipher extends Cipher {
    protected _blockSize: number;
    protected constructor(props: PropsWithKey<StreamCipherProps>);
    protected _doFinalize(): import("../../Word32Array").Word32Array;
}
