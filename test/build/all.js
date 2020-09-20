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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/all.ts");
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
        if (key.length() > hasherBlockSizeBytes) {
            key = hasher.finalize(key);
        }
        // Clamp excess bits
        key.clamp();
        const oKey = this._oKey = key.clone();
        const iKey = this._iKey = key.clone();
        const oKeyWords = oKey.raw();
        const iKeyWords = iKey.raw();
        for (let i = 0; i < hasherBlockSize; i++) {
            oKeyWords[i] ^= 0x5c5c5c5c;
            iKeyWords[i] ^= 0x36363636;
        }
        iKey.setSignificantBytes(hasherBlockSizeBytes);
        oKey.setSignificantBytes(hasherBlockSizeBytes);
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
     * @param {IWordArray|string} messageUpdate The message to append.
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
     * @param {IWordArray|string} messageUpdate (Optional) A final message update.
     * @return {IWordArray} The Hmac.
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

/***/ "./src/HmacMD5.ts":
/*!************************!*\
  !*** ./src/HmacMD5.ts ***!
  \************************/
/*! exports provided: HmacMD5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HmacMD5", function() { return HmacMD5; });
/* harmony import */ var _Hmac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Hmac */ "./src/Hmac.ts");
/* harmony import */ var _MD5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MD5 */ "./src/MD5.ts");


function HmacMD5(message, key) {
    return new _Hmac__WEBPACK_IMPORTED_MODULE_0__["Hmac"](new _MD5__WEBPACK_IMPORTED_MODULE_1__["MD5"](), key).finalize(message);
}


/***/ }),

/***/ "./src/HmacSHA224.ts":
/*!***************************!*\
  !*** ./src/HmacSHA224.ts ***!
  \***************************/
/*! exports provided: HmacSHA224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HmacSHA224", function() { return HmacSHA224; });
/* harmony import */ var _Hmac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Hmac */ "./src/Hmac.ts");
/* harmony import */ var _SHA224__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SHA224 */ "./src/SHA224.ts");


function HmacSHA224(message, key) {
    return new _Hmac__WEBPACK_IMPORTED_MODULE_0__["Hmac"](new _SHA224__WEBPACK_IMPORTED_MODULE_1__["SHA224"](), key).finalize(message);
}


/***/ }),

/***/ "./src/HmacSHA256.ts":
/*!***************************!*\
  !*** ./src/HmacSHA256.ts ***!
  \***************************/
/*! exports provided: HmacSHA256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HmacSHA256", function() { return HmacSHA256; });
/* harmony import */ var _Hmac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Hmac */ "./src/Hmac.ts");
/* harmony import */ var _SHA256__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SHA256 */ "./src/SHA256.ts");


function HmacSHA256(message, key) {
    return new _Hmac__WEBPACK_IMPORTED_MODULE_0__["Hmac"](new _SHA256__WEBPACK_IMPORTED_MODULE_1__["SHA256"](), key).finalize(message);
}


/***/ }),

/***/ "./src/HmacSHA384.ts":
/*!***************************!*\
  !*** ./src/HmacSHA384.ts ***!
  \***************************/
/*! exports provided: HmacSHA384 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HmacSHA384", function() { return HmacSHA384; });
/* harmony import */ var _Hmac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Hmac */ "./src/Hmac.ts");
/* harmony import */ var _SHA384__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SHA384 */ "./src/SHA384.ts");


function HmacSHA384(message, key) {
    return new _Hmac__WEBPACK_IMPORTED_MODULE_0__["Hmac"](new _SHA384__WEBPACK_IMPORTED_MODULE_1__["SHA384"](), key).finalize(message);
}


/***/ }),

/***/ "./src/HmacSHA512.ts":
/*!***************************!*\
  !*** ./src/HmacSHA512.ts ***!
  \***************************/
/*! exports provided: HmacSHA512 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HmacSHA512", function() { return HmacSHA512; });
/* harmony import */ var _Hmac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Hmac */ "./src/Hmac.ts");
/* harmony import */ var _SHA512__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SHA512 */ "./src/SHA512.ts");


function HmacSHA512(message, key) {
    return new _Hmac__WEBPACK_IMPORTED_MODULE_0__["Hmac"](new _SHA512__WEBPACK_IMPORTED_MODULE_1__["SHA512"](), key).finalize(message);
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
    doReset() {
        this._hash = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"]([
            0x67452301, 0xefcdab89,
            0x98badcfe, 0x10325476
        ]);
    }
    doProcessBlock(words, offset) {
        // Swap endian
        for (let i = 0; i < 16; i++) {
            // Shortcuts
            const offsetI = offset + i;
            const wordsOffsetI = words[offsetI];
            words[offsetI] = ((((wordsOffsetI << 8) | (wordsOffsetI >>> 24)) & 0x00ff00ff)
                | (((wordsOffsetI << 24) | (wordsOffsetI >>> 8)) & 0xff00ff00));
        }
        // Shortcuts
        const H = this._hash.raw();
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
    doFinalize() {
        // Shortcuts
        const data = this._data;
        const dataWords = data.raw();
        const nBitsTotal = this._nBytes * 8;
        const nBitsLeft = data.length() * 8;
        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        const nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
        const nBitsTotalL = nBitsTotal;
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = ((((nBitsTotalH << 8) | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
            (((nBitsTotalH << 24) | (nBitsTotalH >>> 8)) & 0xff00ff00));
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = ((((nBitsTotalL << 8) | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
            (((nBitsTotalL << 24) | (nBitsTotalL >>> 8)) & 0xff00ff00));
        data.setSignificantBytes((dataWords.length + 1) * 4);
        // Hash final blocks
        this.process();
        // Shortcuts
        const hash = this._hash;
        const H = hash.raw();
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
    doReset() {
        this._hash = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_1__["Word32Array"]([
            0x67452301, 0xefcdab89,
            0x98badcfe, 0x10325476,
            0xc3d2e1f0
        ]);
    }
    doProcessBlock(words, offset) {
        const H = this._hash.raw();
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
    doFinalize() {
        // Shortcuts
        const dataWords = this._data.raw();
        const nBitsTotal = this._nBytes * 8;
        const nBitsLeft = this._data.length() * 8;
        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
        this._data.setSignificantBytes(dataWords.length * 4);
        // Hash final blocks
        this.process();
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

/***/ "./src/SHA224.ts":
/*!***********************!*\
  !*** ./src/SHA224.ts ***!
  \***********************/
/*! exports provided: SHA224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHA224", function() { return SHA224; });
/* harmony import */ var _lib_Word32Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/Word32Array */ "./src/lib/Word32Array.ts");
/* harmony import */ var _SHA256__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SHA256 */ "./src/SHA256.ts");


class SHA224 extends _SHA256__WEBPACK_IMPORTED_MODULE_1__["SHA256"] {
    constructor(props) {
        super(props);
        this._hash = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"]([
            0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
            0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
        ]);
        this._props = props;
        if (props && typeof props.hash !== "undefined") {
            this._hash = props.hash.clone();
        }
    }
    doReset() {
        this._hash = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"]([
            0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
            0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
        ]);
    }
    doFinalize() {
        const hash = super.doFinalize.call(this);
        hash.setSignificantBytes(hash.length() - 4);
        return hash;
    }
    clone() {
        const props = { hash: this._hash, blockSize: this._blockSize, data: this._data, nBytes: this._nBytes };
        return new SHA224(props);
    }
    static hash(message, props) {
        return new SHA224(props).finalize(message);
    }
}


/***/ }),

/***/ "./src/SHA256.ts":
/*!***********************!*\
  !*** ./src/SHA256.ts ***!
  \***********************/
/*! exports provided: SHA256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHA256", function() { return SHA256; });
/* harmony import */ var _lib_algorithm_Hasher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/algorithm/Hasher */ "./src/lib/algorithm/Hasher.ts");
/* harmony import */ var _lib_Word32Array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/Word32Array */ "./src/lib/Word32Array.ts");


// Hash values
const H = [];
// Round constants
const K = [];
function isPrime(n) {
    const sqrtN = Math.sqrt(n);
    for (let factor = 2; factor <= sqrtN; factor++) {
        if (!(n % factor)) {
            return false;
        }
    }
    return true;
}
function getFractionalBits(n) {
    return ((n - (n | 0)) * 0x100000000) | 0;
}
(function computeRoundConstants() {
    let n = 2;
    let nPrime = 0;
    while (nPrime < 64) {
        if (isPrime(n)) {
            if (nPrime < 8) {
                H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
            }
            K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));
            nPrime++;
        }
        n++;
    }
})();
// Reusable object
const W = [];
class SHA256 extends _lib_algorithm_Hasher__WEBPACK_IMPORTED_MODULE_0__["Hasher"] {
    constructor(props) {
        super(props);
        this._hash = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_1__["Word32Array"](H.slice(0));
        this._props = props;
        if (props && typeof props.hash !== "undefined") {
            this._hash = props.hash.clone();
        }
    }
    doReset() {
        this._hash = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_1__["Word32Array"](H.slice(0));
    }
    doProcessBlock(words, offset) {
        const _H = this._hash.raw();
        let a = _H[0];
        let b = _H[1];
        let c = _H[2];
        let d = _H[3];
        let e = _H[4];
        let f = _H[5];
        let g = _H[6];
        let h = _H[7];
        for (let i = 0; i < 64; i++) {
            if (i < 16) {
                W[i] = words[offset + i] | 0;
            }
            else {
                const gamma0x = W[i - 15];
                const gamma0 = ((gamma0x << 25) | (gamma0x >>> 7))
                    ^ ((gamma0x << 14) | (gamma0x >>> 18))
                    ^ (gamma0x >>> 3);
                const gamma1x = W[i - 2];
                const gamma1 = ((gamma1x << 15) | (gamma1x >>> 17))
                    ^ ((gamma1x << 13) | (gamma1x >>> 19))
                    ^ (gamma1x >>> 10);
                W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
            }
            const ch = (e & f) ^ (~e & g);
            const maj = (a & b) ^ (a & c) ^ (b & c);
            const sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
            const sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7) | (e >>> 25));
            const t1 = h + sigma1 + ch + K[i] + W[i];
            const t2 = sigma0 + maj;
            h = g;
            g = f;
            f = e;
            e = (d + t1) | 0;
            d = c;
            c = b;
            b = a;
            a = (t1 + t2) | 0;
        }
        // Intermediate hash value
        _H[0] = (_H[0] + a) | 0;
        _H[1] = (_H[1] + b) | 0;
        _H[2] = (_H[2] + c) | 0;
        _H[3] = (_H[3] + d) | 0;
        _H[4] = (_H[4] + e) | 0;
        _H[5] = (_H[5] + f) | 0;
        _H[6] = (_H[6] + g) | 0;
        _H[7] = (_H[7] + h) | 0;
    }
    doFinalize() {
        const words = this._data.raw();
        const nBitsTotal = this._nBytes * 8;
        const nBitsLeft = this._data.length() * 8;
        // Add padding
        words[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        words[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
        words[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
        this._data.setSignificantBytes(words.length * 4);
        // Hash final blocks
        this.process();
        // Return final computed hash
        return this._hash;
    }
    clone() {
        const props = { hash: this._hash, blockSize: this._blockSize, data: this._data, nBytes: this._nBytes };
        return new SHA256(props);
    }
    static hash(message, props) {
        return new SHA256(props).finalize(message);
    }
}


/***/ }),

/***/ "./src/SHA3.ts":
/*!*********************!*\
  !*** ./src/SHA3.ts ***!
  \*********************/
/*! exports provided: SHA3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHA3", function() { return SHA3; });
/* harmony import */ var _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/Word64Array */ "./src/lib/Word64Array.ts");
/* harmony import */ var _lib_algorithm_Hasher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/algorithm/Hasher */ "./src/lib/algorithm/Hasher.ts");
/* harmony import */ var _lib_Word32Array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/Word32Array */ "./src/lib/Word32Array.ts");
// Constants tables



const RHO_OFFSETS = [];
const PI_INDEXES = [];
const ROUND_CONSTANTS = [];
// Compute Constants
(function computeConstants() {
    // Compute rho offset constants
    let x = 1;
    let y = 0;
    for (let t = 0; t < 24; t++) {
        RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;
        const newX = y % 5;
        const newY = (2 * x + 3 * y) % 5;
        x = newX;
        y = newY;
    }
    // Compute pi index constants
    for (let p = 0; p < 5; p++) {
        for (let q = 0; q < 5; q++) {
            PI_INDEXES[p + 5 * q] = q + ((2 * p + 3 * q) % 5) * 5;
        }
    }
    // Compute round constants
    let LFSR = 0x01;
    for (let i = 0; i < 24; i++) {
        let roundConstantMsw = 0;
        let roundConstantLsw = 0;
        for (let j = 0; j < 7; j++) {
            if (LFSR & 0x01) {
                const bitPosition = (1 << j) - 1;
                if (bitPosition < 32) {
                    roundConstantLsw ^= 1 << bitPosition;
                }
                else /* if (bitPosition >= 32) */ {
                    roundConstantMsw ^= 1 << (bitPosition - 32);
                }
            }
            // Compute next LFSR
            if (LFSR & 0x80) {
                // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
                LFSR = (LFSR << 1) ^ 0x71;
            }
            else {
                LFSR <<= 1;
            }
        }
        ROUND_CONSTANTS[i] = new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](roundConstantMsw, roundConstantLsw);
    }
}());
// Reusable objects for temporary values
const T = [];
(function () {
    for (let i = 0; i < 25; i++) {
        T[i] = new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0, 0);
    }
}());
class SHA3 extends _lib_algorithm_Hasher__WEBPACK_IMPORTED_MODULE_1__["Hasher"] {
    constructor(props) {
        super(props);
        this._blockSize = 1024 / 32;
        this._state = [];
        this._outputLength = 512;
        this._props = props;
        if (props) {
            if (typeof props.outputLength !== "undefined") {
                if (![224, 256, 384, 512].includes(props.outputLength)) {
                    throw new Error("Unsupported output length.");
                }
                this._outputLength = props.outputLength;
            }
            if (typeof props.state !== "undefined") {
                this._state = props.state.map(s => s.clone());
            }
        }
        if (this._state.length === 0) {
            for (let i = 0; i < 25; i++) {
                this._state[i] = new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0, 0);
            }
        }
        this._blockSize = (1600 - 2 * this._outputLength) / 32;
    }
    doReset() {
        this._state = [];
        for (let i = 0; i < 25; i++) {
            this._state[i] = new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0, 0);
        }
        this._blockSize = (1600 - 2 * this._outputLength) / 32;
    }
    doProcessBlock(words, offset) {
        // Shortcuts
        const state = this._state;
        const nBlockSizeLanes = this._blockSize / 2;
        // Absorb
        for (let i = 0; i < nBlockSizeLanes; i++) {
            // Shortcuts
            let W2i = words[offset + 2 * i];
            let W2i1 = words[offset + 2 * i + 1];
            // Swap endian
            W2i = ((((W2i << 8) | (W2i >>> 24)) & 0x00ff00ff) |
                (((W2i << 24) | (W2i >>> 8)) & 0xff00ff00));
            W2i1 = ((((W2i1 << 8) | (W2i1 >>> 24)) & 0x00ff00ff) |
                (((W2i1 << 24) | (W2i1 >>> 8)) & 0xff00ff00));
            // Absorb message into state
            state[i].high ^= W2i1;
            state[i].low ^= W2i;
        }
        // Rounds
        for (let round = 0; round < 24; round++) {
            // Theta
            for (let x = 0; x < 5; x++) {
                // Mix column lanes
                let tMsw = 0;
                let tLsw = 0;
                for (let y = 0; y < 5; y++) {
                    const l = state[x + 5 * y];
                    tMsw ^= l.high;
                    tLsw ^= l.low;
                }
                // Temporary values
                const Tx = T[x];
                Tx.high = tMsw;
                Tx.low = tLsw;
            }
            for (let x = 0; x < 5; x++) {
                // Shortcuts
                const Tx4 = T[(x + 4) % 5];
                const Tx1 = T[(x + 1) % 5];
                const Tx1Msw = Tx1.high;
                const Tx1Lsw = Tx1.low;
                // Mix surrounding columns
                const tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
                const tLsw = Tx4.low ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
                for (let y = 0; y < 5; y++) {
                    const l = state[x + 5 * y];
                    l.high ^= tMsw;
                    l.low ^= tLsw;
                }
            }
            // Rho Pi
            for (let laneIndex = 1; laneIndex < 25; laneIndex++) {
                let tMsw;
                let tLsw;
                // Shortcuts
                const laneMsw = state[laneIndex].high;
                const laneLsw = state[laneIndex].low;
                const rhoOffset = RHO_OFFSETS[laneIndex];
                // Rotate lanes
                if (rhoOffset < 32) {
                    tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
                    tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
                }
                else /* if (rhoOffset >= 32) */ {
                    tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
                    tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
                }
                // Transpose lanes
                const TPiLane = T[PI_INDEXES[laneIndex]];
                TPiLane.high = tMsw;
                TPiLane.low = tLsw;
            }
            // Rho pi at x = y = 0
            const T0 = T[0];
            const state0 = state[0];
            T0.high = state0.high;
            T0.low = state0.low;
            // Chi
            for (let x = 0; x < 5; x++) {
                for (let y = 0; y < 5; y++) {
                    // Shortcuts
                    const laneIndex = x + 5 * y;
                    const l = state[laneIndex];
                    const TLane = T[laneIndex];
                    const Tx1Lane = T[((x + 1) % 5) + 5 * y];
                    const Tx2Lane = T[((x + 2) % 5) + 5 * y];
                    // Mix rows
                    l.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
                    l.low = TLane.low ^ (~Tx1Lane.low & Tx2Lane.low);
                }
            }
            // Iota
            const lane = state[0];
            const roundConstant = ROUND_CONSTANTS[round];
            lane.high ^= roundConstant.high;
            lane.low ^= roundConstant.low;
        }
    }
    doFinalize() {
        // Shortcuts
        const data = this._data;
        const dataWords = data.raw();
        const nBitsLeft = data.length() * 8;
        const blockSizeBits = this.blockSize * 32;
        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
        dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
        data.setSignificantBytes(dataWords.length * 4);
        // Hash final blocks
        this.process();
        // Shortcuts
        const state = this._state;
        const outputLengthBytes = this._outputLength / 8;
        const outputLengthLanes = outputLengthBytes / 8;
        // Squeeze
        const hashWords = [];
        for (let i = 0; i < outputLengthLanes; i++) {
            // Shortcuts
            const lane = state[i];
            let laneMsw = lane.high;
            let laneLsw = lane.low;
            // Swap endian
            laneMsw = ((((laneMsw << 8) | (laneMsw >>> 24)) & 0x00ff00ff) |
                (((laneMsw << 24) | (laneMsw >>> 8)) & 0xff00ff00));
            laneLsw = ((((laneLsw << 8) | (laneLsw >>> 24)) & 0x00ff00ff) |
                (((laneLsw << 24) | (laneLsw >>> 8)) & 0xff00ff00));
            // Squeeze state to retrieve hash
            hashWords.push(laneLsw);
            hashWords.push(laneMsw);
        }
        // Return final computed hash
        return new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_2__["Word32Array"](hashWords, outputLengthBytes);
    }
    clone() {
        const props = {
            outputLength: this._outputLength,
            state: this._state,
            blockSize: this._blockSize,
            data: this._data,
            nBytes: this._nBytes,
        };
        return new SHA3(props);
    }
    static hash(message, props) {
        return new SHA3(props).finalize(message);
    }
}


/***/ }),

/***/ "./src/SHA384.ts":
/*!***********************!*\
  !*** ./src/SHA384.ts ***!
  \***********************/
/*! exports provided: SHA384 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHA384", function() { return SHA384; });
/* harmony import */ var _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/Word64Array */ "./src/lib/Word64Array.ts");
/* harmony import */ var _SHA512__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SHA512 */ "./src/SHA512.ts");


class SHA384 extends _SHA512__WEBPACK_IMPORTED_MODULE_1__["SHA512"] {
    constructor(props) {
        super(props);
        this._hash = new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64Array"]([
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0xcbbb9d5d, 0xc1059ed8), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0x629a292a, 0x367cd507),
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0x9159015a, 0x3070dd17), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0x152fecd8, 0xf70e5939),
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0x67332667, 0xffc00b31), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0x8eb44a87, 0x68581511),
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0xdb0c2e0d, 0x64f98fa7), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0x47b5481d, 0xbefa4fa4)
        ]);
        this._props = props;
        if (props && typeof props.hash !== "undefined") {
            this._hash = props.hash.clone();
        }
    }
    doReset() {
        this._hash = new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64Array"]([
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0xcbbb9d5d, 0xc1059ed8), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0x629a292a, 0x367cd507),
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0x9159015a, 0x3070dd17), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0x152fecd8, 0xf70e5939),
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0x67332667, 0xffc00b31), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0x8eb44a87, 0x68581511),
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0xdb0c2e0d, 0x64f98fa7), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0x47b5481d, 0xbefa4fa4)
        ]);
    }
    doFinalize() {
        const hash = super.doFinalize.call(this);
        hash.setSignificantBytes(hash.length() - 16);
        return hash;
    }
    clone() {
        const props = { hash: this._hash, blockSize: this._blockSize, data: this._data, nBytes: this._nBytes };
        return new SHA384(props);
    }
    static hash(message, props) {
        return new SHA384(props).finalize(message);
    }
}


/***/ }),

/***/ "./src/SHA512.ts":
/*!***********************!*\
  !*** ./src/SHA512.ts ***!
  \***********************/
/*! exports provided: SHA512 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHA512", function() { return SHA512; });
/* harmony import */ var _lib_algorithm_Hasher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/algorithm/Hasher */ "./src/lib/algorithm/Hasher.ts");
/* harmony import */ var _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/Word64Array */ "./src/lib/Word64Array.ts");


const K = [
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x428a2f98, 0xd728ae22), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x71374491, 0x23ef65cd),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xb5c0fbcf, 0xec4d3b2f), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xe9b5dba5, 0x8189dbbc),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x3956c25b, 0xf348b538), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x59f111f1, 0xb605d019),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x923f82a4, 0xaf194f9b), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xab1c5ed5, 0xda6d8118),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xd807aa98, 0xa3030242), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x12835b01, 0x45706fbe),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x243185be, 0x4ee4b28c), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x550c7dc3, 0xd5ffb4e2),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x72be5d74, 0xf27b896f), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x80deb1fe, 0x3b1696b1),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x9bdc06a7, 0x25c71235), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xc19bf174, 0xcf692694),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xe49b69c1, 0x9ef14ad2), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xefbe4786, 0x384f25e3),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x0fc19dc6, 0x8b8cd5b5), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x240ca1cc, 0x77ac9c65),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x2de92c6f, 0x592b0275), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x4a7484aa, 0x6ea6e483),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x5cb0a9dc, 0xbd41fbd4), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x76f988da, 0x831153b5),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x983e5152, 0xee66dfab), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xa831c66d, 0x2db43210),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xb00327c8, 0x98fb213f), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xbf597fc7, 0xbeef0ee4),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xc6e00bf3, 0x3da88fc2), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xd5a79147, 0x930aa725),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x06ca6351, 0xe003826f), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x14292967, 0x0a0e6e70),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x27b70a85, 0x46d22ffc), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x2e1b2138, 0x5c26c926),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x4d2c6dfc, 0x5ac42aed), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x53380d13, 0x9d95b3df),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x650a7354, 0x8baf63de), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x766a0abb, 0x3c77b2a8),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x81c2c92e, 0x47edaee6), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x92722c85, 0x1482353b),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xa2bfe8a1, 0x4cf10364), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xa81a664b, 0xbc423001),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xc24b8b70, 0xd0f89791), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xc76c51a3, 0x0654be30),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xd192e819, 0xd6ef5218), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xd6990624, 0x5565a910),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xf40e3585, 0x5771202a), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x106aa070, 0x32bbd1b8),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x19a4c116, 0xb8d2d0c8), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x1e376c08, 0x5141ab53),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x2748774c, 0xdf8eeb99), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x34b0bcb5, 0xe19b48a8),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x391c0cb3, 0xc5c95a63), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x4ed8aa4a, 0xe3418acb),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x5b9cca4f, 0x7763e373), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x682e6ff3, 0xd6b2b8a3),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x748f82ee, 0x5defb2fc), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x78a5636f, 0x43172f60),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x84c87814, 0xa1f0ab72), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x8cc70208, 0x1a6439ec),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x90befffa, 0x23631e28), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xa4506ceb, 0xde82bde9),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xbef9a3f7, 0xb2c67915), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xc67178f2, 0xe372532b),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xca273ece, 0xea26619c), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xd186b8c7, 0x21c0c207),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xeada7dd6, 0xcde0eb1e), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xf57d4f7f, 0xee6ed178),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x06f067aa, 0x72176fba), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x0a637dc5, 0xa2c898a6),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x113f9804, 0xbef90dae), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x1b710b35, 0x131c471b),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x28db77f5, 0x23047d84), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x32caab7b, 0x40c72493),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x3c9ebe0a, 0x15c9bebc), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x431d67c4, 0x9c100d4c),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x4cc5d4be, 0xcb3e42b6), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x597f299c, 0xfc657e2a),
    new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x5fcb6fab, 0x3ad6faec), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x6c44198c, 0x4a475817),
];
const W = [];
(function computeConstants() {
    for (let i = 0; i < 80; i++) {
        W[i] = new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0, 0);
    }
})();
class SHA512 extends _lib_algorithm_Hasher__WEBPACK_IMPORTED_MODULE_0__["Hasher"] {
    constructor(props) {
        super(props);
        this._blockSize = 1024 / 32;
        this._hash = new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64Array"]([
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x6a09e667, 0xf3bcc908), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xbb67ae85, 0x84caa73b),
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x3c6ef372, 0xfe94f82b), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xa54ff53a, 0x5f1d36f1),
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x510e527f, 0xade682d1), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x9b05688c, 0x2b3e6c1f),
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x1f83d9ab, 0xfb41bd6b), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x5be0cd19, 0x137e2179)
        ]);
        this._props = props;
        if (props && typeof props.hash !== "undefined") {
            this._hash = props.hash.clone();
        }
    }
    doReset() {
        this._hash = new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64Array"]([
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x6a09e667, 0xf3bcc908), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xbb67ae85, 0x84caa73b),
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x3c6ef372, 0xfe94f82b), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xa54ff53a, 0x5f1d36f1),
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x510e527f, 0xade682d1), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x9b05688c, 0x2b3e6c1f),
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x1f83d9ab, 0xfb41bd6b), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x5be0cd19, 0x137e2179)
        ]);
    }
    doProcessBlock(words, offset) {
        // Shortcuts
        const H = this._hash.raw();
        const H0 = H[0];
        const H1 = H[1];
        const H2 = H[2];
        const H3 = H[3];
        const H4 = H[4];
        const H5 = H[5];
        const H6 = H[6];
        const H7 = H[7];
        const H0h = H0.high;
        let H0l = H0.low;
        const H1h = H1.high;
        let H1l = H1.low;
        const H2h = H2.high;
        let H2l = H2.low;
        const H3h = H3.high;
        let H3l = H3.low;
        const H4h = H4.high;
        let H4l = H4.low;
        const H5h = H5.high;
        let H5l = H5.low;
        const H6h = H6.high;
        let H6l = H6.low;
        const H7h = H7.high;
        let H7l = H7.low;
        // Working variables
        let ah = H0h;
        let al = H0l;
        let bh = H1h;
        let bl = H1l;
        let ch = H2h;
        let cl = H2l;
        let dh = H3h;
        let dl = H3l;
        let eh = H4h;
        let el = H4l;
        let fh = H5h;
        let fl = H5l;
        let gh = H6h;
        let gl = H6l;
        let hh = H7h;
        let hl = H7l;
        // Rounds
        for (let i = 0; i < 80; i++) {
            let Wil;
            let Wih;
            // Shortcut
            const Wi = W[i];
            // Extend message
            if (i < 16) {
                Wih = Wi.high = words[offset + i * 2] | 0;
                Wil = Wi.low = words[offset + i * 2 + 1] | 0;
            }
            else {
                // Gamma0
                const gamma0x = W[i - 15];
                const gamma0xh = gamma0x.high;
                const gamma0xl = gamma0x.low;
                const gamma0h = ((gamma0xh >>> 1) | (gamma0xl << 31))
                    ^ ((gamma0xh >>> 8) | (gamma0xl << 24))
                    ^ (gamma0xh >>> 7);
                const gamma0l = ((gamma0xl >>> 1) | (gamma0xh << 31))
                    ^ ((gamma0xl >>> 8) | (gamma0xh << 24))
                    ^ ((gamma0xl >>> 7) | (gamma0xh << 25));
                // Gamma1
                const gamma1x = W[i - 2];
                const gamma1xh = gamma1x.high;
                const gamma1xl = gamma1x.low;
                const gamma1h = ((gamma1xh >>> 19) | (gamma1xl << 13))
                    ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
                const gamma1l = ((gamma1xl >>> 19) | (gamma1xh << 13))
                    ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));
                // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
                const Wi7 = W[i - 7];
                const Wi7h = Wi7.high;
                const Wi7l = Wi7.low;
                const Wi16 = W[i - 16];
                const Wi16h = Wi16.high;
                const Wi16l = Wi16.low;
                Wil = gamma0l + Wi7l;
                Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
                Wil = Wil + gamma1l;
                Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
                Wil = Wil + Wi16l;
                Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);
                Wi.high = Wih;
                Wi.low = Wil;
            }
            const chh = (eh & fh) ^ (~eh & gh);
            const chl = (el & fl) ^ (~el & gl);
            const majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
            const majl = (al & bl) ^ (al & cl) ^ (bl & cl);
            const sigma0h = ((ah >>> 28) | (al << 4)) ^ ((ah << 30) | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
            const sigma0l = ((al >>> 28) | (ah << 4)) ^ ((al << 30) | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
            const sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
            const sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));
            // t1 = h + sigma1 + ch + K[i] + W[i]
            const Ki = K[i];
            const Kih = Ki.high;
            const Kil = Ki.low;
            let t1l = hl + sigma1l;
            let t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
            t1l = t1l + chl;
            t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
            t1l = t1l + Kil;
            t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
            t1l = t1l + Wil;
            t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);
            // t2 = sigma0 + maj
            const t2l = sigma0l + majl;
            const t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);
            // Update working variables
            hh = gh;
            hl = gl;
            gh = fh;
            gl = fl;
            fh = eh;
            fl = el;
            el = (dl + t1l) | 0;
            eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
            dh = ch;
            dl = cl;
            ch = bh;
            cl = bl;
            bh = ah;
            bl = al;
            al = (t1l + t2l) | 0;
            ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
        }
        // Intermediate hash value
        H0l = H0.low = (H0l + al);
        H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
        H1l = H1.low = (H1l + bl);
        H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
        H2l = H2.low = (H2l + cl);
        H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
        H3l = H3.low = (H3l + dl);
        H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
        H4l = H4.low = (H4l + el);
        H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
        H5l = H5.low = (H5l + fl);
        H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
        H6l = H6.low = (H6l + gl);
        H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
        H7l = H7.low = (H7l + hl);
        H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
    }
    doFinalize() {
        // Shortcuts
        const data = this._data;
        const dataWords = data.raw();
        const nBitsTotal = this._nBytes * 8;
        const nBitsLeft = data.length() * 8;
        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
        dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
        data.setSignificantBytes(dataWords.length * 4);
        // Hash final blocks
        this.process();
        // Convert hash to 32-bit word array before returning
        return this._hash.to32();
    }
    clone() {
        const props = { hash: this._hash, blockSize: this._blockSize, data: this._data, nBytes: this._nBytes };
        return new SHA512(props);
    }
    static hash(message, props) {
        return new SHA512(props).finalize(message);
    }
}


/***/ }),

/***/ "./src/all.ts":
/*!********************!*\
  !*** ./src/all.ts ***!
  \********************/
/*! exports provided: Hmac, HmacMD5, HmacSHA224, HmacSHA256, HmacSHA384, HmacSHA512, MD5, SHA1, SHA224, SHA256, SHA384, SHA512, SHA3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Hmac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Hmac */ "./src/Hmac.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Hmac", function() { return _Hmac__WEBPACK_IMPORTED_MODULE_0__["Hmac"]; });

/* harmony import */ var _HmacMD5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HmacMD5 */ "./src/HmacMD5.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HmacMD5", function() { return _HmacMD5__WEBPACK_IMPORTED_MODULE_1__["HmacMD5"]; });

/* harmony import */ var _HmacSHA224__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HmacSHA224 */ "./src/HmacSHA224.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HmacSHA224", function() { return _HmacSHA224__WEBPACK_IMPORTED_MODULE_2__["HmacSHA224"]; });

/* harmony import */ var _HmacSHA256__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HmacSHA256 */ "./src/HmacSHA256.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HmacSHA256", function() { return _HmacSHA256__WEBPACK_IMPORTED_MODULE_3__["HmacSHA256"]; });

/* harmony import */ var _HmacSHA384__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./HmacSHA384 */ "./src/HmacSHA384.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HmacSHA384", function() { return _HmacSHA384__WEBPACK_IMPORTED_MODULE_4__["HmacSHA384"]; });

/* harmony import */ var _HmacSHA512__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HmacSHA512 */ "./src/HmacSHA512.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HmacSHA512", function() { return _HmacSHA512__WEBPACK_IMPORTED_MODULE_5__["HmacSHA512"]; });

/* harmony import */ var _MD5__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MD5 */ "./src/MD5.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MD5", function() { return _MD5__WEBPACK_IMPORTED_MODULE_6__["MD5"]; });

/* harmony import */ var _SHA1__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SHA1 */ "./src/SHA1.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SHA1", function() { return _SHA1__WEBPACK_IMPORTED_MODULE_7__["SHA1"]; });

/* harmony import */ var _SHA224__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SHA224 */ "./src/SHA224.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SHA224", function() { return _SHA224__WEBPACK_IMPORTED_MODULE_8__["SHA224"]; });

/* harmony import */ var _SHA256__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SHA256 */ "./src/SHA256.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SHA256", function() { return _SHA256__WEBPACK_IMPORTED_MODULE_9__["SHA256"]; });

/* harmony import */ var _SHA384__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SHA384 */ "./src/SHA384.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SHA384", function() { return _SHA384__WEBPACK_IMPORTED_MODULE_10__["SHA384"]; });

/* harmony import */ var _SHA512__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SHA512 */ "./src/SHA512.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SHA512", function() { return _SHA512__WEBPACK_IMPORTED_MODULE_11__["SHA512"]; });

/* harmony import */ var _SHA3__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./SHA3 */ "./src/SHA3.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SHA3", function() { return _SHA3__WEBPACK_IMPORTED_MODULE_12__["SHA3"]; });
















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
    /**
     * Get raw reference of internal words.
     * Modification of this raw array will affect internal words.
     */
    raw() {
        return this._words;
    }
    /**
     * Return a copy of an array of 32-bit words.
     */
    slice() {
        return this._words.slice();
    }
    /**
     * Return significantBytes
     */
    length() {
        return this._nSignificantBytes;
    }
    /**
     * Set significant bytes
     * @param {number} n - significant bytes
     */
    setSignificantBytes(n) {
        this._nSignificantBytes = n;
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
            return _encoder_Hex__WEBPACK_IMPORTED_MODULE_0__["Hex"].stringify(this._words, this._nSignificantBytes);
        }
        return encoder.stringify(this._words, this._nSignificantBytes);
    }
    /**
     * Concatenates a word array to this word array.
     *
     * @param {IWordArray} w The word array to append.
     * @return {IWordArray} This word array.
     * @example
     *   wordArray1.concat(wordArray2);
     */
    concat(w) {
        const words = w.slice();
        const N = w.length();
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
     * @return {IWordArray} The clone.
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
     * @return {IWordArray} The random word array.
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
     * Get raw reference of internal words.
     * Modification of this raw array will affect internal words.
     */
    raw() {
        return this._words;
    }
    /**
     * Return a copy of an array of 32-bit words.
     */
    slice() {
        return this._words.slice();
    }
    /**
     * Return significantBytes
     */
    length() {
        return this._nSignificantBytes;
    }
    /**
     * Set significant bytes
     * @param {number} n - significant bytes
     */
    setSignificantBytes(n) {
        this._nSignificantBytes = n;
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
            return _encoder_Hex__WEBPACK_IMPORTED_MODULE_0__["Hex"].stringify(this.to32().slice(), this._nSignificantBytes);
        }
        return encoder.stringify(this.to32().slice(), this._nSignificantBytes);
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
     * @param {IWordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
     * @example
     *   bufferedBlockAlgorithm.append('data');
     *   bufferedBlockAlgorithm.append(wordArray);
     */
    append(data) {
        if (typeof data === "string") {
            data = _encoder_Utf8__WEBPACK_IMPORTED_MODULE_1__["Utf8"].parse(data);
        }
        this._data.concat(data);
        this._nBytes += data.length();
    }
    /**
     * Processes available data blocks.
     * This method invokes doProcessBlock(offset), which must be implemented by a concrete subtype.
     *
     * @param {boolean?} doFlush Whether all blocks and partial blocks should be processed.
     * @return {IWordArray} The processed data.
     * @example
     *   var processedData = bufferedBlockAlgorithm.process();
     *   var processedData = bufferedBlockAlgorithm.process(!!'flush');
     */
    process(doFlush) {
        let processedWords;
        const words = this._data.raw();
        const nSigBytes = this._data.length();
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
                this.doProcessBlock(words, offset);
            }
            // Remove processed words
            processedWords = words.splice(0, nWordsReady);
            this._data.setSignificantBytes(this._data.length() - nBytesReady);
        }
        // Return processed words
        return new _Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"](processedWords, nBytesReady);
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
        this.doReset();
    }
    /**
     * Updates this hasher with a message.
     *
     * @param {IWordArray|string} messageUpdate The message to append.
     * @return {Hasher} This hasher.
     * @example
     *   hasher.update('message');
     *   hasher.update(wordArray);
     */
    update(messageUpdate) {
        this.append(messageUpdate);
        this.process();
        return this;
    }
    /**
     * Finalizes the hash computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param {IWordArray|string?} messageUpdate (Optional) A final message update.
     * @return {IWordArray} The hash.
     * @example
     *   var hash = hasher.finalize();
     *   var hash = hasher.finalize('message');
     *   var hash = hasher.finalize(wordArray);
     */
    finalize(messageUpdate) {
        // Final message update
        if (messageUpdate) {
            this.append(messageUpdate);
        }
        // Perform concrete-hasher logic
        return this.doFinalize();
    }
}


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
     * @param {number[]} words An array of 32-bit words.
     * @param {number} nSig Significant bytes
     * @return {string} The hex string.
     * @example
     *   var hexString = Hex.stringify([0x293892], 6);
     */
    stringify(words, nSig) {
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
     * @return {IWordArray} The word array.
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
     * @param {number[]} words An array of 32-bit words.
     * @param {number} nSig Significant bytes
     * @return {string} The Latin1 string.
     * @example
     *   var latin1String = Latin1.stringify([0x293892], 6);
     */
    stringify(words, nSig) {
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
     * @return {IWordArray} The word array.
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
     * @param {number[]} words An array of 32-bit words.
     * @param {number} nSig Significant bytes
     * @return {string} The UTF-8 string.
     * @example
     *   var utf8String = Utf8.stringify([0x293892], 6);
     */
    stringify(words, nSig) {
        try {
            return decodeURIComponent(escape(_Latin1__WEBPACK_IMPORTED_MODULE_0__["Latin1"].stringify(words, nSig)));
        }
        catch (e) {
            throw new Error("Malformed UTF-8 data");
        }
    },
    /**
     * Converts a UTF-8 string to a word array.
     *
     * @param {string} utf8Str The UTF-8 string.
     * @return {IWordArray} The word array.
     * @example
     *   var wordArray = Utf8.parse(utf8Str);
     */
    parse(utf8Str) {
        return _Latin1__WEBPACK_IMPORTED_MODULE_0__["Latin1"].parse(unescape(encodeURIComponent(utf8Str)));
    }
};


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
//# sourceMappingURL=all.js.map