!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.JsCrypto=n():t.JsCrypto=n()}(this,(function(){return function(t){var n={};function r(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=n,r.d=function(t,n,e){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"u",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.u)return t;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)r.d(e,i,function(n){return t[n]}.bind(null,i));return e},r.n=function(t){var n=t&&t.u?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="",r(r.s=9)}([,function(t,n,r){"use strict";r.d(n,"a",(function(){return u}));var e=r(3),i=r(5),u=function(){function t(t,n){this.h=t||[],this.v="number"==typeof n?n:4*this.h.length}return Object.defineProperty(t.prototype,"nSigBytes",{get:function(){return this.v},set:function(t){this.v=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"words",{get:function(){return this.h},enumerable:!1,configurable:!0}),t.prototype.toString=function(t){return t?t.stringify(this):e.a.stringify(this)},t.prototype.concat=function(t){var n=t.words.slice(),r=t.nSigBytes;if(this.clamp(),this.v%4)for(var e=0;e<r;e++){var i=n[e>>>2]>>>24-e%4*8&255;this.h[this.v+e>>>2]|=i<<24-(this.v+e)%4*8}else for(e=0;e<r;e+=4)this.h[this.v+e>>>2]=n[e>>>2];return this.v+=r,this},t.prototype.clamp=function(){var t=this.v;this.h[t>>>2]&=4294967295<<32-t%4*8,this.h.length=Math.ceil(t/4)},t.prototype.clone=function(){return new t(this.h.slice(),this.v)},t.random=function(n){for(var r=[],e=0;e<n;e++)r.push(Object(i.a)());return new t(r,n)},t}()},function(t,n,r){"use strict";r.d(n,"a",(function(){return i}));var e=r(1),i={stringify:function(t){for(var n=t.nSigBytes,r=t.words,e=[],i=0;i<n;i++){var u=r[i>>>2]>>>24-i%4*8&255;e.push(String.fromCharCode(u))}return e.join("")},parse:function(t){for(var n=t.length,r=[],i=0;i<n;i++)r[i>>>2]|=(255&t.charCodeAt(i))<<24-i%4*8;return new e.a(r,n)}}},function(t,n,r){"use strict";r.d(n,"a",(function(){return i}));var e=r(1),i={stringify:function(t){for(var n=t.nSigBytes,r=t.words,e=[],i=0;i<n;i++){var u=r[i>>>2]>>>24-i%4*8&255;e.push((u>>>4).toString(16)),e.push((15&u).toString(16))}return e.join("")},parse:function(t){for(var n=t.length,r=[],i=0;i<n;i+=2)r[i>>>3]|=parseInt(t.substr(i,2),16)<<24-i%8*4;return new e.a(r,n/2)}}},function(t,n,r){"use strict";r.d(n,"a",(function(){return i}));var e=r(2),i={stringify:function(t){try{return decodeURIComponent(escape(e.a.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return e.a.parse(unescape(encodeURIComponent(t)))}}},function(t,n,r){"use strict";(function(t){r.d(n,"a",(function(){return e}));var e=function(){if("undefined"!=typeof window){var n=window.crypto||window.msCrypto;if(!n)throw new Error("Crypto module not found");return function(){return n.getRandomValues(new Uint32Array(1))[0]}}return void 0!==t&&t.crypto?function(){return t.crypto.randomBytes(4).readInt32LE()}:function(){return require("crypto").randomBytes(4).readInt32LE()}}()}).call(this,r(8))},,,function(t,n){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,n,r){"use strict";r.r(n),r.d(n,"Hmac",(function(){return i}));var e=r(4),i=function(){function t(t,n){this.j=t,"string"==typeof n&&(n=e.a.parse(n));var r=t.blockSize,i=4*r;n.nSigBytes>i&&(n=t.finalize(n)),n.clamp();for(var u=this.g=n.clone(),o=this.O=n.clone(),f=u.words,c=o.words,s=0;s<r;s++)f[s]^=1549556828,c[s]^=909522486;o.nSigBytes=r,u.nSigBytes=r,this.reset()}return t.prototype.reset=function(){this.j.reset(),this.j.update(this.O)},t.prototype.update=function(t){return this.j.update(t),this},t.prototype.finalize=function(t){var n=this.j.finalize(t);return this.j.reset(),this.j.finalize(this.g.clone().concat(n))},t}()}])}));