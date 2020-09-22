import { ISerializableCipher, SerializableCipherProps } from "./SerializableCipher";
import type { KDF as KDFType } from "./kdf/type";
export interface PasswordBasedCipherProps extends SerializableCipherProps {
    KDF: KDFType;
}
export declare const PasswordBasedCipher: ISerializableCipher<string>;
