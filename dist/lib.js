!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.lib=t():(n.JsCrypto=n.JsCrypto||{},n.JsCrypto.lib=t())}(this,(function(){return function(n){var t={};function r(e){if(t[e])return t[e].exports;var i=t[e]={i:e,l:!1,exports:{}};return n[e].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=n,r.c=t,r.d=function(n,t,e){r.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:e})},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"u",{value:!0})},r.t=function(n,t){if(1&t&&(n=r(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.u)return n;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var i in n)r.d(e,i,function(t){return n[t]}.bind(null,i));return e},r.n=function(n){var t=n&&n.u?function(){return n.default}:function(){return n};return r.d(t,"a",t),t},r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.p="",r(r.s=19)}([,function(n,t,r){"use strict";r.d(t,"a",(function(){return o}));var e=r(3),i=r(5),o=function(){function n(n,t){this.h=n||[],this.v="number"==typeof t?t:4*this.h.length}return n.prototype.raw=function(){return this.h},n.prototype.slice=function(){return this.h.slice()},n.prototype.length=function(){return this.v},n.prototype.setSignificantBytes=function(n){this.v=n},n.prototype.toString=function(n){return n?n.stringify(this.h,this.v):e.a.stringify(this.h,this.v)},n.prototype.concat=function(n){var t=n.slice(),r=n.length();if(this.clamp(),this.v%4)for(var e=0;e<r;e++){var i=t[e>>>2]>>>24-e%4*8&255;this.h[this.v+e>>>2]|=i<<24-(this.v+e)%4*8}else for(e=0;e<r;e+=4)this.h[this.v+e>>>2]=t[e>>>2];return this.v+=r,this},n.prototype.clamp=function(){var n=this.v;this.h[n>>>2]&=4294967295<<32-n%4*8,this.h.length=Math.ceil(n/4)},n.prototype.clone=function(){return new n(this.h.slice(),this.v)},n.random=function(t){for(var r=[],e=0;e<t;e++)r.push(Object(i.a)());return new n(r,t)},n}()},function(n,t,r){"use strict";r.d(t,"a",(function(){return i}));var e=r(1),i={stringify:function(n,t){for(var r=[],e=0;e<t;e++){var i=n[e>>>2]>>>24-e%4*8&255;r.push(String.fromCharCode(i))}return r.join("")},parse:function(n){for(var t=n.length,r=[],i=0;i<t;i++)r[i>>>2]|=(255&n.charCodeAt(i))<<24-i%4*8;return new e.a(r,t)}}},function(n,t,r){"use strict";r.d(t,"a",(function(){return i}));var e=r(1),i={stringify:function(n,t){for(var r=[],e=0;e<t;e++){var i=n[e>>>2]>>>24-e%4*8&255;r.push((i>>>4).toString(16)),r.push((15&i).toString(16))}return r.join("")},parse:function(n){for(var t=n.length,r=[],i=0;i<t;i+=2)r[i>>>3]|=parseInt(n.substr(i,2),16)<<24-i%8*4;return new e.a(r,t/2)}}},function(n,t,r){"use strict";r.d(t,"a",(function(){return i}));var e=r(2),i={stringify:function(n,t){try{return decodeURIComponent(escape(e.a.stringify(n,t)))}catch(n){throw new Error("Malformed UTF-8 data")}},parse:function(n){return e.a.parse(unescape(encodeURIComponent(n)))}}},function(n,t,r){"use strict";(function(n){r.d(t,"a",(function(){return e}));var e=function(){var t=function(){if("undefined"!=typeof window){var t=window.crypto||window.msCrypto;if(!t)throw new Error("Crypto module not found");return t}if(void 0!==n&&n.crypto)return n.crypto;throw new Error("Unable to find crypto module")}();if("function"==typeof t.getRandomValues)return function(){return t.getRandomValues(new Uint32Array(1))[0]};if("function"==typeof t.randomBytes)return function(){return t.randomBytes(4).readInt32LE()};throw new Error("Unable to find crypto module")}()}).call(this,r(7))},,function(n,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(n){"object"==typeof window&&(r=window)}n.exports=r},,,,,,,,,,,,function(n,t,r){"use strict";r.r(t);var e,i=r(5),o=r(1),u="undefined"!=typeof navigator&&navigator.userAgent?navigator.userAgent.toLowerCase():"",f=(e=parseInt((/msie (\d+)/.exec(u)||[])[1],10),isNaN(e)?(e=parseInt((/trident\/.*; rv:(\d+)/.exec(u)||[])[1],10),!isNaN(e)&&e):e);var c=r(4),a=r(2),s=r(3);t.default={random:i.a,Word32Array:o.a,isIE:function(n,t){return!1!==f&&(!t||("<"===n?f<t:"<="===n?f<=t:">"===n?f>t:">="===n?f>=t:f===t))},Utf8:c.a,Latin1:a.a,Hex:s.a}}]).default}));