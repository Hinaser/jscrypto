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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/RIPEMD160.ts");
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

/***/ "./src/RIPEMD160.ts":
/*!**************************!*\
  !*** ./src/RIPEMD160.ts ***!
  \**************************/
/*! exports provided: RIPEMD160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RIPEMD160", function() { return RIPEMD160; });
/* harmony import */ var _lib_algorithm_Hasher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/algorithm/Hasher */ "./src/lib/algorithm/Hasher.ts");
/* harmony import */ var _lib_Word32Array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/Word32Array */ "./src/lib/Word32Array.ts");
/** @preserve
(c) 2012 by Cédric Mesnil. All rights reserved.
Redistribution and use in source and binary forms, with or without modification,
 are permitted provided that the following conditions are met:
 
- Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.
 
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


// Constants table
const _zl = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_1__["Word32Array"]([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
    3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
    1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
    4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
]);
const _zr = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_1__["Word32Array"]([
    5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
    6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
    15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
    8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
    12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
]);
const _sl = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_1__["Word32Array"]([
    11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
    7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
    11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
    11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
    9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6,
]);
const _sr = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_1__["Word32Array"]([
    8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
    9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
    9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
    15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
    8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
]);
const _hl = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_1__["Word32Array"]([0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
const _hr = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_1__["Word32Array"]([0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);
function f1(x, y, z) {
    return ((x) ^ (y) ^ (z));
}
function f2(x, y, z) {
    return (((x) & (y)) | ((~x) & (z)));
}
function f3(x, y, z) {
    return (((x) | (~(y))) ^ (z));
}
function f4(x, y, z) {
    return (((x) & (z)) | ((y) & (~(z))));
}
function f5(x, y, z) {
    return ((x) ^ ((y) | (~(z))));
}
function rotl(x, n) {
    return (x << n) | (x >>> (32 - n));
}
class RIPEMD160 extends _lib_algorithm_Hasher__WEBPACK_IMPORTED_MODULE_0__["Hasher"] {
    constructor(props) {
        super(props);
        this._hash = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_1__["Word32Array"]([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
        this._props = props;
        if (props && typeof props.hash !== "undefined") {
            this._hash = props.hash.clone();
        }
    }
    _doReset() {
        this._hash = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_1__["Word32Array"]([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
    }
    _doProcessBlock(words, offset) {
        // Swap endian
        for (let i = 0; i < 16; i++) {
            // Shortcuts
            const offsetI = offset + i;
            const wordsOffsetI = words[offsetI];
            // Swap
            words[offsetI] = ((((wordsOffsetI << 8) | (wordsOffsetI >>> 24)) & 0x00ff00ff) |
                (((wordsOffsetI << 24) | (wordsOffsetI >>> 8)) & 0xff00ff00));
        }
        // Shortcut
        const H = this._hash.words;
        const hl = _hl.words;
        const hr = _hr.words;
        const zl = _zl.words;
        const zr = _zr.words;
        const sl = _sl.words;
        const sr = _sr.words;
        // Working variables
        let al;
        let bl;
        let cl;
        let dl;
        let el;
        let ar;
        let br;
        let cr;
        let dr;
        let er;
        ar = al = H[0];
        br = bl = H[1];
        cr = cl = H[2];
        dr = dl = H[3];
        er = el = H[4];
        // Computation
        let t;
        for (let i = 0; i < 80; i += 1) {
            t = (al + words[offset + zl[i]]) | 0;
            if (i < 16) {
                t += f1(bl, cl, dl) + hl[0];
            }
            else if (i < 32) {
                t += f2(bl, cl, dl) + hl[1];
            }
            else if (i < 48) {
                t += f3(bl, cl, dl) + hl[2];
            }
            else if (i < 64) {
                t += f4(bl, cl, dl) + hl[3];
            }
            else { // if (i<80) {
                t += f5(bl, cl, dl) + hl[4];
            }
            t = t | 0;
            t = rotl(t, sl[i]);
            t = (t + el) | 0;
            al = el;
            el = dl;
            dl = rotl(cl, 10);
            cl = bl;
            bl = t;
            t = (ar + words[offset + zr[i]]) | 0;
            if (i < 16) {
                t += f5(br, cr, dr) + hr[0];
            }
            else if (i < 32) {
                t += f4(br, cr, dr) + hr[1];
            }
            else if (i < 48) {
                t += f3(br, cr, dr) + hr[2];
            }
            else if (i < 64) {
                t += f2(br, cr, dr) + hr[3];
            }
            else { // if (i<80) {
                t += f1(br, cr, dr) + hr[4];
            }
            t = t | 0;
            t = rotl(t, sr[i]);
            t = (t + er) | 0;
            ar = er;
            er = dr;
            dr = rotl(cr, 10);
            cr = br;
            br = t;
        }
        // Intermediate hash value
        t = (H[1] + cl + dr) | 0;
        H[1] = (H[2] + dl + er) | 0;
        H[2] = (H[3] + el + ar) | 0;
        H[3] = (H[4] + al + br) | 0;
        H[4] = (H[0] + bl + cr) | 0;
        H[0] = t;
    }
    _doFinalize() {
        // Shortcuts
        const data = this._data;
        const dataWords = data.words;
        const nBitsTotal = this._nBytes * 8;
        const nBitsLeft = data.nSigBytes * 8;
        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = ((((nBitsTotal << 8) | (nBitsTotal >>> 24)) & 0x00ff00ff) |
            (((nBitsTotal << 24) | (nBitsTotal >>> 8)) & 0xff00ff00));
        data.nSigBytes = (dataWords.length + 1) * 4;
        // Hash final blocks
        this._process();
        // Shortcuts
        const hash = this._hash;
        const H = hash.words;
        // Swap endian
        for (let i = 0; i < 5; i++) {
            // Shortcut
            const Hi = H[i];
            // Swap
            H[i] = (((Hi << 8) | (Hi >>> 24)) & 0x00ff00ff) |
                (((Hi << 24) | (Hi >>> 8)) & 0xff00ff00);
        }
        // Return final computed hash
        return hash;
    }
    clone() {
        const props = { hash: this._hash, blockSize: this._blockSize, data: this._data, nBytes: this._nBytes };
        return new RIPEMD160(props);
    }
    static hash(message, props) {
        return new RIPEMD160(props).finalize(message);
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
     *   var string = wordArray.toString(Utf8);
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
     *   var clone = word32Array.clone();
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
     *   var wordArray = Word32Array.random(16);
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
     *   var hexString = Hex.stringify(new Word32Array([0x293892], 6));
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
     *   var latin1String = Latin1.stringify(new Word32Array([0x293892], 6));
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
//# sourceMappingURL=RIPEMD160.js.map