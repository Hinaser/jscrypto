!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.JsCrypto=t():n.JsCrypto=t()}(this,(function(){return function(n){var t={};function r(i){if(t[i])return t[i].exports;var e=t[i]={i:i,l:!1,exports:{}};return n[i].call(e.exports,e,e.exports,r),e.l=!0,e.exports}return r.m=n,r.c=t,r.d=function(n,t,i){r.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:i})},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"u",{value:!0})},r.t=function(n,t){if(1&t&&(n=r(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.u)return n;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var e in n)r.d(i,e,function(t){return n[t]}.bind(null,e));return i},r.n=function(n){var t=n&&n.u?function(){return n.default}:function(){return n};return r.d(t,"a",t),t},r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.p="",r(r.s=24)}([function(n,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return o}));var i=r(2),e=r(1),u=function(){function n(n,t){this.high=n,this.low=t}return n.prototype.clone=function(){return new n(this.high,this.low)},n}(),o=function(){function n(n,t){this.h=n||[],this.v="number"==typeof t?t:8*this.h.length}return Object.defineProperty(n.prototype,"nSigBytes",{get:function(){return this.v},set:function(n){this.v=n},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"words",{get:function(){return this.h},enumerable:!1,configurable:!0}),n.prototype.to32=function(){for(var n=[],t=0;t<this.h.length;t++){var r=this.h[t];n.push(r.high),n.push(r.low)}return new e.a(n,this.v)},n.prototype.toString=function(n){return n?n.stringify(this.to32()):i.a.stringify(this.to32())},n.prototype.clone=function(){for(var t=this.h.slice(),r=0;r<t.length;r++)t[r]=t[r].clone();return new n(t,this.v)},n}()},function(n,t,r){"use strict";r.d(t,"a",(function(){return u}));var i=r(2),e=r(7),u=function(){function n(n,t){if(Array.isArray(n)||!n)return this.h=Array.isArray(n)?n:[],void(this.v="number"==typeof t?t:4*this.h.length);var r;if(n instanceof ArrayBuffer)r=new Uint8Array(n);else{if(!(n instanceof Uint8Array||n instanceof Int8Array||n instanceof Uint8ClampedArray||n instanceof Int16Array||n instanceof Uint16Array||n instanceof Int32Array||n instanceof Uint32Array||n instanceof Float32Array||n instanceof Float64Array))throw new Error("Invalid argument");r=new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}if(!r)return this.h=[],void(this.v=0);for(var i=r.byteLength,e=[],u=0;u<i;u++)e[u>>>2]|=r[u]<<24-u%4*8;this.h=e,this.v=i}return Object.defineProperty(n.prototype,"nSigBytes",{get:function(){return this.v},set:function(n){this.v=n},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"words",{get:function(){return this.h},enumerable:!1,configurable:!0}),n.prototype.toString=function(n){return n?n.stringify(this):i.a.stringify(this)},n.prototype.toUint8Array=function(){for(var n=this.h,t=this.v,r=new Uint8Array(t),i=0;i<t;i++)r[i]=n[i>>>2]>>>24-i%4*8&255;return r},n.prototype.concat=function(n){var t=n.words.slice(),r=n.nSigBytes;if(this.clamp(),this.v%4)for(var i=0;i<r;i++){var e=t[i>>>2]>>>24-i%4*8&255;this.h[this.v+i>>>2]|=e<<24-(this.v+i)%4*8}else for(i=0;i<r;i+=4)this.h[this.v+i>>>2]=t[i>>>2];return this.v+=r,this},n.prototype.clamp=function(){var n=this.v;this.h[n>>>2]&=4294967295<<32-n%4*8,this.h.length=Math.ceil(n/4)},n.prototype.clone=function(){return new n(this.h.slice(),this.v)},n.random=function(t){for(var r=[],i=0;i<t;i+=4)r.push(Object(e.a)());return new n(r,t)},n}()},function(n,t,r){"use strict";r.d(t,"a",(function(){return e}));var i=r(1),e={stringify:function(n){for(var t=n.nSigBytes,r=n.words,i=[],e=0;e<t;e++){var u=r[e>>>2]>>>24-e%4*8&255;i.push((u>>>4).toString(16)),i.push((15&u).toString(16))}return i.join("")},parse:function(n){var t=n.length;if(t%2!=0)throw new Error("Hex string count must be even");for(var r=[],e=0;e<t;e+=2)r[e>>>3]|=parseInt(n.substr(e,2),16)<<24-e%8*4;return new i.a(r,t/2)}}},function(n,t,r){"use strict";r.d(t,"a",(function(){return e}));var i=r(1),e={stringify:function(n){for(var t=n.nSigBytes,r=n.words,i=[],e=0;e<t;e++){var u=r[e>>>2]>>>24-e%4*8&255;i.push(String.fromCharCode(u))}return i.join("")},parse:function(n){for(var t=n.length,r=[],e=0;e<t;e++)r[e>>>2]|=(255&n.charCodeAt(e))<<24-e%4*8;return new i.a(r,t)}}},function(n,t,r){"use strict";r.d(t,"a",(function(){return e}));var i=r(3),e={stringify:function(n){try{return decodeURIComponent(escape(i.a.stringify(n)))}catch(n){throw new Error("Malformed UTF-8 data")}},parse:function(n){return i.a.parse(unescape(encodeURIComponent(n)))}}},,function(n,t,r){"use strict";r.d(t,"a",(function(){return u}));var i=r(1),e=r(4),u=function(){function n(n){this.j=0,this.g=0,this.O=n,this.A=n&&void 0!==n.data?n.data.clone():new i.a,this._=n&&"number"==typeof n.nBytes?n.nBytes:0}return Object.defineProperty(n.prototype,"blockSize",{get:function(){return this.g},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,t){this.A=void 0!==n?n.clone():new i.a,this._="number"==typeof t?t:0},n.prototype.S=function(n){var t="string"==typeof n?e.a.parse(n):n;this.A.concat(t),this._+=t.nSigBytes},n.prototype.U=function(n){var t,r=this.A.words,e=this.A.nSigBytes,u=this.g,o=e/(4*this.g),f=(o=n?Math.ceil(o):Math.max((0|o)-this.j,0))*u,c=Math.min(4*f,e);if(f){for(var s=0;s<f;s+=u)this.M(r,s);t=r.splice(0,f),this.A.nSigBytes-=c}return new i.a(t,c)},n.prototype.M=function(n,t){throw new Error("Not implemented")},n}()},function(n,t,r){"use strict";(function(n){r.d(t,"a",(function(){return i}));var i=function(){if("undefined"!=typeof window){var t=window.crypto||window.msCrypto;if(!t)throw new Error("Crypto module not found");return function(){return t.getRandomValues(new Uint32Array(1))[0]}}return void 0!==n&&n.crypto?function(){return n.crypto.randomBytes(4).readInt32LE()}:function(){var n="crypt";return n+=String.fromCharCode(111),require(n).randomBytes(4).readInt32LE()}}()}).call(this,r(13))},function(n,t,r){"use strict";r.d(t,"a",(function(){return o}));var i,e=r(6),u=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),o=function(n){function t(t){var r=n.call(this,t)||this;return r.g=16,r.O=t,t&&"number"==typeof t.blockSize&&(r.g=t.blockSize),r.reset(t?t.data:void 0,t?t.nBytes:void 0),r}return u(t,n),Object.defineProperty(t.prototype,"blockSize",{get:function(){return this.g},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,r){n.prototype.reset.call(this,t,r),this.I()},t.prototype.update=function(n){return this.S(n),this.U(),this},t.prototype.finalize=function(n){return n&&this.S(n),this.N()},t.prototype.I=function(){throw new Error("Not implemented")},t.prototype.N=function(){throw new Error("Not implemented")},t}(e.a)},function(n,t,r){"use strict";r.d(t,"a",(function(){return e}));var i=r(10),e=function(){function n(n){this.formatter=i.a,n&&(this.cipherText=n.cipherText,this.key=n.key,this.iv=n.iv,this.salt=n.salt,this.Algorithm=n.Algorithm,this.mode=n.mode,this.padding=n.padding,this.blockSize=n.blockSize,this.formatter=n.formatter||i.a)}return n.prototype.toString=function(n){return(n||this.formatter).stringify(this)},n}()},function(n,t,r){"use strict";r.d(t,"a",(function(){return o}));var i=r(9),e=r(1),u=r(14),o={stringify:function(n){var t=n.cipherText,r=n.salt;return t?r?new e.a([1398893684,1701076831]).concat(r).concat(t).toString(u.a):t.toString(u.a):""},parse:function(n){var t,r=u.a.parse(n),o=r.words;return 1398893684===o[0]&&1701076831===o[1]&&(t=new e.a(o.slice(2,4)),o.splice(0,4),r.nSigBytes-=16),new i.a({cipherText:r,salt:t})}}},,,function(n,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(n){"object"==typeof window&&(r=window)}n.exports=r},function(n,t,r){"use strict";r.d(t,"a",(function(){return f}));for(var i=r(1),e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",u=[],o=0;o<e.length;o++)u[e.charCodeAt(o)]=o;var f={stringify:function(n){var t=n.words,r=n.nSigBytes;n.clamp();for(var i=[],u=0;u<r;u+=3)for(var o=(t[u>>>2]>>>24-u%4*8&255)<<16|(t[u+1>>>2]>>>24-(u+1)%4*8&255)<<8|t[u+2>>>2]>>>24-(u+2)%4*8&255,f=0;f<4&&u+.75*f<r;f++)i.push(e.charAt(o>>>6*(3-f)&63));var c=e.charAt(64);if(c)for(;i.length%4;)i.push(c);return i.join("")},parse:function(n){var t=n.length,r=e.charAt(64);if(r){var o=n.indexOf(r);-1!==o&&(t=o)}for(var f=[],c=0,s=0;s<t;s++)if(s%4){var a=u[n.charCodeAt(s-1)]<<s%4*2|u[n.charCodeAt(s)]>>>6-s%4*2;f[c>>>2]|=a<<24-c%4*8,c++}return new i.a(f,c)}}},function(n,t,r){"use strict";r.r(t),r.d(t,"Hmac",(function(){return e}));var i=r(4),e=function(){function n(n,t){this.B=n,"string"==typeof t&&(t=i.a.parse(t));var r=n.blockSize,e=4*r;t.nSigBytes>e&&(t=n.finalize(t)),t.clamp();for(var u=this.F=t.clone(),o=this.k=t.clone(),f=u.words,c=o.words,s=0;s<r;s++)f[s]^=1549556828,c[s]^=909522486;o.nSigBytes=e,u.nSigBytes=e,this.reset()}return n.prototype.reset=function(){this.B.reset(),this.B.update(this.k)},n.prototype.update=function(n){return this.B.update(n),this},n.prototype.finalize=function(n){var t=this.B.finalize(n);return this.B.reset(),this.B.finalize(this.F.clone().concat(t))},n}()},function(n,t,r){"use strict";r.r(t),r.d(t,"MD5",(function(){return v}));var i,e=r(1),u=r(8),o=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),f=[];function c(n,t,r,i,e,u,o){var f=n+(t&r|~t&i)+e+o;return(f<<u|f>>>32-u)+t}function s(n,t,r,i,e,u,o){var f=n+(t&i|r&~i)+e+o;return(f<<u|f>>>32-u)+t}function a(n,t,r,i,e,u,o){var f=n+(t^r^i)+e+o;return(f<<u|f>>>32-u)+t}function h(n,t,r,i,e,u,o){var f=n+(r^(t|~i))+e+o;return(f<<u|f>>>32-u)+t}!function(){for(var n=0;n<64;n++)f[n]=4294967296*Math.abs(Math.sin(n+1))|0}();var v=function(n){function t(t){var r=n.call(this,t)||this;return r.H=new e.a([1732584193,4023233417,2562383102,271733878]),t&&void 0!==t.hash&&(r.H=t.hash.clone()),r}return o(t,n),t.prototype.I=function(){this.H=new e.a([1732584193,4023233417,2562383102,271733878])},t.prototype.M=function(n,t){for(var r=0;r<16;r++){var i=t+r,e=n[i];n[i]=16711935&(e<<8|e>>>24)|4278255360&(e<<24|e>>>8)}var u=this.H.words,o=n[t],v=n[t+1],w=n[t+2],b=n[t+3],l=n[t+4],y=n[t+5],d=n[t+6],p=n[t+7],m=n[t+8],j=n[t+9],g=n[t+10],O=n[t+11],A=n[t+12],_=n[t+13],S=n[t+14],U=n[t+15],E=u[0],M=u[1],I=u[2],N=u[3];E=c(E,M,I,N,o,7,f[0]),N=c(N,E,M,I,v,12,f[1]),I=c(I,N,E,M,w,17,f[2]),M=c(M,I,N,E,b,22,f[3]),E=c(E,M,I,N,l,7,f[4]),N=c(N,E,M,I,y,12,f[5]),I=c(I,N,E,M,d,17,f[6]),M=c(M,I,N,E,p,22,f[7]),E=c(E,M,I,N,m,7,f[8]),N=c(N,E,M,I,j,12,f[9]),I=c(I,N,E,M,g,17,f[10]),M=c(M,I,N,E,O,22,f[11]),E=c(E,M,I,N,A,7,f[12]),N=c(N,E,M,I,_,12,f[13]),I=c(I,N,E,M,S,17,f[14]),E=s(E,M=c(M,I,N,E,U,22,f[15]),I,N,v,5,f[16]),N=s(N,E,M,I,d,9,f[17]),I=s(I,N,E,M,O,14,f[18]),M=s(M,I,N,E,o,20,f[19]),E=s(E,M,I,N,y,5,f[20]),N=s(N,E,M,I,g,9,f[21]),I=s(I,N,E,M,U,14,f[22]),M=s(M,I,N,E,l,20,f[23]),E=s(E,M,I,N,j,5,f[24]),N=s(N,E,M,I,S,9,f[25]),I=s(I,N,E,M,b,14,f[26]),M=s(M,I,N,E,m,20,f[27]),E=s(E,M,I,N,_,5,f[28]),N=s(N,E,M,I,w,9,f[29]),I=s(I,N,E,M,p,14,f[30]),E=a(E,M=s(M,I,N,E,A,20,f[31]),I,N,y,4,f[32]),N=a(N,E,M,I,m,11,f[33]),I=a(I,N,E,M,O,16,f[34]),M=a(M,I,N,E,S,23,f[35]),E=a(E,M,I,N,v,4,f[36]),N=a(N,E,M,I,l,11,f[37]),I=a(I,N,E,M,p,16,f[38]),M=a(M,I,N,E,g,23,f[39]),E=a(E,M,I,N,_,4,f[40]),N=a(N,E,M,I,o,11,f[41]),I=a(I,N,E,M,b,16,f[42]),M=a(M,I,N,E,d,23,f[43]),E=a(E,M,I,N,j,4,f[44]),N=a(N,E,M,I,A,11,f[45]),I=a(I,N,E,M,U,16,f[46]),E=h(E,M=a(M,I,N,E,w,23,f[47]),I,N,o,6,f[48]),N=h(N,E,M,I,p,10,f[49]),I=h(I,N,E,M,S,15,f[50]),M=h(M,I,N,E,y,21,f[51]),E=h(E,M,I,N,A,6,f[52]),N=h(N,E,M,I,b,10,f[53]),I=h(I,N,E,M,g,15,f[54]),M=h(M,I,N,E,v,21,f[55]),E=h(E,M,I,N,m,6,f[56]),N=h(N,E,M,I,U,10,f[57]),I=h(I,N,E,M,d,15,f[58]),M=h(M,I,N,E,_,21,f[59]),E=h(E,M,I,N,l,6,f[60]),N=h(N,E,M,I,O,10,f[61]),I=h(I,N,E,M,w,15,f[62]),M=h(M,I,N,E,j,21,f[63]),u[0]=u[0]+E|0,u[1]=u[1]+M|0,u[2]=u[2]+I|0,u[3]=u[3]+N|0},t.prototype.N=function(){var n=this.A,t=n.words,r=8*this._,i=8*n.nSigBytes;t[i>>>5]|=128<<24-i%32;var e=Math.floor(r/4294967296),u=r;t[15+(i+64>>>9<<4)]=16711935&(e<<8|e>>>24)|4278255360&(e<<24|e>>>8),t[14+(i+64>>>9<<4)]=16711935&(u<<8|u>>>24)|4278255360&(u<<24|u>>>8),n.nSigBytes=4*(t.length+1),this.U();for(var o=this.H,f=o.words,c=0;c<4;c++){var s=f[c];f[c]=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8)}return o},t.prototype.clone=function(){return new t({hash:this.H,blockSize:this.g,data:this.A,nBytes:this._})},t.hash=function(n){return(new t).finalize(n)},t}(u.a)},function(n,t,r){"use strict";r.d(t,"a",(function(){return f}));var i=r(1),e=r(9),u=r(18),o=function(){return(o=Object.assign||function(n){for(var t,r=1,i=arguments.length;r<i;r++)for(var e in t=arguments[r])Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n}).apply(this,arguments)},f={execute:function(n,t,r,f,c){f||(f=i.a.random(8));var s=c&&c.kdfModule||u.a,a=c?{Hasher:c.kdfHasher,iterations:c.kdfIterations}:{},h=s.getKey(n,f,o(o({},a),{keySize:t+r})),v=new i.a(h.words.slice(t),4*r);return h.nSigBytes=4*t,new e.a({key:h,iv:v,salt:f})}}},function(n,t,r){"use strict";r.d(t,"a",(function(){return c}));var i,e=r(16),u=r(1),o=r(19),f=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),c=function(n){function t(t){var r=n.call(this,t)||this;return r.C=4,r.D=e.MD5,r.K=1,t&&(r.C=void 0!==t.keySize?t.keySize:r.C,r.D=void 0!==t.Hasher?t.Hasher:r.D,r.K=void 0!==t.iterations?t.iterations:r.K),r}return f(t,n),t.prototype.compute=function(n,t){for(var r,i=new this.D,e=new u.a,o=e.words,f=this.C,c=this.K;o.length<f;){r&&i.update(r),r=i.update(n).finalize(t),i.reset();for(var s=1;s<c;s++)r=i.finalize(r),i.reset();e.concat(r)}return e.nSigBytes=4*f,e},t.getKey=function(n,r,i){return new t(i).compute(n,r)},t}(o.a)},function(n,t,r){"use strict";r.d(t,"a",(function(){return i}));var i=function(){function n(n){this.O=n}return n.prototype.compute=function(n,t){throw new Error("Not implemented")},n.getKey=function(n,t,r){throw new Error("Not implemented")},n}()},,,,,function(n,t,r){"use strict";r.r(t),r.d(t,"random",(function(){return e.a})),r.d(t,"Word32Array",(function(){return u.a})),r.d(t,"Word64",(function(){return o.a})),r.d(t,"Word64Array",(function(){return o.b})),r.d(t,"isIE",(function(){return s})),r.d(t,"Base64",(function(){return a.a})),r.d(t,"Utf8",(function(){return h.a})),r.d(t,"Latin1",(function(){return v.a})),r.d(t,"Hex",(function(){return w.a})),r.d(t,"Utf16BE",(function(){return b})),r.d(t,"Utf16LE",(function(){return d})),r.d(t,"Utf16",(function(){return p})),r.d(t,"OpenSSLKDF",(function(){return m.a})),r.d(t,"PBKDF2",(function(){return _})),r.d(t,"EvpKDF",(function(){return S.a}));var i,e=r(7),u=r(1),o=r(0),f="undefined"!=typeof navigator&&navigator.userAgent?navigator.userAgent.toLowerCase():"",c=(i=parseInt((/msie (\d+)/.exec(f)||[])[1],10),isNaN(i)?(i=parseInt((/trident\/.*; rv:(\d+)/.exec(f)||[])[1],10),!isNaN(i)&&i):i);function s(n,t){return!1!==c&&(!t||("<"===n?c<t:"<="===n?c<=t:">"===n?c>t:">="===n?c>=t:c===t))}var a=r(14),h=r(4),v=r(3),w=r(2),b={stringify:function(n){for(var t=n.words,r=n.nSigBytes,i=[],e=0;e<r;e+=2){var u=t[e>>>2]>>>16-e%4*8&65535;i.push(String.fromCharCode(u))}return i.join("")},parse:function(n){for(var t=n.length,r=[],i=0;i<t;i++)r[i>>>1]|=n.charCodeAt(i)<<16-i%2*16;return new u.a(r,2*t)}};function l(n){return n<<8&4278255360|n>>>8&16711935}var y,d={stringify:function(n){for(var t=n.words,r=n.nSigBytes,i=[],e=0;e<r;e+=2){var u=l(t[e>>>2]>>>16-e%4*8&65535);i.push(String.fromCharCode(u))}return i.join("")},parse:function(n){for(var t=n.length,r=[],i=0;i<t;i++)r[i>>>1]|=l(n.charCodeAt(i)<<16-i%2*16);return new u.a(r,2*t)}},p=b,m=r(17),j=r(29),g=r(15),O=r(19),A=(y=function(n,t){return(y=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}y(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),_=function(n){function t(t){var r=n.call(this,t)||this;return r.C=4,r.D=j.SHA1,r.K=1,t&&(r.C=void 0!==t.keySize?t.keySize:r.C,r.D=void 0!==t.Hasher?t.Hasher:r.D,r.K=void 0!==t.iterations?t.iterations:r.K),r}return A(t,n),t.prototype.compute=function(n,t){for(var r=new g.Hmac(new this.D,n),i=new u.a,e=new u.a([1]),o=i.words,f=e.words,c=this.C,s=this.K;o.length<c;){var a=r.update(t).finalize(e);r.reset();for(var h=a.words,v=h.length,w=a,b=1;b<s;b++){w=r.finalize(w),r.reset();for(var l=w.words,y=0;y<v;y++)h[y]^=l[y]}i.concat(a),f[0]++}return i.nSigBytes=4*c,i},t.getKey=function(n,r,i){return new t(i).compute(n,r)},t}(O.a),S=r(18)},,,,,function(n,t,r){"use strict";r.r(t),r.d(t,"SHA1",(function(){return c}));var i,e=r(8),u=r(1),o=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),f=[],c=function(n){function t(t){var r=n.call(this,t)||this;return r.H=new u.a([1732584193,4023233417,2562383102,271733878,3285377520]),r.O=t,t&&void 0!==t.hash&&(r.H=t.hash.clone()),r}return o(t,n),t.prototype.I=function(){this.H=new u.a([1732584193,4023233417,2562383102,271733878,3285377520])},t.prototype.M=function(n,t){for(var r=this.H.words,i=r[0],e=r[1],u=r[2],o=r[3],c=r[4],s=0;s<80;s++){if(s<16)f[s]=0|n[t+s];else{var a=f[s-3]^f[s-8]^f[s-14]^f[s-16];f[s]=a<<1|a>>>31}var h=(i<<5|i>>>27)+c+f[s];h+=s<20?1518500249+(e&u|~e&o):s<40?1859775393+(e^u^o):s<60?(e&u|e&o|u&o)-1894007588:(e^u^o)-899497514,c=o,o=u,u=e<<30|e>>>2,e=i,i=h}r[0]=r[0]+i|0,r[1]=r[1]+e|0,r[2]=r[2]+u|0,r[3]=r[3]+o|0,r[4]=r[4]+c|0},t.prototype.N=function(){var n=this.A.words,t=8*this._,r=8*this.A.nSigBytes;return n[r>>>5]|=128<<24-r%32,n[14+(r+64>>>9<<4)]=Math.floor(t/4294967296),n[15+(r+64>>>9<<4)]=t,this.A.nSigBytes=4*n.length,this.U(),this.H},t.prototype.clone=function(){return new t({hash:this.H,blockSize:this.g,data:this.A,nBytes:this._})},t.hash=function(n,r){return new t(r).finalize(n)},t}(e.a)}])}));