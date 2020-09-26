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

/***/ "./src/AES.ts":
/*!********************!*\
  !*** ./src/AES.ts ***!
  \********************/
/*! exports provided: AES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AES", function() { return AES; });
/* harmony import */ var _lib_algorithm_cipher_Cipher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/algorithm/cipher/Cipher */ "./src/lib/algorithm/cipher/Cipher.ts");
/* harmony import */ var _lib_algorithm_cipher_BlockCipher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/algorithm/cipher/BlockCipher */ "./src/lib/algorithm/cipher/BlockCipher.ts");
/* harmony import */ var _lib_algorithm_cipher_PasswordBasedCipher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/algorithm/cipher/PasswordBasedCipher */ "./src/lib/algorithm/cipher/PasswordBasedCipher.ts");
/* harmony import */ var _lib_algorithm_cipher_SerializableCipher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/algorithm/cipher/SerializableCipher */ "./src/lib/algorithm/cipher/SerializableCipher.ts");




// Lookup tables
const SBOX = [];
const INV_SBOX = [];
const SUB_MIX_0 = [];
const SUB_MIX_1 = [];
const SUB_MIX_2 = [];
const SUB_MIX_3 = [];
const INV_SUB_MIX_0 = [];
const INV_SUB_MIX_1 = [];
const INV_SUB_MIX_2 = [];
const INV_SUB_MIX_3 = [];
(function computeLookupTables() {
    // Compute double table
    const d = [];
    for (let i = 0; i < 256; i++) {
        if (i < 128) {
            d[i] = i << 1;
        }
        else {
            d[i] = (i << 1) ^ 0x11b;
        }
    }
    // Walk GF(2^8)
    let x = 0;
    let xi = 0;
    for (let i = 0; i < 256; i++) {
        // Compute sbox
        let sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
        sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
        SBOX[x] = sx;
        INV_SBOX[sx] = x;
        // Compute multiplication
        const x2 = d[x];
        const x4 = d[x2];
        const x8 = d[x4];
        // Compute sub bytes, mix columns tables
        let t = (d[sx] * 0x101) ^ (sx * 0x1010100);
        SUB_MIX_0[x] = (t << 24) | (t >>> 8);
        SUB_MIX_1[x] = (t << 16) | (t >>> 16);
        SUB_MIX_2[x] = (t << 8) | (t >>> 24);
        SUB_MIX_3[x] = t;
        // Compute inv sub bytes, inv mix columns tables
        t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
        INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
        INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
        INV_SUB_MIX_2[sx] = (t << 8) | (t >>> 24);
        INV_SUB_MIX_3[sx] = t;
        // Compute next counter
        if (!x) {
            x = xi = 1;
        }
        else {
            x = x2 ^ d[d[d[x8 ^ x2]]];
            xi ^= d[d[xi]];
        }
    }
}());
// Precomputed Rcon lookup
const RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
class AES extends _lib_algorithm_cipher_BlockCipher__WEBPACK_IMPORTED_MODULE_1__["BlockCipher"] {
    constructor(props) {
        super(props);
        this._nRounds = 0;
        this._keySchedule = [];
        this._invKeySchedule = [];
        this._props = props;
        this._doReset();
    }
    _doReset() {
        let t;
        // Skip reset of nRounds has been set before and key did not change
        if (this._nRounds && this._keyPriorReset === this._key) {
            return;
        }
        // Shortcuts
        const key = this._keyPriorReset = this._key;
        const keyWords = key.words;
        const keySize = key.nSigBytes / 4;
        // Compute number of rounds
        const nRounds = this._nRounds = keySize + 6;
        // Compute number of key schedule rows
        const ksRows = (nRounds + 1) * 4;
        // Compute key schedule
        const keySchedule = this._keySchedule = [];
        for (let ksRow = 0; ksRow < ksRows; ksRow++) {
            if (ksRow < keySize) {
                keySchedule[ksRow] = keyWords[ksRow];
            }
            else {
                t = keySchedule[ksRow - 1];
                if (!(ksRow % keySize)) {
                    // Rot word
                    t = (t << 8) | (t >>> 24);
                    // Sub word
                    t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
                    // Mix Rcon
                    t ^= RCON[(ksRow / keySize) | 0] << 24;
                }
                else if (keySize > 6 && ksRow % keySize === 4) {
                    // Sub word
                    t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
                }
                keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
            }
        }
        // Compute inv key schedule
        this._invKeySchedule = [];
        for (let invKsRow = 0; invKsRow < ksRows; invKsRow++) {
            const ksRow = ksRows - invKsRow;
            if (invKsRow % 4) {
                t = keySchedule[ksRow];
            }
            else {
                t = keySchedule[ksRow - 4];
            }
            if (invKsRow < 4 || ksRow <= 4) {
                this._invKeySchedule[invKsRow] = t;
            }
            else {
                this._invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
                    INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
            }
        }
    }
    encryptBlock(words, offset) {
        this._doCryptBlock(words, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
    }
    decryptBlock(words, offset) {
        // Swap 2nd and 4th rows
        let t = words[offset + 1];
        words[offset + 1] = words[offset + 3];
        words[offset + 3] = t;
        this._doCryptBlock(words, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
        // Inv swap 2nd and 4th rows
        t = words[offset + 1];
        words[offset + 1] = words[offset + 3];
        words[offset + 3] = t;
    }
    _doCryptBlock(words, offset, keySchedule, subMix0, subMix1, subMix2, subMix3, sBox) {
        // Shortcut
        const nRounds = this._nRounds;
        // Get input, add round key
        let s0 = words[offset] ^ keySchedule[0];
        let s1 = words[offset + 1] ^ keySchedule[1];
        let s2 = words[offset + 2] ^ keySchedule[2];
        let s3 = words[offset + 3] ^ keySchedule[3];
        // Key schedule row counter
        let ksRow = 4;
        // Rounds
        for (let round = 1; round < nRounds; round++) {
            // Shift rows, sub bytes, mix columns, add round key
            const _s0 = subMix0[s0 >>> 24] ^ subMix1[(s1 >>> 16) & 0xff]
                ^ subMix2[(s2 >>> 8) & 0xff] ^ subMix3[s3 & 0xff] ^ keySchedule[ksRow++];
            const _s1 = subMix0[s1 >>> 24] ^ subMix1[(s2 >>> 16) & 0xff]
                ^ subMix2[(s3 >>> 8) & 0xff] ^ subMix3[s0 & 0xff] ^ keySchedule[ksRow++];
            const _s2 = subMix0[s2 >>> 24] ^ subMix1[(s3 >>> 16) & 0xff]
                ^ subMix2[(s0 >>> 8) & 0xff] ^ subMix3[s1 & 0xff] ^ keySchedule[ksRow++];
            const _s3 = subMix0[s3 >>> 24] ^ subMix1[(s0 >>> 16) & 0xff]
                ^ subMix2[(s1 >>> 8) & 0xff] ^ subMix3[s2 & 0xff] ^ keySchedule[ksRow++];
            // Update state
            s0 = _s0;
            s1 = _s1;
            s2 = _s2;
            s3 = _s3;
        }
        // Shift rows, sub bytes, add round key
        const t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16)
            | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
        const t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16)
            | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
        const t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16)
            | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
        const t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16)
            | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];
        // Set output
        words[offset] = t0;
        words[offset + 1] = t1;
        words[offset + 2] = t2;
        words[offset + 3] = t3;
    }
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = JsCrypto.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
     */
    static createEncryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new AES(Object.assign(Object.assign({}, props), { key, transformMode: _lib_algorithm_cipher_Cipher__WEBPACK_IMPORTED_MODULE_0__["Cipher"].ENC_TRANSFORM_MODE }));
    }
    /**
     * Creates this cipher in decryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = JsCrypto.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecrypter(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new AES(Object.assign(Object.assign({}, props), { key, transformMode: _lib_algorithm_cipher_Cipher__WEBPACK_IMPORTED_MODULE_0__["Cipher"].DEC_TRANSFORM_MODE }));
    }
    /**
     * Encrypt a message with key
     *
     * @param {Word32Array|string} message
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = JsCrypt.AES.encrypt("test", "pass");
     */
    static encrypt(message, key, props) {
        if (typeof key === "string") {
            return _lib_algorithm_cipher_PasswordBasedCipher__WEBPACK_IMPORTED_MODULE_2__["PasswordBasedCipher"].encrypt(AES, message, key, props);
        }
        return _lib_algorithm_cipher_SerializableCipher__WEBPACK_IMPORTED_MODULE_3__["SerializableCipher"].encrypt(AES, message, key, props);
    }
    /**
     * Encrypt a encrypted message with key
     *
     * @param {CipherParams} cipherText
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = JsCrypt.AES.decrypt(cipherProps, "pass");
     */
    static decrypt(cipherText, key, props) {
        if (typeof key === "string") {
            return _lib_algorithm_cipher_PasswordBasedCipher__WEBPACK_IMPORTED_MODULE_2__["PasswordBasedCipher"].decrypt(AES, cipherText, key, props);
        }
        return _lib_algorithm_cipher_SerializableCipher__WEBPACK_IMPORTED_MODULE_3__["SerializableCipher"].decrypt(AES, cipherText, key, props);
    }
}
AES.keySize = 256 / 32;


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
        iKey.nSigBytes = hasherBlockSize;
        oKey.nSigBytes = hasherBlockSize;
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
    _doReset() {
        this._hash = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"]([
            0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
            0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
        ]);
    }
    _doFinalize() {
        const hash = super._doFinalize.call(this);
        hash.nSigBytes -= 4;
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
    _doReset() {
        this._hash = new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_1__["Word32Array"](H.slice(0));
    }
    _doProcessBlock(words, offset) {
        const _H = this._hash.words;
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
    _doFinalize() {
        const words = this._data.words;
        const nBitsTotal = this._nBytes * 8;
        const nBitsLeft = this._data.nSigBytes * 8;
        // Add padding
        words[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        words[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
        words[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
        this._data.nSigBytes = words.length * 4;
        // Hash final blocks
        this._process();
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
    _doReset() {
        this._state = [];
        for (let i = 0; i < 25; i++) {
            this._state[i] = new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0, 0);
        }
        this._blockSize = (1600 - 2 * this._outputLength) / 32;
    }
    _doProcessBlock(words, offset) {
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
    _doFinalize() {
        // Shortcuts
        const data = this._data;
        const dataWords = data.words;
        const nBitsLeft = data.nSigBytes * 8;
        const blockSizeBits = this.blockSize * 32;
        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
        dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
        data.nSigBytes = dataWords.length * 4;
        // Hash final blocks
        this._process();
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
    _doReset() {
        this._hash = new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64Array"]([
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0xcbbb9d5d, 0xc1059ed8), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0x629a292a, 0x367cd507),
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0x9159015a, 0x3070dd17), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0x152fecd8, 0xf70e5939),
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0x67332667, 0xffc00b31), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0x8eb44a87, 0x68581511),
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0xdb0c2e0d, 0x64f98fa7), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_0__["Word64"](0x47b5481d, 0xbefa4fa4)
        ]);
    }
    _doFinalize() {
        const hash = super._doFinalize.call(this);
        hash.nSigBytes -= 16;
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
    _doReset() {
        this._hash = new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64Array"]([
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x6a09e667, 0xf3bcc908), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xbb67ae85, 0x84caa73b),
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x3c6ef372, 0xfe94f82b), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0xa54ff53a, 0x5f1d36f1),
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x510e527f, 0xade682d1), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x9b05688c, 0x2b3e6c1f),
            new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x1f83d9ab, 0xfb41bd6b), new _lib_Word64Array__WEBPACK_IMPORTED_MODULE_1__["Word64"](0x5be0cd19, 0x137e2179)
        ]);
    }
    _doProcessBlock(words, offset) {
        // Shortcuts
        const H = this._hash.words;
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
    _doFinalize() {
        // Shortcuts
        const data = this._data;
        const dataWords = data.words;
        const nBitsTotal = this._nBytes * 8;
        const nBitsLeft = data.nSigBytes * 8;
        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
        dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
        data.nSigBytes = dataWords.length * 4;
        // Hash final blocks
        this._process();
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
/*! exports provided: Hmac, HmacMD5, HmacSHA224, HmacSHA256, HmacSHA384, HmacSHA512, MD5, SHA1, SHA224, SHA256, SHA384, SHA512, SHA3, AES, mode, pad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mode", function() { return mode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pad", function() { return pad; });
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

/* harmony import */ var _AES__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./AES */ "./src/AES.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AES", function() { return _AES__WEBPACK_IMPORTED_MODULE_13__["AES"]; });

/* harmony import */ var _mode_CBC__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./mode/CBC */ "./src/mode/CBC.ts");
/* harmony import */ var _mode_CFB__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./mode/CFB */ "./src/mode/CFB.ts");
/* harmony import */ var _mode_CTR__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./mode/CTR */ "./src/mode/CTR.ts");
/* harmony import */ var _mode_ECB__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./mode/ECB */ "./src/mode/ECB.ts");
/* harmony import */ var _mode_OFB__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./mode/OFB */ "./src/mode/OFB.ts");
/* harmony import */ var _pad_AnsiX923__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./pad/AnsiX923 */ "./src/pad/AnsiX923.ts");
/* harmony import */ var _pad_ISO10126__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./pad/ISO10126 */ "./src/pad/ISO10126.ts");
/* harmony import */ var _pad_ISO97971__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./pad/ISO97971 */ "./src/pad/ISO97971.ts");
/* harmony import */ var _pad_Noop__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./pad/Noop */ "./src/pad/Noop.ts");
/* harmony import */ var _pad_Zero__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./pad/Zero */ "./src/pad/Zero.ts");



















const mode = {
    CBC: _mode_CBC__WEBPACK_IMPORTED_MODULE_14__["CBC"],
    CFB: _mode_CFB__WEBPACK_IMPORTED_MODULE_15__["CFB"],
    CTR: _mode_CTR__WEBPACK_IMPORTED_MODULE_16__["CTR"],
    ECB: _mode_ECB__WEBPACK_IMPORTED_MODULE_17__["ECB"],
    OFB: _mode_OFB__WEBPACK_IMPORTED_MODULE_18__["OFB"],
};





const pad = {
    AnsiX923: _pad_AnsiX923__WEBPACK_IMPORTED_MODULE_19__["AnsiX923"],
    ISO10126: _pad_ISO10126__WEBPACK_IMPORTED_MODULE_20__["ISO10126"],
    ISO97971: _pad_ISO97971__WEBPACK_IMPORTED_MODULE_21__["ISO97971"],
    Noop: _pad_Noop__WEBPACK_IMPORTED_MODULE_22__["Noop"],
    Zero: _pad_Zero__WEBPACK_IMPORTED_MODULE_23__["Zero"],
};


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

/***/ "./src/lib/algorithm/cipher/BlockCipher.ts":
/*!*************************************************!*\
  !*** ./src/lib/algorithm/cipher/BlockCipher.ts ***!
  \*************************************************/
/*! exports provided: BlockCipher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlockCipher", function() { return BlockCipher; });
/* harmony import */ var _Cipher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cipher */ "./src/lib/algorithm/cipher/Cipher.ts");
/* harmony import */ var _mode_CBC__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mode/CBC */ "./src/lib/algorithm/cipher/mode/CBC.ts");
/* harmony import */ var _pad_Pkcs7__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pad/Pkcs7 */ "./src/lib/algorithm/cipher/pad/Pkcs7.ts");



class BlockCipher extends _Cipher__WEBPACK_IMPORTED_MODULE_0__["Cipher"] {
    constructor(props) {
        super(props);
        this._blockSize = 128 / 32;
        this._Mode = _mode_CBC__WEBPACK_IMPORTED_MODULE_1__["CBC"];
        this._padding = _pad_Pkcs7__WEBPACK_IMPORTED_MODULE_2__["Pkcs7"];
        this._props = props;
        this._Mode = typeof props.mode !== "undefined" ? props.mode : this._Mode;
        this._padding = typeof props.padding !== "undefined" ? props.padding : this._padding;
        this.reset(props === null || props === void 0 ? void 0 : props.data, props === null || props === void 0 ? void 0 : props.nBytes);
    }
    get iv() {
        return this._iv;
    }
    get mode() {
        return this._mode;
    }
    get padding() {
        return this._padding;
    }
    reset(data, nBytes) {
        super.reset(data, nBytes);
        let modeCreator;
        if (this._transformMode === _Cipher__WEBPACK_IMPORTED_MODULE_0__["Cipher"].ENC_TRANSFORM_MODE) {
            modeCreator = this._Mode.createEncrypter;
        }
        else {
            modeCreator = this._Mode.createDecrypter;
            // Keep at least one block in the buffer for unpadding
            this._minBufferSize = 1;
        }
        if (this._Mode && this._modeCreator === modeCreator) {
            this._mode = new this._Mode({ cipher: this, iv: this._iv && this._iv.words });
        }
        else {
            this._mode = modeCreator.call(this._Mode, { cipher: this, iv: this._iv && this._iv.words });
            this._modeCreator = modeCreator;
        }
    }
    _doProcessBlock(words, offset) {
        var _a;
        (_a = this._mode) === null || _a === void 0 ? void 0 : _a.processBlock(words, offset);
    }
    _doFinalize() {
        let finalProcessedBlocks;
        // Shortcut
        const padding = this._padding;
        // Finalize
        if (this._transformMode === _Cipher__WEBPACK_IMPORTED_MODULE_0__["Cipher"].ENC_TRANSFORM_MODE) {
            // Pad data
            padding.pad(this._data, this.blockSize);
            // Process final blocks
            finalProcessedBlocks = this._process(true);
        }
        else /* if (this._transformMode == Cipher._DEC_TRANSFORM_MODE) */ {
            // Process final blocks
            finalProcessedBlocks = this._process(true);
            // Unpad data
            padding.unpad(finalProcessedBlocks);
        }
        return finalProcessedBlocks;
    }
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *     var cipher = JsCrypto.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
     */
    static createEncryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new BlockCipher(Object.assign(Object.assign({}, props), { key, transformMode: _Cipher__WEBPACK_IMPORTED_MODULE_0__["Cipher"].ENC_TRANSFORM_MODE }));
    }
    /**
     * Creates this cipher in decryption mode.
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = JsCrypto.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new BlockCipher(Object.assign(Object.assign({}, props), { key, transformMode: _Cipher__WEBPACK_IMPORTED_MODULE_0__["Cipher"].DEC_TRANSFORM_MODE }));
    }
}


/***/ }),

/***/ "./src/lib/algorithm/cipher/Cipher.ts":
/*!********************************************!*\
  !*** ./src/lib/algorithm/cipher/Cipher.ts ***!
  \********************************************/
/*! exports provided: Cipher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cipher", function() { return Cipher; });
/* harmony import */ var _BufferedBlockAlgorithm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BufferedBlockAlgorithm */ "./src/lib/algorithm/BufferedBlockAlgorithm.ts");

class Cipher extends _BufferedBlockAlgorithm__WEBPACK_IMPORTED_MODULE_0__["BufferedBlockAlgorithm"] {
    constructor(props) {
        super(props);
        this._transformMode = 1;
        this._props = props;
        this._key = props.key;
        this._iv = typeof props.iv !== "undefined" ? props.iv : this._iv;
        this._transformMode = typeof props.transformMode !== "undefined" ? props.transformMode : this._transformMode;
    }
    /**
     * Resets this cipher to its initial state.
     * @example
     *   cipher.reset();
     */
    reset(data, nBytes) {
        super.reset(data, nBytes);
        this._doReset();
    }
    /**
     * Adds data to be encrypted or decrypted.
     * @param {Word32Array|string} dataUpdate The data to encrypt or decrypt.
     * @return {Word32Array} The data after processing.
     * @example
     *   var encrypted = cipher.process('data');
     *   var encrypted = cipher.process(wordArray);
     */
    process(dataUpdate) {
        this._append(dataUpdate);
        return this._process();
    }
    /**
     * Finalizes the encryption or decryption process.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     * @param {Word32Array|string} dataUpdate The final data to encrypt or decrypt.
     * @return {Word32Array} The data after final processing.
     * @example
     *   var encrypted = cipher.finalize();
     *   var encrypted = cipher.finalize('data');
     *   var encrypted = cipher.finalize(wordArray);
     */
    finalize(dataUpdate) {
        // Final data update
        if (dataUpdate) {
            this._append(dataUpdate);
        }
        // Perform concrete-cipher logic
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
    _doProcess() {
        throw new Error("Not implemented");
    }
    /**
     * @abstract
     */
    _doProcessBlock(words, offset) {
        throw new Error("Not implemented");
    }
    /**
     * @abstract
     */
    _doFinalize() {
        throw new Error("Not implemented");
    }
    /**
     * @abstract
     */
    encryptBlock(words, offset) {
        throw new Error("Not implemented");
    }
    /**
     * @abstract
     */
    decryptBlock(words, offset) {
        throw new Error("Not implemented");
    }
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
     */
    static createEncryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new Cipher(Object.assign(Object.assign({}, props), { key, transformMode: Cipher.ENC_TRANSFORM_MODE }));
    }
    /**
     * Creates this cipher in decryption mode.
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new Cipher(Object.assign(Object.assign({}, props), { key, transformMode: Cipher.DEC_TRANSFORM_MODE }));
    }
}
Cipher.ENC_TRANSFORM_MODE = 1;
Cipher.DEC_TRANSFORM_MODE = 2;
Cipher.keySize = 128 / 32;
Cipher.ivSize = 128 / 32;


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

/***/ "./src/lib/algorithm/cipher/PasswordBasedCipher.ts":
/*!*********************************************************!*\
  !*** ./src/lib/algorithm/cipher/PasswordBasedCipher.ts ***!
  \*********************************************************/
/*! exports provided: PasswordBasedCipher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordBasedCipher", function() { return PasswordBasedCipher; });
/* harmony import */ var _SerializableCipher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SerializableCipher */ "./src/lib/algorithm/cipher/SerializableCipher.ts");
/* harmony import */ var _kdf_OpenSSLKDF__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./kdf/OpenSSLKDF */ "./src/lib/algorithm/cipher/kdf/OpenSSLKDF.ts");
/* harmony import */ var _formatter_OpenSSLFormatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formatter/OpenSSLFormatter */ "./src/lib/algorithm/cipher/formatter/OpenSSLFormatter.ts");



const PasswordBasedCipher = {
    /**
     * Encrypts a message using a password.
     *
     * @param {typeof BlockCipher} Cipher The cipher algorithm to use.
     * @param {Word32Array|string} message The message to encrypt.
     * @param {string} password The password.
     * @param {Partial<PasswordBasedCipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {CipherParams} A cipher params object.
     * @example
     *   var params = JsCrypto.PasswordBasedCipher.encrypt(JsCrypto.AES, message, 'password');
     *   var params = JsCrypto.PasswordBasedCipher.encrypt(JsCrypto.AES, message, 'password', { format: JsCrypto.OpenSSLFormatter });
     */
    encrypt(Cipher, message, password, props) {
        const p = props ? Object.assign({}, props) : {};
        const KDF = props && props.KDF ? props.KDF : _kdf_OpenSSLKDF__WEBPACK_IMPORTED_MODULE_1__["OpenSSLKDF"];
        const derivedParams = KDF.execute(password, Cipher.keySize, Cipher.ivSize);
        p.iv = derivedParams.iv;
        const cipherParams = _SerializableCipher__WEBPACK_IMPORTED_MODULE_0__["SerializableCipher"].encrypt(Cipher, message, derivedParams.key, p);
        return Object.assign(Object.assign({}, cipherParams), derivedParams);
    },
    /**
     * Decrypts serialized ciphertext using a password.
     *
     * @param {typeof BlockCipher} Cipher The cipher algorithm to use.
     * @param {CipherParams|string} cipherText The ciphertext to decrypt.
     * @param {string} password The password.
     * @param {Partial<PasswordBasedCipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Word32Array} The plaintext.
     * @example
     *   var plaintext = JsCrypto.PasswordBasedCipher.decrypt(
     *     JsCrypto.AES,
     *     formattedCiphertext,
     *     'password',
     *     { format: JsCrypto.OpenSSLFormatter }
     *   );
     *   var plaintext = JsCrypto.PasswordBasedCipher.decrypt(
     *     JsCrypto.AES,
     *     ciphertextParams,
     *     'password',
     *     { format: JsCrypto.OpenSSLFormatter }
     *   );
     */
    decrypt(Cipher, cipherText, password, props) {
        const p = props ? Object.assign({}, props) : {};
        const KDF = p.KDF ? p.KDF : _kdf_OpenSSLKDF__WEBPACK_IMPORTED_MODULE_1__["OpenSSLKDF"];
        const formatter = p.formatter ? p.formatter : _formatter_OpenSSLFormatter__WEBPACK_IMPORTED_MODULE_2__["OpenSSLFormatter"];
        const cipherTextParams = Object(_SerializableCipher__WEBPACK_IMPORTED_MODULE_0__["parseCipherText"])(cipherText, formatter);
        const derivedParams = KDF.execute(password, Cipher.keySize, Cipher.ivSize);
        p.iv = derivedParams.iv;
        return _SerializableCipher__WEBPACK_IMPORTED_MODULE_0__["SerializableCipher"].decrypt(Cipher, cipherTextParams, derivedParams.key, props);
    }
};


/***/ }),

/***/ "./src/lib/algorithm/cipher/SerializableCipher.ts":
/*!********************************************************!*\
  !*** ./src/lib/algorithm/cipher/SerializableCipher.ts ***!
  \********************************************************/
/*! exports provided: parseCipherText, SerializableCipher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseCipherText", function() { return parseCipherText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SerializableCipher", function() { return SerializableCipher; });
/* harmony import */ var _formatter_OpenSSLFormatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatter/OpenSSLFormatter */ "./src/lib/algorithm/cipher/formatter/OpenSSLFormatter.ts");
/* harmony import */ var _CipherParams__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CipherParams */ "./src/lib/algorithm/cipher/CipherParams.ts");


/**
 * Converts serialized ciphertext to CipherParams,
 * else assumed CipherParams already and returns ciphertext unchanged.
 * @param {CipherParams|string} cipherTextParams The ciphertext.
 * @param {Formatter} formatter The formatting strategy to use to parse serialized ciphertext.
 * @return {CipherParams} The un-serialized ciphertext.
 * @example
 *   var ciphertextParams = JsCrypto.SerializableCipher.parse(ciphertextStringOrParams, format);
 */
function parseCipherText(cipherTextParams, formatter) {
    if (typeof cipherTextParams === "string") {
        return formatter.parse(cipherTextParams);
    }
    return cipherTextParams;
}
const SerializableCipher = {
    /**
     * Encrypts a message.
     *
     * @param {typeof BlockCipher} Cipher The cipher algorithm to use.
     * @param {Word32Array|string} message The message to encrypt.
     * @param {Word32Array} key The key.
     * @param {Partial<SerializableCipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {CipherParams} A cipher params object.
     * @example
     *   var ciphertextParams = JsCrypto.SerializableCipher.encrypt(JsCrypto.AES, message, key);
     *   var ciphertextParams = JsCrypto.SerializableCipher.encrypt(JsCrypto.AES, message, key, { iv: iv });
     */
    encrypt(Cipher, message, key, props) {
        const encrypter = Cipher.createEncryptor(key, props);
        const cipherText = encrypter.finalize(message);
        return new _CipherParams__WEBPACK_IMPORTED_MODULE_1__["CipherParams"]({
            cipherText,
            key,
            iv: encrypter.iv,
            Algorithm: Cipher,
            mode: encrypter.mode,
            padding: encrypter.padding,
            blockSize: encrypter.blockSize,
            formatter: (props === null || props === void 0 ? void 0 : props.formatter) || _formatter_OpenSSLFormatter__WEBPACK_IMPORTED_MODULE_0__["OpenSSLFormatter"],
        });
    },
    /**
     * Decrypts serialized ciphertext.
     *
     * @param {typeof BlockCipher} Cipher The cipher algorithm to use.
     * @param {CipherParams|string} cipherText The ciphertext to decrypt.
     * @param {Word32Array} key The key.
     * @param {Partial<SerializableCipherProps>} props (Optional) The configuration options to use for this operation.
     * @return {Word32Array} The plaintext.
     * @example
     *     var plaintext = JsCrypto.SerializableCipher.decrypt(JsCrypto.AES, formattedCiphertext, key, { iv: iv, format: JsCrypto.OpenSSL });
     *     var plaintext = JsCrypto.SerializableCipher.decrypt(JsCrypto.AES, ciphertextParams, key, { iv: iv, format: JsCrypto.OpenSSL });
     */
    decrypt(Cipher, cipherText, key, props) {
        const decrypter = Cipher.createDecryptor(key, props);
        const cipherParams = parseCipherText(cipherText, (props === null || props === void 0 ? void 0 : props.formatter) || _formatter_OpenSSLFormatter__WEBPACK_IMPORTED_MODULE_0__["OpenSSLFormatter"]);
        return decrypter.finalize(cipherParams.cipherText || "");
    }
};


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

/***/ "./src/lib/algorithm/cipher/kdf/EvpKDF.ts":
/*!************************************************!*\
  !*** ./src/lib/algorithm/cipher/kdf/EvpKDF.ts ***!
  \************************************************/
/*! exports provided: EvpKDF */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EvpKDF", function() { return EvpKDF; });
/* harmony import */ var _MD5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../MD5 */ "./src/MD5.ts");
/* harmony import */ var _Word32Array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Word32Array */ "./src/lib/Word32Array.ts");


/**
 * This key derivation function is meant to conform with EVP_BytesToKey.
 * https://www.openssl.org/docs/man1.1.1/man3/EVP_BytesToKey.html
 *
 * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
 * @property {Hasher} hasher The hash algorithm to use. Default: MD5
 * @property {number} iterations The number of iterations to perform. Default: 1
 */
class EvpKDF {
    constructor(props) {
        this._keySize = 128 / 32;
        this._Hasher = _MD5__WEBPACK_IMPORTED_MODULE_0__["MD5"];
        this._iterations = 1;
        this._props = props;
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
     *     var key = CryptoJS.EvpKDF(password, salt);
     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
     */
    static getKey(password, salt, props) {
        return new EvpKDF(props).compute(password, salt);
    }
}


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
/* harmony import */ var _EvpKDF__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EvpKDF */ "./src/lib/algorithm/cipher/kdf/EvpKDF.ts");



const OpenSSLKDF = {
    execute(password, keySize, ivSize, salt) {
        // Generate random salt
        if (!salt) {
            salt = _Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"].random(64 / 8);
        }
        // Derive key and IV
        const key = _EvpKDF__WEBPACK_IMPORTED_MODULE_2__["EvpKDF"].getKey(password, salt, { keySize: keySize + ivSize });
        // Separate key and IV
        const iv = new _Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"](key.words.slice(keySize), ivSize * 4);
        key.nSigBytes = keySize * 4;
        // Return params
        return new _CipherParams__WEBPACK_IMPORTED_MODULE_1__["CipherParams"]({ key, iv, salt });
    }
};


/***/ }),

/***/ "./src/lib/algorithm/cipher/mode/BlockCipherMode.ts":
/*!**********************************************************!*\
  !*** ./src/lib/algorithm/cipher/mode/BlockCipherMode.ts ***!
  \**********************************************************/
/*! exports provided: BlockCipherMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlockCipherMode", function() { return BlockCipherMode; });
/**
 * Abstract base block cipher mode template.
 * @abstract
 */
class BlockCipherMode {
    constructor(props) {
        this._props = props;
        this._cipher = props.cipher;
        this._iv = props.iv;
    }
    /**
     * @abstract
     */
    processBlock(words, offset) {
        return;
    }
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @abstract
     * @example
     *   var mode = JsCrypto.CBC.createEncryptor(cipher, iv.words);
     */
    static createEncrypter(props) {
        throw new Error("Not implemented yet");
    }
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @abstract
     * @example
     *   var mode = JsCrypto.CBC.createDecryptor(cipher, iv.words);
     */
    static createDecrypter(props) {
        throw new Error("Not implemented yet");
    }
}


/***/ }),

/***/ "./src/lib/algorithm/cipher/mode/CBC.ts":
/*!**********************************************!*\
  !*** ./src/lib/algorithm/cipher/mode/CBC.ts ***!
  \**********************************************/
/*! exports provided: CBC */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CBC", function() { return CBC; });
/* harmony import */ var _BlockCipherMode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BlockCipherMode */ "./src/lib/algorithm/cipher/mode/BlockCipherMode.ts");

class CBC extends _BlockCipherMode__WEBPACK_IMPORTED_MODULE_0__["BlockCipherMode"] {
    constructor(props) {
        super(props);
        this._prevBlock = [];
    }
    xorBlock(words, offset, blockSize) {
        let block;
        // Shortcut
        const iv = this._iv;
        // Choose mixing block
        if (iv) {
            block = iv;
            // Remove IV for subsequent blocks
            this._iv = undefined;
        }
        else {
            block = this._prevBlock;
        }
        // XOR blocks
        for (let i = 0; i < blockSize; i++) {
            words[offset + i] ^= block[i];
        }
    }
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.CBC.createEncryptor(cipher, iv.words);
     */
    static createEncrypter(props) {
        return new CBC.Encrypter(props);
    }
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.CBC.createDecryptor(cipher, iv.words);
     */
    static createDecrypter(props) {
        return new CBC.Decrypter(props);
    }
}
/**
 * CBC encryptor.
 */
CBC.Encrypter = class Encrypter extends CBC {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    processBlock(words, offset) {
        // Shortcuts
        const cipher = this._cipher;
        const blockSize = cipher.blockSize;
        // XOR and encrypt
        this.xorBlock(words, offset, blockSize);
        cipher.encryptBlock(words, offset);
        // Remember this block to use with next block
        this._prevBlock = words.slice(offset, offset + blockSize);
    }
};
/**
 * CBC decryptor.
 */
CBC.Decrypter = class Decrypter extends CBC {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    processBlock(words, offset) {
        // Shortcuts
        const cipher = this._cipher;
        const blockSize = cipher.blockSize;
        // Remember this block to use with next block
        const thisBlock = words.slice(offset, offset + blockSize);
        // Decrypt and XOR
        cipher.decryptBlock(words, offset);
        this.xorBlock(words, offset, blockSize);
        // This block becomes the previous block
        this._prevBlock = thisBlock;
    }
};


/***/ }),

/***/ "./src/lib/algorithm/cipher/mode/CFB.ts":
/*!**********************************************!*\
  !*** ./src/lib/algorithm/cipher/mode/CFB.ts ***!
  \**********************************************/
/*! exports provided: CFB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CFB", function() { return CFB; });
/* harmony import */ var _BlockCipherMode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BlockCipherMode */ "./src/lib/algorithm/cipher/mode/BlockCipherMode.ts");

/**
 * Cipher Feedback Block mode
 */
class CFB extends _BlockCipherMode__WEBPACK_IMPORTED_MODULE_0__["BlockCipherMode"] {
    constructor(props) {
        super(props);
        this._prevBlock = [];
    }
    generateKeyStreamAndEncrypt(words, offset, blockSize, cipher) {
        let keyStream;
        // Shortcut
        const iv = this._iv;
        // Generate keyStream
        if (iv) {
            keyStream = iv.slice(0);
            // Remove IV for subsequent blocks
            this._iv = undefined;
        }
        else {
            keyStream = this._prevBlock;
        }
        cipher.encryptBlock(keyStream, 0);
        // Encrypt
        for (let i = 0; i < blockSize; i++) {
            words[offset + i] ^= keyStream[i];
        }
    }
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.CFB.createEncryptor(cipher, iv.words);
     */
    static createEncrypter(props) {
        return new CFB.Encrypter(props);
    }
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.CFB.createDecryptor(cipher, iv.words);
     */
    static createDecrypter(props) {
        return new CFB.Decrypter(props);
    }
}
/**
 * CFB encryptor.
 */
CFB.Encrypter = class Encrypter extends CFB {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    processBlock(words, offset) {
        this.generateKeyStreamAndEncrypt(words, offset, this._cipher.blockSize, this._cipher);
        // Remember this block to use with next block
        this._prevBlock = words.slice(offset, offset + this._cipher.blockSize);
    }
};
/**
 * CFB decryptor.
 */
CFB.Decrypter = class Encrypter extends CFB {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    processBlock(words, offset) {
        // Remember this block to use with next block
        const thisBlock = words.slice(offset, offset + this._cipher.blockSize);
        this.generateKeyStreamAndEncrypt(words, offset, this._cipher.blockSize, this._cipher);
        // This block becomes the previous block
        this._prevBlock = thisBlock;
    }
};


/***/ }),

/***/ "./src/lib/algorithm/cipher/mode/CTR.ts":
/*!**********************************************!*\
  !*** ./src/lib/algorithm/cipher/mode/CTR.ts ***!
  \**********************************************/
/*! exports provided: CTR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CTR", function() { return CTR; });
/* harmony import */ var _BlockCipherMode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BlockCipherMode */ "./src/lib/algorithm/cipher/mode/BlockCipherMode.ts");

/**
 * Output Feedback Block mode
 */
class CTR extends _BlockCipherMode__WEBPACK_IMPORTED_MODULE_0__["BlockCipherMode"] {
    constructor(props) {
        super(props);
        this._counter = [];
    }
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.CTR.createEncryptor(cipher, iv.words);
     */
    static createEncrypter(props) {
        return new CTR.Encrypter(props);
    }
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.CTR.createDecryptor(cipher, iv.words);
     */
    static createDecrypter(props) {
        return new CTR.Decrypter(props);
    }
}
/**
 * CTR encryptor.
 */
CTR.Encrypter = class Encrypter extends CTR {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    processBlock(words, offset) {
        // Shortcuts
        const cipher = this._cipher;
        const blockSize = cipher.blockSize;
        const iv = this._iv;
        let counter = this._counter;
        // Generate keyStream
        if (iv) {
            counter = this._counter = iv.slice(0);
            // Remove IV for subsequent blocks
            this._iv = undefined;
        }
        const keyStream = counter.slice(0);
        cipher.encryptBlock(keyStream, 0);
        // Increment counter
        counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0;
        // Encrypt
        for (let i = 0; i < blockSize; i++) {
            words[offset + i] ^= keyStream[i];
        }
    }
};
/**
 * CTR decryptor.
 */
CTR.Decrypter = CTR.Encrypter;


/***/ }),

/***/ "./src/lib/algorithm/cipher/mode/ECB.ts":
/*!**********************************************!*\
  !*** ./src/lib/algorithm/cipher/mode/ECB.ts ***!
  \**********************************************/
/*! exports provided: ECB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ECB", function() { return ECB; });
/* harmony import */ var _BlockCipherMode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BlockCipherMode */ "./src/lib/algorithm/cipher/mode/BlockCipherMode.ts");

/**
 * Electronic Codebook block mode.
 */
class ECB extends _BlockCipherMode__WEBPACK_IMPORTED_MODULE_0__["BlockCipherMode"] {
    constructor(props) {
        super(props);
    }
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.ECB.createEncryptor(cipher, iv.words);
     */
    static createEncrypter(props) {
        return new ECB.Encrypter(props);
    }
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.ECB.createDecryptor(cipher, iv.words);
     */
    static createDecrypter(props) {
        return new ECB.Decrypter(props);
    }
}
/**
 * ECB encryptor.
 */
ECB.Encrypter = class Encrypter extends ECB {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    processBlock(words, offset) {
        this._cipher.encryptBlock(words, offset);
    }
};
/**
 * ECB decryptor.
 */
ECB.Decrypter = class Decrypter extends ECB {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    processBlock(words, offset) {
        this._cipher.decryptBlock(words, offset);
    }
};


/***/ }),

/***/ "./src/lib/algorithm/cipher/mode/OFB.ts":
/*!**********************************************!*\
  !*** ./src/lib/algorithm/cipher/mode/OFB.ts ***!
  \**********************************************/
/*! exports provided: OFB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFB", function() { return OFB; });
/* harmony import */ var _BlockCipherMode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BlockCipherMode */ "./src/lib/algorithm/cipher/mode/BlockCipherMode.ts");

/**
 * Output Feedback Block mode
 */
class OFB extends _BlockCipherMode__WEBPACK_IMPORTED_MODULE_0__["BlockCipherMode"] {
    constructor(props) {
        super(props);
        this._keyStream = [];
    }
    /**
     * Creates this mode for encryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.OFB.createEncryptor(cipher, iv.words);
     */
    static createEncrypter(props) {
        return new OFB.Encrypter(props);
    }
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.OFB.createDecryptor(cipher, iv.words);
     */
    static createDecrypter(props) {
        return new OFB.Decrypter(props);
    }
}
/**
 * OFB encryptor.
 */
OFB.Encrypter = class Encrypter extends OFB {
    /**
     * Processes the data block at offset.
     *
     * @param {number[]} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     * @example
     *   mode.processBlock(data.words, offset);
     */
    processBlock(words, offset) {
        // Shortcuts
        const cipher = this._cipher;
        const blockSize = cipher.blockSize;
        const iv = this._iv;
        let keyStream = this._keyStream;
        // Generate key stream
        if (iv) {
            keyStream = this._keyStream = iv.slice(0);
            // Remove IV for subsequent blocks
            this._iv = undefined;
        }
        cipher.encryptBlock(keyStream, 0);
        // Encrypt
        for (let i = 0; i < blockSize; i++) {
            words[offset + i] ^= keyStream[i];
        }
    }
};
/**
 * OFB decryptor.
 */
OFB.Decrypter = OFB.Encrypter;


/***/ }),

/***/ "./src/lib/algorithm/cipher/pad/AnsiX923.ts":
/*!**************************************************!*\
  !*** ./src/lib/algorithm/cipher/pad/AnsiX923.ts ***!
  \**************************************************/
/*! exports provided: AnsiX923 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnsiX923", function() { return AnsiX923; });
/**
 * ANSI X.923 padding strategy
 *
 * @param {Word32Array} data The data to pad.
 * @param {number} blockSize The multiple that the data should be padded to.
 * @example
 *   JsCrypto.pad.AnsiX923.pad(wordArray, 4);
 */
function pad(data, blockSize) {
    // Shortcuts
    const dataSigBytes = data.nSigBytes;
    const blockSizeBytes = blockSize * 4;
    // Count padding bytes
    const nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
    // Compute last byte position
    const lastBytePos = dataSigBytes + nPaddingBytes - 1;
    // Pad
    data.clamp();
    data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
    data.nSigBytes += nPaddingBytes;
}
/**
 * Unpads data that had been padded with ANSI X.923 padding strategy
 *
 * @param {Word32Array} data The data to unpad.
 * @example
 *   JsCrypto.pad.AnsiX923.unpad(wordArray);
 */
function unpad(data) {
    // Get number of padding bytes from last byte
    const nPaddingBytes = data.words[(data.nSigBytes - 1) >>> 2] & 0xff;
    // Remove padding
    data.nSigBytes -= nPaddingBytes;
}
const AnsiX923 = {
    pad,
    unpad,
};


/***/ }),

/***/ "./src/lib/algorithm/cipher/pad/ISO10126.ts":
/*!**************************************************!*\
  !*** ./src/lib/algorithm/cipher/pad/ISO10126.ts ***!
  \**************************************************/
/*! exports provided: ISO10126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ISO10126", function() { return ISO10126; });
/* harmony import */ var _Word32Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Word32Array */ "./src/lib/Word32Array.ts");

/**
 * ISO10126 padding strategy
 *
 * @param {Word32Array} data The data to pad.
 * @param {number} blockSize The multiple that the data should be padded to.
 * @example
 *   JsCrypto.pad.ISO10126.pad(wordArray, 4);
 */
function pad(data, blockSize) {
    // Shortcut
    const blockSizeBytes = blockSize * 4;
    // Count padding bytes
    const nPaddingBytes = blockSizeBytes - data.nSigBytes % blockSizeBytes;
    // Pad
    data
        .concat(_Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"].random(nPaddingBytes - 1))
        .concat(new _Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"]([nPaddingBytes << 24], 1));
}
/**
 * Unpads data that had been padded with ISO10126 padding strategy.
 *
 * @param {Word32Array} data The data to unpad.
 * @example
 *   JsCrypto.pad.ISO10126.unpad(wordArray);
 */
function unpad(data) {
    // Get number of padding bytes from last byte
    const nPaddingBytes = data.words[(data.nSigBytes - 1) >>> 2] & 0xff;
    // Remove padding
    data.nSigBytes -= nPaddingBytes;
}
const ISO10126 = {
    pad,
    unpad,
};


/***/ }),

/***/ "./src/lib/algorithm/cipher/pad/ISO97971.ts":
/*!**************************************************!*\
  !*** ./src/lib/algorithm/cipher/pad/ISO97971.ts ***!
  \**************************************************/
/*! exports provided: ISO97971 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ISO97971", function() { return ISO97971; });
/* harmony import */ var _Word32Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Word32Array */ "./src/lib/Word32Array.ts");
/* harmony import */ var _Zero__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Zero */ "./src/lib/algorithm/cipher/pad/Zero.ts");


/**
 * ISO/IEC 9797-1 Padding Method 2. padding strategy
 *
 * @param {Word32Array} data The data to pad.
 * @param {number} blockSize The multiple that the data should be padded to.
 * @example
 *   JsCrypto.pad.ISO97971.pad(wordArray, 4);
 */
function pad(data, blockSize) {
    // Add 0x80 byte
    data.concat(new _Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"]([0x80000000], 1));
    // Zero pad the rest
    _Zero__WEBPACK_IMPORTED_MODULE_1__["Zero"].pad(data, blockSize);
}
/**
 * Unpads data that had been padded with ISO/IEC 9797-1 Padding Method 2 strategy.
 *
 * @param {Word32Array} data The data to unpad.
 * @example
 *   JsCrypto.pad.ISO97971.unpad(wordArray);
 */
function unpad(data) {
    // Remove zero padding
    _Zero__WEBPACK_IMPORTED_MODULE_1__["Zero"].unpad(data);
    // Remove one more byte -- the 0x80 byte
    data.nSigBytes -= 1;
}
const ISO97971 = {
    pad,
    unpad,
};


/***/ }),

/***/ "./src/lib/algorithm/cipher/pad/Noop.ts":
/*!**********************************************!*\
  !*** ./src/lib/algorithm/cipher/pad/Noop.ts ***!
  \**********************************************/
/*! exports provided: Noop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Noop", function() { return Noop; });
/**
 * A noop padding strategy
 *
 * @param {Word32Array} data The data to pad.
 * @param {number} blockSize The multiple that the data should be padded to.
 * @example
 *   JsCrypto.pad.Noop.pad(wordArray, 4);
 */
function pad(data, blockSize) {
    // Noop
}
/**
 * Unpads data that had been padded with Noop strategy.
 *
 * @param {Word32Array} data The data to unpad.
 * @example
 *   JsCrypto.pad.Noop.unpad(wordArray);
 */
function unpad(data) {
    // Noop
}
const Noop = {
    pad,
    unpad,
};


/***/ }),

/***/ "./src/lib/algorithm/cipher/pad/Pkcs7.ts":
/*!***********************************************!*\
  !*** ./src/lib/algorithm/cipher/pad/Pkcs7.ts ***!
  \***********************************************/
/*! exports provided: Pkcs7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pkcs7", function() { return Pkcs7; });
/* harmony import */ var _Word32Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Word32Array */ "./src/lib/Word32Array.ts");

/**
 * Pads data using the algorithm defined in PKCS #5/7.
 *
 * @param {Word32Array} data The data to pad.
 * @param {number} blockSize The multiple that the data should be padded to.
 * @example
 *   JsCrypto.pad.Pkcs7.pad(wordArray, 4);
 */
function pad(data, blockSize) {
    // Shortcut
    const blockSizeBytes = blockSize * 4;
    // Count padding bytes
    const nPaddingBytes = blockSizeBytes - data.nSigBytes % blockSizeBytes;
    // Create padding word
    const paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;
    // Create padding
    const paddingWords = [];
    for (let i = 0; i < nPaddingBytes; i += 4) {
        paddingWords.push(paddingWord);
    }
    const padding = new _Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"](paddingWords, nPaddingBytes);
    // Add padding
    data.concat(padding);
}
/**
 * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
 *
 * @param {Word32Array} data The data to unpad.
 * @example
 *   JsCrypto.pad.Pkcs7.unpad(wordArray);
 */
function unpad(data) {
    // Get number of padding bytes from last byte
    const nPaddingBytes = data.words[(data.nSigBytes - 1) >>> 2] & 0xff;
    // Remove padding
    data.nSigBytes -= nPaddingBytes;
}
const Pkcs7 = {
    pad,
    unpad,
};


/***/ }),

/***/ "./src/lib/algorithm/cipher/pad/Zero.ts":
/*!**********************************************!*\
  !*** ./src/lib/algorithm/cipher/pad/Zero.ts ***!
  \**********************************************/
/*! exports provided: Zero */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Zero", function() { return Zero; });
/**
 * Pads data with zero padding strategy.
 *
 * @param {Word32Array} data The data to pad.
 * @param {number} blockSize The multiple that the data should be padded to.
 * @example
 *   JsCrypto.pad.Zero.pad(wordArray, 4);
 */
function pad(data, blockSize) {
    // Shortcut
    const blockSizeBytes = blockSize * 4;
    // Pad
    data.clamp();
    data.nSigBytes += blockSizeBytes - ((data.nSigBytes % blockSizeBytes) || blockSizeBytes);
}
/**
 * Unpads data that had been padded with zero padding strategy.
 *
 * @param {Word32Array} data The data to unpad.
 * @example
 *   JsCrypto.pad.Zero.unpad(wordArray);
 */
function unpad(data) {
    // Shortcut
    const dataWords = data.words;
    // Unpad
    for (let i = data.nSigBytes - 1; i >= 0; i--) {
        if ((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff) {
            data.nSigBytes = i + 1;
            break;
        }
    }
}
const Zero = {
    pad,
    unpad,
};


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
const Base64 = {
    /**
     * Converts a word array to a hex string.
     *
     * @param {Word32Array} w An array of 32-bit words.
     * @return {string} The hex string.
     * @example
     *   var hexString = Hex.stringify([0x293892], 6);
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
     * Converts a hex string to a word array.
     *
     * @param {string} base64Str The hex string.
     * @return {Word32Array} The word array.
     * @example
     *   var wordArray = Hex.parse(hexString);
     */
    parse(base64Str) {
        const Len = base64Str.length;
        const words = [];
        for (let i = 0; i < Len; i += 2) {
            words[i >>> 3] |= parseInt(base64Str.substr(i, 2), 16) << (24 - (i % 8) * 4);
        }
        return new _Word32Array__WEBPACK_IMPORTED_MODULE_0__["Word32Array"](words, Len / 2);
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

/***/ }),

/***/ "./src/mode/CBC.ts":
/*!*************************!*\
  !*** ./src/mode/CBC.ts ***!
  \*************************/
/*! exports provided: CBC */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_algorithm_cipher_mode_CBC__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/algorithm/cipher/mode/CBC */ "./src/lib/algorithm/cipher/mode/CBC.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CBC", function() { return _lib_algorithm_cipher_mode_CBC__WEBPACK_IMPORTED_MODULE_0__["CBC"]; });




/***/ }),

/***/ "./src/mode/CFB.ts":
/*!*************************!*\
  !*** ./src/mode/CFB.ts ***!
  \*************************/
/*! exports provided: CFB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_algorithm_cipher_mode_CFB__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/algorithm/cipher/mode/CFB */ "./src/lib/algorithm/cipher/mode/CFB.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CFB", function() { return _lib_algorithm_cipher_mode_CFB__WEBPACK_IMPORTED_MODULE_0__["CFB"]; });




/***/ }),

/***/ "./src/mode/CTR.ts":
/*!*************************!*\
  !*** ./src/mode/CTR.ts ***!
  \*************************/
/*! exports provided: CTR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_algorithm_cipher_mode_CTR__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/algorithm/cipher/mode/CTR */ "./src/lib/algorithm/cipher/mode/CTR.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CTR", function() { return _lib_algorithm_cipher_mode_CTR__WEBPACK_IMPORTED_MODULE_0__["CTR"]; });




/***/ }),

/***/ "./src/mode/ECB.ts":
/*!*************************!*\
  !*** ./src/mode/ECB.ts ***!
  \*************************/
/*! exports provided: ECB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_algorithm_cipher_mode_ECB__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/algorithm/cipher/mode/ECB */ "./src/lib/algorithm/cipher/mode/ECB.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ECB", function() { return _lib_algorithm_cipher_mode_ECB__WEBPACK_IMPORTED_MODULE_0__["ECB"]; });




/***/ }),

/***/ "./src/mode/OFB.ts":
/*!*************************!*\
  !*** ./src/mode/OFB.ts ***!
  \*************************/
/*! exports provided: OFB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_algorithm_cipher_mode_OFB__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/algorithm/cipher/mode/OFB */ "./src/lib/algorithm/cipher/mode/OFB.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OFB", function() { return _lib_algorithm_cipher_mode_OFB__WEBPACK_IMPORTED_MODULE_0__["OFB"]; });




/***/ }),

/***/ "./src/pad/AnsiX923.ts":
/*!*****************************!*\
  !*** ./src/pad/AnsiX923.ts ***!
  \*****************************/
/*! exports provided: AnsiX923 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_algorithm_cipher_pad_AnsiX923__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/algorithm/cipher/pad/AnsiX923 */ "./src/lib/algorithm/cipher/pad/AnsiX923.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnsiX923", function() { return _lib_algorithm_cipher_pad_AnsiX923__WEBPACK_IMPORTED_MODULE_0__["AnsiX923"]; });




/***/ }),

/***/ "./src/pad/ISO10126.ts":
/*!*****************************!*\
  !*** ./src/pad/ISO10126.ts ***!
  \*****************************/
/*! exports provided: ISO10126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_algorithm_cipher_pad_ISO10126__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/algorithm/cipher/pad/ISO10126 */ "./src/lib/algorithm/cipher/pad/ISO10126.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ISO10126", function() { return _lib_algorithm_cipher_pad_ISO10126__WEBPACK_IMPORTED_MODULE_0__["ISO10126"]; });




/***/ }),

/***/ "./src/pad/ISO97971.ts":
/*!*****************************!*\
  !*** ./src/pad/ISO97971.ts ***!
  \*****************************/
/*! exports provided: ISO97971 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_algorithm_cipher_pad_ISO97971__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/algorithm/cipher/pad/ISO97971 */ "./src/lib/algorithm/cipher/pad/ISO97971.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ISO97971", function() { return _lib_algorithm_cipher_pad_ISO97971__WEBPACK_IMPORTED_MODULE_0__["ISO97971"]; });




/***/ }),

/***/ "./src/pad/Noop.ts":
/*!*************************!*\
  !*** ./src/pad/Noop.ts ***!
  \*************************/
/*! exports provided: Noop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_algorithm_cipher_pad_Noop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/algorithm/cipher/pad/Noop */ "./src/lib/algorithm/cipher/pad/Noop.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Noop", function() { return _lib_algorithm_cipher_pad_Noop__WEBPACK_IMPORTED_MODULE_0__["Noop"]; });




/***/ }),

/***/ "./src/pad/Zero.ts":
/*!*************************!*\
  !*** ./src/pad/Zero.ts ***!
  \*************************/
/*! exports provided: Zero */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_algorithm_cipher_pad_Zero__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/algorithm/cipher/pad/Zero */ "./src/lib/algorithm/cipher/pad/Zero.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Zero", function() { return _lib_algorithm_cipher_pad_Zero__WEBPACK_IMPORTED_MODULE_0__["Zero"]; });




/***/ })

/******/ });
});
//# sourceMappingURL=all.js.map