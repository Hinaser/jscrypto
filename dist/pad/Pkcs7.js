!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.JsCrypto=t():(n.JsCrypto=n.JsCrypto||{},n.JsCrypto.pad=t())}(this,(function(){return function(){"use strict";var n={d:function(t,r){for(var e in r)n.o(r,e)&&!n.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:r[e]})}};n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),n.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},n.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"t",{value:!0})};var t={};n.r(t),n.d(t,{Pkcs7:function(){return o}});var r=function(n){for(var t=n.nSigBytes,r=n.words,e=[],i=0;i<t;i++){var o=r[i>>>2]>>>24-i%4*8&255;e.push((o>>>4).toString(16)),e.push((15&o).toString(16))}return e.join("")};var e=function(){if("undefined"!=typeof window){var t=window.crypto||window.msCrypto;if(!t)throw new Error("Crypto module not found");return function(){return t.getRandomValues(new Uint32Array(1))[0]}}return void 0!==n.g&&n.g.crypto?function(){return n.g.crypto.randomBytes(4).readInt32LE()}:function(){var n="crypt";return n+=String.fromCharCode(111),require(n).randomBytes(4).readInt32LE()}}(),i=function(){function n(n,t){if(Array.isArray(n)||!n)return this.i=Array.isArray(n)?n:[],void(this.u="number"==typeof t?t:4*this.i.length);var r;if(n instanceof ArrayBuffer)r=new Uint8Array(n);else{if(!(n instanceof Uint8Array||n instanceof Int8Array||n instanceof Uint8ClampedArray||n instanceof Int16Array||n instanceof Uint16Array||n instanceof Int32Array||n instanceof Uint32Array||n instanceof Float32Array||n instanceof Float64Array))throw new Error("Invalid argument");r=new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}if(!r)return this.i=[],void(this.u=0);for(var e=r.byteLength,i=[],o=0;o<e;o++)i[o>>>2]|=r[o]<<24-o%4*8;this.i=i,this.u=e}return Object.defineProperty(n.prototype,"nSigBytes",{get:function(){return this.u},set:function(n){this.u=n},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"words",{get:function(){return this.i},enumerable:!1,configurable:!0}),n.prototype.toString=function(n){return n?n.stringify(this):r(this)},n.prototype.toUint8Array=function(){for(var n=this.i,t=this.u,r=new Uint8Array(t),e=0;e<t;e++)r[e]=n[e>>>2]>>>24-e%4*8&255;return r},n.prototype.concat=function(n){var t=n.words.slice(),r=n.nSigBytes;if(this.clamp(),this.u%4)for(var e=0;e<r;e++){var i=t[e>>>2]>>>24-e%4*8&255;this.i[this.u+e>>>2]|=i<<24-(this.u+e)%4*8}else for(e=0;e<r;e+=4)this.i[this.u+e>>>2]=t[e>>>2];return this.u+=r,this},n.prototype.clamp=function(){var n=this.u;this.i[n>>>2]&=4294967295<<32-n%4*8,this.i.length=Math.ceil(n/4)},n.prototype.clone=function(){return new n(this.i.slice(),this.u)},n.random=function(t){for(var r=[],i=0;i<t;i+=4)r.push(e());return new n(r,t)},n}();var o={pad:function(n,t){for(var r=4*t,e=r-n.nSigBytes%r,o=e<<24|e<<16|e<<8|e,f=[],u=0;u<e;u+=4)f.push(o);var a=new i(f,e);n.concat(a)},unpad:function(n){var t=255&n.words[n.nSigBytes-1>>>2];n.nSigBytes-=t}};return t}()}));