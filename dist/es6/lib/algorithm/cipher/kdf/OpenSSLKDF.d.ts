import type { KDF } from "./type";
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
export declare const OpenSSLKDF: KDF;
