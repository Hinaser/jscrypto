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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/SHA3.ts");
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
//# sourceMappingURL=SHA3.js.map