!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.JsCrypto=n():t.JsCrypto=n()}(this,(function(){return function(t){var n={};function r(i){if(n[i])return n[i].exports;var e=n[i]={i:i,l:!1,exports:{}};return t[i].call(e.exports,e,e.exports,r),e.l=!0,e.exports}return r.m=t,r.c=n,r.d=function(t,n,i){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:i})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"u",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.u)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var e in t)r.d(i,e,function(n){return t[n]}.bind(null,e));return i},r.n=function(t){var n=t&&t.u?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="",r(r.s=42)}([,function(t,n,r){"use strict";r.d(n,"a",(function(){return o}));var i=r(2),e=r(7),o=function(){function t(t,n){if(Array.isArray(t)||!t)return this.h=Array.isArray(t)?t:[],void(this.v="number"==typeof n?n:4*this.h.length);var r;if(t instanceof ArrayBuffer)r=new Uint8Array(t);else{if(!(t instanceof Uint8Array||t instanceof Int8Array||t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array))throw new Error("Invalid argument");r=new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}if(!r)return this.h=[],void(this.v=0);for(var i=r.byteLength,e=[],o=0;o<i;o++)e[o>>>2]|=r[o]<<24-o%4*8;this.h=e,this.v=i}return Object.defineProperty(t.prototype,"nSigBytes",{get:function(){return this.v},set:function(t){this.v=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"words",{get:function(){return this.h},enumerable:!1,configurable:!0}),t.prototype.toString=function(t){return t?t.stringify(this):i.a.stringify(this)},t.prototype.toUint8Array=function(){for(var t=this.h,n=this.v,r=new Uint8Array(n),i=0;i<n;i++)r[i]=t[i>>>2]>>>24-i%4*8&255;return r},t.prototype.concat=function(t){var n=t.words.slice(),r=t.nSigBytes;if(this.clamp(),this.v%4)for(var i=0;i<r;i++){var e=n[i>>>2]>>>24-i%4*8&255;this.h[this.v+i>>>2]|=e<<24-(this.v+i)%4*8}else for(i=0;i<r;i+=4)this.h[this.v+i>>>2]=n[i>>>2];return this.v+=r,this},t.prototype.clamp=function(){var t=this.v;this.h[t>>>2]&=4294967295<<32-t%4*8,this.h.length=Math.ceil(t/4)},t.prototype.clone=function(){return new t(this.h.slice(),this.v)},t.random=function(n){for(var r=[],i=0;i<n;i+=4)r.push(Object(e.a)());return new t(r,n)},t}()},function(t,n,r){"use strict";r.d(n,"a",(function(){return e}));var i=r(1),e={stringify:function(t){for(var n=t.nSigBytes,r=t.words,i=[],e=0;e<n;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(t){for(var n=t.length,r=[],e=0;e<n;e+=2)r[e>>>3]|=parseInt(t.substr(e,2),16)<<24-e%8*4;return new i.a(r,n/2)}}},function(t,n,r){"use strict";r.d(n,"a",(function(){return e}));var i=r(1),e={stringify:function(t){for(var n=t.nSigBytes,r=t.words,i=[],e=0;e<n;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(t){for(var n=t.length,r=[],e=0;e<n;e++)r[e>>>2]|=(255&t.charCodeAt(e))<<24-e%4*8;return new i.a(r,n)}}},function(t,n,r){"use strict";r.d(n,"a",(function(){return e}));var i=r(3),e={stringify:function(t){try{return decodeURIComponent(escape(i.a.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return i.a.parse(unescape(encodeURIComponent(t)))}}},function(t,n,r){"use strict";r.d(n,"b",(function(){return o})),r.d(n,"a",(function(){return u}));var i=r(10),e=r(9);function o(t,n){return"string"==typeof t?n.parse(t):t}var u={encrypt:function(t,n,r,o){var u=t.createEncryptor(r,o),f=u.finalize(n);return new e.a({cipherText:f,key:r,iv:u.iv,Algorithm:t,mode:u.mode,padding:u.padding,blockSize:u.blockSize,formatter:(null==o?void 0:o.formatter)||i.a})},decrypt:function(t,n,r,e){var u=t.createDecryptor(r,e),f=o(n,(null==e?void 0:e.formatter)||i.a);return u.finalize(f.cipherText||"")}}},function(t,n,r){"use strict";r.d(n,"a",(function(){return o}));var i=r(1),e=r(4),o=function(){function t(t){this.j=0,this.O=0,this.g=t,this._=t&&void 0!==t.data?t.data.clone():new i.a,this.A=t&&"number"==typeof t.nBytes?t.nBytes:0}return Object.defineProperty(t.prototype,"blockSize",{get:function(){return this.O},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,n){this._=void 0!==t?t.clone():new i.a,this.A="number"==typeof n?n:0},t.prototype.M=function(t){var n="string"==typeof t?e.a.parse(t):t;this._.concat(n),this.A+=n.nSigBytes},t.prototype.k=function(t){var n,r=this._.words,e=this._.nSigBytes,o=this.O,u=e/(4*this.O),f=(u=t?Math.ceil(u):Math.max((0|u)-this.j,0))*o,c=Math.min(4*f,e);if(f){for(var s=0;s<f;s+=o)this.U(r,s);n=r.splice(0,f),this._.nSigBytes-=c}return new i.a(n,c)},t.prototype.U=function(t,n){throw new Error("Not implemented")},t}()},function(t,n,r){"use strict";(function(t){r.d(n,"a",(function(){return i}));var i=function(){if("undefined"!=typeof window){var n=window.crypto||window.msCrypto;if(!n)throw new Error("Crypto module not found");return function(){return n.getRandomValues(new Uint32Array(1))[0]}}return void 0!==t&&t.crypto?function(){return t.crypto.randomBytes(4).readInt32LE()}:function(){return require("crypto").randomBytes(4).readInt32LE()}}()}).call(this,r(13))},function(t,n,r){"use strict";r.d(n,"a",(function(){return u}));var i,e=r(6),o=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),u=function(t){function n(n){var r=t.call(this,n)||this;return r.O=16,r.g=n,n&&"number"==typeof n.blockSize&&(r.O=n.blockSize),r.reset(n?n.data:void 0,n?n.nBytes:void 0),r}return o(n,t),Object.defineProperty(n.prototype,"blockSize",{get:function(){return this.O},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,r){t.prototype.reset.call(this,n,r),this.N()},n.prototype.update=function(t){return this.M(t),this.k(),this},n.prototype.finalize=function(t){return t&&this.M(t),this.I()},n.prototype.N=function(){throw new Error("Not implemented")},n.prototype.I=function(){throw new Error("Not implemented")},n}(e.a)},function(t,n,r){"use strict";r.d(n,"a",(function(){return e}));var i=r(10),e=function(){function t(t){this.formatter=i.a,t&&(this.cipherText=t.cipherText,this.key=t.key,this.iv=t.iv,this.salt=t.salt,this.Algorithm=t.Algorithm,this.mode=t.mode,this.padding=t.padding,this.blockSize=t.blockSize,this.formatter=t.formatter||i.a)}return t.prototype.toString=function(t){return(t||this.formatter).stringify(this)},t}()},function(t,n,r){"use strict";r.d(n,"a",(function(){return u}));var i=r(9),e=r(1),o=r(14),u={stringify:function(t){var n=t.cipherText,r=t.salt;return n?r?new e.a([1398893684,1701076831]).concat(r).concat(n).toString(o.a):n.toString(o.a):""},parse:function(t){var n,r=o.a.parse(t),u=r.words;return 1398893684===u[0]&&1701076831===u[1]&&(n=new e.a(u.slice(2,4)),u.splice(0,4),r.nSigBytes-=16),new i.a({cipherText:r,salt:n})}}},function(t,n,r){"use strict";r.d(n,"a",(function(){return f}));var i,e=r(6),o=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),u=function(){return(u=Object.assign||function(t){for(var n,r=1,i=arguments.length;r<i;r++)for(var e in n=arguments[r])Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e]);return t}).apply(this,arguments)},f=function(t){function n(n){var r=t.call(this,n)||this;return r.F=1,r.g=n,r.B=n.key,r.R=void 0!==n.iv?n.iv:r.R,r.F=void 0!==n.transformMode?n.transformMode:r.F,r}return o(n,t),Object.defineProperty(n.prototype,"iv",{get:function(){return this.R},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,r){t.prototype.reset.call(this,n,r),this.N()},n.prototype.process=function(t){return this.M(t),this.k()},n.prototype.finalize=function(t){return t&&this.M(t),this.I()},n.prototype.N=function(){throw new Error("Not implemented")},n.prototype.U=function(t,n){throw new Error("Not implemented")},n.prototype.I=function(){throw new Error("Not implemented")},n.createEncryptor=function(t,r){return new n(u(u({},r=void 0===r?{}:r),{key:t,transformMode:n.ENC_TRANSFORM_MODE}))},n.createDecryptor=function(t,r){return new n(u(u({},r=void 0===r?{}:r),{key:t,transformMode:n.DEC_TRANSFORM_MODE}))},n.ENC_TRANSFORM_MODE=1,n.DEC_TRANSFORM_MODE=2,n.keySize=4,n.ivSize=4,n}(e.a)},function(t,n,r){"use strict";r.d(n,"a",(function(){return c}));var i=r(5),e=r(17),o=r(9),u=r(10),f=function(){return(f=Object.assign||function(t){for(var n,r=1,i=arguments.length;r<i;r++)for(var e in n=arguments[r])Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e]);return t}).apply(this,arguments)},c={encrypt:function(t,n,r,u){var c=u?f({},u):{},s=u&&u.KDF?u.KDF:e.a,a={};u&&u.Hasher&&(a.Hasher=u.Hasher),u&&u.iterations&&(a.iterations=u.iterations);var h=s.execute(r,t.keySize,t.ivSize,c.salt,a);c.iv=h.iv;var v=i.a.encrypt(t,n,h.key,c);return new o.a(f(f({},v),{key:h.key,iv:h.iv,salt:h.salt}))},decrypt:function(t,n,r,o){var c=o?f({},o):{},s=c.KDF?c.KDF:e.a,a=c.formatter?c.formatter:u.a,h=Object(i.b)(n,a),v=s.execute(r,t.keySize,t.ivSize,h.salt);return c.iv=v.iv,i.a.decrypt(t,h,v.key,c)}}},function(t,n){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,n,r){"use strict";r.d(n,"a",(function(){return f}));for(var i=r(1),e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",o=[],u=0;u<e.length;u++)o[e.charCodeAt(u)]=u;var f={stringify:function(t){var n=t.words,r=t.nSigBytes;t.clamp();for(var i=[],o=0;o<r;o+=3)for(var u=(n[o>>>2]>>>24-o%4*8&255)<<16|(n[o+1>>>2]>>>24-(o+1)%4*8&255)<<8|n[o+2>>>2]>>>24-(o+2)%4*8&255,f=0;f<4&&o+.75*f<r;f++)i.push(e.charAt(u>>>6*(3-f)&63));var c=e.charAt(64);if(c)for(;i.length%4;)i.push(c);return i.join("")},parse:function(t){var n=t.length,r=e.charAt(64);if(r){var u=t.indexOf(r);-1!==u&&(n=u)}for(var f=[],c=0,s=0;s<n;s++)if(s%4){var a=o[t.charCodeAt(s-1)]<<s%4*2|o[t.charCodeAt(s)]>>>6-s%4*2;f[c>>>2]|=a<<24-c%4*8,c++}return new i.a(f,c)}}},,function(t,n,r){"use strict";r.r(n),r.d(n,"MD5",(function(){return v}));var i,e=r(1),o=r(8),u=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),f=[];function c(t,n,r,i,e,o,u){var f=t+(n&r|~n&i)+e+u;return(f<<o|f>>>32-o)+n}function s(t,n,r,i,e,o,u){var f=t+(n&i|r&~i)+e+u;return(f<<o|f>>>32-o)+n}function a(t,n,r,i,e,o,u){var f=t+(n^r^i)+e+u;return(f<<o|f>>>32-o)+n}function h(t,n,r,i,e,o,u){var f=t+(r^(n|~i))+e+u;return(f<<o|f>>>32-o)+n}!function(){for(var t=0;t<64;t++)f[t]=4294967296*Math.abs(Math.sin(t+1))|0}();var v=function(t){function n(n){var r=t.call(this,n)||this;return r.T=new e.a([1732584193,4023233417,2562383102,271733878]),n&&void 0!==n.hash&&(r.T=n.hash.clone()),r}return u(n,t),n.prototype.N=function(){this.T=new e.a([1732584193,4023233417,2562383102,271733878])},n.prototype.U=function(t,n){for(var r=0;r<16;r++){var i=n+r,e=t[i];t[i]=16711935&(e<<8|e>>>24)|4278255360&(e<<24|e>>>8)}var o=this.T.words,u=t[n],v=t[n+1],b=t[n+2],w=t[n+3],l=t[n+4],y=t[n+5],d=t[n+6],p=t[n+7],j=t[n+8],m=t[n+9],O=t[n+10],g=t[n+11],_=t[n+12],A=t[n+13],M=t[n+14],k=t[n+15],E=o[0],U=o[1],S=o[2],N=o[3];E=c(E,U,S,N,u,7,f[0]),N=c(N,E,U,S,v,12,f[1]),S=c(S,N,E,U,b,17,f[2]),U=c(U,S,N,E,w,22,f[3]),E=c(E,U,S,N,l,7,f[4]),N=c(N,E,U,S,y,12,f[5]),S=c(S,N,E,U,d,17,f[6]),U=c(U,S,N,E,p,22,f[7]),E=c(E,U,S,N,j,7,f[8]),N=c(N,E,U,S,m,12,f[9]),S=c(S,N,E,U,O,17,f[10]),U=c(U,S,N,E,g,22,f[11]),E=c(E,U,S,N,_,7,f[12]),N=c(N,E,U,S,A,12,f[13]),S=c(S,N,E,U,M,17,f[14]),E=s(E,U=c(U,S,N,E,k,22,f[15]),S,N,v,5,f[16]),N=s(N,E,U,S,d,9,f[17]),S=s(S,N,E,U,g,14,f[18]),U=s(U,S,N,E,u,20,f[19]),E=s(E,U,S,N,y,5,f[20]),N=s(N,E,U,S,O,9,f[21]),S=s(S,N,E,U,k,14,f[22]),U=s(U,S,N,E,l,20,f[23]),E=s(E,U,S,N,m,5,f[24]),N=s(N,E,U,S,M,9,f[25]),S=s(S,N,E,U,w,14,f[26]),U=s(U,S,N,E,j,20,f[27]),E=s(E,U,S,N,A,5,f[28]),N=s(N,E,U,S,b,9,f[29]),S=s(S,N,E,U,p,14,f[30]),E=a(E,U=s(U,S,N,E,_,20,f[31]),S,N,y,4,f[32]),N=a(N,E,U,S,j,11,f[33]),S=a(S,N,E,U,g,16,f[34]),U=a(U,S,N,E,M,23,f[35]),E=a(E,U,S,N,v,4,f[36]),N=a(N,E,U,S,l,11,f[37]),S=a(S,N,E,U,p,16,f[38]),U=a(U,S,N,E,O,23,f[39]),E=a(E,U,S,N,A,4,f[40]),N=a(N,E,U,S,u,11,f[41]),S=a(S,N,E,U,w,16,f[42]),U=a(U,S,N,E,d,23,f[43]),E=a(E,U,S,N,m,4,f[44]),N=a(N,E,U,S,_,11,f[45]),S=a(S,N,E,U,k,16,f[46]),E=h(E,U=a(U,S,N,E,b,23,f[47]),S,N,u,6,f[48]),N=h(N,E,U,S,p,10,f[49]),S=h(S,N,E,U,M,15,f[50]),U=h(U,S,N,E,y,21,f[51]),E=h(E,U,S,N,_,6,f[52]),N=h(N,E,U,S,w,10,f[53]),S=h(S,N,E,U,O,15,f[54]),U=h(U,S,N,E,v,21,f[55]),E=h(E,U,S,N,j,6,f[56]),N=h(N,E,U,S,k,10,f[57]),S=h(S,N,E,U,d,15,f[58]),U=h(U,S,N,E,A,21,f[59]),E=h(E,U,S,N,l,6,f[60]),N=h(N,E,U,S,g,10,f[61]),S=h(S,N,E,U,b,15,f[62]),U=h(U,S,N,E,m,21,f[63]),o[0]=o[0]+E|0,o[1]=o[1]+U|0,o[2]=o[2]+S|0,o[3]=o[3]+N|0},n.prototype.I=function(){var t=this._,n=t.words,r=8*this.A,i=8*t.nSigBytes;n[i>>>5]|=128<<24-i%32;var e=Math.floor(r/4294967296),o=r;n[15+(i+64>>>9<<4)]=16711935&(e<<8|e>>>24)|4278255360&(e<<24|e>>>8),n[14+(i+64>>>9<<4)]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),t.nSigBytes=4*(n.length+1),this.k();for(var u=this.T,f=u.words,c=0;c<4;c++){var s=f[c];f[c]=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8)}return u},n.prototype.clone=function(){return new n({hash:this.T,blockSize:this.O,data:this._,nBytes:this.A})},n.hash=function(t){return(new n).finalize(t)},n}(o.a)},function(t,n,r){"use strict";r.d(n,"a",(function(){return f}));var i=r(1),e=r(9),o=r(18),u=function(){return(u=Object.assign||function(t){for(var n,r=1,i=arguments.length;r<i;r++)for(var e in n=arguments[r])Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e]);return t}).apply(this,arguments)},f={execute:function(t,n,r,f,c){f||(f=i.a.random(8));var s=c&&c.KDF||o.a,a=c?{Hasher:c.Hasher,iterations:c.iterations}:{},h=s.getKey(t,f,u(u({},a),{keySize:n+r})),v=new i.a(h.words.slice(n),4*r);return h.nSigBytes=4*n,new e.a({key:h,iv:v,salt:f})}}},function(t,n,r){"use strict";r.d(n,"a",(function(){return c}));var i,e=r(16),o=r(1),u=r(19),f=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),c=function(t){function n(n){var r=t.call(this,n)||this;return r.q=4,r.D=e.MD5,r.H=1,n&&(r.q=void 0!==n.keySize?n.keySize:r.q,r.D=void 0!==n.Hasher?n.Hasher:r.D,r.H=void 0!==n.iterations?n.iterations:r.H),r}return f(n,t),n.prototype.compute=function(t,n){for(var r,i=new this.D,e=new o.a,u=e.words,f=this.q,c=this.H;u.length<f;){r&&i.update(r),r=i.update(t).finalize(n),i.reset();for(var s=1;s<c;s++)r=i.finalize(r),i.reset();e.concat(r)}return e.nSigBytes=4*f,e},n.getKey=function(t,r,i){return new n(i).compute(t,r)},n}(u.a)},function(t,n,r){"use strict";r.d(n,"a",(function(){return i}));var i=function(){function t(t){this.g=t}return t.prototype.compute=function(t,n){throw new Error("Not implemented")},t.getKey=function(t,n,r){throw new Error("Not implemented")},t}()},,,,,,,,function(t,n,r){"use strict";r.d(n,"a",(function(){return u}));var i,e=r(11),o=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),u=function(t){function n(n){var r=t.call(this,n)||this;return r.O=1,r}return o(n,t),n.prototype.I=function(){return this.k(!0)},n}(e.a)},,,,,,,,,,,,,,,function(t,n,r){"use strict";r.r(n),r.d(n,"Rabbit",(function(){return s}));var i,e=r(27),o=r(12),u=r(5),f=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),c=function(){return(c=Object.assign||function(t){for(var n,r=1,i=arguments.length;r<i;r++)for(var e in n=arguments[r])Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e]);return t}).apply(this,arguments)},s=function(t){function n(n){var r=t.call(this,n)||this;return r.O=4,r.S=[],r.C=[],r.G=[],r.J=[],r.K=[],r.L=0,r.g=n,r.N(),r}return f(n,t),n.prototype.N=function(){for(var t=this.B.words,n=this.R,r=0;r<4;r++)t[r]=16711935&(t[r]<<8|t[r]>>>24)|4278255360&(t[r]<<24|t[r]>>>8);var i=this.J=[t[0],t[3]<<16|t[2]>>>16,t[1],t[0]<<16|t[3]>>>16,t[2],t[1]<<16|t[0]>>>16,t[3],t[2]<<16|t[1]>>>16],e=this.K=[t[2]<<16|t[2]>>>16,4294901760&t[0]|65535&t[1],t[3]<<16|t[3]>>>16,4294901760&t[1]|65535&t[2],t[0]<<16|t[0]>>>16,4294901760&t[2]|65535&t[3],t[1]<<16|t[1]>>>16,4294901760&t[3]|65535&t[0]];this.L=0;for(r=0;r<4;r++)this.nextState();for(r=0;r<8;r++)e[r]^=i[r+4&7];if(n){var o=n.words,u=o[0],f=o[1],c=16711935&(u<<8|u>>>24)|4278255360&(u<<24|u>>>8),s=16711935&(f<<8|f>>>24)|4278255360&(f<<24|f>>>8),a=c>>>16|4294901760&s,h=s<<16|65535&c;e[0]^=c,e[1]^=a,e[2]^=s,e[3]^=h,e[4]^=c,e[5]^=a,e[6]^=s,e[7]^=h;for(r=0;r<4;r++)this.nextState()}},n.prototype.U=function(t,n){var r=this.J;this.nextState(),this.S[0]=r[0]^r[5]>>>16^r[3]<<16,this.S[1]=r[2]^r[7]>>>16^r[5]<<16,this.S[2]=r[4]^r[1]>>>16^r[7]<<16,this.S[3]=r[6]^r[3]>>>16^r[1]<<16;for(var i=0;i<4;i++)this.S[i]=16711935&(this.S[i]<<8|this.S[i]>>>24)|4278255360&(this.S[i]<<24|this.S[i]>>>8),t[n+i]^=this.S[i]},n.prototype.nextState=function(){for(var t=this.J,n=this.K,r=0;r<8;r++)this.C[r]=n[r];n[0]=n[0]+1295307597+this.L|0,n[1]=n[1]+3545052371+(n[0]>>>0<this.C[0]>>>0?1:0)|0,n[2]=n[2]+886263092+(n[1]>>>0<this.C[1]>>>0?1:0)|0,n[3]=n[3]+1295307597+(n[2]>>>0<this.C[2]>>>0?1:0)|0,n[4]=n[4]+3545052371+(n[3]>>>0<this.C[3]>>>0?1:0)|0,n[5]=n[5]+886263092+(n[4]>>>0<this.C[4]>>>0?1:0)|0,n[6]=n[6]+1295307597+(n[5]>>>0<this.C[5]>>>0?1:0)|0,n[7]=n[7]+3545052371+(n[6]>>>0<this.C[6]>>>0?1:0)|0,this.L=n[7]>>>0<this.C[7]>>>0?1:0;for(r=0;r<8;r++){var i=t[r]+n[r],e=65535&i,o=i>>>16,u=((e*e>>>17)+e*o>>>15)+o*o,f=((4294901760&i)*i|0)+((65535&i)*i|0);this.G[r]=u^f}var c=this.G;t[0]=c[0]+(c[7]<<16|c[7]>>>16)+(c[6]<<16|c[6]>>>16)|0,t[1]=c[1]+(c[0]<<8|c[0]>>>24)+c[7]|0,t[2]=c[2]+(c[1]<<16|c[1]>>>16)+(c[0]<<16|c[0]>>>16)|0,t[3]=c[3]+(c[2]<<8|c[2]>>>24)+c[1]|0,t[4]=c[4]+(c[3]<<16|c[3]>>>16)+(c[2]<<16|c[2]>>>16)|0,t[5]=c[5]+(c[4]<<8|c[4]>>>24)+c[3]|0,t[6]=c[6]+(c[5]<<16|c[5]>>>16)+(c[4]<<16|c[4]>>>16)|0,t[7]=c[7]+(c[6]<<8|c[6]>>>24)+c[5]|0},n.createEncryptor=function(t,r){return new n(c(c({},r=void 0===r?{}:r),{key:t}))},n.createDecryptor=function(t,r){return new n(c(c({},r=void 0===r?{}:r),{key:t}))},n.encrypt=function(t,r,i){return"string"==typeof r?o.a.encrypt(n,t,r,i):u.a.encrypt(n,t,r,i)},n.decrypt=function(t,r,i){return"string"==typeof r?o.a.decrypt(n,t,r,i):u.a.decrypt(n,t,r,i)},n.ivSize=4,n}(e.a)}])}));