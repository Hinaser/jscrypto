import { ISerializableCipher, SerializableCipherProps } from "./SerializableCipher";
import type { KDF as KDFType, BaseKDFModule } from "./kdf/type";
import type { Word32Array } from "../../Word32Array";
import type { Hasher } from "../Hasher";
export interface PasswordBasedCipherProps extends SerializableCipherProps {
    KDF: KDFType;
    kdfSalt: Word32Array;
    kdfModule: typeof BaseKDFModule;
    kdfHasher: typeof Hasher;
    kdfIterations: number;
}
export declare const PasswordBasedCipher: ISerializableCipher<string>;
