import { ISerializableCipher, SerializableCipherProps } from "./SerializableCipher";
import { KDF as KDFType } from "./kdf/type";
export interface PasswordBasedCipherProps extends SerializableCipherProps {
    KDF: KDFType;
}
export declare const PasswordBasedCipher: ISerializableCipher<string>;
