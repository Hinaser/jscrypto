!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.JsCrypto=t():n.JsCrypto=t()}(this,(function(){return function(){"use strict";var n={354:function(n,t,r){r.d(t,{e:function(){return o}});var i=r(720),e=r(54),o=function(){function n(n,t){if(Array.isArray(n)||!n)return this.t=Array.isArray(n)?n:[],void(this.i="number"==typeof t?t:4*this.t.length);var r;if(n instanceof ArrayBuffer)r=new Uint8Array(n);else{if(!(n instanceof Uint8Array||n instanceof Int8Array||n instanceof Uint8ClampedArray||n instanceof Int16Array||n instanceof Uint16Array||n instanceof Int32Array||n instanceof Uint32Array||n instanceof Float32Array||n instanceof Float64Array))throw new Error("Invalid argument");r=new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}if(!r)return this.t=[],void(this.i=0);for(var i=r.byteLength,e=[],o=0;o<i;o++)e[o>>>2]|=r[o]<<24-o%4*8;this.t=e,this.i=i}return Object.defineProperty(n.prototype,"nSigBytes",{get:function(){return this.i},set:function(n){this.i=n},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"words",{get:function(){return this.t},enumerable:!1,configurable:!0}),n.prototype.toString=function(n){return n?n.stringify(this):i.p.stringify(this)},n.prototype.toUint8Array=function(){for(var n=this.t,t=this.i,r=new Uint8Array(t),i=0;i<t;i++)r[i]=n[i>>>2]>>>24-i%4*8&255;return r},n.prototype.concat=function(n){var t=n.words.slice(),r=n.nSigBytes;if(this.clamp(),this.i%4)for(var i=0;i<r;i++){var e=t[i>>>2]>>>24-i%4*8&255;this.t[this.i+i>>>2]|=e<<24-(this.i+i)%4*8}else for(i=0;i<r;i+=4)this.t[this.i+i>>>2]=t[i>>>2];return this.i+=r,this},n.prototype.clamp=function(){var n=this.i;this.t[n>>>2]&=4294967295<<32-n%4*8,this.t.length=Math.ceil(n/4)},n.prototype.clone=function(){return new n(this.t.slice(),this.i)},n.random=function(t){for(var r=[],i=0;i<t;i+=4)r.push((0,e.M)());return new n(r,t)},n}()},720:function(n,t,r){r.d(t,{p:function(){return e}});var i=r(354),e={stringify:function(n){for(var t=n.nSigBytes,r=n.words,i=[],e=0;e<t;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(n){var t=n.length;if(t%2!=0)throw new Error("Hex string count must be even");for(var r=[],e=0;e<t;e+=2)r[e>>>3]|=parseInt(n.substr(e,2),16)<<24-e%8*4;return new i.e(r,t/2)}}},702:function(n,t,r){r.d(t,{m:function(){return e}});var i=r(354),e={stringify:function(n){for(var t=n.nSigBytes,r=n.words,i=[],e=0;e<t;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(n){for(var t=n.length,r=[],e=0;e<t;e++)r[e>>>2]|=(255&n.charCodeAt(e))<<24-e%4*8;return new i.e(r,t)}}},768:function(n,t,r){r.d(t,{d:function(){return e}});var i=r(702),e={stringify:function(n){try{return decodeURIComponent(escape(i.m.stringify(n)))}catch(n){throw new Error("Malformed UTF-8 data")}},parse:function(n){return i.m.parse(unescape(encodeURIComponent(n)))}}},54:function(n,t,r){r.d(t,{M:function(){return i}});var i=function(){if("undefined"!=typeof window){var n=window.crypto||window.msCrypto;if(!n)throw new Error("Crypto module not found");return function(){return n.getRandomValues(new Uint32Array(1))[0]}}return void 0!==r.g&&r.g.crypto?function(){return r.g.crypto.randomBytes(4).readInt32LE()}:function(){var n="crypt";return n+=String.fromCharCode(111),require(n).randomBytes(4).readInt32LE()}}()}},t={};function r(i){var e=t[i];if(void 0!==e)return e.exports;var o=t[i]={exports:{}};return n[i](o,o.exports,r),o.exports}r.d=function(n,t){for(var i in t)r.o(t,i)&&!r.o(n,i)&&Object.defineProperty(n,i,{enumerable:!0,get:t[i]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"u",{value:!0})};var i={};return function(){r.r(i),r.d(i,{Hmac:function(){return t}});var n=r(768),t=function(){function t(t,r){this.h=t,"string"==typeof r&&(r=n.d.parse(r));var i=t.blockSize,e=4*i;r.nSigBytes>e&&(r=t.finalize(r)),r.clamp();for(var o=this.v=r.clone(),u=this.l=r.clone(),f=o.words,a=u.words,c=0;c<i;c++)f[c]^=1549556828,a[c]^=909522486;u.nSigBytes=e,o.nSigBytes=e,this.reset()}return t.prototype.reset=function(){this.h.reset(),this.h.update(this.l)},t.prototype.update=function(n){return this.h.update(n),this},t.prototype.finalize=function(n){var t=this.h.finalize(n);return this.h.reset(),this.h.finalize(this.v.clone().concat(t))},t}()}(),i}()}));