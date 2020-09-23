!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.JsCrypto=n():t.JsCrypto=n()}(this,(function(){return function(t){var n={};function r(i){if(n[i])return n[i].exports;var e=n[i]={i:i,l:!1,exports:{}};return t[i].call(e.exports,e,e.exports,r),e.l=!0,e.exports}return r.m=t,r.c=n,r.d=function(t,n,i){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:i})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"u",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.u)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var e in t)r.d(i,e,function(n){return t[n]}.bind(null,e));return i},r.n=function(t){var n=t&&t.u?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="",r(r.s=22)}([,function(t,n,r){"use strict";r.d(n,"a",(function(){return o}));var i=r(3),e=r(5),o=function(){function t(t,n){this.h=t||[],this.v="number"==typeof n?n:4*this.h.length}return t.prototype.raw=function(){return this.h},t.prototype.slice=function(t,n){return this.h.slice(t,n)},t.prototype.length=function(){return this.v},t.prototype.setSignificantBytes=function(t){this.v=t},t.prototype.toString=function(t){return t?t.stringify(this):i.a.stringify(this)},t.prototype.concat=function(t){var n=t.slice(),r=t.length();if(this.clamp(),this.v%4)for(var i=0;i<r;i++){var e=n[i>>>2]>>>24-i%4*8&255;this.h[this.v+i>>>2]|=e<<24-(this.v+i)%4*8}else for(i=0;i<r;i+=4)this.h[this.v+i>>>2]=n[i>>>2];return this.v+=r,this},t.prototype.clamp=function(){var t=this.v;this.h[t>>>2]&=4294967295<<32-t%4*8,this.h.length=Math.ceil(t/4)},t.prototype.clone=function(){return new t(this.h.slice(),this.v)},t.random=function(n){for(var r=[],i=0;i<n;i++)r.push(Object(e.a)());return new t(r,n)},t}()},function(t,n,r){"use strict";r.d(n,"a",(function(){return e}));var i=r(1),e={stringify:function(t){for(var n=t.length(),r=t.raw(),i=[],e=0;e<n;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(t){for(var n=t.length,r=[],e=0;e<n;e++)r[e>>>2]|=(255&t.charCodeAt(e))<<24-e%4*8;return new i.a(r,n)}}},function(t,n,r){"use strict";r.d(n,"a",(function(){return e}));var i=r(1),e={stringify:function(t){for(var n=t.length(),r=t.raw(),i=[],e=0;e<n;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(t){for(var n=t.length,r=[],e=0;e<n;e+=2)r[e>>>3]|=parseInt(t.substr(e,2),16)<<24-e%8*4;return new i.a(r,n/2)}}},function(t,n,r){"use strict";r.d(n,"a",(function(){return e}));var i=r(2),e={stringify:function(t){try{return decodeURIComponent(escape(i.a.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return i.a.parse(unescape(encodeURIComponent(t)))}}},function(t,n,r){"use strict";(function(t){r.d(n,"a",(function(){return i}));var i=function(){if("undefined"!=typeof window){var n=window.crypto||window.msCrypto;if(!n)throw new Error("Crypto module not found");return function(){return n.getRandomValues(new Uint32Array(1))[0]}}return void 0!==t&&t.crypto?function(){return t.crypto.randomBytes(4).readInt32LE()}:function(){return require("crypto").randomBytes(4).readInt32LE()}}()}).call(this,r(8))},function(t,n,r){"use strict";r.d(n,"a",(function(){return u}));var i,e=r(7),o=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),u=function(t){function n(n){var r=t.call(this,n)||this;return r.j=16,r.O=n,n&&"number"==typeof n.blockSize&&(r.j=n.blockSize),r.reset(n?n.data:void 0,n?n.nBytes:void 0),r}return o(n,t),Object.defineProperty(n.prototype,"blockSize",{get:function(){return this.j},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,r){t.prototype.reset.call(this,n,r),this.g()},n.prototype.update=function(t){return this._(t),this.M(),this},n.prototype.finalize=function(t){return t&&this._(t),this.k()},n.prototype.g=function(){throw new Error("Not implemented")},n.prototype.k=function(){throw new Error("Not implemented")},n}(e.a)},function(t,n,r){"use strict";r.d(n,"a",(function(){return o}));var i=r(1),e=r(4),o=function(){function t(t){this.N=0,this.j=0,this.O=t,this.S=t&&void 0!==t.data?t.data.clone():new i.a,this.A=t&&"number"==typeof t.nBytes?t.nBytes:0}return Object.defineProperty(t.prototype,"blockSize",{get:function(){return this.j},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,n){this.S=void 0!==t?t.clone():new i.a,this.A="number"==typeof n?n:0},t.prototype._=function(t){var n="string"==typeof t?e.a.parse(t):t;this.S.concat(n),this.A+=n.length()},t.prototype.M=function(t){var n,r=this.S.raw(),e=this.S.length(),o=this.j,u=e/(4*this.j),f=(u=t?Math.ceil(u):Math.max((0|u)-this.N,0))*o,c=Math.min(4*f,e);if(f){for(var s=0;s<f;s+=o)this.I(r,s);n=r.splice(0,f),this.S.setSignificantBytes(this.S.length()-c)}return new i.a(n,c)},t.prototype.I=function(t,n){throw new Error("Not implemented")},t}()},function(t,n){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},,,,function(t,n,r){"use strict";r.r(n),r.d(n,"MD5",(function(){return v}));var i,e=r(1),o=r(6),u=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),f=[];function c(t,n,r,i,e,o,u){var f=t+(n&r|~n&i)+e+u;return(f<<o|f>>>32-o)+n}function s(t,n,r,i,e,o,u){var f=t+(n&i|r&~i)+e+u;return(f<<o|f>>>32-o)+n}function h(t,n,r,i,e,o,u){var f=t+(n^r^i)+e+u;return(f<<o|f>>>32-o)+n}function a(t,n,r,i,e,o,u){var f=t+(r^(n|~i))+e+u;return(f<<o|f>>>32-o)+n}!function(){for(var t=0;t<64;t++)f[t]=4294967296*Math.abs(Math.sin(t+1))|0}();var v=function(t){function n(n){var r=t.call(this,n)||this;return r.U=new e.a([1732584193,4023233417,2562383102,271733878]),n&&void 0!==n.hash&&(r.U=n.hash.clone()),r}return u(n,t),n.prototype.g=function(){this.U=new e.a([1732584193,4023233417,2562383102,271733878])},n.prototype.I=function(t,n){for(var r=0;r<16;r++){var i=n+r,e=t[i];t[i]=16711935&(e<<8|e>>>24)|4278255360&(e<<24|e>>>8)}var o=this.U.raw(),u=t[n],v=t[n+1],d=t[n+2],l=t[n+3],w=t[n+4],b=t[n+5],p=t[n+6],m=t[n+7],y=t[n+8],j=t[n+9],O=t[n+10],g=t[n+11],_=t[n+12],M=t[n+13],E=t[n+14],k=t[n+15],N=o[0],S=o[1],A=o[2],x=o[3];N=c(N,S,A,x,u,7,f[0]),x=c(x,N,S,A,v,12,f[1]),A=c(A,x,N,S,d,17,f[2]),S=c(S,A,x,N,l,22,f[3]),N=c(N,S,A,x,w,7,f[4]),x=c(x,N,S,A,b,12,f[5]),A=c(A,x,N,S,p,17,f[6]),S=c(S,A,x,N,m,22,f[7]),N=c(N,S,A,x,y,7,f[8]),x=c(x,N,S,A,j,12,f[9]),A=c(A,x,N,S,O,17,f[10]),S=c(S,A,x,N,g,22,f[11]),N=c(N,S,A,x,_,7,f[12]),x=c(x,N,S,A,M,12,f[13]),A=c(A,x,N,S,E,17,f[14]),N=s(N,S=c(S,A,x,N,k,22,f[15]),A,x,v,5,f[16]),x=s(x,N,S,A,p,9,f[17]),A=s(A,x,N,S,g,14,f[18]),S=s(S,A,x,N,u,20,f[19]),N=s(N,S,A,x,b,5,f[20]),x=s(x,N,S,A,O,9,f[21]),A=s(A,x,N,S,k,14,f[22]),S=s(S,A,x,N,w,20,f[23]),N=s(N,S,A,x,j,5,f[24]),x=s(x,N,S,A,E,9,f[25]),A=s(A,x,N,S,l,14,f[26]),S=s(S,A,x,N,y,20,f[27]),N=s(N,S,A,x,M,5,f[28]),x=s(x,N,S,A,d,9,f[29]),A=s(A,x,N,S,m,14,f[30]),N=h(N,S=s(S,A,x,N,_,20,f[31]),A,x,b,4,f[32]),x=h(x,N,S,A,y,11,f[33]),A=h(A,x,N,S,g,16,f[34]),S=h(S,A,x,N,E,23,f[35]),N=h(N,S,A,x,v,4,f[36]),x=h(x,N,S,A,w,11,f[37]),A=h(A,x,N,S,m,16,f[38]),S=h(S,A,x,N,O,23,f[39]),N=h(N,S,A,x,M,4,f[40]),x=h(x,N,S,A,u,11,f[41]),A=h(A,x,N,S,l,16,f[42]),S=h(S,A,x,N,p,23,f[43]),N=h(N,S,A,x,j,4,f[44]),x=h(x,N,S,A,_,11,f[45]),A=h(A,x,N,S,k,16,f[46]),N=a(N,S=h(S,A,x,N,d,23,f[47]),A,x,u,6,f[48]),x=a(x,N,S,A,m,10,f[49]),A=a(A,x,N,S,E,15,f[50]),S=a(S,A,x,N,b,21,f[51]),N=a(N,S,A,x,_,6,f[52]),x=a(x,N,S,A,l,10,f[53]),A=a(A,x,N,S,O,15,f[54]),S=a(S,A,x,N,v,21,f[55]),N=a(N,S,A,x,y,6,f[56]),x=a(x,N,S,A,k,10,f[57]),A=a(A,x,N,S,p,15,f[58]),S=a(S,A,x,N,M,21,f[59]),N=a(N,S,A,x,w,6,f[60]),x=a(x,N,S,A,g,10,f[61]),A=a(A,x,N,S,d,15,f[62]),S=a(S,A,x,N,j,21,f[63]),o[0]=o[0]+N|0,o[1]=o[1]+S|0,o[2]=o[2]+A|0,o[3]=o[3]+x|0},n.prototype.k=function(){var t=this.S,n=t.raw(),r=8*this.A,i=8*t.length();n[i>>>5]|=128<<24-i%32;var e=Math.floor(r/4294967296),o=r;n[15+(i+64>>>9<<4)]=16711935&(e<<8|e>>>24)|4278255360&(e<<24|e>>>8),n[14+(i+64>>>9<<4)]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),t.setSignificantBytes(4*(n.length+1)),this.M();for(var u=this.U,f=u.raw(),c=0;c<4;c++){var s=f[c];f[c]=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8)}return u},n.prototype.clone=function(){return new n({hash:this.U,blockSize:this.j,data:this.S,nBytes:this.A})},n.hash=function(t){return(new n).finalize(t)},n}(o.a)},,,,,,,,,,function(t,n,r){"use strict";r.r(n),r.d(n,"AES",(function(){return H}));var i,e=r(7),o=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),u=function(){return(u=Object.assign||function(t){for(var n,r=1,i=arguments.length;r<i;r++)for(var e in n=arguments[r])Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e]);return t}).apply(this,arguments)},f=function(t){function n(n){var r=t.call(this,n)||this;return r.C=1,r.O=n,r.T=n.key,r.F=void 0!==n.iv?n.iv:r.F,r.C=void 0!==n.transformMode?n.transformMode:r.C,r}return o(n,t),n.prototype.reset=function(n,r){t.prototype.reset.call(this,n,r),this.g()},n.prototype.process=function(t){return this._(t),this.M()},n.prototype.finalize=function(t){return t&&this._(t),this.k()},n.prototype.g=function(){throw new Error("Not implemented")},n.prototype.R=function(){throw new Error("Not implemented")},n.prototype.I=function(t,n){throw new Error("Not implemented")},n.prototype.k=function(){throw new Error("Not implemented")},n.prototype.encryptBlock=function(t,n){throw new Error("Not implemented")},n.prototype.decryptBlock=function(t,n){throw new Error("Not implemented")},n.createEncryptor=function(t,r){return new n(u(u({},r=void 0===r?{}:r),{key:t,transformMode:n.ENC_TRANSFORM_MODE}))},n.createDecryptor=function(t,r){return new n(u(u({},r=void 0===r?{}:r),{key:t,transformMode:n.DEC_TRANSFORM_MODE}))},n.ENC_TRANSFORM_MODE=1,n.DEC_TRANSFORM_MODE=2,n.keySize=4,n.ivSize=4,n}(e.a),c=function(){function t(t){this.O=t,this.q=t.cipher,this.F=t.iv}return t.prototype.processBlock=function(t,n){},t.createEncrypter=function(t){throw new Error("Not implemented yet")},t.createDecrypter=function(t){throw new Error("Not implemented yet")},t}(),s=function(){var t=function(n,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(n,r)};return function(n,r){function i(){this.constructor=n}t(n,r),n.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}}(),h=function(t){function n(n){var r=t.call(this,n)||this;return r.B=[],r}return s(n,t),n.prototype.xorBlock=function(t,n,r){var i,e=this.F;e?(i=e,this.F=void 0):i=this.B;for(var o=0;o<r;o++)t[n+o]^=i[o]},n.createEncrypter=function(t){return new n.Encrypter(t)},n.createDecrypter=function(t){return new n.Decrypter(t)},n.Encrypter=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return s(n,t),n.prototype.processBlock=function(t,n){var r=this.q,i=r.blockSize;this.xorBlock(t,n,i),r.encryptBlock(t,n),this.B=t.slice(n,n+i)},n}(n),n.Decrypter=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return s(n,t),n.prototype.processBlock=function(t,n){var r=this.q,i=r.blockSize,e=t.slice(n,n+i);r.decryptBlock(t,n),this.xorBlock(t,n,i),this.B=e},n}(n),n}(c),a=r(1);var v={pad:function(t,n){for(var r=4*n,i=r-t.length()%r,e=i<<24|i<<16|i<<8|i,o=[],u=0;u<i;u+=4)o.push(e);var f=new a.a(o,i);t.concat(f)},unpad:function(t){var n=255&t.raw()[t.length()-1>>>2];t.setSignificantBytes(t.length()-n)}},d=function(){var t=function(n,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(n,r)};return function(n,r){function i(){this.constructor=n}t(n,r),n.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}}(),l=function(){return(l=Object.assign||function(t){for(var n,r=1,i=arguments.length;r<i;r++)for(var e in n=arguments[r])Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e]);return t}).apply(this,arguments)},w=function(t){function n(n){var r=t.call(this,n)||this;return r.j=4,r.D=h,r.G=v,r.O=n,r.D=void 0!==n.mode?n.mode:r.D,r.G=void 0!==n.padding?n.padding:r.G,r.reset(null==n?void 0:n.data,null==n?void 0:n.nBytes),r}return d(n,t),Object.defineProperty(n.prototype,"iv",{get:function(){return this.F},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"mode",{get:function(){return this.H},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"padding",{get:function(){return this.G},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,r){var i;t.prototype.reset.call(this,n,r),this.C===f.ENC_TRANSFORM_MODE?i=this.D.createEncrypter:(i=this.D.createDecrypter,this.N=1),this.D&&this.J===i?this.H=new this.D({cipher:this,iv:this.F&&this.F.raw()}):(this.H=i.call(this.D,{cipher:this,iv:this.F&&this.F.raw()}),this.J=i)},n.prototype.I=function(t,n){var r;null===(r=this.H)||void 0===r||r.processBlock(t,n)},n.prototype.k=function(){var t,n=this.G;return this.C===f.ENC_TRANSFORM_MODE?(n.pad(this.S,this.blockSize),t=this.M(!0)):(t=this.M(!0),n.unpad(t)),t},n.createEncryptor=function(t,r){return new n(l(l({},r=void 0===r?{}:r),{key:t,transformMode:f.ENC_TRANSFORM_MODE}))},n.createDecryptor=function(t,r){return new n(l(l({},r=void 0===r?{}:r),{key:t,transformMode:f.DEC_TRANSFORM_MODE}))},n}(f),b=function(){function t(t){this.formatter=y,t&&(this.cipherText=t.cipherText,this.key=t.key,this.iv=t.iv,this.salt=t.salt,this.Algorithm=t.Algorithm,this.mode=t.mode,this.padding=t.padding,this.blockSize=t.blockSize,this.formatter=t.formatter||y)}return t.prototype.toString=function(t){return(t||this.formatter).stringify(this)},t}(),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",m={stringify:function(t){var n=t.raw(),r=t.length();t.clamp();for(var i=[],e=0;e<r;e+=3)for(var o=(n[e>>>2]>>>24-e%4*8&255)<<16|(n[e+1>>>2]>>>24-(e+1)%4*8&255)<<8|n[e+2>>>2]>>>24-(e+2)%4*8&255,u=0;u<4&&e+.75*u<r;u++)i.push(p.charAt(o>>>6*(3-u)&63));var f=p.charAt(64);if(f)for(;i.length%4;)i.push(f);return i.join("")},parse:function(t){for(var n=t.length,r=[],i=0;i<n;i+=2)r[i>>>3]|=parseInt(t.substr(i,2),16)<<24-i%8*4;return new a.a(r,n/2)}},y={stringify:function(t){var n=t.cipherText,r=t.salt;return n?r?new a.a([1398893684,1701076831]).concat(r).concat(n).toString(m):n.toString(m):""},parse:function(t){var n,r=m.parse(t),i=r.raw();return 1398893684===i[0]&&1701076831===i[1]&&(n=new a.a(i.slice(2,4)),i.splice(0,4),r.setSignificantBytes(r.length()-16)),new b({cipherText:r,salt:n})}};function j(t,n){return"string"==typeof t?n.parse(t):t}var O=function(t,n,r,i){var e=t.createEncryptor(r,i),o=e.finalize(n);return new b({cipherText:o,key:r,iv:e.iv,Algorithm:t,mode:e.mode,padding:e.padding,blockSize:e.blockSize,formatter:(null==i?void 0:i.formatter)||y})},g=function(t,n,r,i){var e=t.createDecryptor(r,i),o=j(n,(null==i?void 0:i.formatter)||y);return e.finalize(o.cipherText||"")},_=r(12),M=function(){function t(t){this.K=4,this.L=_.MD5,this.P=1,this.O=t,t&&(this.K=void 0!==t.keySize?t.keySize:this.K,this.L=void 0!==t.Hasher?t.Hasher:this.L,this.P=void 0!==t.iterations?t.iterations:this.P)}return t.prototype.compute=function(t,n){for(var r,i=new this.L,e=new a.a,o=e.raw(),u=this.K,f=this.P;o.length<u;){r&&i.update(r),r=i.update(t).finalize(n),i.reset();for(var c=1;c<f;c++)r=i.finalize(r),i.reset();e.concat(r)}return e.setSignificantBytes(4*u),e},t.getKey=function(n,r,i){return new t(i).compute(n,r)},t}(),E={execute:function(t,n,r,i){i||(i=a.a.random(8));var e=M.getKey(t,i,{keySize:n+r}),o=new a.a(e.slice(n),4*r);return e.setSignificantBytes(4*n),new b({key:e,iv:o,salt:i})}},k=function(){return(k=Object.assign||function(t){for(var n,r=1,i=arguments.length;r<i;r++)for(var e in n=arguments[r])Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e]);return t}).apply(this,arguments)},N=function(t,n,r,i){var e=i?k({},i):{},o=(i&&i.KDF?i.KDF:E).execute(r,t.keySize,t.ivSize);e.iv=o.iv;var u=O(t,n,o.key,e);return k(k({},u),o)},S=function(t,n,r,i){var e=i?k({},i):{},o=e.KDF?e.KDF:E,u=j(n,e.formatter?e.formatter:y),f=o.execute(r,t.keySize,t.ivSize);return e.iv=f.iv,g(t,u,f.key,i)},A=function(){var t=function(n,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(n,r)};return function(n,r){function i(){this.constructor=n}t(n,r),n.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}}(),x=function(){return(x=Object.assign||function(t){for(var n,r=1,i=arguments.length;r<i;r++)for(var e in n=arguments[r])Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e]);return t}).apply(this,arguments)},z=[],I=[],U=[],C=[],T=[],F=[],R=[],q=[],B=[],D=[];!function(){for(var t=[],n=0;n<256;n++)t[n]=n<128?n<<1:n<<1^283;var r=0,i=0;for(n=0;n<256;n++){var e=i^i<<1^i<<2^i<<3^i<<4;e=e>>>8^255&e^99,z[r]=e,I[e]=r;var o=t[r],u=t[o],f=t[u],c=257*t[e]^16843008*e;U[r]=c<<24|c>>>8,C[r]=c<<16|c>>>16,T[r]=c<<8|c>>>24,F[r]=c,c=16843009*f^65537*u^257*o^16843008*r,R[e]=c<<24|c>>>8,q[e]=c<<16|c>>>16,B[e]=c<<8|c>>>24,D[e]=c,r?(r=o^t[t[t[f^o]]],i^=t[t[i]]):r=i=1}}();var G=[0,1,2,4,8,16,32,64,128,27,54],H=function(t){function n(n){var r=t.call(this,n)||this;return r.V=0,r.W=[],r.X=[],r.O=n,r.g(),r}return A(n,t),n.prototype.g=function(){var t;if(!this.V||this.Y!==this.T){for(var n=this.Y=this.T,r=n.raw(),i=n.length()/4,e=4*((this.V=i+6)+1),o=this.W=[],u=0;u<e;u++)u<i?o[u]=r[u]:(t=o[u-1],u%i?i>6&&u%i==4&&(t=z[t>>>24]<<24|z[t>>>16&255]<<16|z[t>>>8&255]<<8|z[255&t]):(t=z[(t=t<<8|t>>>24)>>>24]<<24|z[t>>>16&255]<<16|z[t>>>8&255]<<8|z[255&t],t^=G[u/i|0]<<24),o[u]=o[u-i]^t);this.X=[];for(var f=0;f<e;f++){u=e-f;t=f%4?o[u]:o[u-4],this.X[f]=f<4||u<=4?t:R[z[t>>>24]]^q[z[t>>>16&255]]^B[z[t>>>8&255]]^D[z[255&t]]}}},n.prototype.encryptBlock=function(t,n){this.Z(t,n,this.W,U,C,T,F,z)},n.prototype.decryptBlock=function(t,n){var r=t[n+1];t[n+1]=t[n+3],t[n+3]=r,this.Z(t,n,this.X,R,q,B,D,I),r=t[n+1],t[n+1]=t[n+3],t[n+3]=r},n.prototype.Z=function(t,n,r,i,e,o,u,f){for(var c=this.V,s=t[n]^r[0],h=t[n+1]^r[1],a=t[n+2]^r[2],v=t[n+3]^r[3],d=4,l=1;l<c;l++){var w=i[s>>>24]^e[h>>>16&255]^o[a>>>8&255]^u[255&v]^r[d++],b=i[h>>>24]^e[a>>>16&255]^o[v>>>8&255]^u[255&s]^r[d++],p=i[a>>>24]^e[v>>>16&255]^o[s>>>8&255]^u[255&h]^r[d++],m=i[v>>>24]^e[s>>>16&255]^o[h>>>8&255]^u[255&a]^r[d++];s=w,h=b,a=p,v=m}var y=(z[s>>>24]<<24|z[h>>>16&255]<<16|z[a>>>8&255]<<8|z[255&v])^r[d++],j=(z[h>>>24]<<24|z[a>>>16&255]<<16|z[v>>>8&255]<<8|z[255&s])^r[d++],O=(z[a>>>24]<<24|z[v>>>16&255]<<16|z[s>>>8&255]<<8|z[255&h])^r[d++],g=(z[v>>>24]<<24|z[s>>>16&255]<<16|z[h>>>8&255]<<8|z[255&a])^r[d++];t[n]=y,t[n+1]=j,t[n+2]=O,t[n+3]=g},n.createEncryptor=function(t,r){return new n(x(x({},r=void 0===r?{}:r),{key:t,transformMode:f.ENC_TRANSFORM_MODE}))},n.createDecrypter=function(t,r){return new n(x(x({},r=void 0===r?{}:r),{key:t,transformMode:f.DEC_TRANSFORM_MODE}))},n.encrypt=function(t,r,i){return"string"==typeof r?N(n,t,r,i):O(n,t,r,i)},n.decrypt=function(t,r,i){return"string"==typeof r?S(n,t,r,i):g(n,t,r,i)},n.keySize=8,n}(w)}])}));