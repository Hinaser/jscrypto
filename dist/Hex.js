!function(n,r){if("object"==typeof exports&&"object"==typeof module)module.exports=r();else if("function"==typeof define&&define.amd)define([],r);else if("object"==typeof exports)exports.JsCrypto=r();else{var t=r();for(var e in n.JsCrypto=n.JsCrypto||{},t)n.JsCrypto[e]=t[e]}}(this,(function(){return function(){"use strict";var n={d:function(r,t){for(var e in t)n.o(t,e)&&!n.o(r,e)&&Object.defineProperty(r,e,{enumerable:!0,get:t[e]})}};n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),n.o=function(n,r){return Object.prototype.hasOwnProperty.call(n,r)},n.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"t",{value:!0})};var r={};n.r(r),n.d(r,{Hex:function(){return u}});var t,e="undefined"!=typeof navigator&&navigator.userAgent?navigator.userAgent.toLowerCase():"",i=(t=parseInt((/msie (\d+)/.exec(e)||[])[1],10),isNaN(t)?(t=parseInt((/trident\/.*; rv:(\d+)/.exec(e)||[])[1],10),!isNaN(t)&&t):t);var o=function(){if("undefined"!=typeof window){var r=window.crypto||window.msCrypto;if(!r){if(function(n,r){return!1!==i&&(!r||("<"===n?i<r:"<="===n?i<=r:">"===n?i>r:">="===n?i>=r:i===r))}("<",11))return console.warn("IE <= 10 uses insecure random generator. Please consider to use IE11 or another modern browser"),function(){return Math.floor(512*Math.random())%256};throw new Error("Crypto module not found")}return function(){return r.getRandomValues(new Uint32Array(1))[0]}}return void 0!==n.g&&n.g.crypto?function(){return n.g.crypto.randomBytes(4).readInt32LE()}:function(){var n="crypt";return n+=String.fromCharCode(111),require(n).randomBytes(4).readInt32LE()}}(),f=function(){function n(n,r){if(Array.isArray(n)||!n)return this.i=Array.isArray(n)?n:[],void(this.u="number"==typeof r?r:4*this.i.length);var t;if(n instanceof ArrayBuffer)t=new Uint8Array(n);else{if(!(n instanceof Uint8Array||n instanceof Int8Array||n instanceof Uint8ClampedArray||n instanceof Int16Array||n instanceof Uint16Array||n instanceof Int32Array||n instanceof Uint32Array||n instanceof Float32Array||n instanceof Float64Array))throw new Error("Invalid argument");t=new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}if(!t)return this.i=[],void(this.u=0);for(var e=t.byteLength,i=[],o=0;o<e;o++)i[o>>>2]|=t[o]<<24-o%4*8;this.i=i,this.u=e}return Object.defineProperty(n.prototype,"nSigBytes",{get:function(){return this.u},set:function(n){this.u=n},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"words",{get:function(){return this.i},enumerable:!1,configurable:!0}),n.prototype.toString=function(n){return n?n.stringify(this):u.stringify(this)},n.prototype.toUint8Array=function(){for(var n=this.i,r=this.u,t=new Uint8Array(r),e=0;e<r;e++)t[e]=n[e>>>2]>>>24-e%4*8&255;return t},n.prototype.concat=function(n){var r=n.words.slice(),t=n.nSigBytes;if(this.clamp(),this.u%4)for(var e=0;e<t;e++){var i=r[e>>>2]>>>24-e%4*8&255;this.i[this.u+e>>>2]|=i<<24-(this.u+e)%4*8}else for(e=0;e<t;e+=4)this.i[this.u+e>>>2]=r[e>>>2];return this.u+=t,this},n.prototype.clamp=function(){var n=this.u;this.i[n>>>2]&=4294967295<<32-n%4*8,this.i.length=Math.ceil(n/4)},n.prototype.clone=function(){return new n(this.i.slice(),this.u)},n.random=function(r){for(var t=[],e=0;e<r;e+=4)t.push(o());return new n(t,r)},n}(),u={stringify:function(n){for(var r=n.nSigBytes,t=n.words,e=[],i=0;i<r;i++){var o=t[i>>>2]>>>24-i%4*8&255;e.push((o>>>4).toString(16)),e.push((15&o).toString(16))}return e.join("")},parse:function(n){var r=n.length;if(r%2!=0)throw new Error("Hex string count must be even");for(var t=[],e=0;e<r;e+=2)t[e>>>3]|=parseInt(n.substr(e,2),16)<<24-e%8*4;return new f(t,r/2)}};return r}()}));