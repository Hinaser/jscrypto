import { Word32Array } from "../../../Word32Array";
/**
 * Pad word array to multiple of 128bit(4byte)
 * @param {Word32Array} w - Padding target. This w will be modified directly.
 * @returns {void}
 */
export function padTo128m(w) {
    const remainder = w.nSigBytes % 16;
    if (remainder === 0) {
        return;
    }
    const nPaddingBytes = 16 - remainder;
    // Pad Ciphertext
    const pad = [];
    const maxI = Math.floor(nPaddingBytes / 4);
    for (let i = 0; i < maxI; i++) {
        pad.push(0);
    }
    if (nPaddingBytes % 4 > 0) {
        pad.push(0);
    }
    w.concat(new Word32Array(pad, nPaddingBytes));
}
/**
 * Extract Most Significant Bit.
 * @param {Word32Array} w
 * @param {number} bytes - Number of bytes to extract
 * @example
 *   const w = new Word32Array([0x11223344, 0x55667788]);
 *   msb(w, 2).toString() === "1122"; // true
 */
export function msb(w, bytes) {
    return new Word32Array(w.words.slice(), bytes);
}
/**
 * Extract Least Significant Bit.
 * @param {Word32Array} w
 * @param {number} bytes - Number of bytes to extract
 * @example
 *   const w = new Word32Array([0x11223344, 0x55667788, 0x99aabb00], 11);
 *   lsb(w, 5).toString() === "778899aabb"; // true
 */
export function lsb(w, bytes) {
    const n = w.nSigBytes;
    const nShift = n - bytes;
    const lsbWords = [];
    for (let i = 0; i < bytes; i++) {
        const j = i >>> 2;
        const byteIndex = nShift + i;
        const wordIndex = byteIndex >>> 2;
        const b = (w.words[wordIndex] >>> (24 - (byteIndex % 4) * 8)) & 0x000000ff;
        lsbWords[j] = (lsbWords[j] | 0) | (b << (24 - (i % 4) * 8));
    }
    const wLsb = new Word32Array(lsbWords, bytes);
    wLsb.clamp();
    return wLsb;
}
