!function(n,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else if("object"==typeof exports)exports.JsCrypto=t();else{var r=t();for(var i in n.JsCrypto=n.JsCrypto||{},r)n.JsCrypto[i]=r[i]}}(this,(function(){return function(){"use strict";var n={6367:function(n,t,r){r.d(t,{Hmac:function(){return e}});var i=r(4768),e=function(){function n(n,t){this.t=n,"string"==typeof t&&(t=i.d.parse(t));var r=n.blockSize,e=4*r;t.nSigBytes>e&&(t=n.finalize(t)),t.clamp();for(var o=this.i=t.clone(),u=this.u=t.clone(),f=o.words,c=u.words,s=0;s<r;s++)f[s]^=1549556828,c[s]^=909522486;u.nSigBytes=e,o.nSigBytes=e,this.reset()}return n.prototype.reset=function(){this.t.reset(),this.t.update(this.u)},n.prototype.update=function(n){return this.t.update(n),this},n.prototype.finalize=function(n){var t=this.t.finalize(n);return this.t.reset(),this.t.finalize(this.i.clone().concat(t))},n}()},3173:function(n,t,r){r.d(t,{SHA1:function(){return c}});var i,e=r(1868),o=r(3354),u=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),f=[],c=function(n){function t(t){var r=n.call(this,t)||this;return r.h=new o.e([1732584193,4023233417,2562383102,271733878,3285377520]),r.v=t,t&&void 0!==t.hash&&(r.h=t.hash.clone()),r}return u(t,n),t.prototype.l=function(){this.h=new o.e([1732584193,4023233417,2562383102,271733878,3285377520])},t.prototype.A=function(n,t){for(var r=this.h.words,i=r[0],e=r[1],o=r[2],u=r[3],c=r[4],s=0;s<80;s++){if(s<16)f[s]=0|n[t+s];else{var a=f[s-3]^f[s-8]^f[s-14]^f[s-16];f[s]=a<<1|a>>>31}var h=(i<<5|i>>>27)+c+f[s];h+=s<20?1518500249+(e&o|~e&u):s<40?1859775393+(e^o^u):s<60?(e&o|e&u|o&u)-1894007588:(e^o^u)-899497514,c=u,u=o,o=e<<30|e>>>2,e=i,i=h}r[0]=r[0]+i|0,r[1]=r[1]+e|0,r[2]=r[2]+o|0,r[3]=r[3]+u|0,r[4]=r[4]+c|0},t.prototype.j=function(){var n=this.O.words,t=8*this.I,r=8*this.O.nSigBytes;return n[r>>>5]|=128<<24-r%32,n[14+(r+64>>>9<<4)]=Math.floor(t/4294967296),n[15+(r+64>>>9<<4)]=t,this.O.nSigBytes=4*n.length,this.U(),this.h},t.prototype.clone=function(){return new t({hash:this.h,blockSize:this.S,data:this.O,nBytes:this.I})},t.hash=function(n,r){return new t(r).finalize(n)},t}(e.P)},3354:function(n,t,r){r.d(t,{e:function(){return o}});var i=r(5720),e=r(9054),o=function(){function n(t,r){if(Array.isArray(t)||!t)return this._=Array.isArray(t)?t:[],void(this.N="number"==typeof r?r:4*this._.length);if(t instanceof n)return this._=t.words.slice(),void(this.N=t.nSigBytes);var i;try{t instanceof ArrayBuffer?i=new Uint8Array(t):(t instanceof Uint8Array||t instanceof Int8Array||t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array)&&(i=new Uint8Array(t.buffer,t.byteOffset,t.byteLength))}catch(n){throw new Error("Invalid argument")}if(!i)throw new Error("Invalid argument");for(var e=i.byteLength,o=[],u=0;u<e;u++)o[u>>>2]|=i[u]<<24-u%4*8;this._=o,this.N=e}return Object.defineProperty(n.prototype,"nSigBytes",{get:function(){return this.N},set:function(n){this.N=n},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"words",{get:function(){return this._},enumerable:!1,configurable:!0}),n.prototype.toString=function(n){return n?n.stringify(this):i.p.stringify(this)},n.prototype.toUint8Array=function(){for(var n=this._,t=this.N,r=new Uint8Array(t),i=0;i<t;i++)r[i]=n[i>>>2]>>>24-i%4*8&255;return r},n.prototype.concat=function(n){var t=n.words.slice(),r=n.nSigBytes;if(this.clamp(),this.N%4)for(var i=0;i<r;i++){var e=t[i>>>2]>>>24-i%4*8&255;this._[this.N+i>>>2]|=e<<24-(this.N+i)%4*8}else for(i=0;i<r;i+=4)this._[this.N+i>>>2]=t[i>>>2];return this.N+=r,this},n.prototype.clamp=function(){var n=this.N;this._[n>>>2]&=4294967295<<32-n%4*8,this._.length=Math.ceil(n/4)},n.prototype.clone=function(){return new n(this._.slice(),this.N)},n.random=function(t){for(var r=[],i=0;i<t;i+=4)r.push((0,e.M)());return new n(r,t)},n}()},7211:function(n,t,r){r.d(t,{C:function(){return o}});var i=r(3354),e=r(4768),o=function(){function n(n){this.H=0,this.S=0,this.v=n,this.O=n&&void 0!==n.data?n.data.clone():new i.e,this.I=n&&"number"==typeof n.nBytes?n.nBytes:0}return Object.defineProperty(n.prototype,"blockSize",{get:function(){return this.S},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,t){this.O=void 0!==n?n.clone():new i.e,this.I="number"==typeof t?t:0},n.prototype.F=function(n){var t="string"==typeof n?e.d.parse(n):n;this.O.concat(t),this.I+=t.nSigBytes},n.prototype.U=function(n){var t,r=this.O.words,e=this.O.nSigBytes,o=this.S,u=e/(4*this.S),f=(u=n?Math.ceil(u):Math.max((0|u)-this.H,0))*o,c=Math.min(4*f,e);if(f){for(var s=0;s<f;s+=o)this.A(r,s);t=r.splice(0,f),this.O.nSigBytes-=c}return new i.e(t,c)},n.prototype.A=function(n,t){throw new Error("Not implemented")},n}()},1868:function(n,t,r){r.d(t,{P:function(){return u}});var i,e=r(7211),o=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),u=function(n){function t(t){var r=n.call(this,t)||this;return r.S=16,r.v=t,t&&"number"==typeof t.blockSize&&(r.S=t.blockSize),r.reset(t?t.data:void 0,t?t.nBytes:void 0),r}return o(t,n),Object.defineProperty(t.prototype,"blockSize",{get:function(){return this.S},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,r){n.prototype.reset.call(this,t,r),this.l()},t.prototype.update=function(n){return this.F(n),this.U(),this},t.prototype.finalize=function(n){return n&&this.F(n),this.j()},t.prototype.l=function(){throw new Error("Not implemented")},t.prototype.j=function(){throw new Error("Not implemented")},t}(e.C)},1756:function(n,t,r){r.d(t,{w:function(){return u}});var i,e="undefined"!=typeof navigator&&navigator.userAgent?navigator.userAgent.toLowerCase():"",o=(i=parseInt((/msie (\d+)/.exec(e)||[])[1],10),isNaN(i)?(i=parseInt((/trident\/.*; rv:(\d+)/.exec(e)||[])[1],10),!isNaN(i)&&i):i);function u(n,t){return!1!==o&&(!t||("<"===n?o<t:"<="===n?o<=t:">"===n?o>t:">="===n?o>=t:o===t))}},5720:function(n,t,r){r.d(t,{p:function(){return e}});var i=r(3354),e={stringify:function(n){for(var t=n.nSigBytes,r=n.words,i=[],e=0;e<t;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(n){var t=n.length;if(t%2!=0)throw new Error("Hex string count must be even");if(!/^[a-fA-F0-9]+$/.test(n))throw new Error("Invalid Hex string: "+n);for(var r=[],e=0;e<t;e+=2)r[e>>>3]|=parseInt(n.substr(e,2),16)<<24-e%8*4;return new i.e(r,t/2)}}},8702:function(n,t,r){r.d(t,{m:function(){return e}});var i=r(3354),e={stringify:function(n){for(var t=n.nSigBytes,r=n.words,i=[],e=0;e<t;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(n){for(var t=n.length,r=[],e=0;e<t;e++)r[e>>>2]|=(255&n.charCodeAt(e))<<24-e%4*8;return new i.e(r,t)}}},4768:function(n,t,r){r.d(t,{d:function(){return e}});var i=r(8702),e={stringify:function(n){try{return decodeURIComponent(escape(i.m.stringify(n)))}catch(n){throw new Error("Malformed UTF-8 data")}},parse:function(n){return i.m.parse(unescape(encodeURIComponent(n)))}}},9054:function(n,t,r){r.d(t,{M:function(){return e}});var i=r(1756);var e=function(){if("undefined"!=typeof window){var n=window.crypto||window.msCrypto;if(!n){if((0,i.w)("<",11))return console.warn("IE <= 10 uses insecure random generator. Please consider to use IE11 or another modern browser"),function(){return Math.floor(512*Math.random())%256};throw new Error("Crypto module not found")}return function(){return n.getRandomValues(new Uint32Array(1))[0]}}return void 0!==r.g&&r.g.crypto?function(){return r.g.crypto.randomBytes(4).readInt32LE()}:function(){return require("crypto").randomBytes(4).readInt32LE()}}()}},t={};function r(i){var e=t[i];if(void 0!==e)return e.exports;var o=t[i]={exports:{}};return n[i](o,o.exports,r),o.exports}r.d=function(n,t){for(var i in t)r.o(t,i)&&!r.o(n,i)&&Object.defineProperty(n,i,{enumerable:!0,get:t[i]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"k",{value:!0})};var i={};return function(){r.r(i),r.d(i,{HmacSHA1:function(){return e}});var n=r(6367),t=r(3173);function e(r,i){return new n.Hmac(new t.SHA1,i).finalize(r)}}(),i}()}));