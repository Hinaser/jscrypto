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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/DES3.ts");
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

/***/ "./src/DES.ts":
/*!********************!*\
  !*** ./src/DES.ts ***!
  \********************/
/*! exports provided: DES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DES", function() { return DES; });
/* harmony import */ var _lib_algorithm_cipher_BlockCipher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/algorithm/cipher/BlockCipher */ "./src/lib/algorithm/cipher/BlockCipher.ts");
/* harmony import */ var _lib_algorithm_cipher_Cipher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/algorithm/cipher/Cipher */ "./src/lib/algorithm/cipher/Cipher.ts");
/* harmony import */ var _lib_algorithm_cipher_PasswordBasedCipher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/algorithm/cipher/PasswordBasedCipher */ "./src/lib/algorithm/cipher/PasswordBasedCipher.ts");
/* harmony import */ var _lib_algorithm_cipher_SerializableCipher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/algorithm/cipher/SerializableCipher */ "./src/lib/algorithm/cipher/SerializableCipher.ts");
// Permuted Choice 1 constants




const PC1 = [
    57, 49, 41, 33, 25, 17, 9, 1,
    58, 50, 42, 34, 26, 18, 10, 2,
    59, 51, 43, 35, 27, 19, 11, 3,
    60, 52, 44, 36, 63, 55, 47, 39,
    31, 23, 15, 7, 62, 54, 46, 38,
    30, 22, 14, 6, 61, 53, 45, 37,
    29, 21, 13, 5, 28, 20, 12, 4
];
// Permuted Choice 2 constants
const PC2 = [
    14, 17, 11, 24, 1, 5,
    3, 28, 15, 6, 21, 10,
    23, 19, 12, 4, 26, 8,
    16, 7, 27, 20, 13, 2,
    41, 52, 31, 37, 47, 55,
    30, 40, 51, 45, 33, 48,
    44, 49, 39, 56, 34, 53,
    46, 42, 50, 36, 29, 32
];
// Cumulative bit shift constants
const BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
// SBOXes and round permutation constants
const SBOX_P = [
    {
        0x0: 0x808200,
        0x10000000: 0x8000,
        0x20000000: 0x808002,
        0x30000000: 0x2,
        0x40000000: 0x200,
        0x50000000: 0x808202,
        0x60000000: 0x800202,
        0x70000000: 0x800000,
        0x80000000: 0x202,
        0x90000000: 0x800200,
        0xa0000000: 0x8200,
        0xb0000000: 0x808000,
        0xc0000000: 0x8002,
        0xd0000000: 0x800002,
        0xe0000000: 0x0,
        0xf0000000: 0x8202,
        0x8000000: 0x0,
        0x18000000: 0x808202,
        0x28000000: 0x8202,
        0x38000000: 0x8000,
        0x48000000: 0x808200,
        0x58000000: 0x200,
        0x68000000: 0x808002,
        0x78000000: 0x2,
        0x88000000: 0x800200,
        0x98000000: 0x8200,
        0xa8000000: 0x808000,
        0xb8000000: 0x800202,
        0xc8000000: 0x800002,
        0xd8000000: 0x8002,
        0xe8000000: 0x202,
        0xf8000000: 0x800000,
        0x1: 0x8000,
        0x10000001: 0x2,
        0x20000001: 0x808200,
        0x30000001: 0x800000,
        0x40000001: 0x808002,
        0x50000001: 0x8200,
        0x60000001: 0x200,
        0x70000001: 0x800202,
        0x80000001: 0x808202,
        0x90000001: 0x808000,
        0xa0000001: 0x800002,
        0xb0000001: 0x8202,
        0xc0000001: 0x202,
        0xd0000001: 0x800200,
        0xe0000001: 0x8002,
        0xf0000001: 0x0,
        0x8000001: 0x808202,
        0x18000001: 0x808000,
        0x28000001: 0x800000,
        0x38000001: 0x200,
        0x48000001: 0x8000,
        0x58000001: 0x800002,
        0x68000001: 0x2,
        0x78000001: 0x8202,
        0x88000001: 0x8002,
        0x98000001: 0x800202,
        0xa8000001: 0x202,
        0xb8000001: 0x808200,
        0xc8000001: 0x800200,
        0xd8000001: 0x0,
        0xe8000001: 0x8200,
        0xf8000001: 0x808002
    },
    {
        0x0: 0x40084010,
        0x1000000: 0x4000,
        0x2000000: 0x80000,
        0x3000000: 0x40080010,
        0x4000000: 0x40000010,
        0x5000000: 0x40084000,
        0x6000000: 0x40004000,
        0x7000000: 0x10,
        0x8000000: 0x84000,
        0x9000000: 0x40004010,
        0xa000000: 0x40000000,
        0xb000000: 0x84010,
        0xc000000: 0x80010,
        0xd000000: 0x0,
        0xe000000: 0x4010,
        0xf000000: 0x40080000,
        0x800000: 0x40004000,
        0x1800000: 0x84010,
        0x2800000: 0x10,
        0x3800000: 0x40004010,
        0x4800000: 0x40084010,
        0x5800000: 0x40000000,
        0x6800000: 0x80000,
        0x7800000: 0x40080010,
        0x8800000: 0x80010,
        0x9800000: 0x0,
        0xa800000: 0x4000,
        0xb800000: 0x40080000,
        0xc800000: 0x40000010,
        0xd800000: 0x84000,
        0xe800000: 0x40084000,
        0xf800000: 0x4010,
        0x10000000: 0x0,
        0x11000000: 0x40080010,
        0x12000000: 0x40004010,
        0x13000000: 0x40084000,
        0x14000000: 0x40080000,
        0x15000000: 0x10,
        0x16000000: 0x84010,
        0x17000000: 0x4000,
        0x18000000: 0x4010,
        0x19000000: 0x80000,
        0x1a000000: 0x80010,
        0x1b000000: 0x40000010,
        0x1c000000: 0x84000,
        0x1d000000: 0x40004000,
        0x1e000000: 0x40000000,
        0x1f000000: 0x40084010,
        0x10800000: 0x84010,
        0x11800000: 0x80000,
        0x12800000: 0x40080000,
        0x13800000: 0x4000,
        0x14800000: 0x40004000,
        0x15800000: 0x40084010,
        0x16800000: 0x10,
        0x17800000: 0x40000000,
        0x18800000: 0x40084000,
        0x19800000: 0x40000010,
        0x1a800000: 0x40004010,
        0x1b800000: 0x80010,
        0x1c800000: 0x0,
        0x1d800000: 0x4010,
        0x1e800000: 0x40080010,
        0x1f800000: 0x84000
    },
    {
        0x0: 0x104,
        0x100000: 0x0,
        0x200000: 0x4000100,
        0x300000: 0x10104,
        0x400000: 0x10004,
        0x500000: 0x4000004,
        0x600000: 0x4010104,
        0x700000: 0x4010000,
        0x800000: 0x4000000,
        0x900000: 0x4010100,
        0xa00000: 0x10100,
        0xb00000: 0x4010004,
        0xc00000: 0x4000104,
        0xd00000: 0x10000,
        0xe00000: 0x4,
        0xf00000: 0x100,
        0x80000: 0x4010100,
        0x180000: 0x4010004,
        0x280000: 0x0,
        0x380000: 0x4000100,
        0x480000: 0x4000004,
        0x580000: 0x10000,
        0x680000: 0x10004,
        0x780000: 0x104,
        0x880000: 0x4,
        0x980000: 0x100,
        0xa80000: 0x4010000,
        0xb80000: 0x10104,
        0xc80000: 0x10100,
        0xd80000: 0x4000104,
        0xe80000: 0x4010104,
        0xf80000: 0x4000000,
        0x1000000: 0x4010100,
        0x1100000: 0x10004,
        0x1200000: 0x10000,
        0x1300000: 0x4000100,
        0x1400000: 0x100,
        0x1500000: 0x4010104,
        0x1600000: 0x4000004,
        0x1700000: 0x0,
        0x1800000: 0x4000104,
        0x1900000: 0x4000000,
        0x1a00000: 0x4,
        0x1b00000: 0x10100,
        0x1c00000: 0x4010000,
        0x1d00000: 0x104,
        0x1e00000: 0x10104,
        0x1f00000: 0x4010004,
        0x1080000: 0x4000000,
        0x1180000: 0x104,
        0x1280000: 0x4010100,
        0x1380000: 0x0,
        0x1480000: 0x10004,
        0x1580000: 0x4000100,
        0x1680000: 0x100,
        0x1780000: 0x4010004,
        0x1880000: 0x10000,
        0x1980000: 0x4010104,
        0x1a80000: 0x10104,
        0x1b80000: 0x4000004,
        0x1c80000: 0x4000104,
        0x1d80000: 0x4010000,
        0x1e80000: 0x4,
        0x1f80000: 0x10100
    },
    {
        0x0: 0x80401000,
        0x10000: 0x80001040,
        0x20000: 0x401040,
        0x30000: 0x80400000,
        0x40000: 0x0,
        0x50000: 0x401000,
        0x60000: 0x80000040,
        0x70000: 0x400040,
        0x80000: 0x80000000,
        0x90000: 0x400000,
        0xa0000: 0x40,
        0xb0000: 0x80001000,
        0xc0000: 0x80400040,
        0xd0000: 0x1040,
        0xe0000: 0x1000,
        0xf0000: 0x80401040,
        0x8000: 0x80001040,
        0x18000: 0x40,
        0x28000: 0x80400040,
        0x38000: 0x80001000,
        0x48000: 0x401000,
        0x58000: 0x80401040,
        0x68000: 0x0,
        0x78000: 0x80400000,
        0x88000: 0x1000,
        0x98000: 0x80401000,
        0xa8000: 0x400000,
        0xb8000: 0x1040,
        0xc8000: 0x80000000,
        0xd8000: 0x400040,
        0xe8000: 0x401040,
        0xf8000: 0x80000040,
        0x100000: 0x400040,
        0x110000: 0x401000,
        0x120000: 0x80000040,
        0x130000: 0x0,
        0x140000: 0x1040,
        0x150000: 0x80400040,
        0x160000: 0x80401000,
        0x170000: 0x80001040,
        0x180000: 0x80401040,
        0x190000: 0x80000000,
        0x1a0000: 0x80400000,
        0x1b0000: 0x401040,
        0x1c0000: 0x80001000,
        0x1d0000: 0x400000,
        0x1e0000: 0x40,
        0x1f0000: 0x1000,
        0x108000: 0x80400000,
        0x118000: 0x80401040,
        0x128000: 0x0,
        0x138000: 0x401000,
        0x148000: 0x400040,
        0x158000: 0x80000000,
        0x168000: 0x80001040,
        0x178000: 0x40,
        0x188000: 0x80000040,
        0x198000: 0x1000,
        0x1a8000: 0x80001000,
        0x1b8000: 0x80400040,
        0x1c8000: 0x1040,
        0x1d8000: 0x80401000,
        0x1e8000: 0x400000,
        0x1f8000: 0x401040
    },
    {
        0x0: 0x80,
        0x1000: 0x1040000,
        0x2000: 0x40000,
        0x3000: 0x20000000,
        0x4000: 0x20040080,
        0x5000: 0x1000080,
        0x6000: 0x21000080,
        0x7000: 0x40080,
        0x8000: 0x1000000,
        0x9000: 0x20040000,
        0xa000: 0x20000080,
        0xb000: 0x21040080,
        0xc000: 0x21040000,
        0xd000: 0x0,
        0xe000: 0x1040080,
        0xf000: 0x21000000,
        0x800: 0x1040080,
        0x1800: 0x21000080,
        0x2800: 0x80,
        0x3800: 0x1040000,
        0x4800: 0x40000,
        0x5800: 0x20040080,
        0x6800: 0x21040000,
        0x7800: 0x20000000,
        0x8800: 0x20040000,
        0x9800: 0x0,
        0xa800: 0x21040080,
        0xb800: 0x1000080,
        0xc800: 0x20000080,
        0xd800: 0x21000000,
        0xe800: 0x1000000,
        0xf800: 0x40080,
        0x10000: 0x40000,
        0x11000: 0x80,
        0x12000: 0x20000000,
        0x13000: 0x21000080,
        0x14000: 0x1000080,
        0x15000: 0x21040000,
        0x16000: 0x20040080,
        0x17000: 0x1000000,
        0x18000: 0x21040080,
        0x19000: 0x21000000,
        0x1a000: 0x1040000,
        0x1b000: 0x20040000,
        0x1c000: 0x40080,
        0x1d000: 0x20000080,
        0x1e000: 0x0,
        0x1f000: 0x1040080,
        0x10800: 0x21000080,
        0x11800: 0x1000000,
        0x12800: 0x1040000,
        0x13800: 0x20040080,
        0x14800: 0x20000000,
        0x15800: 0x1040080,
        0x16800: 0x80,
        0x17800: 0x21040000,
        0x18800: 0x40080,
        0x19800: 0x21040080,
        0x1a800: 0x0,
        0x1b800: 0x21000000,
        0x1c800: 0x1000080,
        0x1d800: 0x40000,
        0x1e800: 0x20040000,
        0x1f800: 0x20000080
    },
    {
        0x0: 0x10000008,
        0x100: 0x2000,
        0x200: 0x10200000,
        0x300: 0x10202008,
        0x400: 0x10002000,
        0x500: 0x200000,
        0x600: 0x200008,
        0x700: 0x10000000,
        0x800: 0x0,
        0x900: 0x10002008,
        0xa00: 0x202000,
        0xb00: 0x8,
        0xc00: 0x10200008,
        0xd00: 0x202008,
        0xe00: 0x2008,
        0xf00: 0x10202000,
        0x80: 0x10200000,
        0x180: 0x10202008,
        0x280: 0x8,
        0x380: 0x200000,
        0x480: 0x202008,
        0x580: 0x10000008,
        0x680: 0x10002000,
        0x780: 0x2008,
        0x880: 0x200008,
        0x980: 0x2000,
        0xa80: 0x10002008,
        0xb80: 0x10200008,
        0xc80: 0x0,
        0xd80: 0x10202000,
        0xe80: 0x202000,
        0xf80: 0x10000000,
        0x1000: 0x10002000,
        0x1100: 0x10200008,
        0x1200: 0x10202008,
        0x1300: 0x2008,
        0x1400: 0x200000,
        0x1500: 0x10000000,
        0x1600: 0x10000008,
        0x1700: 0x202000,
        0x1800: 0x202008,
        0x1900: 0x0,
        0x1a00: 0x8,
        0x1b00: 0x10200000,
        0x1c00: 0x2000,
        0x1d00: 0x10002008,
        0x1e00: 0x10202000,
        0x1f00: 0x200008,
        0x1080: 0x8,
        0x1180: 0x202000,
        0x1280: 0x200000,
        0x1380: 0x10000008,
        0x1480: 0x10002000,
        0x1580: 0x2008,
        0x1680: 0x10202008,
        0x1780: 0x10200000,
        0x1880: 0x10202000,
        0x1980: 0x10200008,
        0x1a80: 0x2000,
        0x1b80: 0x202008,
        0x1c80: 0x200008,
        0x1d80: 0x0,
        0x1e80: 0x10000000,
        0x1f80: 0x10002008
    },
    {
        0x0: 0x100000,
        0x10: 0x2000401,
        0x20: 0x400,
        0x30: 0x100401,
        0x40: 0x2100401,
        0x50: 0x0,
        0x60: 0x1,
        0x70: 0x2100001,
        0x80: 0x2000400,
        0x90: 0x100001,
        0xa0: 0x2000001,
        0xb0: 0x2100400,
        0xc0: 0x2100000,
        0xd0: 0x401,
        0xe0: 0x100400,
        0xf0: 0x2000000,
        0x8: 0x2100001,
        0x18: 0x0,
        0x28: 0x2000401,
        0x38: 0x2100400,
        0x48: 0x100000,
        0x58: 0x2000001,
        0x68: 0x2000000,
        0x78: 0x401,
        0x88: 0x100401,
        0x98: 0x2000400,
        0xa8: 0x2100000,
        0xb8: 0x100001,
        0xc8: 0x400,
        0xd8: 0x2100401,
        0xe8: 0x1,
        0xf8: 0x100400,
        0x100: 0x2000000,
        0x110: 0x100000,
        0x120: 0x2000401,
        0x130: 0x2100001,
        0x140: 0x100001,
        0x150: 0x2000400,
        0x160: 0x2100400,
        0x170: 0x100401,
        0x180: 0x401,
        0x190: 0x2100401,
        0x1a0: 0x100400,
        0x1b0: 0x1,
        0x1c0: 0x0,
        0x1d0: 0x2100000,
        0x1e0: 0x2000001,
        0x1f0: 0x400,
        0x108: 0x100400,
        0x118: 0x2000401,
        0x128: 0x2100001,
        0x138: 0x1,
        0x148: 0x2000000,
        0x158: 0x100000,
        0x168: 0x401,
        0x178: 0x2100400,
        0x188: 0x2000001,
        0x198: 0x2100000,
        0x1a8: 0x0,
        0x1b8: 0x2100401,
        0x1c8: 0x100401,
        0x1d8: 0x400,
        0x1e8: 0x2000400,
        0x1f8: 0x100001
    },
    {
        0x0: 0x8000820,
        0x1: 0x20000,
        0x2: 0x8000000,
        0x3: 0x20,
        0x4: 0x20020,
        0x5: 0x8020820,
        0x6: 0x8020800,
        0x7: 0x800,
        0x8: 0x8020000,
        0x9: 0x8000800,
        0xa: 0x20800,
        0xb: 0x8020020,
        0xc: 0x820,
        0xd: 0x0,
        0xe: 0x8000020,
        0xf: 0x20820,
        0x80000000: 0x800,
        0x80000001: 0x8020820,
        0x80000002: 0x8000820,
        0x80000003: 0x8000000,
        0x80000004: 0x8020000,
        0x80000005: 0x20800,
        0x80000006: 0x20820,
        0x80000007: 0x20,
        0x80000008: 0x8000020,
        0x80000009: 0x820,
        0x8000000a: 0x20020,
        0x8000000b: 0x8020800,
        0x8000000c: 0x0,
        0x8000000d: 0x8020020,
        0x8000000e: 0x8000800,
        0x8000000f: 0x20000,
        0x10: 0x20820,
        0x11: 0x8020800,
        0x12: 0x20,
        0x13: 0x800,
        0x14: 0x8000800,
        0x15: 0x8000020,
        0x16: 0x8020020,
        0x17: 0x20000,
        0x18: 0x0,
        0x19: 0x20020,
        0x1a: 0x8020000,
        0x1b: 0x8000820,
        0x1c: 0x8020820,
        0x1d: 0x20800,
        0x1e: 0x820,
        0x1f: 0x8000000,
        0x80000010: 0x20000,
        0x80000011: 0x800,
        0x80000012: 0x8020020,
        0x80000013: 0x20820,
        0x80000014: 0x20,
        0x80000015: 0x8020000,
        0x80000016: 0x8000000,
        0x80000017: 0x8000820,
        0x80000018: 0x8020820,
        0x80000019: 0x8000020,
        0x8000001a: 0x8000800,
        0x8000001b: 0x0,
        0x8000001c: 0x20800,
        0x8000001d: 0x820,
        0x8000001e: 0x20020,
        0x8000001f: 0x8020800
    }
];
// Masks that select the SBOX input
const SBOX_MASK = [
    0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
    0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f
];
class DES extends _lib_algorithm_cipher_BlockCipher__WEBPACK_IMPORTED_MODULE_0__["BlockCipher"] {
    constructor(props) {
        super(props);
        this._subKeys = [];
        this._invSubKeys = [];
        this._lBlock = 0;
        this._rBlock = 0;
        this._props = props;
        this._doReset();
    }
    _doReset() {
        // Shortcuts
        const key = this._key;
        const keyWords = key.words;
        // Select 56 bits according to PC1
        const keyBits = [];
        for (let i = 0; i < 56; i++) {
            const keyBitPos = PC1[i] - 1;
            keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;
        }
        // Assemble 16 subkeys
        const subKeys = this._subKeys = [];
        for (let nSubKey = 0; nSubKey < 16; nSubKey++) {
            // Create subkey
            const subKey = subKeys[nSubKey] = [];
            // Shortcut
            const bitShift = BIT_SHIFTS[nSubKey];
            // Select 48 bits according to PC2
            for (let i = 0; i < 24; i++) {
                // Select from the left 28 key bits
                subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);
                // Select from the right 28 key bits
                subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);
            }
            // Since each subkey is applied to an expanded 32-bit input,
            // the subkey can be broken into 8 values scaled to 32-bits,
            // which allows the key to be used without expansion
            subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
            for (let i = 1; i < 7; i++) {
                subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);
            }
            subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
        }
        // Compute inverse subkeys
        this._invSubKeys = [];
        for (let i = 0; i < 16; i++) {
            this._invSubKeys[i] = subKeys[15 - i];
        }
    }
    encryptBlock(words, offset) {
        this._doCryptoBlock(words, offset, this._subKeys);
    }
    decryptBlock(words, offset) {
        this._doCryptoBlock(words, offset, this._invSubKeys);
    }
    _doCryptoBlock(words, offset, subKeys) {
        // Get input
        this._lBlock = words[offset];
        this._rBlock = words[offset + 1];
        // Initial permutation
        this._exchangeLR(4, 0x0f0f0f0f);
        this._exchangeLR(16, 0x0000ffff);
        this._exchangeRL(2, 0x33333333);
        this._exchangeRL(8, 0x00ff00ff);
        this._exchangeLR(1, 0x55555555);
        // Rounds
        for (let round = 0; round < 16; round++) {
            // Shortcuts
            const subKey = subKeys[round];
            const lBlock = this._lBlock;
            const rBlock = this._rBlock;
            // Feistel function
            let f = 0;
            for (let i = 0; i < 8; i++) {
                const s = ((rBlock ^ subKey[i]) & SBOX_MASK[i]);
                f |= SBOX_P[i][s >>> 0];
            }
            this._lBlock = rBlock;
            this._rBlock = lBlock ^ f;
        }
        // Undo swap from last round
        const t = this._lBlock;
        this._lBlock = this._rBlock;
        this._rBlock = t;
        // Final permutation
        this._exchangeLR(1, 0x55555555);
        this._exchangeRL(8, 0x00ff00ff);
        this._exchangeRL(2, 0x33333333);
        this._exchangeLR(16, 0x0000ffff);
        this._exchangeLR(4, 0x0f0f0f0f);
        // Set output
        words[offset] = this._lBlock;
        words[offset + 1] = this._rBlock;
    }
    _exchangeLR(offset, mask) {
        const t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
        this._rBlock ^= t;
        this._lBlock ^= t << offset;
    }
    _exchangeRL(offset, mask) {
        const t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
        this._lBlock ^= t;
        this._rBlock ^= t << offset;
    }
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = JsCrypto.DES.createEncryptor(keyWordArray, { iv: ivWordArray });
     */
    static createEncryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new DES(Object.assign(Object.assign({}, props), { key, transformMode: _lib_algorithm_cipher_Cipher__WEBPACK_IMPORTED_MODULE_1__["Cipher"].ENC_TRANSFORM_MODE }));
    }
    /**
     * Creates this cipher in decryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = JsCrypto.DES.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new DES(Object.assign(Object.assign({}, props), { key, transformMode: _lib_algorithm_cipher_Cipher__WEBPACK_IMPORTED_MODULE_1__["Cipher"].DEC_TRANSFORM_MODE }));
    }
    /**
     * Encrypt a message with key
     *
     * @param {Word32Array|string} message
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = JsCrypt.DES.encrypt("test", "pass");
     */
    static encrypt(message, key, props) {
        if (typeof key === "string") {
            return _lib_algorithm_cipher_PasswordBasedCipher__WEBPACK_IMPORTED_MODULE_2__["PasswordBasedCipher"].encrypt(DES, message, key, props);
        }
        return _lib_algorithm_cipher_SerializableCipher__WEBPACK_IMPORTED_MODULE_3__["SerializableCipher"].encrypt(DES, message, key, props);
    }
    /**
     * Encrypt a encrypted message with key
     *
     * @param {CipherParams} cipherText
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = JsCrypt.DES.decrypt(cipherProps, "pass");
     */
    static decrypt(cipherText, key, props) {
        if (typeof key === "string") {
            return _lib_algorithm_cipher_PasswordBasedCipher__WEBPACK_IMPORTED_MODULE_2__["PasswordBasedCipher"].decrypt(DES, cipherText, key, props);
        }
        return _lib_algorithm_cipher_SerializableCipher__WEBPACK_IMPORTED_MODULE_3__["SerializableCipher"].decrypt(DES, cipherText, key, props);
    }
}
DES.keySize = 64 / 32;
DES.ivSize = 64 / 32;
DES._blockSize = 64 / 32;


/***/ }),

/***/ "./src/DES3.ts":
/*!*********************!*\
  !*** ./src/DES3.ts ***!
  \*********************/
/*! exports provided: DES3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DES3", function() { return DES3; });
/* harmony import */ var _lib_algorithm_cipher_SerializableCipher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/algorithm/cipher/SerializableCipher */ "./src/lib/algorithm/cipher/SerializableCipher.ts");
/* harmony import */ var _lib_algorithm_cipher_BlockCipher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/algorithm/cipher/BlockCipher */ "./src/lib/algorithm/cipher/BlockCipher.ts");
/* harmony import */ var _lib_algorithm_cipher_Cipher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/algorithm/cipher/Cipher */ "./src/lib/algorithm/cipher/Cipher.ts");
/* harmony import */ var _DES__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DES */ "./src/DES.ts");
/* harmony import */ var _lib_Word32Array__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/Word32Array */ "./src/lib/Word32Array.ts");
/* harmony import */ var _lib_algorithm_cipher_PasswordBasedCipher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/algorithm/cipher/PasswordBasedCipher */ "./src/lib/algorithm/cipher/PasswordBasedCipher.ts");






class DES3 extends _lib_algorithm_cipher_BlockCipher__WEBPACK_IMPORTED_MODULE_1__["BlockCipher"] {
    constructor(props) {
        super(props);
        this._props = props;
        const TripleDES = this._get3DES();
        // Create DES instances
        this._des1 = TripleDES[0];
        this._des2 = TripleDES[1];
        this._des3 = TripleDES[2];
    }
    _get3DES() {
        // Shortcuts
        const key = this._key;
        const keyWords = key.words;
        // Make sure the key length is valid (64, 128 or >= 192 bit)
        if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
            throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
        }
        // Extend the key according to the keying options defined in 3DES standard
        const key1 = keyWords.slice(0, 2);
        const key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
        const key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);
        // Create DES instances
        const des1 = _DES__WEBPACK_IMPORTED_MODULE_3__["DES"].createEncryptor(new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_4__["Word32Array"](key1));
        const des2 = _DES__WEBPACK_IMPORTED_MODULE_3__["DES"].createEncryptor(new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_4__["Word32Array"](key2));
        const des3 = _DES__WEBPACK_IMPORTED_MODULE_3__["DES"].createEncryptor(new _lib_Word32Array__WEBPACK_IMPORTED_MODULE_4__["Word32Array"](key3));
        return [des1, des2, des3];
    }
    _doReset() {
        const TripleDES = this._get3DES();
        // Create DES instances
        this._des1 = TripleDES[0];
        this._des2 = TripleDES[1];
        this._des3 = TripleDES[2];
    }
    encryptBlock(words, offset) {
        this._des1.encryptBlock(words, offset);
        this._des2.decryptBlock(words, offset);
        this._des3.encryptBlock(words, offset);
    }
    decryptBlock(words, offset) {
        this._des3.decryptBlock(words, offset);
        this._des2.encryptBlock(words, offset);
        this._des1.decryptBlock(words, offset);
    }
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = JsCrypto.DES3.createEncryptor(keyWordArray, { iv: ivWordArray });
     */
    static createEncryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new DES3(Object.assign(Object.assign({}, props), { key, transformMode: _lib_algorithm_cipher_Cipher__WEBPACK_IMPORTED_MODULE_2__["Cipher"].ENC_TRANSFORM_MODE }));
    }
    /**
     * Creates this cipher in decryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = JsCrypto.DES3.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new DES3(Object.assign(Object.assign({}, props), { key, transformMode: _lib_algorithm_cipher_Cipher__WEBPACK_IMPORTED_MODULE_2__["Cipher"].DEC_TRANSFORM_MODE }));
    }
    /**
     * Encrypt a message with key
     *
     * @param {Word32Array|string} message
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = JsCrypt.DES3.encrypt("test", "pass");
     */
    static encrypt(message, key, props) {
        if (typeof key === "string") {
            return _lib_algorithm_cipher_PasswordBasedCipher__WEBPACK_IMPORTED_MODULE_5__["PasswordBasedCipher"].encrypt(DES3, message, key, props);
        }
        return _lib_algorithm_cipher_SerializableCipher__WEBPACK_IMPORTED_MODULE_0__["SerializableCipher"].encrypt(DES3, message, key, props);
    }
    /**
     * Encrypt a encrypted message with key
     *
     * @param {CipherParams} cipherText
     * @param {Word32Array|string} key
     * @param {Partial<AESProps>?} props
     * @example
     *   var encryptedMessage = JsCrypt.DES3.decrypt(cipherProps, "pass");
     */
    static decrypt(cipherText, key, props) {
        if (typeof key === "string") {
            return _lib_algorithm_cipher_PasswordBasedCipher__WEBPACK_IMPORTED_MODULE_5__["PasswordBasedCipher"].decrypt(DES3, cipherText, key, props);
        }
        return _lib_algorithm_cipher_SerializableCipher__WEBPACK_IMPORTED_MODULE_0__["SerializableCipher"].decrypt(DES3, cipherText, key, props);
    }
}
DES3.keySize = 192 / 32;
DES3.ivSize = 64 / 32;
DES3._blockSize = 64 / 32;


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
            modeCreator = this._Mode.createEncryptor;
        }
        else {
            modeCreator = this._Mode.createDecryptor;
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
    get iv() {
        return this._iv;
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
     * @param {Word32Array|string?} dataUpdate The final data to encrypt or decrypt.
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
 * @property {typeof Cipher} algorithm The cipher algorithm.
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
/* harmony import */ var _CipherParams__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CipherParams */ "./src/lib/algorithm/cipher/CipherParams.ts");
/* harmony import */ var _formatter_OpenSSLFormatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formatter/OpenSSLFormatter */ "./src/lib/algorithm/cipher/formatter/OpenSSLFormatter.ts");




const PasswordBasedCipher = {
    /**
     * Encrypts a message using a password.
     *
     * @param {typeof Cipher} Cipher The cipher algorithm to use.
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
        return new _CipherParams__WEBPACK_IMPORTED_MODULE_2__["CipherParams"](Object.assign(Object.assign({}, cipherParams), { key: derivedParams.key, iv: derivedParams.iv, salt: derivedParams.salt }));
    },
    /**
     * Decrypts serialized ciphertext using a password.
     *
     * @param {typeof Cipher} Cipher The cipher algorithm to use.
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
        const formatter = p.formatter ? p.formatter : _formatter_OpenSSLFormatter__WEBPACK_IMPORTED_MODULE_3__["OpenSSLFormatter"];
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
     * @param {typeof Cipher} Cipher The cipher algorithm to use.
     * @param {Word32Array|string} message The message to encrypt.
     * @param {Word32Array} key The key.
     * @param {Partial<SerializableCipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {CipherParams} A cipher params object.
     * @example
     *   var ciphertextParams = JsCrypto.SerializableCipher.encrypt(JsCrypto.AES, message, key);
     *   var ciphertextParams = JsCrypto.SerializableCipher.encrypt(JsCrypto.AES, message, key, { iv: iv });
     */
    encrypt(Cipher, message, key, props) {
        const encryptor = Cipher.createEncryptor(key, props);
        const cipherText = encryptor.finalize(message);
        return new _CipherParams__WEBPACK_IMPORTED_MODULE_1__["CipherParams"]({
            cipherText,
            key,
            iv: encryptor.iv,
            Algorithm: Cipher,
            mode: encryptor.mode,
            padding: encryptor.padding,
            blockSize: encryptor.blockSize,
            formatter: (props === null || props === void 0 ? void 0 : props.formatter) || _formatter_OpenSSLFormatter__WEBPACK_IMPORTED_MODULE_0__["OpenSSLFormatter"],
        });
    },
    /**
     * Decrypts serialized ciphertext.
     *
     * @param {typeof Cipher} Cipher The cipher algorithm to use.
     * @param {CipherParams|string} cipherText The ciphertext to decrypt.
     * @param {Word32Array} key The key.
     * @param {Partial<SerializableCipherProps>} props (Optional) The configuration options to use for this operation.
     * @return {Word32Array} The plaintext.
     * @example
     *     var plaintext = JsCrypto.SerializableCipher.decrypt(JsCrypto.AES, formattedCiphertext, key, { iv: iv, format: JsCrypto.OpenSSL });
     *     var plaintext = JsCrypto.SerializableCipher.decrypt(JsCrypto.AES, ciphertextParams, key, { iv: iv, format: JsCrypto.OpenSSL });
     */
    decrypt(Cipher, cipherText, key, props) {
        const decryptor = Cipher.createDecryptor(key, props);
        const cipherParams = parseCipherText(cipherText, (props === null || props === void 0 ? void 0 : props.formatter) || _formatter_OpenSSLFormatter__WEBPACK_IMPORTED_MODULE_0__["OpenSSLFormatter"]);
        return decryptor.finalize(cipherParams.cipherText || "");
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
    static createEncryptor(props) {
        throw new Error("Not implemented yet");
    }
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @abstract
     * @example
     *   var mode = JsCrypto.CBC.createDecryptor(cipher, iv.words);
     */
    static createDecryptor(props) {
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
    static createEncryptor(props) {
        return new CBC.Encryptor(props);
    }
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = JsCrypto.CBC.createDecryptor(cipher, iv.words);
     */
    static createDecryptor(props) {
        return new CBC.Decryptor(props);
    }
}
/**
 * CBC encryptor.
 */
CBC.Encryptor = class Encryptor extends CBC {
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
CBC.Decryptor = class Decryptor extends CBC {
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
//# sourceMappingURL=DES3.js.map