!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.JsCrypto=t():n.JsCrypto=t()}(this,(function(){return function(){"use strict";var n={367:function(n,t,r){r.d(t,{Hmac:function(){return e}});var i=r(768),e=function(){function n(n,t){this.u=n,"string"==typeof t&&(t=i.d.parse(t));var r=n.blockSize,e=4*r;t.nSigBytes>e&&(t=n.finalize(t)),t.clamp();for(var o=this.h=t.clone(),u=this.v=t.clone(),f=o.words,c=u.words,s=0;s<r;s++)f[s]^=1549556828,c[s]^=909522486;u.nSigBytes=e,o.nSigBytes=e,this.reset()}return n.prototype.reset=function(){this.u.reset(),this.u.update(this.v)},n.prototype.update=function(n){return this.u.update(n),this},n.prototype.finalize=function(n){var t=this.u.finalize(n);return this.u.reset(),this.u.finalize(this.h.clone().concat(t))},n}()},561:function(n,t,r){r.d(t,{SHA256:function(){return v}});var i,e=r(868),o=r(354),u=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),f=[],c=[];function s(n){for(var t=Math.sqrt(n),r=2;r<=t;r++)if(!(n%r))return!1;return!0}function a(n){return 4294967296*(n-(0|n))|0}!function(){for(var n=2,t=0;t<64;)s(n)&&(t<8&&(f[t]=a(Math.pow(n,.5))),c[t]=a(Math.pow(n,1/3)),t++),n++}();var h=[],v=function(n){function t(t){var r=n.call(this,t)||this;return r.l=new o.e(f.slice(0)),r.O=t,t&&void 0!==t.hash&&(r.l=t.hash.clone()),r}return u(t,n),t.prototype.A=function(){this.l=new o.e(f.slice(0))},t.prototype.k=function(n,t){for(var r=this.l.words,i=r[0],e=r[1],o=r[2],u=r[3],f=r[4],s=r[5],a=r[6],v=r[7],w=0;w<64;w++){if(w<16)h[w]=0|n[t+w];else{var b=h[w-15],l=(b<<25|b>>>7)^(b<<14|b>>>18)^b>>>3,y=h[w-2],d=(y<<15|y>>>17)^(y<<13|y>>>19)^y>>>10;h[w]=l+h[w-7]+d+h[w-16]}var p=i&e^i&o^e&o,m=(i<<30|i>>>2)^(i<<19|i>>>13)^(i<<10|i>>>22),j=v+((f<<26|f>>>6)^(f<<21|f>>>11)^(f<<7|f>>>25))+(f&s^~f&a)+c[w]+h[w];v=a,a=s,s=f,f=u+j|0,u=o,o=e,e=i,i=j+(m+p)|0}r[0]=r[0]+i|0,r[1]=r[1]+e|0,r[2]=r[2]+o|0,r[3]=r[3]+u|0,r[4]=r[4]+f|0,r[5]=r[5]+s|0,r[6]=r[6]+a|0,r[7]=r[7]+v|0},t.prototype.U=function(){var n=this.N.words,t=8*this.I,r=8*this.N.nSigBytes;return n[r>>>5]|=128<<24-r%32,n[14+(r+64>>>9<<4)]=Math.floor(t/4294967296),n[15+(r+64>>>9<<4)]=t,this.N.nSigBytes=4*n.length,this.T(),this.l},t.prototype.clone=function(){return new t({hash:this.l,blockSize:this.F,data:this.N,nBytes:this.I})},t.hash=function(n,r){return new t(r).finalize(n)},t}(e.P)},354:function(n,t,r){r.d(t,{e:function(){return o}});var i=r(720),e=r(54),o=function(){function n(n,t){if(Array.isArray(n)||!n)return this.H=Array.isArray(n)?n:[],void(this.B="number"==typeof t?t:4*this.H.length);var r;if(n instanceof ArrayBuffer)r=new Uint8Array(n);else{if(!(n instanceof Uint8Array||n instanceof Int8Array||n instanceof Uint8ClampedArray||n instanceof Int16Array||n instanceof Uint16Array||n instanceof Int32Array||n instanceof Uint32Array||n instanceof Float32Array||n instanceof Float64Array))throw new Error("Invalid argument");r=new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}if(!r)return this.H=[],void(this.B=0);for(var i=r.byteLength,e=[],o=0;o<i;o++)e[o>>>2]|=r[o]<<24-o%4*8;this.H=e,this.B=i}return Object.defineProperty(n.prototype,"nSigBytes",{get:function(){return this.B},set:function(n){this.B=n},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"words",{get:function(){return this.H},enumerable:!1,configurable:!0}),n.prototype.toString=function(n){return n?n.stringify(this):i.p.stringify(this)},n.prototype.toUint8Array=function(){for(var n=this.H,t=this.B,r=new Uint8Array(t),i=0;i<t;i++)r[i]=n[i>>>2]>>>24-i%4*8&255;return r},n.prototype.concat=function(n){var t=n.words.slice(),r=n.nSigBytes;if(this.clamp(),this.B%4)for(var i=0;i<r;i++){var e=t[i>>>2]>>>24-i%4*8&255;this.H[this.B+i>>>2]|=e<<24-(this.B+i)%4*8}else for(i=0;i<r;i+=4)this.H[this.B+i>>>2]=t[i>>>2];return this.B+=r,this},n.prototype.clamp=function(){var n=this.B;this.H[n>>>2]&=4294967295<<32-n%4*8,this.H.length=Math.ceil(n/4)},n.prototype.clone=function(){return new n(this.H.slice(),this.B)},n.random=function(t){for(var r=[],i=0;i<t;i+=4)r.push((0,e.M)());return new n(r,t)},n}()},211:function(n,t,r){r.d(t,{C:function(){return o}});var i=r(354),e=r(768),o=function(){function n(n){this.R=0,this.F=0,this.O=n,this.N=n&&void 0!==n.data?n.data.clone():new i.e,this.I=n&&"number"==typeof n.nBytes?n.nBytes:0}return Object.defineProperty(n.prototype,"blockSize",{get:function(){return this.F},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,t){this.N=void 0!==n?n.clone():new i.e,this.I="number"==typeof t?t:0},n.prototype.G=function(n){var t="string"==typeof n?e.d.parse(n):n;this.N.concat(t),this.I+=t.nSigBytes},n.prototype.T=function(n){var t,r=this.N.words,e=this.N.nSigBytes,o=this.F,u=e/(4*this.F),f=(u=n?Math.ceil(u):Math.max((0|u)-this.R,0))*o,c=Math.min(4*f,e);if(f){for(var s=0;s<f;s+=o)this.k(r,s);t=r.splice(0,f),this.N.nSigBytes-=c}return new i.e(t,c)},n.prototype.k=function(n,t){throw new Error("Not implemented")},n}()},868:function(n,t,r){r.d(t,{P:function(){return u}});var i,e=r(211),o=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),u=function(n){function t(t){var r=n.call(this,t)||this;return r.F=16,r.O=t,t&&"number"==typeof t.blockSize&&(r.F=t.blockSize),r.reset(t?t.data:void 0,t?t.nBytes:void 0),r}return o(t,n),Object.defineProperty(t.prototype,"blockSize",{get:function(){return this.F},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,r){n.prototype.reset.call(this,t,r),this.A()},t.prototype.update=function(n){return this.G(n),this.T(),this},t.prototype.finalize=function(n){return n&&this.G(n),this.U()},t.prototype.A=function(){throw new Error("Not implemented")},t.prototype.U=function(){throw new Error("Not implemented")},t}(e.C)},456:function(n,t,r){r.d(t,{t:function(){return f}});var i,e=r(211),o=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),u=function(){return(u=Object.assign||function(n){for(var t,r=1,i=arguments.length;r<i;r++)for(var e in t=arguments[r])Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n}).apply(this,arguments)},f=function(n){function t(t){var r=n.call(this,t)||this;return r.J=1,r.O=t,r.K=t.key,r.L=void 0!==t.iv?t.iv:r.L,r.J=void 0!==t.transformMode?t.transformMode:r.J,r}return o(t,n),Object.defineProperty(t.prototype,"iv",{get:function(){return this.L},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,r){n.prototype.reset.call(this,t,r),this.A()},t.prototype.process=function(n){return this.G(n),this.T()},t.prototype.finalize=function(n){return n&&this.G(n),this.U()},t.prototype.A=function(){throw new Error("Not implemented")},t.prototype.k=function(n,t){throw new Error("Not implemented")},t.prototype.U=function(){throw new Error("Not implemented")},t.createEncryptor=function(n,r){return new t(u(u({},r=void 0===r?{}:r),{key:n,transformMode:t.ENC_TRANSFORM_MODE}))},t.createDecryptor=function(n,r){return new t(u(u({},r=void 0===r?{}:r),{key:n,transformMode:t.DEC_TRANSFORM_MODE}))},t.ENC_TRANSFORM_MODE=1,t.DEC_TRANSFORM_MODE=2,t.keySize=4,t.ivSize=4,t}(e.C)},505:function(n,t,r){r.d(t,{Q:function(){return e}});var i=r(232),e=function(){function n(n){this.formatter=i.w,n&&(this.cipherText=n.cipherText,this.key=n.key,this.iv=n.iv,this.salt=n.salt,this.Algorithm=n.Algorithm,this.mode=n.mode,this.padding=n.padding,this.blockSize=n.blockSize,this.formatter=n.formatter||i.w)}return n.prototype.toString=function(n){return(n||this.formatter).stringify(this)},n}()},693:function(n,t,r){r.d(t,{E:function(){return c}});var i=r(109),e=r(214),o=r(505),u=r(232),f=function(){return(f=Object.assign||function(n){for(var t,r=1,i=arguments.length;r<i;r++)for(var e in t=arguments[r])Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n}).apply(this,arguments)},c={encrypt:function(n,t,r,u){var c=u?f({},u):{},s=u&&u.KDF?u.KDF:e.s,a={};u&&u.kdfHasher&&(a.kdfHasher=u.kdfHasher),u&&u.kdfIterations&&(a.kdfIterations=u.kdfIterations),u&&u.kdfModule&&(a.kdfModule=u.kdfModule);var h=s.execute(r,n.keySize,n.ivSize,c.kdfSalt,a);c.iv=h.iv;var v=i.D.encrypt(n,t,h.key,c);return new o.Q(f(f({},v),{key:h.key,iv:h.iv,salt:h.salt}))},decrypt:function(n,t,r,o){var c=o?f({},o):{},s=c.KDF?c.KDF:e.s,a=c.formatter?c.formatter:u.w,h=(0,i.W)(t,a),v={};o&&o.kdfHasher&&(v.kdfHasher=o.kdfHasher),o&&o.kdfIterations&&(v.kdfIterations=o.kdfIterations),o&&o.kdfModule&&(v.kdfModule=o.kdfModule);var w=s.execute(r,n.keySize,n.ivSize,h.salt,v);return c.iv=w.iv,i.D.decrypt(n,h,w.key,c)}}},109:function(n,t,r){r.d(t,{W:function(){return o},D:function(){return u}});var i=r(232),e=r(505);function o(n,t){return"string"==typeof n?t.parse(n):n}var u={encrypt:function(n,t,r,o){var u=n.createEncryptor(r,o),f=u.finalize(t);return new e.Q({cipherText:f,key:r,iv:u.iv,Algorithm:n,mode:u.mode,padding:u.padding,blockSize:u.blockSize,formatter:(null==o?void 0:o.formatter)||i.w})},decrypt:function(n,t,r,e){var u=n.createDecryptor(r,e),f=o(t,(null==e?void 0:e.formatter)||i.w);return u.finalize(f.cipherText||"")}}},30:function(n,t,r){r.d(t,{q:function(){return u}});var i,e=r(456),o=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),u=function(n){function t(t){var r=n.call(this,t)||this;return r.F=1,r}return o(t,n),t.prototype.U=function(){return this.T(!0)},t}(e.t)},232:function(n,t,r){r.d(t,{w:function(){return u}});var i=r(505),e=r(354),o=r(773),u={stringify:function(n){var t=n.cipherText,r=n.salt;return t?r?new e.e([1398893684,1701076831]).concat(r).concat(t).toString(o.D):t.toString(o.D):""},parse:function(n){var t,r=o.D.parse(n),u=r.words;return 1398893684===u[0]&&1701076831===u[1]&&(t=new e.e(u.slice(2,4)),u.splice(0,4),r.nSigBytes-=16),new i.Q({cipherText:r,salt:t})}}},214:function(n,t,r){r.d(t,{s:function(){return f}});var i=r(354),e=r(505),o=r(8),u=function(){return(u=Object.assign||function(n){for(var t,r=1,i=arguments.length;r<i;r++)for(var e in t=arguments[r])Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n}).apply(this,arguments)},f={execute:function(n,t,r,f,c){f||(f=i.e.random(8));var s=c&&c.kdfModule||o.E,a=c?{Hasher:c.kdfHasher,iterations:c.kdfIterations}:{},h=s.getKey(n,f,u(u({},a),{keySize:t+r})),v=new i.e(h.words.slice(t),4*r);return h.nSigBytes=4*t,new e.Q({key:h,iv:v,salt:f})}}},8:function(n,t,r){r.d(t,{E:function(){return s}});var i,e=r(561),o=r(367),u=r(354),f=r(541),c=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),s=function(n){function t(t){var r=n.call(this,t)||this;return r.V=4,r.X=e.SHA256,r.Y=1e4,t&&(r.V=void 0!==t.keySize?t.keySize:r.V,r.X=void 0!==t.Hasher?t.Hasher:r.X,r.Y=void 0!==t.iterations?t.iterations:r.Y),r}return c(t,n),t.prototype.compute=function(n,t){for(var r=new o.Hmac(new this.X,n),i=new u.e,e=new u.e([1]),f=i.words,c=e.words,s=this.V,a=this.Y;f.length<s;){var h=r.update(t).finalize(e);r.reset();for(var v=h.words,w=v.length,b=h,l=1;l<a;l++){b=r.finalize(b),r.reset();for(var y=b.words,d=0;d<w;d++)v[d]^=y[d]}i.concat(h),c[0]++}return i.nSigBytes=4*s,i},t.getKey=function(n,r,i){return new t(i).compute(n,r)},t}(f._)},541:function(n,t,r){r.d(t,{_:function(){return i}});var i=function(){function n(n){this.O=n}return n.prototype.compute=function(n,t){throw new Error("Not implemented")},n.getKey=function(n,t,r){throw new Error("Not implemented")},n}()},773:function(n,t,r){r.d(t,{D:function(){return f}});for(var i=r(354),e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",o=[],u=0;u<e.length;u++)o[e.charCodeAt(u)]=u;var f={stringify:function(n){var t=n.words,r=n.nSigBytes;n.clamp();for(var i=[],o=0;o<r;o+=3)for(var u=(t[o>>>2]>>>24-o%4*8&255)<<16|(t[o+1>>>2]>>>24-(o+1)%4*8&255)<<8|t[o+2>>>2]>>>24-(o+2)%4*8&255,f=0;f<4&&o+.75*f<r;f++)i.push(e.charAt(u>>>6*(3-f)&63));var c=e.charAt(64);if(c)for(;i.length%4;)i.push(c);return i.join("")},parse:function(n){var t=n.length,r=e.charAt(64);if(r){var u=n.indexOf(r);-1!==u&&(t=u)}for(var f=[],c=0,s=0;s<t;s++)if(s%4){var a=o[n.charCodeAt(s-1)]<<s%4*2|o[n.charCodeAt(s)]>>>6-s%4*2;f[c>>>2]|=a<<24-c%4*8,c++}return new i.e(f,c)}}},720:function(n,t,r){r.d(t,{p:function(){return e}});var i=r(354),e={stringify:function(n){for(var t=n.nSigBytes,r=n.words,i=[],e=0;e<t;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(n){var t=n.length;if(t%2!=0)throw new Error("Hex string count must be even");for(var r=[],e=0;e<t;e+=2)r[e>>>3]|=parseInt(n.substr(e,2),16)<<24-e%8*4;return new i.e(r,t/2)}}},702:function(n,t,r){r.d(t,{m:function(){return e}});var i=r(354),e={stringify:function(n){for(var t=n.nSigBytes,r=n.words,i=[],e=0;e<t;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(n){for(var t=n.length,r=[],e=0;e<t;e++)r[e>>>2]|=(255&n.charCodeAt(e))<<24-e%4*8;return new i.e(r,t)}}},768:function(n,t,r){r.d(t,{d:function(){return e}});var i=r(702),e={stringify:function(n){try{return decodeURIComponent(escape(i.m.stringify(n)))}catch(n){throw new Error("Malformed UTF-8 data")}},parse:function(n){return i.m.parse(unescape(encodeURIComponent(n)))}}},54:function(n,t,r){r.d(t,{M:function(){return i}});var i=function(){if("undefined"!=typeof window){var n=window.crypto||window.msCrypto;if(!n)throw new Error("Crypto module not found");return function(){return n.getRandomValues(new Uint32Array(1))[0]}}return void 0!==r.g&&r.g.crypto?function(){return r.g.crypto.randomBytes(4).readInt32LE()}:function(){var n="crypt";return n+=String.fromCharCode(111),require(n).randomBytes(4).readInt32LE()}}()}},t={};function r(i){var e=t[i];if(void 0!==e)return e.exports;var o=t[i]={exports:{}};return n[i](o,o.exports,r),o.exports}r.d=function(n,t){for(var i in t)r.o(t,i)&&!r.o(n,i)&&Object.defineProperty(n,i,{enumerable:!0,get:t[i]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"Z",{value:!0})};var i={};return function(){r.r(i),r.d(i,{RC4:function(){return c}});var n,t=r(30),e=r(693),o=r(109),u=(n=function(t,r){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(t,r)},function(t,r){function i(){this.constructor=t}n(t,r),t.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}),f=function(){return(f=Object.assign||function(n){for(var t,r=1,i=arguments.length;r<i;r++)for(var e in t=arguments[r])Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n}).apply(this,arguments)},c=function(n){function t(t){var r=n.call(this,t)||this;return r.S=[],r.i=0,r.j=0,r.O=t,r.A(),r}return u(t,n),t.prototype.A=function(){var n=this.K,t=n.words,r=n.nSigBytes;this.S=[];for(var i=0;i<256;i++)this.S[i]=i;i=0;for(var e=0;i<256;i++){var o=i%r,u=t[o>>>2]>>>24-o%4*8&255;e=(e+this.S[i]+u)%256;var f=this.S[i];this.S[i]=this.S[e],this.S[e]=f}this.i=this.j=0},t.prototype.k=function(n,t){n[t]^=this.generateKeyStreamWord()},t.prototype.generateKeyStreamWord=function(){for(var n=this.S,t=this.i,r=this.j,i=0,e=0;e<4;e++){r=(r+n[t=(t+1)%256])%256;var o=n[t];n[t]=n[r],n[r]=o,i|=n[(n[t]+n[r])%256]<<24-8*e}return this.i=t,this.j=r,i},t.createEncryptor=function(n,r){return new t(f(f({},r=void 0===r?{}:r),{key:n}))},t.createDecryptor=function(n,r){return new t(f(f({},r=void 0===r?{}:r),{key:n}))},t.encrypt=function(n,r,i){return"string"==typeof r?e.E.encrypt(t,n,r,i):o.D.encrypt(t,n,r,i)},t.decrypt=function(n,r,i){return"string"==typeof r?e.E.decrypt(t,n,r,i):o.D.decrypt(t,n,r,i)},t.ivSize=0,t.keySize=8,t}(t.q)}(),i}()}));