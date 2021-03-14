(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["mode"] = factory();
	else
		root["JsCrypto"] = root["JsCrypto"] || {}, root["JsCrypto"]["mode"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/mode/CBC.ts");
/******/ })
/************************************************************************/
/******/ ({

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
     *   var mode = CBC.createEncryptor(cipher, iv.words);
     */
    static createEncryptor(props) {
        throw new Error("Not implemented yet");
    }
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @abstract
     * @example
     *   var mode = CBC.createDecryptor(cipher, iv.words);
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
     *   var mode = CBC.createEncryptor(cipher, iv.words);
     */
    static createEncryptor(props) {
        return new CBC.Encryptor(props);
    }
    /**
     * Creates this mode for decryption.
     * @param {BlockCipherModeProps} props
     * @example
     *   var mode = CBC.createDecryptor(cipher, iv.words);
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




/***/ })

/******/ });
});
//# sourceMappingURL=CBC.js.map