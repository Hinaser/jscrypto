import { ISerializableCipher, SerializableCipherProps } from "./SerializableCipher";
import type { KDF as KDFType } from "./kdf/type";
import type { Word32Array } from "../../Word32Array";
import type { Hasher } from "../Hasher";
export interface PasswordBasedCipherProps extends SerializableCipherProps {
    KDF: KDFType;
    salt: Word32Array;
    Hasher: typeof Hasher;
    iterations: number;
}
export declare const PasswordBasedCipher: ISerializableCipher<string>;
