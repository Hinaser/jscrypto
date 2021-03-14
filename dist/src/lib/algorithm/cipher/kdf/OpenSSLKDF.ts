import {Word32Array} from "../../../Word32Array";
import {CipherParams} from "../CipherParams";
import {EvpKDF} from "./module/EvpKDF";
import type {KDF, KDFParams, KDFProps} from "./type";

/**
 * Derives a key and IV from a password.
 *
 * @param {string} password The password to derive from.
 * @param {number} keySize The size in words of the key to generate.
 * @param {number} ivSize The size in words of the IV to generate.
 * @param {Word32Array?} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
 * @return {CipherParams} A cipher params object with the key, IV, and salt.
 * @example
 *   var derivedParams = OpenSSLKDF.execute('Password', 256/32, 128/32);
 *   var derivedParams = OpenSSLKDF.execute('Password', 256/32, 128/32, 'saltsalt');
 */
export const OpenSSLKDF: KDF = {
  execute(password: Word32Array|string, keySize: number, ivSize: number, salt?: Word32Array, props?: Partial<KDFProps>) {
    // Generate random salt
    if (!salt) {
      salt = Word32Array.random(64/8);
    }
    
    const KDFModule = props && props.KDF || EvpKDF;
    const kdfProps = props ? {Hasher: props.Hasher, iterations: props.iterations} : {};
  
    // Derive key and IV
    const key = KDFModule.getKey(password, salt, { ...kdfProps, keySize: keySize + ivSize });
  
    // Separate key and IV
    const iv = new Word32Array(key.words.slice(keySize), ivSize * 4);
    key.nSigBytes = keySize * 4;
  
    // Return params
    return new CipherParams({ key, iv, salt }) as KDFParams;
  }
};