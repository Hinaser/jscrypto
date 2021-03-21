!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.JsCrypto=t():n.JsCrypto=t()}(this,(function(){return function(){"use strict";var n={367:function(n,t,r){r.d(t,{Hmac:function(){return e}});var i=r(768),e=function(){function n(n,t){this.t=n,"string"==typeof t&&(t=i.d.parse(t));var r=n.blockSize,e=4*r;t.nSigBytes>e&&(t=n.finalize(t)),t.clamp();for(var o=this.i=t.clone(),u=this.u=t.clone(),f=o.words,c=u.words,s=0;s<r;s++)f[s]^=1549556828,c[s]^=909522486;u.nSigBytes=e,o.nSigBytes=e,this.reset()}return n.prototype.reset=function(){this.t.reset(),this.t.update(this.u)},n.prototype.update=function(n){return this.t.update(n),this},n.prototype.finalize=function(n){var t=this.t.finalize(n);return this.t.reset(),this.t.finalize(this.i.clone().concat(t))},n}()},766:function(n,t,r){r.d(t,{SHA224:function(){return f}});var i,e=r(354),o=r(561),u=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),f=function(n){function t(t){var r=n.call(this,t)||this;return r.h=new e.e([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428]),r.v=t,t&&void 0!==t.hash&&(r.h=t.hash.clone()),r}return u(t,n),t.prototype.l=function(){this.h=new e.e([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])},t.prototype.j=function(){var t=n.prototype.j.call(this);return t.nSigBytes-=4,t},t.prototype.clone=function(){return new t({hash:this.h,blockSize:this.A,data:this.O,nBytes:this._})},t.hash=function(n,r){return new t(r).finalize(n)},t}(o.SHA256)},561:function(n,t,r){r.d(t,{SHA256:function(){return v}});var i,e=r(868),o=r(354),u=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),f=[],c=[];function s(n){for(var t=Math.sqrt(n),r=2;r<=t;r++)if(!(n%r))return!1;return!0}function a(n){return 4294967296*(n-(0|n))|0}!function(){for(var n=2,t=0;t<64;)s(n)&&(t<8&&(f[t]=a(Math.pow(n,.5))),c[t]=a(Math.pow(n,1/3)),t++),n++}();var h=[],v=function(n){function t(t){var r=n.call(this,t)||this;return r.h=new o.e(f.slice(0)),r.v=t,t&&void 0!==t.hash&&(r.h=t.hash.clone()),r}return u(t,n),t.prototype.l=function(){this.h=new o.e(f.slice(0))},t.prototype.S=function(n,t){for(var r=this.h.words,i=r[0],e=r[1],o=r[2],u=r[3],f=r[4],s=r[5],a=r[6],v=r[7],w=0;w<64;w++){if(w<16)h[w]=0|n[t+w];else{var y=h[w-15],b=(y<<25|y>>>7)^(y<<14|y>>>18)^y>>>3,l=h[w-2],d=(l<<15|l>>>17)^(l<<13|l>>>19)^l>>>10;h[w]=b+h[w-7]+d+h[w-16]}var p=i&e^i&o^e&o,m=(i<<30|i>>>2)^(i<<19|i>>>13)^(i<<10|i>>>22),j=v+((f<<26|f>>>6)^(f<<21|f>>>11)^(f<<7|f>>>25))+(f&s^~f&a)+c[w]+h[w];v=a,a=s,s=f,f=u+j|0,u=o,o=e,e=i,i=j+(m+p)|0}r[0]=r[0]+i|0,r[1]=r[1]+e|0,r[2]=r[2]+o|0,r[3]=r[3]+u|0,r[4]=r[4]+f|0,r[5]=r[5]+s|0,r[6]=r[6]+a|0,r[7]=r[7]+v|0},t.prototype.j=function(){var n=this.O.words,t=8*this._,r=8*this.O.nSigBytes;return n[r>>>5]|=128<<24-r%32,n[14+(r+64>>>9<<4)]=Math.floor(t/4294967296),n[15+(r+64>>>9<<4)]=t,this.O.nSigBytes=4*n.length,this.U(),this.h},t.prototype.clone=function(){return new t({hash:this.h,blockSize:this.A,data:this.O,nBytes:this._})},t.hash=function(n,r){return new t(r).finalize(n)},t}(e.P)},354:function(n,t,r){r.d(t,{e:function(){return o}});var i=r(720),e=r(54),o=function(){function n(n,t){if(Array.isArray(n)||!n)return this.I=Array.isArray(n)?n:[],void(this.H="number"==typeof t?t:4*this.I.length);var r;if(n instanceof ArrayBuffer)r=new Uint8Array(n);else{if(!(n instanceof Uint8Array||n instanceof Int8Array||n instanceof Uint8ClampedArray||n instanceof Int16Array||n instanceof Uint16Array||n instanceof Int32Array||n instanceof Uint32Array||n instanceof Float32Array||n instanceof Float64Array))throw new Error("Invalid argument");r=new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}if(!r)return this.I=[],void(this.H=0);for(var i=r.byteLength,e=[],o=0;o<i;o++)e[o>>>2]|=r[o]<<24-o%4*8;this.I=e,this.H=i}return Object.defineProperty(n.prototype,"nSigBytes",{get:function(){return this.H},set:function(n){this.H=n},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"words",{get:function(){return this.I},enumerable:!1,configurable:!0}),n.prototype.toString=function(n){return n?n.stringify(this):i.p.stringify(this)},n.prototype.toUint8Array=function(){for(var n=this.I,t=this.H,r=new Uint8Array(t),i=0;i<t;i++)r[i]=n[i>>>2]>>>24-i%4*8&255;return r},n.prototype.concat=function(n){var t=n.words.slice(),r=n.nSigBytes;if(this.clamp(),this.H%4)for(var i=0;i<r;i++){var e=t[i>>>2]>>>24-i%4*8&255;this.I[this.H+i>>>2]|=e<<24-(this.H+i)%4*8}else for(i=0;i<r;i+=4)this.I[this.H+i>>>2]=t[i>>>2];return this.H+=r,this},n.prototype.clamp=function(){var n=this.H;this.I[n>>>2]&=4294967295<<32-n%4*8,this.I.length=Math.ceil(n/4)},n.prototype.clone=function(){return new n(this.I.slice(),this.H)},n.random=function(t){for(var r=[],i=0;i<t;i+=4)r.push((0,e.M)());return new n(r,t)},n}()},211:function(n,t,r){r.d(t,{C:function(){return o}});var i=r(354),e=r(768),o=function(){function n(n){this.k=0,this.A=0,this.v=n,this.O=n&&void 0!==n.data?n.data.clone():new i.e,this._=n&&"number"==typeof n.nBytes?n.nBytes:0}return Object.defineProperty(n.prototype,"blockSize",{get:function(){return this.A},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,t){this.O=void 0!==n?n.clone():new i.e,this._="number"==typeof t?t:0},n.prototype.B=function(n){var t="string"==typeof n?e.d.parse(n):n;this.O.concat(t),this._+=t.nSigBytes},n.prototype.U=function(n){var t,r=this.O.words,e=this.O.nSigBytes,o=this.A,u=e/(4*this.A),f=(u=n?Math.ceil(u):Math.max((0|u)-this.k,0))*o,c=Math.min(4*f,e);if(f){for(var s=0;s<f;s+=o)this.S(r,s);t=r.splice(0,f),this.O.nSigBytes-=c}return new i.e(t,c)},n.prototype.S=function(n,t){throw new Error("Not implemented")},n}()},868:function(n,t,r){r.d(t,{P:function(){return u}});var i,e=r(211),o=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),u=function(n){function t(t){var r=n.call(this,t)||this;return r.A=16,r.v=t,t&&"number"==typeof t.blockSize&&(r.A=t.blockSize),r.reset(t?t.data:void 0,t?t.nBytes:void 0),r}return o(t,n),Object.defineProperty(t.prototype,"blockSize",{get:function(){return this.A},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,r){n.prototype.reset.call(this,t,r),this.l()},t.prototype.update=function(n){return this.B(n),this.U(),this},t.prototype.finalize=function(n){return n&&this.B(n),this.j()},t.prototype.l=function(){throw new Error("Not implemented")},t.prototype.j=function(){throw new Error("Not implemented")},t}(e.C)},720:function(n,t,r){r.d(t,{p:function(){return e}});var i=r(354),e={stringify:function(n){for(var t=n.nSigBytes,r=n.words,i=[],e=0;e<t;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(n){var t=n.length;if(t%2!=0)throw new Error("Hex string count must be even");for(var r=[],e=0;e<t;e+=2)r[e>>>3]|=parseInt(n.substr(e,2),16)<<24-e%8*4;return new i.e(r,t/2)}}},702:function(n,t,r){r.d(t,{m:function(){return e}});var i=r(354),e={stringify:function(n){for(var t=n.nSigBytes,r=n.words,i=[],e=0;e<t;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(n){for(var t=n.length,r=[],e=0;e<t;e++)r[e>>>2]|=(255&n.charCodeAt(e))<<24-e%4*8;return new i.e(r,t)}}},768:function(n,t,r){r.d(t,{d:function(){return e}});var i=r(702),e={stringify:function(n){try{return decodeURIComponent(escape(i.m.stringify(n)))}catch(n){throw new Error("Malformed UTF-8 data")}},parse:function(n){return i.m.parse(unescape(encodeURIComponent(n)))}}},54:function(n,t,r){r.d(t,{M:function(){return i}});var i=function(){if("undefined"!=typeof window){var n=window.crypto||window.msCrypto;if(!n)throw new Error("Crypto module not found");return function(){return n.getRandomValues(new Uint32Array(1))[0]}}return void 0!==r.g&&r.g.crypto?function(){return r.g.crypto.randomBytes(4).readInt32LE()}:function(){var n="crypt";return n+=String.fromCharCode(111),require(n).randomBytes(4).readInt32LE()}}()}},t={};function r(i){var e=t[i];if(void 0!==e)return e.exports;var o=t[i]={exports:{}};return n[i](o,o.exports,r),o.exports}r.d=function(n,t){for(var i in t)r.o(t,i)&&!r.o(n,i)&&Object.defineProperty(n,i,{enumerable:!0,get:t[i]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"F",{value:!0})};var i={};return function(){r.r(i),r.d(i,{HmacSHA224:function(){return e}});var n=r(367),t=r(766);function e(r,i){return new n.Hmac(new t.SHA224,i).finalize(r)}}(),i}()}));