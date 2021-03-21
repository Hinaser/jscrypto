!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.JsCrypto=n():t.JsCrypto=n()}(this,(function(){return function(){"use strict";var t={d:function(n,r){for(var e in r)t.o(r,e)&&!t.o(n,e)&&Object.defineProperty(n,e,{enumerable:!0,get:r[e]})}};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),t.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},t.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"t",{value:!0})};var n={};t.r(n),t.d(n,{Word64:function(){return o},Word64Array:function(){return u}});var r=function(){if("undefined"!=typeof window){var n=window.crypto||window.msCrypto;if(!n)throw new Error("Crypto module not found");return function(){return n.getRandomValues(new Uint32Array(1))[0]}}return void 0!==t.g&&t.g.crypto?function(){return t.g.crypto.randomBytes(4).readInt32LE()}:function(){var t="crypt";return t+=String.fromCharCode(111),require(t).randomBytes(4).readInt32LE()}}(),e=function(){function t(t,n){if(Array.isArray(t)||!t)return this.i=Array.isArray(t)?t:[],void(this.u="number"==typeof n?n:4*this.i.length);var r;if(t instanceof ArrayBuffer)r=new Uint8Array(t);else{if(!(t instanceof Uint8Array||t instanceof Int8Array||t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array))throw new Error("Invalid argument");r=new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}if(!r)return this.i=[],void(this.u=0);for(var e=r.byteLength,i=[],o=0;o<e;o++)i[o>>>2]|=r[o]<<24-o%4*8;this.i=i,this.u=e}return Object.defineProperty(t.prototype,"nSigBytes",{get:function(){return this.u},set:function(t){this.u=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"words",{get:function(){return this.i},enumerable:!1,configurable:!0}),t.prototype.toString=function(t){return t?t.stringify(this):i.stringify(this)},t.prototype.toUint8Array=function(){for(var t=this.i,n=this.u,r=new Uint8Array(n),e=0;e<n;e++)r[e]=t[e>>>2]>>>24-e%4*8&255;return r},t.prototype.concat=function(t){var n=t.words.slice(),r=t.nSigBytes;if(this.clamp(),this.u%4)for(var e=0;e<r;e++){var i=n[e>>>2]>>>24-e%4*8&255;this.i[this.u+e>>>2]|=i<<24-(this.u+e)%4*8}else for(e=0;e<r;e+=4)this.i[this.u+e>>>2]=n[e>>>2];return this.u+=r,this},t.prototype.clamp=function(){var t=this.u;this.i[t>>>2]&=4294967295<<32-t%4*8,this.i.length=Math.ceil(t/4)},t.prototype.clone=function(){return new t(this.i.slice(),this.u)},t.random=function(n){for(var e=[],i=0;i<n;i+=4)e.push(r());return new t(e,n)},t}(),i={stringify:function(t){for(var n=t.nSigBytes,r=t.words,e=[],i=0;i<n;i++){var o=r[i>>>2]>>>24-i%4*8&255;e.push((o>>>4).toString(16)),e.push((15&o).toString(16))}return e.join("")},parse:function(t){var n=t.length;if(n%2!=0)throw new Error("Hex string count must be even");for(var r=[],i=0;i<n;i+=2)r[i>>>3]|=parseInt(t.substr(i,2),16)<<24-i%8*4;return new e(r,n/2)}},o=function(){function t(t,n){this.high=t,this.low=n}return t.prototype.clone=function(){return new t(this.high,this.low)},t}(),u=function(){function t(t,n){this.i=t||[],this.u="number"==typeof n?n:8*this.i.length}return Object.defineProperty(t.prototype,"nSigBytes",{get:function(){return this.u},set:function(t){this.u=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"words",{get:function(){return this.i},enumerable:!1,configurable:!0}),t.prototype.to32=function(){for(var t=[],n=0;n<this.i.length;n++){var r=this.i[n];t.push(r.high),t.push(r.low)}return new e(t,this.u)},t.prototype.toString=function(t){return t?t.stringify(this.to32()):i.stringify(this.to32())},t.prototype.clone=function(){for(var n=this.i.slice(),r=0;r<n.length;r++)n[r]=n[r].clone();return new t(n,this.u)},t}();return n}()}));