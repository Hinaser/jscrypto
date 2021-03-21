import { Word32Array } from "../Word32Array";
/**
 * UTF-16 BE encoding strategy.
 */
export const Utf16BE = {
    /**
     * Converts a word array to a UTF-16 BE string.
     *
     * @param {Word32Array} w An array of 32-bit words.
     * @return {string} The UTF-16 BE string.
     * @example
     *   var utf16String = Utf16.stringify(new Word32Array([0x293892]));
     */
    stringify(w) {
        // Shortcuts
        const words = w.words;
        const sigBytes = w.nSigBytes;
        // Convert
        const utf16Chars = [];
        for (let i = 0; i < sigBytes; i += 2) {
            const codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
            utf16Chars.push(String.fromCharCode(codePoint));
        }
        return utf16Chars.join("");
    },
    /**
     * Converts a UTF-16 BE string to a word array.
     * @param {string} utf16Str The UTF-16 BE string.
     * @return {Word32Array} The word array.
     * @example
     *   const wordArray = Utf16.parse(utf16String);
     */
    parse(utf16Str) {
        // Shortcut
        const utf16StrLength = utf16Str.length;
        // Convert
        const words = [];
        for (let i = 0; i < utf16StrLength; i++) {
            words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
        }
        return new Word32Array(words, utf16StrLength * 2);
    }
};
function swapEndian(word) {
    return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
}
/**
 * UTF-16 LE encoding strategy.
 */
export const Utf16LE = {
    /**
     * Converts a word array to a UTF-16 LE string.
     *
     * @param {Word32Array} w An array of 32-bit words.
     * @return {string} The UTF-16 LE string.
     * @example
     *   var utf16String = Utf16.stringify(new Word32Array([0x293892]));
     */
    stringify(w) {
        // Shortcuts
        const words = w.words;
        const sigBytes = w.nSigBytes;
        // Convert
        const utf16Chars = [];
        for (let i = 0; i < sigBytes; i += 2) {
            const codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
            utf16Chars.push(String.fromCharCode(codePoint));
        }
        return utf16Chars.join("");
    },
    /**
     * Converts a UTF-16 LE string to a word array.
     * @param {string} utf16Str The UTF-16 LE string.
     * @return {Word32Array} The word array.
     * @example
     *   const wordArray = Utf16.parse(utf16String);
     */
    parse(utf16Str) {
        // Shortcut
        const utf16StrLength = utf16Str.length;
        // Convert
        const words = [];
        for (let i = 0; i < utf16StrLength; i++) {
            words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
        }
        return new Word32Array(words, utf16StrLength * 2);
    }
};
export const Utf16 = Utf16BE;
