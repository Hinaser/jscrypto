!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.JsCrypto=t():n.JsCrypto=t()}(this,(function(){return(()=>{"use strict";var n={670:(n,t,r)=>{r.d(t,{MD5:()=>v});var i,e=r(354),o=r(868),u=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),f=[];function c(n,t,r,i,e,o,u){var f=n+(t&r|~t&i)+e+u;return(f<<o|f>>>32-o)+t}function a(n,t,r,i,e,o,u){var f=n+(t&i|r&~i)+e+u;return(f<<o|f>>>32-o)+t}function s(n,t,r,i,e,o,u){var f=n+(t^r^i)+e+u;return(f<<o|f>>>32-o)+t}function h(n,t,r,i,e,o,u){var f=n+(r^(t|~i))+e+u;return(f<<o|f>>>32-o)+t}!function(){for(var n=0;n<64;n++)f[n]=4294967296*Math.abs(Math.sin(n+1))|0}();var v=function(n){function t(t){var r=n.call(this,t)||this;return r.u=new e.e([1732584193,4023233417,2562383102,271733878]),t&&void 0!==t.hash&&(r.u=t.hash.clone()),r}return u(t,n),t.prototype.h=function(){this.u=new e.e([1732584193,4023233417,2562383102,271733878])},t.prototype.v=function(n,t){for(var r=0;r<16;r++){var i=t+r,e=n[i];n[i]=16711935&(e<<8|e>>>24)|4278255360&(e<<24|e>>>8)}var o=this.u.words,u=n[t],v=n[t+1],w=n[t+2],b=n[t+3],l=n[t+4],y=n[t+5],d=n[t+6],p=n[t+7],m=n[t+8],j=n[t+9],O=n[t+10],g=n[t+11],_=n[t+12],A=n[t+13],M=n[t+14],E=n[t+15],k=o[0],S=o[1],U=o[2],x=o[3];k=c(k,S,U,x,u,7,f[0]),x=c(x,k,S,U,v,12,f[1]),U=c(U,x,k,S,w,17,f[2]),S=c(S,U,x,k,b,22,f[3]),k=c(k,S,U,x,l,7,f[4]),x=c(x,k,S,U,y,12,f[5]),U=c(U,x,k,S,d,17,f[6]),S=c(S,U,x,k,p,22,f[7]),k=c(k,S,U,x,m,7,f[8]),x=c(x,k,S,U,j,12,f[9]),U=c(U,x,k,S,O,17,f[10]),S=c(S,U,x,k,g,22,f[11]),k=c(k,S,U,x,_,7,f[12]),x=c(x,k,S,U,A,12,f[13]),U=c(U,x,k,S,M,17,f[14]),k=a(k,S=c(S,U,x,k,E,22,f[15]),U,x,v,5,f[16]),x=a(x,k,S,U,d,9,f[17]),U=a(U,x,k,S,g,14,f[18]),S=a(S,U,x,k,u,20,f[19]),k=a(k,S,U,x,y,5,f[20]),x=a(x,k,S,U,O,9,f[21]),U=a(U,x,k,S,E,14,f[22]),S=a(S,U,x,k,l,20,f[23]),k=a(k,S,U,x,j,5,f[24]),x=a(x,k,S,U,M,9,f[25]),U=a(U,x,k,S,b,14,f[26]),S=a(S,U,x,k,m,20,f[27]),k=a(k,S,U,x,A,5,f[28]),x=a(x,k,S,U,w,9,f[29]),U=a(U,x,k,S,p,14,f[30]),k=s(k,S=a(S,U,x,k,_,20,f[31]),U,x,y,4,f[32]),x=s(x,k,S,U,m,11,f[33]),U=s(U,x,k,S,g,16,f[34]),S=s(S,U,x,k,M,23,f[35]),k=s(k,S,U,x,v,4,f[36]),x=s(x,k,S,U,l,11,f[37]),U=s(U,x,k,S,p,16,f[38]),S=s(S,U,x,k,O,23,f[39]),k=s(k,S,U,x,A,4,f[40]),x=s(x,k,S,U,u,11,f[41]),U=s(U,x,k,S,b,16,f[42]),S=s(S,U,x,k,d,23,f[43]),k=s(k,S,U,x,j,4,f[44]),x=s(x,k,S,U,_,11,f[45]),U=s(U,x,k,S,E,16,f[46]),k=h(k,S=s(S,U,x,k,w,23,f[47]),U,x,u,6,f[48]),x=h(x,k,S,U,p,10,f[49]),U=h(U,x,k,S,M,15,f[50]),S=h(S,U,x,k,y,21,f[51]),k=h(k,S,U,x,_,6,f[52]),x=h(x,k,S,U,b,10,f[53]),U=h(U,x,k,S,O,15,f[54]),S=h(S,U,x,k,v,21,f[55]),k=h(k,S,U,x,m,6,f[56]),x=h(x,k,S,U,E,10,f[57]),U=h(U,x,k,S,d,15,f[58]),S=h(S,U,x,k,A,21,f[59]),k=h(k,S,U,x,l,6,f[60]),x=h(x,k,S,U,g,10,f[61]),U=h(U,x,k,S,w,15,f[62]),S=h(S,U,x,k,j,21,f[63]),o[0]=o[0]+k|0,o[1]=o[1]+S|0,o[2]=o[2]+U|0,o[3]=o[3]+x|0},t.prototype.l=function(){var n=this.O,t=n.words,r=8*this.A,i=8*n.nSigBytes;t[i>>>5]|=128<<24-i%32;var e=Math.floor(r/4294967296),o=r;t[15+(i+64>>>9<<4)]=16711935&(e<<8|e>>>24)|4278255360&(e<<24|e>>>8),t[14+(i+64>>>9<<4)]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),n.nSigBytes=4*(t.length+1),this.k();for(var u=this.u,f=u.words,c=0;c<4;c++){var a=f[c];f[c]=16711935&(a<<8|a>>>24)|4278255360&(a<<24|a>>>8)}return u},t.prototype.clone=function(){return new t({hash:this.u,blockSize:this.U,data:this.O,nBytes:this.A})},t.hash=function(n){return(new t).finalize(n)},t}(o.P)},354:(n,t,r)=>{r.d(t,{e:()=>o});var i=r(720),e=r(54),o=function(){function n(n,t){if(Array.isArray(n)||!n)return this.N=Array.isArray(n)?n:[],void(this.I="number"==typeof t?t:4*this.N.length);var r;if(n instanceof ArrayBuffer)r=new Uint8Array(n);else{if(!(n instanceof Uint8Array||n instanceof Int8Array||n instanceof Uint8ClampedArray||n instanceof Int16Array||n instanceof Uint16Array||n instanceof Int32Array||n instanceof Uint32Array||n instanceof Float32Array||n instanceof Float64Array))throw new Error("Invalid argument");r=new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}if(!r)return this.N=[],void(this.I=0);for(var i=r.byteLength,e=[],o=0;o<i;o++)e[o>>>2]|=r[o]<<24-o%4*8;this.N=e,this.I=i}return Object.defineProperty(n.prototype,"nSigBytes",{get:function(){return this.I},set:function(n){this.I=n},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"words",{get:function(){return this.N},enumerable:!1,configurable:!0}),n.prototype.toString=function(n){return n?n.stringify(this):i.p.stringify(this)},n.prototype.toUint8Array=function(){for(var n=this.N,t=this.I,r=new Uint8Array(t),i=0;i<t;i++)r[i]=n[i>>>2]>>>24-i%4*8&255;return r},n.prototype.concat=function(n){var t=n.words.slice(),r=n.nSigBytes;if(this.clamp(),this.I%4)for(var i=0;i<r;i++){var e=t[i>>>2]>>>24-i%4*8&255;this.N[this.I+i>>>2]|=e<<24-(this.I+i)%4*8}else for(i=0;i<r;i+=4)this.N[this.I+i>>>2]=t[i>>>2];return this.I+=r,this},n.prototype.clamp=function(){var n=this.I;this.N[n>>>2]&=4294967295<<32-n%4*8,this.N.length=Math.ceil(n/4)},n.prototype.clone=function(){return new n(this.N.slice(),this.I)},n.random=function(t){for(var r=[],i=0;i<t;i+=4)r.push((0,e.M)());return new n(r,t)},n}()},211:(n,t,r)=>{r.d(t,{C:()=>o});var i=r(354),e=r(768),o=function(){function n(n){this.T=0,this.U=0,this.F=n,this.O=n&&void 0!==n.data?n.data.clone():new i.e,this.A=n&&"number"==typeof n.nBytes?n.nBytes:0}return Object.defineProperty(n.prototype,"blockSize",{get:function(){return this.U},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,t){this.O=void 0!==n?n.clone():new i.e,this.A="number"==typeof t?t:0},n.prototype.B=function(n){var t="string"==typeof n?e.d.parse(n):n;this.O.concat(t),this.A+=t.nSigBytes},n.prototype.k=function(n){var t,r=this.O.words,e=this.O.nSigBytes,o=this.U,u=e/(4*this.U),f=(u=n?Math.ceil(u):Math.max((0|u)-this.T,0))*o,c=Math.min(4*f,e);if(f){for(var a=0;a<f;a+=o)this.v(r,a);t=r.splice(0,f),this.O.nSigBytes-=c}return new i.e(t,c)},n.prototype.v=function(n,t){throw new Error("Not implemented")},n}()},868:(n,t,r)=>{r.d(t,{P:()=>u});var i,e=r(211),o=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),u=function(n){function t(t){var r=n.call(this,t)||this;return r.U=16,r.F=t,t&&"number"==typeof t.blockSize&&(r.U=t.blockSize),r.reset(t?t.data:void 0,t?t.nBytes:void 0),r}return o(t,n),Object.defineProperty(t.prototype,"blockSize",{get:function(){return this.U},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,r){n.prototype.reset.call(this,t,r),this.h()},t.prototype.update=function(n){return this.B(n),this.k(),this},t.prototype.finalize=function(n){return n&&this.B(n),this.l()},t.prototype.h=function(){throw new Error("Not implemented")},t.prototype.l=function(){throw new Error("Not implemented")},t}(e.C)},456:(n,t,r)=>{r.d(t,{t:()=>f});var i,e=r(211),o=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),u=function(){return(u=Object.assign||function(n){for(var t,r=1,i=arguments.length;r<i;r++)for(var e in t=arguments[r])Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n}).apply(this,arguments)},f=function(n){function t(t){var r=n.call(this,t)||this;return r.R=1,r.F=t,r.H=t.key,r.G=void 0!==t.iv?t.iv:r.G,r.R=void 0!==t.transformMode?t.transformMode:r.R,r}return o(t,n),Object.defineProperty(t.prototype,"iv",{get:function(){return this.G},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,r){n.prototype.reset.call(this,t,r),this.h()},t.prototype.process=function(n){return this.B(n),this.k()},t.prototype.finalize=function(n){return n&&this.B(n),this.l()},t.prototype.h=function(){throw new Error("Not implemented")},t.prototype.v=function(n,t){throw new Error("Not implemented")},t.prototype.l=function(){throw new Error("Not implemented")},t.createEncryptor=function(n,r){return new t(u(u({},r=void 0===r?{}:r),{key:n,transformMode:t.ENC_TRANSFORM_MODE}))},t.createDecryptor=function(n,r){return new t(u(u({},r=void 0===r?{}:r),{key:n,transformMode:t.DEC_TRANSFORM_MODE}))},t.ENC_TRANSFORM_MODE=1,t.DEC_TRANSFORM_MODE=2,t.keySize=4,t.ivSize=4,t}(e.C)},505:(n,t,r)=>{r.d(t,{Q:()=>e});var i=r(232),e=function(){function n(n){this.formatter=i.w,n&&(this.cipherText=n.cipherText,this.key=n.key,this.iv=n.iv,this.salt=n.salt,this.Algorithm=n.Algorithm,this.mode=n.mode,this.padding=n.padding,this.blockSize=n.blockSize,this.formatter=n.formatter||i.w)}return n.prototype.toString=function(n){return(n||this.formatter).stringify(this)},n}()},693:(n,t,r)=>{r.d(t,{E:()=>c});var i=r(109),e=r(214),o=r(505),u=r(232),f=function(){return(f=Object.assign||function(n){for(var t,r=1,i=arguments.length;r<i;r++)for(var e in t=arguments[r])Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n}).apply(this,arguments)},c={encrypt:function(n,t,r,u){var c=u?f({},u):{},a=u&&u.KDF?u.KDF:e.s,s={};u&&u.kdfHasher&&(s.kdfHasher=u.kdfHasher),u&&u.kdfIterations&&(s.kdfIterations=u.kdfIterations),u&&u.kdfModule&&(s.kdfModule=u.kdfModule);var h=a.execute(r,n.keySize,n.ivSize,c.salt,s);c.iv=h.iv;var v=i.D.encrypt(n,t,h.key,c);return new o.Q(f(f({},v),{key:h.key,iv:h.iv,salt:h.salt}))},decrypt:function(n,t,r,o){var c=o?f({},o):{},a=c.KDF?c.KDF:e.s,s=c.formatter?c.formatter:u.w,h=(0,i.W)(t,s),v={};o&&o.kdfHasher&&(v.kdfHasher=o.kdfHasher),o&&o.kdfIterations&&(v.kdfIterations=o.kdfIterations),o&&o.kdfModule&&(v.kdfModule=o.kdfModule);var w=a.execute(r,n.keySize,n.ivSize,h.salt,v);return c.iv=w.iv,i.D.decrypt(n,h,w.key,c)}}},109:(n,t,r)=>{r.d(t,{W:()=>o,D:()=>u});var i=r(232),e=r(505);function o(n,t){return"string"==typeof n?t.parse(n):n}var u={encrypt:function(n,t,r,o){var u=n.createEncryptor(r,o),f=u.finalize(t);return new e.Q({cipherText:f,key:r,iv:u.iv,Algorithm:n,mode:u.mode,padding:u.padding,blockSize:u.blockSize,formatter:(null==o?void 0:o.formatter)||i.w})},decrypt:function(n,t,r,e){var u=n.createDecryptor(r,e),f=o(t,(null==e?void 0:e.formatter)||i.w);return u.finalize(f.cipherText||"")}}},30:(n,t,r)=>{r.d(t,{q:()=>u});var i,e=r(456),o=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),u=function(n){function t(t){var r=n.call(this,t)||this;return r.U=1,r}return o(t,n),t.prototype.l=function(){return this.k(!0)},t}(e.t)},232:(n,t,r)=>{r.d(t,{w:()=>u});var i=r(505),e=r(354),o=r(773),u={stringify:function(n){var t=n.cipherText,r=n.salt;return t?r?new e.e([1398893684,1701076831]).concat(r).concat(t).toString(o.D):t.toString(o.D):""},parse:function(n){var t,r=o.D.parse(n),u=r.words;return 1398893684===u[0]&&1701076831===u[1]&&(t=new e.e(u.slice(2,4)),u.splice(0,4),r.nSigBytes-=16),new i.Q({cipherText:r,salt:t})}}},214:(n,t,r)=>{r.d(t,{s:()=>f});var i=r(354),e=r(505),o=r(471),u=function(){return(u=Object.assign||function(n){for(var t,r=1,i=arguments.length;r<i;r++)for(var e in t=arguments[r])Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n}).apply(this,arguments)},f={execute:function(n,t,r,f,c){f||(f=i.e.random(8));var a=c&&c.kdfModule||o.f,s=c?{Hasher:c.kdfHasher,iterations:c.kdfIterations}:{},h=a.getKey(n,f,u(u({},s),{keySize:t+r})),v=new i.e(h.words.slice(t),4*r);return h.nSigBytes=4*t,new e.Q({key:h,iv:v,salt:f})}}},471:(n,t,r)=>{r.d(t,{f:()=>c});var i,e=r(670),o=r(354),u=r(541),f=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),c=function(n){function t(t){var r=n.call(this,t)||this;return r.J=4,r.K=e.MD5,r.L=1,t&&(r.J=void 0!==t.keySize?t.keySize:r.J,r.K=void 0!==t.Hasher?t.Hasher:r.K,r.L=void 0!==t.iterations?t.iterations:r.L),r}return f(t,n),t.prototype.compute=function(n,t){for(var r,i=new this.K,e=new o.e,u=e.words,f=this.J,c=this.L;u.length<f;){r&&i.update(r),r=i.update(n).finalize(t),i.reset();for(var a=1;a<c;a++)r=i.finalize(r),i.reset();e.concat(r)}return e.nSigBytes=4*f,e},t.getKey=function(n,r,i){return new t(i).compute(n,r)},t}(u._)},541:(n,t,r)=>{r.d(t,{_:()=>i});var i=function(){function n(n){this.F=n}return n.prototype.compute=function(n,t){throw new Error("Not implemented")},n.getKey=function(n,t,r){throw new Error("Not implemented")},n}()},773:(n,t,r)=>{r.d(t,{D:()=>f});for(var i=r(354),e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",o=[],u=0;u<e.length;u++)o[e.charCodeAt(u)]=u;var f={stringify:function(n){var t=n.words,r=n.nSigBytes;n.clamp();for(var i=[],o=0;o<r;o+=3)for(var u=(t[o>>>2]>>>24-o%4*8&255)<<16|(t[o+1>>>2]>>>24-(o+1)%4*8&255)<<8|t[o+2>>>2]>>>24-(o+2)%4*8&255,f=0;f<4&&o+.75*f<r;f++)i.push(e.charAt(u>>>6*(3-f)&63));var c=e.charAt(64);if(c)for(;i.length%4;)i.push(c);return i.join("")},parse:function(n){var t=n.length,r=e.charAt(64);if(r){var u=n.indexOf(r);-1!==u&&(t=u)}for(var f=[],c=0,a=0;a<t;a++)if(a%4){var s=o[n.charCodeAt(a-1)]<<a%4*2|o[n.charCodeAt(a)]>>>6-a%4*2;f[c>>>2]|=s<<24-c%4*8,c++}return new i.e(f,c)}}},720:(n,t,r)=>{r.d(t,{p:()=>e});var i=r(354),e={stringify:function(n){for(var t=n.nSigBytes,r=n.words,i=[],e=0;e<t;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(n){var t=n.length;if(t%2!=0)throw new Error("Hex string count must be even");for(var r=[],e=0;e<t;e+=2)r[e>>>3]|=parseInt(n.substr(e,2),16)<<24-e%8*4;return new i.e(r,t/2)}}},702:(n,t,r)=>{r.d(t,{m:()=>e});var i=r(354),e={stringify:function(n){for(var t=n.nSigBytes,r=n.words,i=[],e=0;e<t;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(n){for(var t=n.length,r=[],e=0;e<t;e++)r[e>>>2]|=(255&n.charCodeAt(e))<<24-e%4*8;return new i.e(r,t)}}},768:(n,t,r)=>{r.d(t,{d:()=>e});var i=r(702),e={stringify:function(n){try{return decodeURIComponent(escape(i.m.stringify(n)))}catch(n){throw new Error("Malformed UTF-8 data")}},parse:function(n){return i.m.parse(unescape(encodeURIComponent(n)))}}},54:(n,t,r)=>{r.d(t,{M:()=>i});var i=function(){if("undefined"!=typeof window){var n=window.crypto||window.msCrypto;if(!n)throw new Error("Crypto module not found");return function(){return n.getRandomValues(new Uint32Array(1))[0]}}return void 0!==r.g&&r.g.crypto?function(){return r.g.crypto.randomBytes(4).readInt32LE()}:function(){var n="crypt";return n+=String.fromCharCode(111),require(n).randomBytes(4).readInt32LE()}}()}},t={};function r(i){var e=t[i];if(void 0!==e)return e.exports;var o=t[i]={exports:{}};return n[i](o,o.exports,r),o.exports}r.d=(n,t)=>{for(var i in t)r.o(t,i)&&!r.o(n,i)&&Object.defineProperty(n,i,{enumerable:!0,get:t[i]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),r.o=(n,t)=>Object.prototype.hasOwnProperty.call(n,t),r.r=n=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"V",{value:!0})};var i={};return(()=>{r.r(i),r.d(i,{RC4:()=>c});var n,t=r(30),e=r(693),o=r(109),u=(n=function(t,r){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(t,r)},function(t,r){function i(){this.constructor=t}n(t,r),t.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}),f=function(){return(f=Object.assign||function(n){for(var t,r=1,i=arguments.length;r<i;r++)for(var e in t=arguments[r])Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n}).apply(this,arguments)},c=function(n){function t(t){var r=n.call(this,t)||this;return r.S=[],r.i=0,r.j=0,r.F=t,r.h(),r}return u(t,n),t.prototype.h=function(){var n=this.H,t=n.words,r=n.nSigBytes;this.S=[];for(var i=0;i<256;i++)this.S[i]=i;i=0;for(var e=0;i<256;i++){var o=i%r,u=t[o>>>2]>>>24-o%4*8&255;e=(e+this.S[i]+u)%256;var f=this.S[i];this.S[i]=this.S[e],this.S[e]=f}this.i=this.j=0},t.prototype.v=function(n,t){n[t]^=this.generateKeyStreamWord()},t.prototype.generateKeyStreamWord=function(){for(var n=this.S,t=this.i,r=this.j,i=0,e=0;e<4;e++){r=(r+n[t=(t+1)%256])%256;var o=n[t];n[t]=n[r],n[r]=o,i|=n[(n[t]+n[r])%256]<<24-8*e}return this.i=t,this.j=r,i},t.createEncryptor=function(n,r){return new t(f(f({},r=void 0===r?{}:r),{key:n}))},t.createDecryptor=function(n,r){return new t(f(f({},r=void 0===r?{}:r),{key:n}))},t.encrypt=function(n,r,i){return"string"==typeof r?e.E.encrypt(t,n,r,i):o.D.encrypt(t,n,r,i)},t.decrypt=function(n,r,i){return"string"==typeof r?e.E.decrypt(t,n,r,i):o.D.decrypt(t,n,r,i)},t.ivSize=0,t.keySize=8,t}(t.q)})(),i})()}));