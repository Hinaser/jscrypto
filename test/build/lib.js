(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["JsCrypto"] = factory();
	else
		root["JsCrypto"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/lib/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/Hmac.ts":
/*!*********************!*\
  !*** ./src/Hmac.ts ***!
  \*********************/
/*! exports provided: Hmac */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hmac", function() { return Hmac; });
/* harmony import */ var _lib_encoder_Utf8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/encoder/Utf8 */ "./src/lib/encoder/Utf8.ts");

class Hmac {
    constructor(hasher, key) {
        this._hasher = hasher;
        // Convert string to WordArray, else assume WordArray already
        if (typeof key == "string") {
            key = _lib_encoder_Utf8__WEBPACK_IMPORTED_MODULE_0__["Utf8"].parse(key);
        }
        const hasherBlockSize = hasher.blockSize;
        const hasherBlockSizeBytes = hasherBlockSize * 4;
        // Allow arbitrary length keys
        if (key.nSigBytes > hasherBlockSizeBytes) {
            key = hasher.finalize(key);
        }
        // Clamp excess bits
        key.clamp();
        const oKey = this._oKey = key.clone();
        const iKey = this._iKey = key.clone();
        const oKeyWords = oKey.words;
        const iKeyWords = iKey.words;
        for (let i = 0; i < hasherBlockSize; i++) {
            oKeyWords[i] ^= 0x5c5c5c5c;
            iKeyWords[i] ^= 0x36363636;
        }
        iKey.nSigBytes = hasherBlockSizeBytes;
        oKey.nSigBytes = hasherBlockSizeBytes;
        // Set initial values
        this.reset();
    }
    /**
     * Resets this Hmac to its initial state.
     *
     * @example
     *   hmacHasher.reset();
     */
    reset() {
        this._hasher.reset();
        this._hasher.update(this._iKey);
    }
    /**
     * Updates this Hmac with a message.
     *
     * @param {Word32Array|string} messageUpdate The message to append.
     * @return {Hmac} This Hmac instance.
     * @example
     *   hmacHasher.update('message');
     *   hmacHasher.update(wordArray);
     */
    update(messageUpdate) {
        this._hasher.update(messageUpdate);
        return this;
    }
    /**
     * Finalizes the Hmac computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param {Word32Array|string} messageUpdate (Optional) A final message update.
     * @return {Word32Array} The Hmac.
     * @example
     *   var hmac = hmacHasher.finalize();
     *   var hmac = hmacHasher.finalize('message');
     *   var hmac = hmacHasher.finalize(wordArray);
     */
    finalize(messageUpdate) {
        const innerHash = this._hasher.finalize(messageUpdate);
        this._hasher.reset();
        return this._hasher.finalize(this._oKey.clone().concat(innerHash));
    }
}


/***/ }),

/***/ "./src/MD5.ts":
/*!********************!*\
  !*** ./src/MD5.ts ***!
  \********************/
/*! exports provided: MD5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MD5", function() { return MD5; });
/* harmony import */ var _lib_Word32Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/Word32Array */ "./src/lib/Word32Array.ts");
/* harmony import */ var _lib_algorithm_Hasher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/algorithm/Hasher */ "./src/lib/algorithm/Hasher.ts");


// Constants table
const T = [];
(function computeConstant() {
    for (let i = 0; i < 64; i++) {
        T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
    }
})();
function FF(a, b, c, d, x, s, t) {
    const n = a + ((b & c) | (~b & d)) + x + t;
    return ((n << s) | (n >>> (32 - s))) + b;
}
function GG(a, b, c, d, x, s, t) {
    const n = a + ((b & d) | (c & ~d)) + x + t;
    return ((n << s) | (n >>> (32 - s))) + b;
}
function HH(a, b, c, d, x, s, t) {
    const n = a + (b ^ c ^ d) + x + t;
    return ((n << s) | (n >>> (32 - s))) + b;
}
function II(a, b, c, d, x, s, t) {
    const n = a + (c ^ (b | ~d)) + x + t;
    return ((n << s) | (n >>> (32 - s))) + b;
}
/**
 * MD5 hash algorithm
 */
class MD5 extends _lib_algorithm_Hasher__WEBPACK_IMPORTED_MODULE_1__["Hasher"] {
    constructor(props) {
        super(props);
        this._hash = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"]([
            0x67452301, 0xefcdab89,
            0x98badcfe, 0x10325476
        ]);
        if (props && typeof props.hash !== "undefined") {
            this._hash = props.hash.clone();
        }
    }
    _doReset() {
        this._hash = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"]([
            0x67452301, 0xefcdab89,
            0x98badcfe, 0x10325476
        ]);
    }
    _doProcessBlock(words, offset) {
        // Swap endian
        for (let i = 0; i < 16; i++) {
            // Shortcuts
            const offsetI = offset + i;
            const wordsOffsetI = words[offsetI];
            words[offsetI] = ((((wordsOffsetI << 8) | (wordsOffsetI >>> 24)) & 0x00ff00ff)
                | (((wordsOffsetI << 24) | (wordsOffsetI >>> 8)) & 0xff00ff00));
        }
        // Shortcuts
        const H = this._hash.words;
        const wordOffset0 = words[offset];
        const wordOffset1 = words[offset + 1];
        const wordOffset2 = words[offset + 2];
        const wordOffset3 = words[offset + 3];
        const wordOffset4 = words[offset + 4];
        const wordOffset5 = words[offset + 5];
        const wordOffset6 = words[offset + 6];
        const wordOffset7 = words[offset + 7];
        const wordOffset8 = words[offset + 8];
        const wordOffset9 = words[offset + 9];
        const wordOffset10 = words[offset + 10];
        const wordOffset11 = words[offset + 11];
        const wordOffset12 = words[offset + 12];
        const wordOffset13 = words[offset + 13];
        const wordOffset14 = words[offset + 14];
        const wordOffset15 = words[offset + 15];
        // Working variables
        let a = H[0];
        let b = H[1];
        let c = H[2];
        let d = H[3];
        // Computation
        a = FF(a, b, c, d, wordOffset0, 7, T[0]);
        d = FF(d, a, b, c, wordOffset1, 12, T[1]);
        c = FF(c, d, a, b, wordOffset2, 17, T[2]);
        b = FF(b, c, d, a, wordOffset3, 22, T[3]);
        a = FF(a, b, c, d, wordOffset4, 7, T[4]);
        d = FF(d, a, b, c, wordOffset5, 12, T[5]);
        c = FF(c, d, a, b, wordOffset6, 17, T[6]);
        b = FF(b, c, d, a, wordOffset7, 22, T[7]);
        a = FF(a, b, c, d, wordOffset8, 7, T[8]);
        d = FF(d, a, b, c, wordOffset9, 12, T[9]);
        c = FF(c, d, a, b, wordOffset10, 17, T[10]);
        b = FF(b, c, d, a, wordOffset11, 22, T[11]);
        a = FF(a, b, c, d, wordOffset12, 7, T[12]);
        d = FF(d, a, b, c, wordOffset13, 12, T[13]);
        c = FF(c, d, a, b, wordOffset14, 17, T[14]);
        b = FF(b, c, d, a, wordOffset15, 22, T[15]);
        a = GG(a, b, c, d, wordOffset1, 5, T[16]);
        d = GG(d, a, b, c, wordOffset6, 9, T[17]);
        c = GG(c, d, a, b, wordOffset11, 14, T[18]);
        b = GG(b, c, d, a, wordOffset0, 20, T[19]);
        a = GG(a, b, c, d, wordOffset5, 5, T[20]);
        d = GG(d, a, b, c, wordOffset10, 9, T[21]);
        c = GG(c, d, a, b, wordOffset15, 14, T[22]);
        b = GG(b, c, d, a, wordOffset4, 20, T[23]);
        a = GG(a, b, c, d, wordOffset9, 5, T[24]);
        d = GG(d, a, b, c, wordOffset14, 9, T[25]);
        c = GG(c, d, a, b, wordOffset3, 14, T[26]);
        b = GG(b, c, d, a, wordOffset8, 20, T[27]);
        a = GG(a, b, c, d, wordOffset13, 5, T[28]);
        d = GG(d, a, b, c, wordOffset2, 9, T[29]);
        c = GG(c, d, a, b, wordOffset7, 14, T[30]);
        b = GG(b, c, d, a, wordOffset12, 20, T[31]);
        a = HH(a, b, c, d, wordOffset5, 4, T[32]);
        d = HH(d, a, b, c, wordOffset8, 11, T[33]);
        c = HH(c, d, a, b, wordOffset11, 16, T[34]);
        b = HH(b, c, d, a, wordOffset14, 23, T[35]);
        a = HH(a, b, c, d, wordOffset1, 4, T[36]);
        d = HH(d, a, b, c, wordOffset4, 11, T[37]);
        c = HH(c, d, a, b, wordOffset7, 16, T[38]);
        b = HH(b, c, d, a, wordOffset10, 23, T[39]);
        a = HH(a, b, c, d, wordOffset13, 4, T[40]);
        d = HH(d, a, b, c, wordOffset0, 11, T[41]);
        c = HH(c, d, a, b, wordOffset3, 16, T[42]);
        b = HH(b, c, d, a, wordOffset6, 23, T[43]);
        a = HH(a, b, c, d, wordOffset9, 4, T[44]);
        d = HH(d, a, b, c, wordOffset12, 11, T[45]);
        c = HH(c, d, a, b, wordOffset15, 16, T[46]);
        b = HH(b, c, d, a, wordOffset2, 23, T[47]);
        a = II(a, b, c, d, wordOffset0, 6, T[48]);
        d = II(d, a, b, c, wordOffset7, 10, T[49]);
        c = II(c, d, a, b, wordOffset14, 15, T[50]);
        b = II(b, c, d, a, wordOffset5, 21, T[51]);
        a = II(a, b, c, d, wordOffset12, 6, T[52]);
        d = II(d, a, b, c, wordOffset3, 10, T[53]);
        c = II(c, d, a, b, wordOffset10, 15, T[54]);
        b = II(b, c, d, a, wordOffset1, 21, T[55]);
        a = II(a, b, c, d, wordOffset8, 6, T[56]);
        d = II(d, a, b, c, wordOffset15, 10, T[57]);
        c = II(c, d, a, b, wordOffset6, 15, T[58]);
        b = II(b, c, d, a, wordOffset13, 21, T[59]);
        a = II(a, b, c, d, wordOffset4, 6, T[60]);
        d = II(d, a, b, c, wordOffset11, 10, T[61]);
        c = II(c, d, a, b, wordOffset2, 15, T[62]);
        b = II(b, c, d, a, wordOffset9, 21, T[63]);
        // Intermediate hash value
        H[0] = (H[0] + a) | 0;
        H[1] = (H[1] + b) | 0;
        H[2] = (H[2] + c) | 0;
        H[3] = (H[3] + d) | 0;
    }
    _doFinalize() {
        // Shortcuts
        const data = this._data;
        const dataWords = data.words;
        const nBitsTotal = this._nBytes * 8;
        const nBitsLeft = data.nSigBytes * 8;
        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        const nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
        const nBitsTotalL = nBitsTotal;
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = ((((nBitsTotalH << 8) | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
            (((nBitsTotalH << 24) | (nBitsTotalH >>> 8)) & 0xff00ff00));
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = ((((nBitsTotalL << 8) | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
            (((nBitsTotalL << 24) | (nBitsTotalL >>> 8)) & 0xff00ff00));
        data.nSigBytes = (dataWords.length + 1) * 4;
        // Hash final blocks
        this._process();
        // Shortcuts
        const hash = this._hash;
        const H = hash.words;
        // Swap endian
        for (let i = 0; i < 4; i++) {
            // Shortcut
            const Hi = H[i];
            H[i] = (((Hi << 8) | (Hi >>> 24)) & 0x00ff00ff)
                | (((Hi << 24) | (Hi >>> 8)) & 0xff00ff00);
        }
        // Return final computed hash
        return hash;
    }
    clone() {
        const props = { hash: this._hash, blockSize: this._blockSize, data: this._data, nBytes: this._nBytes };
        return new MD5(props);
    }
    static hash(message) {
        return new MD5().finalize(message);
    }
}


/***/ }),

/***/ "./src/SHA1.ts":
/*!*********************!*\
  !*** ./src/SHA1.ts ***!
  \*********************/
/*! exports provided: SHA1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHA1", function() { return SHA1; });
/* harmony import */ var _lib_algorithm_Hasher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/algorithm/Hasher */ "./src/lib/algorithm/Hasher.ts");
/* harmony import */ var _lib_Word32Array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/Word32Array */ "./src/lib/Word32Array.ts");


// Reusable object
const W = [];
class SHA1 extends _lib_algorithm_Hasher__WEBPACK_IMPORTED_MODULE_0__["Hasher"] {
    constructor(props) {
        super(props);
        this._hash = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_1__["Word32Array"]([
            0x67452301, 0xefcdab89,
            0x98badcfe, 0x10325476,
            0xc3d2e1f0
        ]);
        this._props = props;
        if (props && typeof props.hash !== "undefined") {
            this._hash = props.hash.clone();
        }
    }
    _doReset() {
        this._hash = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_1__["Word32Array"]([
            0x67452301, 0xefcdab89,
            0x98badcfe, 0x10325476,
            0xc3d2e1f0
        ]);
    }
    _doProcessBlock(words, offset) {
        const H = this._hash.words;
        // Working variables
        let a = H[0];
        let b = H[1];
        let c = H[2];
        let d = H[3];
        let e = H[4];
        // Computation
        for (let i = 0; i < 80; i++) {
            if (i < 16) {
                W[i] = words[offset + i] | 0;
            }
            else {
                const n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                W[i] = (n << 1) | (n >>> 31);
            }
            let t = ((a << 5) | (a >>> 27)) + e + W[i];
            if (i < 20) {
                t += ((b & c) | (~b & d)) + 0x5a827999;
            }
            else if (i < 40) {
                t += (b ^ c ^ d) + 0x6ed9eba1;
            }
            else if (i < 60) {
                t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
            }
            else /* if (i < 80) */ {
                t += (b ^ c ^ d) - 0x359d3e2a;
            }
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t;
        }
        // Intermediate hash value
        H[0] = (H[0] + a) | 0;
        H[1] = (H[1] + b) | 0;
        H[2] = (H[2] + c) | 0;
        H[3] = (H[3] + d) | 0;
        H[4] = (H[4] + e) | 0;
    }
    _doFinalize() {
        // Shortcuts
        const dataWords = this._data.words;
        const nBitsTotal = this._nBytes * 8;
        const nBitsLeft = this._data.nSigBytes * 8;
        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
        this._data.nSigBytes = dataWords.length * 4;
        // Hash final blocks
        this._process();
        // Return final computed hash
        return this._hash;
    }
    clone() {
        const props = { hash: this._hash, blockSize: this._blockSize, data: this._data, nBytes: this._nBytes };
        return new SHA1(props);
    }
    static hash(message, props) {
        return new SHA1(props).finalize(message);
    }
}


/***/ }),

/***/ "./src/lib/Word32Array.ts":
/*!********************************!*\
  !*** ./src/lib/Word32Array.ts ***!
  \********************************/
/*! exports provided: Word32Array */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Word32Array", function() { return Word32Array; });
/* harmony import */ var _encoder_Hex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./encoder/Hex */ "./src/lib/encoder/Hex.ts");
/* harmony import */ var _random__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./random */ "./src/lib/random.ts");


/**
 * An array of 32bit words
 */
class Word32Array {
    /**
     * Initializes a newly created word array.
     *
     * @param {Array} words (Optional) An array of 32-bit words.
     * @param {number} nSignificantBytes (Optional) The number of significant bytes in the words.
     *
     * @example
     *   var wordArray = new WordArray();
     *   var wordArray = new WordArray([0x00010203, 0x04050607]);
     *   var wordArray = new WordArray([0x00010203, 0x04050607], 6);
     */
    constructor(words, nSignificantBytes) {
        this._words = words || [];
        this._nSignificantBytes = typeof nSignificantBytes === "number" ? nSignificantBytes : this._words.length * 4;
    }
    get nSigBytes() {
        return this._nSignificantBytes;
    }
    /**
     * Set significant bytes
     * @param {number} n - significant bytes
     */
    set nSigBytes(n) {
        this._nSignificantBytes = n;
    }
    /**
     * Get raw reference of internal words.
     * Modification of this raw array will affect internal words.
     */
    get words() {
        return this._words;
    }
    /**
     * Converts this word array to a string.
     *
     * @param {IEncoder?} encoder The encoding strategy to use. Default: CryptoJS.enc.Hex
     * @return {string} The stringified word array.
     * @example
     *   var string = wordArray + '';
     *   var string = wordArray.toString();
     *   var string = wordArray.toString(CryptoJS.enc.Utf8);
     */
    toString(encoder) {
        if (!encoder) {
            return _encoder_Hex__WEBPACK_IMPORTED_MODULE_0__["Hex"].stringify(this);
        }
        return encoder.stringify(this);
    }
    /**
     * Concatenates a word array to this word array.
     *
     * @param {Word32Array} w The word array to append.
     * @return {Word32Array} This word array.
     * @example
     *   wordArray1.concat(wordArray2);
     */
    concat(w) {
        const words = w.words.slice();
        const N = w.nSigBytes;
        this.clamp();
        if (this._nSignificantBytes % 4) {
            // Copy one byte at a time
            for (let i = 0; i < N; i++) {
                const b = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                this._words[(this._nSignificantBytes + i) >>> 2] |= b << (24 - ((this._nSignificantBytes + i) % 4) * 8);
            }
        }
        else {
            // Copy one word at a time
            for (let i = 0; i < N; i += 4) {
                this._words[(this._nSignificantBytes + i) >>> 2] = words[i >>> 2];
            }
        }
        this._nSignificantBytes += N;
        // Chainable
        return this;
    }
    /**
     * Removes insignificant bits.
     *
     * @example
     *   wordArray.clamp();
     */
    clamp() {
        const n = this._nSignificantBytes;
        this._words[n >>> 2] &= 0xffffffff << (32 - (n % 4) * 8);
        this._words.length = Math.ceil(n / 4);
    }
    /**
     * Creates a copy of this word array.
     *
     * @return {Word32Array} The clone.
     * @example
     *   var clone = wordArray.clone();
     */
    clone() {
        return new Word32Array(this._words.slice(), this._nSignificantBytes);
    }
    /**
     * Creates a word array filled with random bytes.
     *
     * @param {number} nBytes The number of random bytes to generate.
     * @return {Word32Array} The random word array.
     * @static
     * @example
     *   var wordArray = CryptoJS.lib.WordArray.random(16);
     */
    static random(nBytes) {
        const words = [];
        for (let i = 0; i < nBytes; i++) {
            words.push(Object(_random__WEBPACK_IMPORTED_MODULE_1__["random"])());
        }
        return new Word32Array(words, nBytes);
    }
}


/***/ }),

/***/ "./src/lib/Word64Array.ts":
/*!********************************!*\
  !*** ./src/lib/Word64Array.ts ***!
  \********************************/
/*! exports provided: Word64, Word64Array */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Word64", function() { return Word64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Word64Array", function() { return Word64Array; });
/* harmony import */ var _encoder_Hex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./encoder/Hex */ "./src/lib/encoder/Hex.ts");
/* harmony import */ var _Word32Array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Word32Array */ "./src/lib/Word32Array.ts");


class Word64 {
    constructor(high, low) {
        this.high = high;
        this.low = low;
    }
    clone() {
        return new Word64(this.high, this.low);
    }
}
/**
 * An array of 64bit words
 */
class Word64Array {
    /**
     * Initializes a newly created word array.
     *
     * @param {Array} words (Optional) An array of 32-bit words.
     * @param {number} nSignificantBytes (Optional) The number of significant bytes in the words.
     *
     * @example
     *   var wordArray = new WordArray();
     *   var wordArray = new WordArray([0x00010203, 0x04050607]);
     *   var wordArray = new WordArray([0x00010203, 0x04050607], 6);
     */
    constructor(words, nSignificantBytes) {
        this._words = words || [];
        this._nSignificantBytes = typeof nSignificantBytes === "number" ? nSignificantBytes : this._words.length * 8;
    }
    get nSigBytes() {
        return this._nSignificantBytes;
    }
    /**
     * Set significant bytes
     * @param {number} n - significant bytes
     */
    set nSigBytes(n) {
        this._nSignificantBytes = n;
    }
    /**
     * Get raw reference of internal words.
     * Modification of this raw array will affect internal words.
     */
    get words() {
        return this._words;
    }
    /**
     * Converts this 64-bit word array to a 32-bit word array.
     *
     * @return {Word32Array} This word array's data as a 32-bit word array.
     *
     * @example
     *
     *     var x32WordArray = x64WordArray.toX32();
     */
    to32() {
        const words32 = [];
        for (let i = 0; i < this._words.length; i++) {
            const word64 = this._words[i];
            words32.push(word64.high);
            words32.push(word64.low);
        }
        return new _Word32Array__WEBPACK_IMPORTED_MODULE_1__["Word32Array"](words32, this._nSignificantBytes);
    }
    /**
     * Converts this word array to a string.
     *
     * @param {IEncoder?} encoder The encoding strategy to use. Default: CryptoJS.enc.Hex
     * @return {string} The stringified word array.
     * @example
     *   var string = wordArray + '';
     *   var string = wordArray.toString();
     *   var string = wordArray.toString(CryptoJS.enc.Utf8);
     */
    toString(encoder) {
        if (!encoder) {
            return _encoder_Hex__WEBPACK_IMPORTED_MODULE_0__["Hex"].stringify(this.to32());
        }
        return encoder.stringify(this.to32());
    }
    /**
     * Creates a copy of this word array.
     *
     * @return {Word64Array} The clone.
     * @example
     *   var clone = wordArray.clone();
     */
    clone() {
        const words = this._words.slice();
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].clone();
        }
        return new Word64Array(words, this._nSignificantBytes);
    }
}


/***/ }),

/***/ "./src/lib/algorithm/BufferedBlockAlgorithm.ts":
/*!*****************************************************!*\
  !*** ./src/lib/algorithm/BufferedBlockAlgorithm.ts ***!
  \*****************************************************/
/*! exports provided: BufferedBlockAlgorithm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BufferedBlockAlgorithm", function() { return BufferedBlockAlgorithm; });
/* harmony import */ var _Word32Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Word32Array */ "./src/lib/Word32Array.ts");
/* harmony import */ var _encoder_Utf8__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../encoder/Utf8 */ "./src/lib/encoder/Utf8.ts");


class BufferedBlockAlgorithm {
    constructor(props) {
        this._minBufferSize = 0;
        this._blockSize = 0;
        this._props = props;
        this._data = props && typeof props.data !== "undefined" ? props.data.clone() : new _Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"]();
        this._nBytes = props && typeof props.nBytes === "number" ? props.nBytes : 0;
    }
    get blockSize() {
        return this._blockSize;
    }
    /**
     * Resets this block algorithm's data buffer to its initial state.
     *
     * @example
     *   bufferedBlockAlgorithm.reset();
     */
    reset(data, nBytes) {
        this._data = typeof data !== "undefined" ? data.clone() : new _Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"]();
        this._nBytes = typeof nBytes === "number" ? nBytes : 0;
    }
    /**
     * Adds new data to this block algorithm's buffer.
     *
     * @param {Word32Array|string} data The data to append. Strings are converted to a WordArray using UTF-8.
     * @example
     *   bufferedBlockAlgorithm.append('data');
     *   bufferedBlockAlgorithm.append(wordArray);
     */
    _append(data) {
        const d = typeof data === "string" ? _encoder_Utf8__WEBPACK_IMPORTED_MODULE_1__["Utf8"].parse(data) : data;
        this._data.concat(d);
        this._nBytes += d.nSigBytes;
    }
    /**
     * Processes available data blocks.
     * This method invokes doProcessBlock(offset), which must be implemented by a concrete subtype.
     *
     * @param {boolean?} doFlush Whether all blocks and partial blocks should be processed.
     * @return {Word32Array} The processed data.
     * @example
     *   var processedData = bufferedBlockAlgorithm.process();
     *   var processedData = bufferedBlockAlgorithm.process(!!'flush');
     */
    _process(doFlush) {
        let processedWords;
        const words = this._data.words;
        const nSigBytes = this._data.nSigBytes;
        const blockSize = this._blockSize;
        const blockSizeByte = this._blockSize * 4;
        let nBlocksReady = nSigBytes / blockSizeByte;
        if (doFlush) {
            // Round up to include partial blocks
            nBlocksReady = Math.ceil(nBlocksReady);
        }
        else {
            nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
        }
        // Count words ready
        const nWordsReady = nBlocksReady * blockSize;
        // Count bytes ready
        const nBytesReady = Math.min(nWordsReady * 4, nSigBytes);
        // Process blocks
        if (nWordsReady) {
            for (let offset = 0; offset < nWordsReady; offset += blockSize) {
                // Perform concrete-algorithm logic
                this._doProcessBlock(words, offset);
            }
            // Remove processed words
            processedWords = words.splice(0, nWordsReady);
            this._data.nSigBytes -= nBytesReady;
        }
        // Return processed words
        return new _Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"](processedWords, nBytesReady);
    }
    /**
     * @abstract
     */
    _doProcessBlock(words, offset) {
        throw new Error("Not implemented");
    }
}


/***/ }),

/***/ "./src/lib/algorithm/Hasher.ts":
/*!*************************************!*\
  !*** ./src/lib/algorithm/Hasher.ts ***!
  \*************************************/
/*! exports provided: Hasher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hasher", function() { return Hasher; });
/* harmony import */ var _BufferedBlockAlgorithm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BufferedBlockAlgorithm */ "./src/lib/algorithm/BufferedBlockAlgorithm.ts");

class Hasher extends _BufferedBlockAlgorithm__WEBPACK_IMPORTED_MODULE_0__["BufferedBlockAlgorithm"] {
    constructor(props) {
        super(props);
        this._blockSize = 512 / 32;
        this._props = props;
        if (props && typeof props.blockSize === "number") {
            this._blockSize = props.blockSize;
        }
        this.reset(props ? props.data : undefined, props ? props.nBytes : undefined);
    }
    get blockSize() {
        return this._blockSize;
    }
    /**
     * Resets this hasher to its initial state.
     *
     * @example
     *   hasher.reset();
     */
    reset(data, nBytes) {
        // Reset data buffer
        super.reset.call(this, data, nBytes);
        // Perform concrete-hasher logic
        this._doReset();
    }
    /**
     * Updates this hasher with a message.
     *
     * @param {Word32Array|string} messageUpdate The message to append.
     * @return {Hasher} This hasher.
     * @example
     *   hasher.update('message');
     *   hasher.update(wordArray);
     */
    update(messageUpdate) {
        this._append(messageUpdate);
        this._process();
        return this;
    }
    /**
     * Finalizes the hash computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param {Word32Array|string?} messageUpdate (Optional) A final message update.
     * @return {Word32Array} The hash.
     * @example
     *   var hash = hasher.finalize();
     *   var hash = hasher.finalize('message');
     *   var hash = hasher.finalize(wordArray);
     */
    finalize(messageUpdate) {
        // Final message update
        if (messageUpdate) {
            this._append(messageUpdate);
        }
        // Perform concrete-hasher logic
        return this._doFinalize();
    }
    /**
     * @abstract
     */
    _doReset() {
        throw new Error("Not implemented");
    }
    /**
     * @abstract
     */
    _doFinalize() {
        throw new Error("Not implemented");
    }
}


/***/ }),

/***/ "./src/lib/algorithm/cipher/CipherParams.ts":
/*!**************************************************!*\
  !*** ./src/lib/algorithm/cipher/CipherParams.ts ***!
  \**************************************************/
/*! exports provided: CipherParams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CipherParams", function() { return CipherParams; });
/* harmony import */ var _formatter_OpenSSLFormatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatter/OpenSSLFormatter */ "./src/lib/algorithm/cipher/formatter/OpenSSLFormatter.ts");

/**
 * A collection of cipher parameters.
 *
 * @property {Word32Array} ciphertext The raw ciphertext.
 * @property {Word32Array} key The key to this ciphertext.
 * @property {Word32Array} iv The IV used in the ciphering operation.
 * @property {Word32Array} salt The salt used with a key derivation function.
 * @property {typeof BlockCipher} algorithm The cipher algorithm.
 * @property {BlockCipherMode} mode The block mode used in the ciphering operation.
 * @property {Pad} padding The padding scheme used in the ciphering operation.
 * @property {number} blockSize The block size of the cipher.
 * @property {Formatter} formatter The default formatting strategy to convert this cipher params object to a string.
 */
class CipherParams {
    /**
     * Initializes a newly created cipher params object.
     *
     * @param {Partial<CipherParams>} cp An object with any of the possible cipher parameters.
     * @example
     *   var cipherParams = CryptoJS.lib.CipherParams.create({
     *       ciphertext: ciphertextWordArray,
     *       key: keyWordArray,
     *       iv: ivWordArray,
     *       salt: saltWordArray,
     *       algorithm: JsCrypto.AES,
     *       mode: JsCrypto.CBC,
     *       padding: JsCrypto.PKCS7,
     *       blockSize: 4,
     *       formatter: JsCrypto.OpenSSLFormatter
     *     });
     */
    constructor(cp) {
        this.formatter = _formatter_OpenSSLFormatter__WEBPACK_IMPORTED_MODULE_0__["OpenSSLFormatter"];
        if (cp) {
            this.cipherText = cp.cipherText;
            this.key = cp.key;
            this.iv = cp.iv;
            this.salt = cp.salt;
            this.Algorithm = cp.Algorithm;
            this.mode = cp.mode;
            this.padding = cp.padding;
            this.blockSize = cp.blockSize;
            this.formatter = cp.formatter || _formatter_OpenSSLFormatter__WEBPACK_IMPORTED_MODULE_0__["OpenSSLFormatter"];
        }
    }
    /**
     * Converts this cipher params object to a string.
     *
     * @param {Formatter?} formatter (Optional) The formatting strategy to use.
     * @return {string} The stringified cipher params.
     * @throws Error If neither the formatter nor the default formatter is set.
     * @example
     *   var string = cipherParams + '';
     *   var string = cipherParams.toString();
     *   var string = cipherParams.toString(CryptoJS.format.OpenSSL);
     */
    toString(formatter) {
        return (formatter || this.formatter).stringify(this);
    }
}


/***/ }),

/***/ "./src/lib/algorithm/cipher/formatter/OpenSSLFormatter.ts":
/*!****************************************************************!*\
  !*** ./src/lib/algorithm/cipher/formatter/OpenSSLFormatter.ts ***!
  \****************************************************************/
/*! exports provided: OpenSSLFormatter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenSSLFormatter", function() { return OpenSSLFormatter; });
/* harmony import */ var _CipherParams__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CipherParams */ "./src/lib/algorithm/cipher/CipherParams.ts");
/* harmony import */ var _Word32Array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Word32Array */ "./src/lib/Word32Array.ts");
/* harmony import */ var _encoder_Base64__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../encoder/Base64 */ "./src/lib/encoder/Base64.ts");



const OpenSSLFormatter = {
    /**
     * Converts a cipher params object to an OpenSSL-compatible string.
     *
     * @param {CipherParams} cipherParams The cipher params object.
     * @return {string} The OpenSSL-compatible string.
     * @example
     *   var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
     */
    stringify(cipherParams) {
        // Shortcuts
        const cipherText = cipherParams.cipherText;
        const salt = cipherParams.salt;
        if (!cipherText) {
            return "";
        }
        // Format
        if (salt) {
            const wordArray = new _Word32Array__WEBPACK_IMPORTED_MODULE_1__["Word32Array"]([0x53616c74, 0x65645f5f]).concat(salt).concat(cipherText);
            return wordArray.toString(_encoder_Base64__WEBPACK_IMPORTED_MODULE_2__["Base64"]);
        }
        return cipherText.toString(_encoder_Base64__WEBPACK_IMPORTED_MODULE_2__["Base64"]);
    },
    /**
     * Converts an OpenSSL-compatible string to a cipher params object.
     *
     * @param {string} openSSLStr The OpenSSL-compatible string.
     * @return {CipherParams} The cipher params object.
     * @example
     *   var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
     */
    parse(openSSLStr) {
        let salt;
        // Parse base64
        const cipherText = _encoder_Base64__WEBPACK_IMPORTED_MODULE_2__["Base64"].parse(openSSLStr);
        // Shortcut
        const ciphertextWords = cipherText.words;
        // Test for salt
        if (ciphertextWords[0] === 0x53616c74 && ciphertextWords[1] === 0x65645f5f) {
            // Extract salt
            salt = new _Word32Array__WEBPACK_IMPORTED_MODULE_1__["Word32Array"](ciphertextWords.slice(2, 4));
            // Remove salt from ciphertext
            ciphertextWords.splice(0, 4);
            cipherText.nSigBytes -= 16;
        }
        return new _CipherParams__WEBPACK_IMPORTED_MODULE_0__["CipherParams"]({ cipherText, salt });
    }
};


/***/ }),

/***/ "./src/lib/algorithm/cipher/kdf/OpenSSLKDF.ts":
/*!****************************************************!*\
  !*** ./src/lib/algorithm/cipher/kdf/OpenSSLKDF.ts ***!
  \****************************************************/
/*! exports provided: OpenSSLKDF */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenSSLKDF", function() { return OpenSSLKDF; });
/* harmony import */ var _Word32Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Word32Array */ "./src/lib/Word32Array.ts");
/* harmony import */ var _CipherParams__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CipherParams */ "./src/lib/algorithm/cipher/CipherParams.ts");
/* harmony import */ var _module_EvpKDF__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module/EvpKDF */ "./src/lib/algorithm/cipher/kdf/module/EvpKDF.ts");



/**
 * Derives a key and IV from a password.
 *
 * @param {string} password The password to derive from.
 * @param {number} keySize The size in words of the key to generate.
 * @param {number} ivSize The size in words of the IV to generate.
 * @param {Word32Array?} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
 * @return {CipherParams} A cipher params object with the key, IV, and salt.
 * @example
 *   var derivedParams = JsCrypto.OpenSSLKDF.execute('Password', 256/32, 128/32);
 *   var derivedParams = JsCrypto.OpenSSLKDF.execute('Password', 256/32, 128/32, 'saltsalt');
 */
const OpenSSLKDF = {
    execute(password, keySize, ivSize, salt, props) {
        // Generate random salt
        if (!salt) {
            salt = _Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"].random(64 / 8);
        }
        const KDFModule = props && props.KDF || _module_EvpKDF__WEBPACK_IMPORTED_MODULE_2__["EvpKDF"];
        const kdfProps = props ? { Hasher: props.Hasher, iterations: props.iterations } : {};
        // Derive key and IV
        const key = KDFModule.getKey(password, salt, Object.assign(Object.assign({}, kdfProps), { keySize: keySize + ivSize }));
        // Separate key and IV
        const iv = new _Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"](key.words.slice(keySize), ivSize * 4);
        key.nSigBytes = keySize * 4;
        // Return params
        return new _CipherParams__WEBPACK_IMPORTED_MODULE_1__["CipherParams"]({ key, iv, salt });
    }
};


/***/ }),

/***/ "./src/lib/algorithm/cipher/kdf/module/EvpKDF.ts":
/*!*******************************************************!*\
  !*** ./src/lib/algorithm/cipher/kdf/module/EvpKDF.ts ***!
  \*******************************************************/
/*! exports provided: EvpKDF */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EvpKDF", function() { return EvpKDF; });
/* harmony import */ var _MD5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../MD5 */ "./src/MD5.ts");
/* harmony import */ var _Word32Array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Word32Array */ "./src/lib/Word32Array.ts");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../type */ "./src/lib/algorithm/cipher/kdf/type.ts");



/**
 * This key derivation function is meant to conform with EVP_BytesToKey.
 * https://www.openssl.org/docs/man1.1.1/man3/EVP_BytesToKey.html
 *
 * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
 * @property {Hasher} hasher The hash algorithm to use. Default: MD5
 * @property {number} iterations The number of iterations to perform. Default: 1
 */
class EvpKDF extends _type__WEBPACK_IMPORTED_MODULE_2__["BaseKDFModule"] {
    constructor(props) {
        super(props);
        this._keySize = 128 / 32;
        this._Hasher = _MD5__WEBPACK_IMPORTED_MODULE_0__["MD5"];
        this._iterations = 1;
        if (props) {
            this._keySize = typeof props.keySize !== "undefined" ? props.keySize : this._keySize;
            this._Hasher = typeof props.Hasher !== "undefined" ? props.Hasher : this._Hasher;
            this._iterations = typeof props.iterations !== "undefined" ? props.iterations : this._iterations;
        }
    }
    /**
     * Derives a key from a password.
     *
     * @param {Word32Array|string} password The password.
     * @param {Word32Array|string} salt A salt.
     * @return {Word32Array} The derived key.
     * @example
     *   var key = kdf.compute(password, salt);
     */
    compute(password, salt) {
        let block;
        // Init hasher
        const hasher = new this._Hasher();
        // Initial values
        const derivedKey = new _Word32Array__WEBPACK_IMPORTED_MODULE_1__["Word32Array"]();
        // Shortcuts
        const derivedKeyWords = derivedKey.words;
        const keySize = this._keySize;
        const iterations = this._iterations;
        // Generate key
        while (derivedKeyWords.length < keySize) {
            if (block) {
                hasher.update(block);
            }
            block = hasher.update(password).finalize(salt);
            hasher.reset();
            // Iterations
            for (let i = 1; i < iterations; i++) {
                block = hasher.finalize(block);
                hasher.reset();
            }
            derivedKey.concat(block);
        }
        derivedKey.nSigBytes = keySize * 4;
        return derivedKey;
    }
    /**
     * Derives a key from a password.
     *
     * @param {Word32Array|string} password The password.
     * @param {Word32Array|string} salt A salt.
     * @param {Partial<EvpKDFProps>?} props (Optional) The configuration options to use for this computation.
     *
     * @return {Word32Array} The derived key.
     *
     * @static
     *
     * @example
     *
     *     var key = EvpKDF.getKey(password, salt);
     *     var key = EvpKDF.getKey(password, salt, { keySize: 8 });
     *     var key = EvpKDF.getKey(password, salt, { keySize: 8, iterations: 1000 });
     */
    static getKey(password, salt, props) {
        return new EvpKDF(props).compute(password, salt);
    }
}


/***/ }),

/***/ "./src/lib/algorithm/cipher/kdf/module/PBKDF2.ts":
/*!*******************************************************!*\
  !*** ./src/lib/algorithm/cipher/kdf/module/PBKDF2.ts ***!
  \*******************************************************/
/*! exports provided: PBKDF2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PBKDF2", function() { return PBKDF2; });
/* harmony import */ var _SHA1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../SHA1 */ "./src/SHA1.ts");
/* harmony import */ var _Hmac__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../Hmac */ "./src/Hmac.ts");
/* harmony import */ var _Word32Array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Word32Array */ "./src/lib/Word32Array.ts");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../type */ "./src/lib/algorithm/cipher/kdf/type.ts");




/**
 * Password-Based Key Derivation Function 2 algorithm.
 *
 * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
 * @property {Hasher} hasher The hash algorithm to use. Default: SHA1
 * @property {number} iterations The number of iterations to perform. Default: 1
 */
class PBKDF2 extends _type__WEBPACK_IMPORTED_MODULE_3__["BaseKDFModule"] {
    constructor(props) {
        super(props);
        this._keySize = 128 / 32;
        this._Hasher = _SHA1__WEBPACK_IMPORTED_MODULE_0__["SHA1"];
        this._iterations = 1;
        if (props) {
            this._keySize = typeof props.keySize !== "undefined" ? props.keySize : this._keySize;
            this._Hasher = typeof props.Hasher !== "undefined" ? props.Hasher : this._Hasher;
            this._iterations = typeof props.iterations !== "undefined" ? props.iterations : this._iterations;
        }
    }
    /**
     * Derives a key from a password.
     *
     * @param {Word32Array|string} password The password.
     * @param {Word32Array|string} salt A salt.
     * @return {Word32Array} The derived key.
     * @example
     *   var key = kdf.compute(password, salt);
     */
    compute(password, salt) {
        // Init HMAC
        const hmac = new _Hmac__WEBPACK_IMPORTED_MODULE_1__["Hmac"](new this._Hasher(), password);
        // Initial values
        const derivedKey = new _Word32Array__WEBPACK_IMPORTED_MODULE_2__["Word32Array"]();
        const blockIndex = new _Word32Array__WEBPACK_IMPORTED_MODULE_2__["Word32Array"]([0x00000001]);
        // Shortcuts
        const derivedKeyWords = derivedKey.words;
        const blockIndexWords = blockIndex.words;
        const keySize = this._keySize;
        const iterations = this._iterations;
        // Generate key
        while (derivedKeyWords.length < keySize) {
            const block = hmac.update(salt).finalize(blockIndex);
            hmac.reset();
            // Shortcuts
            const blockWords = block.words;
            const blockWordsLength = blockWords.length;
            // Iterations
            let intermediate = block;
            for (let i = 1; i < iterations; i++) {
                intermediate = hmac.finalize(intermediate);
                hmac.reset();
                // Shortcut
                const intermediateWords = intermediate.words;
                // XOR intermediate with block
                for (let j = 0; j < blockWordsLength; j++) {
                    blockWords[j] ^= intermediateWords[j];
                }
            }
            derivedKey.concat(block);
            blockIndexWords[0]++;
        }
        derivedKey.nSigBytes = keySize * 4;
        return derivedKey;
    }
    /**
     * Derives a key from a password.
     *
     * @param {Word32Array|string} password The password.
     * @param {Word32Array|string} salt A salt.
     * @param {Partial<PBKDF2Props>?} props (Optional) The configuration options to use for this computation.
     *
     * @return {Word32Array} The derived key.
     *
     * @static
     *
     * @example
     *
     *     var key = PBKDF2.getKey(password, salt);
     *     var key = PBKDF2.getKey(password, salt, { keySize: 8 });
     *     var key = PBKDF2.getKey(password, salt, { keySize: 8, iterations: 1000 });
     */
    static getKey(password, salt, props) {
        return new PBKDF2(props).compute(password, salt);
    }
}


/***/ }),

/***/ "./src/lib/algorithm/cipher/kdf/type.ts":
/*!**********************************************!*\
  !*** ./src/lib/algorithm/cipher/kdf/type.ts ***!
  \**********************************************/
/*! exports provided: BaseKDFModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseKDFModule", function() { return BaseKDFModule; });
class BaseKDFModule {
    constructor(props) {
        this._props = props;
    }
    compute(password, salt) {
        throw new Error("Not implemented");
    }
    static getKey(password, salt, props) {
        throw new Error("Not implemented");
    }
}


/***/ }),

/***/ "./src/lib/browser.ts":
/*!****************************!*\
  !*** ./src/lib/browser.ts ***!
  \****************************/
/*! exports provided: isIE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIE", function() { return isIE; });
const ua = typeof navigator !== "undefined" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "";
const IEVer = (() => {
    let ver = parseInt((/msie (\d+)/.exec(ua) || [])[1], 10);
    if (isNaN(ver)) {
        ver = parseInt((/trident\/.*; rv:(\d+)/.exec(ua) || [])[1], 10);
        if (isNaN(ver)) {
            return false;
        }
        return ver;
    }
    return ver;
})();
function isIE(op, ver) {
    if (IEVer === false)
        return false;
    if (!ver)
        return true;
    if (op === "<")
        return IEVer < ver;
    if (op === "<=")
        return IEVer <= ver;
    if (op === ">")
        return IEVer > ver;
    if (op === ">=")
        return IEVer >= ver;
    if (op === "=")
        return IEVer === ver;
    return IEVer === ver;
}


/***/ }),

/***/ "./src/lib/encoder/Base64.ts":
/*!***********************************!*\
  !*** ./src/lib/encoder/Base64.ts ***!
  \***********************************/
/*! exports provided: Base64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Base64", function() { return Base64; });
/* harmony import */ var _Word32Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Word32Array */ "./src/lib/Word32Array.ts");

const map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const reverseMap = [];
for (let i = 0; i < map.length; i++) {
    reverseMap[map.charCodeAt(i)] = i;
}
const Base64 = {
    /**
     * Converts a word array to a base64 string.
     *
     * @param {Word32Array} w An array of 32-bit words.
     * @return {string} The base64 string.
     * @example
     *   var hexString = Base64.stringify([0x293892], 6);
     */
    stringify(w) {
        // Shortcuts
        const words = w.words;
        const sigBytes = w.nSigBytes;
        // Clamp excess bits
        w.clamp();
        // Convert
        const base64Chars = [];
        for (let i = 0; i < sigBytes; i += 3) {
            const byte1 = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            const byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
            const byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;
            const triplet = (byte1 << 16) | (byte2 << 8) | byte3;
            for (let j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
                base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
            }
        }
        // Add padding
        const paddingChar = map.charAt(64);
        if (paddingChar) {
            while (base64Chars.length % 4) {
                base64Chars.push(paddingChar);
            }
        }
        return base64Chars.join("");
    },
    /**
     * Converts a base64 string to a word array.
     *
     * @param {string} base64Str The base64 string.
     * @return {Word32Array} The word array.
     * @example
     *   var wordArray = Base64.parse(base64String);
     */
    parse(base64Str) {
        let base64StrLength = base64Str.length;
        // Ignore padding
        const paddingChar = map.charAt(64);
        if (paddingChar) {
            const paddingIndex = base64Str.indexOf(paddingChar);
            if (paddingIndex !== -1) {
                base64StrLength = paddingIndex;
            }
        }
        const words = [];
        let nBytes = 0;
        for (let i = 0; i < base64StrLength; i++) {
            if (i % 4) {
                const bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
                const bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
                const bitsCombined = bits1 | bits2;
                words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
                nBytes++;
            }
        }
        return new _Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"](words, nBytes);
    }
};


/***/ }),

/***/ "./src/lib/encoder/Hex.ts":
/*!********************************!*\
  !*** ./src/lib/encoder/Hex.ts ***!
  \********************************/
/*! exports provided: Hex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hex", function() { return Hex; });
/* harmony import */ var _Word32Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Word32Array */ "./src/lib/Word32Array.ts");

const Hex = {
    /**
     * Converts a word array to a hex string.
     *
     * @param {Word32Array} w An array of 32-bit words.
     * @return {string} The hex string.
     * @example
     *   var hexString = Hex.stringify([0x293892], 6);
     */
    stringify(w) {
        const nSig = w.nSigBytes;
        const words = w.words;
        const hexChars = [];
        for (let i = 0; i < nSig; i++) {
            const byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            hexChars.push((byte >>> 4).toString(16));
            hexChars.push((byte & 0x0f).toString(16));
        }
        return hexChars.join("");
    },
    /**
     * Converts a hex string to a word array.
     *
     * @param {string} hexStr The hex string.
     * @return {Word32Array} The word array.
     * @example
     *   var wordArray = Hex.parse(hexString);
     */
    parse(hexStr) {
        const Len = hexStr.length;
        const words = [];
        for (let i = 0; i < Len; i += 2) {
            words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
        }
        return new _Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"](words, Len / 2);
    }
};


/***/ }),

/***/ "./src/lib/encoder/Latin1.ts":
/*!***********************************!*\
  !*** ./src/lib/encoder/Latin1.ts ***!
  \***********************************/
/*! exports provided: Latin1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Latin1", function() { return Latin1; });
/* harmony import */ var _Word32Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Word32Array */ "./src/lib/Word32Array.ts");

const Latin1 = {
    /**
     * Converts a word array to a Latin1 string.
     *
     * @param {Word32Array} w An array of 32-bit words.
     * @return {string} The Latin1 string.
     * @example
     *   var latin1String = Latin1.stringify([0x293892], 6);
     */
    stringify(w) {
        const nSig = w.nSigBytes;
        const words = w.words;
        const latin1Chars = [];
        for (let i = 0; i < nSig; i++) {
            const byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            latin1Chars.push(String.fromCharCode(byte));
        }
        return latin1Chars.join("");
    },
    /**
     * Converts a latin1 string to a word array.
     *
     * @param {string} latin1Str The latin1 string.
     * @return {Word32Array} The word array.
     * @example
     *   var wordArray = Latin1.parse(latin1Str);
     */
    parse(latin1Str) {
        const Len = latin1Str.length;
        const words = [];
        for (let i = 0; i < Len; i++) {
            words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
        }
        return new _Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"](words, Len);
    }
};


/***/ }),

/***/ "./src/lib/encoder/Utf8.ts":
/*!*********************************!*\
  !*** ./src/lib/encoder/Utf8.ts ***!
  \*********************************/
/*! exports provided: Utf8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utf8", function() { return Utf8; });
/* harmony import */ var _Latin1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Latin1 */ "./src/lib/encoder/Latin1.ts");

const Utf8 = {
    /**
     * Converts a word array to a UTF-8 string.
     *
     * @param {Word32Array} w An array of 32-bit words.
     * @return {string} The UTF-8 string.
     * @example
     *   var utf8String = Utf8.stringify(new Word32Array([0x293892]));
     */
    stringify(w) {
        try {
            return decodeURIComponent(escape(_Latin1__WEBPACK_IMPORTED_MODULE_0__["Latin1"].stringify(w)));
        }
        catch (e) {
            throw new Error("Malformed UTF-8 data");
        }
    },
    /**
     * Converts a UTF-8 string to a word array.
     *
     * @param {string} utf8Str The UTF-8 string.
     * @return {Word32Array} The word array.
     * @example
     *   var wordArray = Utf8.parse(utf8Str);
     */
    parse(utf8Str) {
        return _Latin1__WEBPACK_IMPORTED_MODULE_0__["Latin1"].parse(unescape(encodeURIComponent(utf8Str)));
    }
};


/***/ }),

/***/ "./src/lib/index.ts":
/*!**************************!*\
  !*** ./src/lib/index.ts ***!
  \**************************/
/*! exports provided: random, Word32Array, Word64, Word64Array, isIE, Base64, Utf8, Latin1, Hex, OpenSSLKDF, PBKDF2, EvpKDF */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./random */ "./src/lib/random.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "random", function() { return _random__WEBPACK_IMPORTED_MODULE_0__["random"]; });

/* harmony import */ var _Word32Array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Word32Array */ "./src/lib/Word32Array.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Word32Array", function() { return _Word32Array__WEBPACK_IMPORTED_MODULE_1__["Word32Array"]; });

/* harmony import */ var _Word64Array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Word64Array */ "./src/lib/Word64Array.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Word64", function() { return _Word64Array__WEBPACK_IMPORTED_MODULE_2__["Word64"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Word64Array", function() { return _Word64Array__WEBPACK_IMPORTED_MODULE_2__["Word64Array"]; });

/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./browser */ "./src/lib/browser.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isIE", function() { return _browser__WEBPACK_IMPORTED_MODULE_3__["isIE"]; });

/* harmony import */ var _encoder_Base64__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./encoder/Base64 */ "./src/lib/encoder/Base64.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Base64", function() { return _encoder_Base64__WEBPACK_IMPORTED_MODULE_4__["Base64"]; });

/* harmony import */ var _encoder_Utf8__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./encoder/Utf8 */ "./src/lib/encoder/Utf8.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Utf8", function() { return _encoder_Utf8__WEBPACK_IMPORTED_MODULE_5__["Utf8"]; });

/* harmony import */ var _encoder_Latin1__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./encoder/Latin1 */ "./src/lib/encoder/Latin1.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Latin1", function() { return _encoder_Latin1__WEBPACK_IMPORTED_MODULE_6__["Latin1"]; });

/* harmony import */ var _encoder_Hex__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./encoder/Hex */ "./src/lib/encoder/Hex.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Hex", function() { return _encoder_Hex__WEBPACK_IMPORTED_MODULE_7__["Hex"]; });

/* harmony import */ var _algorithm_cipher_kdf_OpenSSLKDF__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./algorithm/cipher/kdf/OpenSSLKDF */ "./src/lib/algorithm/cipher/kdf/OpenSSLKDF.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OpenSSLKDF", function() { return _algorithm_cipher_kdf_OpenSSLKDF__WEBPACK_IMPORTED_MODULE_8__["OpenSSLKDF"]; });

/* harmony import */ var _algorithm_cipher_kdf_module_PBKDF2__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./algorithm/cipher/kdf/module/PBKDF2 */ "./src/lib/algorithm/cipher/kdf/module/PBKDF2.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PBKDF2", function() { return _algorithm_cipher_kdf_module_PBKDF2__WEBPACK_IMPORTED_MODULE_9__["PBKDF2"]; });

/* harmony import */ var _algorithm_cipher_kdf_module_EvpKDF__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./algorithm/cipher/kdf/module/EvpKDF */ "./src/lib/algorithm/cipher/kdf/module/EvpKDF.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EvpKDF", function() { return _algorithm_cipher_kdf_module_EvpKDF__WEBPACK_IMPORTED_MODULE_10__["EvpKDF"]; });














/***/ }),

/***/ "./src/lib/random.ts":
/*!***************************!*\
  !*** ./src/lib/random.ts ***!
  \***************************/
/*! exports provided: random */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
function makeRandFunction() {
    if (typeof window !== "undefined") {
        const c = window.crypto || window.msCrypto;
        if (!c) {
            throw new Error("Crypto module not found");
        }
        return function rand() {
            return c.getRandomValues(new Uint32Array(1))[0];
        };
    }
    else if (typeof global !== "undefined" && global.crypto) {
        return function rand() {
            return global.crypto.randomBytes(4).readInt32LE();
        };
    }
    else if (true) {
        return function rand() {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return require("crypto").randomBytes(4).readInt32LE();
        };
    }
    throw new Error("Unable to find crypto module");
}
const random = makeRandFunction();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ })

/******/ });
});
//# sourceMappingURL=lib.js.map