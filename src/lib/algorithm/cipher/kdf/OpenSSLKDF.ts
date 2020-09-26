import {Word32Array} from "../../../Word32Array";
import {CipherParams} from "../CipherParams";
import {EvpKDF} from "./EvpKDF";
import type {KDF, KDFParams} from "./type";

export const OpenSSLKDF: KDF = {
  execute(password: Word32Array|string, keySize: number, ivSize: number, salt?: Word32Array) {
    // Generate random salt
    if (!salt) {
      salt = Word32Array.random(64/8);
    }
  
    // Derive key and IV
    const key = EvpKDF.getKey(password, salt, { keySize: keySize + ivSize });
  
    // Separate key and IV
    const iv = new Word32Array(key.words.slice(keySize), ivSize * 4);
    key.nSigBytes = keySize * 4;
  
    // Return params
    return new CipherParams({ key, iv, salt }) as KDFParams;
  }
};