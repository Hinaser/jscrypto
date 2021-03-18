!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.JsCrypto=n():t.JsCrypto=n()}(this,(function(){return function(t){var n={};function r(i){if(n[i])return n[i].exports;var e=n[i]={i:i,l:!1,exports:{}};return t[i].call(e.exports,e,e.exports,r),e.l=!0,e.exports}return r.m=t,r.c=n,r.d=function(t,n,i){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:i})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"u",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.u)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var e in t)r.d(i,e,function(n){return t[n]}.bind(null,e));return i},r.n=function(t){var n=t&&t.u?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="",r(r.s=29)}({1:function(t,n,r){"use strict";r.d(n,"a",(function(){return o}));var i=r(2),e=r(7),o=function(){function t(t,n){if(Array.isArray(t)||!t)return this.h=Array.isArray(t)?t:[],void(this.v="number"==typeof n?n:4*this.h.length);var r;if(t instanceof ArrayBuffer)r=new Uint8Array(t);else{if(!(t instanceof Uint8Array||t instanceof Int8Array||t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array))throw new Error("Invalid argument");r=new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}if(!r)return this.h=[],void(this.v=0);for(var i=r.byteLength,e=[],o=0;o<i;o++)e[o>>>2]|=r[o]<<24-o%4*8;this.h=e,this.v=i}return Object.defineProperty(t.prototype,"nSigBytes",{get:function(){return this.v},set:function(t){this.v=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"words",{get:function(){return this.h},enumerable:!1,configurable:!0}),t.prototype.toString=function(t){return t?t.stringify(this):i.a.stringify(this)},t.prototype.toUint8Array=function(){for(var t=this.h,n=this.v,r=new Uint8Array(n),i=0;i<n;i++)r[i]=t[i>>>2]>>>24-i%4*8&255;return r},t.prototype.concat=function(t){var n=t.words.slice(),r=t.nSigBytes;if(this.clamp(),this.v%4)for(var i=0;i<r;i++){var e=n[i>>>2]>>>24-i%4*8&255;this.h[this.v+i>>>2]|=e<<24-(this.v+i)%4*8}else for(i=0;i<r;i+=4)this.h[this.v+i>>>2]=n[i>>>2];return this.v+=r,this},t.prototype.clamp=function(){var t=this.v;this.h[t>>>2]&=4294967295<<32-t%4*8,this.h.length=Math.ceil(t/4)},t.prototype.clone=function(){return new t(this.h.slice(),this.v)},t.random=function(n){for(var r=[],i=0;i<n;i+=4)r.push(Object(e.a)());return new t(r,n)},t}()},13:function(t,n){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},2:function(t,n,r){"use strict";r.d(n,"a",(function(){return e}));var i=r(1),e={stringify:function(t){for(var n=t.nSigBytes,r=t.words,i=[],e=0;e<n;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(t){for(var n=t.length,r=[],e=0;e<n;e+=2)r[e>>>3]|=parseInt(t.substr(e,2),16)<<24-e%8*4;return new i.a(r,n/2)}}},29:function(t,n,r){"use strict";r.r(n),r.d(n,"SHA1",(function(){return c}));var i,e=r(8),o=r(1),u=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),f=[],c=function(t){function n(n){var r=t.call(this,n)||this;return r.j=new o.a([1732584193,4023233417,2562383102,271733878,3285377520]),r.A=n,n&&void 0!==n.hash&&(r.j=n.hash.clone()),r}return u(n,t),n.prototype.g=function(){this.j=new o.a([1732584193,4023233417,2562383102,271733878,3285377520])},n.prototype.O=function(t,n){for(var r=this.j.words,i=r[0],e=r[1],o=r[2],u=r[3],c=r[4],s=0;s<80;s++){if(s<16)f[s]=0|t[n+s];else{var a=f[s-3]^f[s-8]^f[s-14]^f[s-16];f[s]=a<<1|a>>>31}var h=(i<<5|i>>>27)+c+f[s];h+=s<20?1518500249+(e&o|~e&u):s<40?1859775393+(e^o^u):s<60?(e&o|e&u|o&u)-1894007588:(e^o^u)-899497514,c=u,u=o,o=e<<30|e>>>2,e=i,i=h}r[0]=r[0]+i|0,r[1]=r[1]+e|0,r[2]=r[2]+o|0,r[3]=r[3]+u|0,r[4]=r[4]+c|0},n.prototype.U=function(){var t=this.S.words,n=8*this._,r=8*this.S.nSigBytes;return t[r>>>5]|=128<<24-r%32,t[14+(r+64>>>9<<4)]=Math.floor(n/4294967296),t[15+(r+64>>>9<<4)]=n,this.S.nSigBytes=4*t.length,this.M(),this.j},n.prototype.clone=function(){return new n({hash:this.j,blockSize:this.I,data:this.S,nBytes:this._})},n.hash=function(t,r){return new n(r).finalize(t)},n}(e.a)},3:function(t,n,r){"use strict";r.d(n,"a",(function(){return e}));var i=r(1),e={stringify:function(t){for(var n=t.nSigBytes,r=t.words,i=[],e=0;e<n;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(t){for(var n=t.length,r=[],e=0;e<n;e++)r[e>>>2]|=(255&t.charCodeAt(e))<<24-e%4*8;return new i.a(r,n)}}},4:function(t,n,r){"use strict";r.d(n,"a",(function(){return e}));var i=r(3),e={stringify:function(t){try{return decodeURIComponent(escape(i.a.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return i.a.parse(unescape(encodeURIComponent(t)))}}},6:function(t,n,r){"use strict";r.d(n,"a",(function(){return o}));var i=r(1),e=r(4),o=function(){function t(t){this.C=0,this.I=0,this.A=t,this.S=t&&void 0!==t.data?t.data.clone():new i.a,this._=t&&"number"==typeof t.nBytes?t.nBytes:0}return Object.defineProperty(t.prototype,"blockSize",{get:function(){return this.I},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,n){this.S=void 0!==t?t.clone():new i.a,this._="number"==typeof n?n:0},t.prototype.F=function(t){var n="string"==typeof t?e.a.parse(t):t;this.S.concat(n),this._+=n.nSigBytes},t.prototype.M=function(t){var n,r=this.S.words,e=this.S.nSigBytes,o=this.I,u=e/(4*this.I),f=(u=t?Math.ceil(u):Math.max((0|u)-this.C,0))*o,c=Math.min(4*f,e);if(f){for(var s=0;s<f;s+=o)this.O(r,s);n=r.splice(0,f),this.S.nSigBytes-=c}return new i.a(n,c)},t.prototype.O=function(t,n){throw new Error("Not implemented")},t}()},7:function(t,n,r){"use strict";(function(t){r.d(n,"a",(function(){return i}));var i=function(){if("undefined"!=typeof window){var n=window.crypto||window.msCrypto;if(!n)throw new Error("Crypto module not found");return function(){return n.getRandomValues(new Uint32Array(1))[0]}}return void 0!==t&&t.crypto?function(){return t.crypto.randomBytes(4).readInt32LE()}:function(){var t="crypt";return t+=String.fromCharCode(111),require(t).randomBytes(4).readInt32LE()}}()}).call(this,r(13))},8:function(t,n,r){"use strict";r.d(n,"a",(function(){return u}));var i,e=r(6),o=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),u=function(t){function n(n){var r=t.call(this,n)||this;return r.I=16,r.A=n,n&&"number"==typeof n.blockSize&&(r.I=n.blockSize),r.reset(n?n.data:void 0,n?n.nBytes:void 0),r}return o(n,t),Object.defineProperty(n.prototype,"blockSize",{get:function(){return this.I},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,r){t.prototype.reset.call(this,n,r),this.g()},n.prototype.update=function(t){return this.F(t),this.M(),this},n.prototype.finalize=function(t){return t&&this.F(t),this.U()},n.prototype.g=function(){throw new Error("Not implemented")},n.prototype.U=function(){throw new Error("Not implemented")},n}(e.a)}})}));