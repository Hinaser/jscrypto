!function(t,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.JsCrypto=r():(t.JsCrypto=t.JsCrypto||{},t.JsCrypto.formatter=r())}(this,(function(){return(()=>{"use strict";var t={d:(r,n)=>{for(var i in n)t.o(n,i)&&!t.o(r,i)&&Object.defineProperty(r,i,{enumerable:!0,get:n[i]})}};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),t.o=(t,r)=>Object.prototype.hasOwnProperty.call(t,r),t.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"t",{value:!0})};var r={};t.r(r),t.d(r,{OpenSSLFormatter:()=>c});var n=function(){function t(t){this.formatter=c,t&&(this.cipherText=t.cipherText,this.key=t.key,this.iv=t.iv,this.salt=t.salt,this.Algorithm=t.Algorithm,this.mode=t.mode,this.padding=t.padding,this.blockSize=t.blockSize,this.formatter=t.formatter||c)}return t.prototype.toString=function(t){return(t||this.formatter).stringify(this)},t}(),i=function(t){for(var r=t.nSigBytes,n=t.words,i=[],e=0;e<r;e++){var o=n[e>>>2]>>>24-e%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")};for(var e=function(){if("undefined"!=typeof window){var r=window.crypto||window.msCrypto;if(!r)throw new Error("Crypto module not found");return function(){return r.getRandomValues(new Uint32Array(1))[0]}}return void 0!==t.g&&t.g.crypto?function(){return t.g.crypto.randomBytes(4).readInt32LE()}:function(){var t="crypt";return t+=String.fromCharCode(111),require(t).randomBytes(4).readInt32LE()}}(),o=function(){function t(t,r){if(Array.isArray(t)||!t)return this.i=Array.isArray(t)?t:[],void(this.u="number"==typeof r?r:4*this.i.length);var n;if(t instanceof ArrayBuffer)n=new Uint8Array(t);else{if(!(t instanceof Uint8Array||t instanceof Int8Array||t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array))throw new Error("Invalid argument");n=new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}if(!n)return this.i=[],void(this.u=0);for(var i=n.byteLength,e=[],o=0;o<i;o++)e[o>>>2]|=n[o]<<24-o%4*8;this.i=e,this.u=i}return Object.defineProperty(t.prototype,"nSigBytes",{get:function(){return this.u},set:function(t){this.u=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"words",{get:function(){return this.i},enumerable:!1,configurable:!0}),t.prototype.toString=function(t){return t?t.stringify(this):i(this)},t.prototype.toUint8Array=function(){for(var t=this.i,r=this.u,n=new Uint8Array(r),i=0;i<r;i++)n[i]=t[i>>>2]>>>24-i%4*8&255;return n},t.prototype.concat=function(t){var r=t.words.slice(),n=t.nSigBytes;if(this.clamp(),this.u%4)for(var i=0;i<n;i++){var e=r[i>>>2]>>>24-i%4*8&255;this.i[this.u+i>>>2]|=e<<24-(this.u+i)%4*8}else for(i=0;i<n;i+=4)this.i[this.u+i>>>2]=r[i>>>2];return this.u+=n,this},t.prototype.clamp=function(){var t=this.u;this.i[t>>>2]&=4294967295<<32-t%4*8,this.i.length=Math.ceil(t/4)},t.prototype.clone=function(){return new t(this.i.slice(),this.u)},t.random=function(r){for(var n=[],i=0;i<r;i+=4)n.push(e());return new t(n,r)},t}(),f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",u=[],a=0;a<f.length;a++)u[f.charCodeAt(a)]=a;var s={stringify:function(t){var r=t.words,n=t.nSigBytes;t.clamp();for(var i=[],e=0;e<n;e+=3)for(var o=(r[e>>>2]>>>24-e%4*8&255)<<16|(r[e+1>>>2]>>>24-(e+1)%4*8&255)<<8|r[e+2>>>2]>>>24-(e+2)%4*8&255,u=0;u<4&&e+.75*u<n;u++)i.push(f.charAt(o>>>6*(3-u)&63));var a=f.charAt(64);if(a)for(;i.length%4;)i.push(a);return i.join("")},parse:function(t){var r=t.length,n=f.charAt(64);if(n){var i=t.indexOf(n);-1!==i&&(r=i)}for(var e=[],a=0,s=0;s<r;s++)if(s%4){var c=u[t.charCodeAt(s-1)]<<s%4*2|u[t.charCodeAt(s)]>>>6-s%4*2;e[a>>>2]|=c<<24-a%4*8,a++}return new o(e,a)}},c={stringify:function(t){var r=t.cipherText,n=t.salt;return r?n?new o([1398893684,1701076831]).concat(n).concat(r).toString(s):r.toString(s):""},parse:function(t){var r,i=s.parse(t),e=i.words;return 1398893684===e[0]&&1701076831===e[1]&&(r=new o(e.slice(2,4)),e.splice(0,4),i.nSigBytes-=16),new n({cipherText:i,salt:r})}};return r})()}));