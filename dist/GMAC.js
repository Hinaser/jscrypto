!function(n,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else if("object"==typeof exports)exports.JsCrypto=t();else{var r=t();for(var i in n.JsCrypto=n.JsCrypto||{},r)n.JsCrypto[i]=r[i]}}(this,(function(){return function(){"use strict";var n={9691:function(n,t,r){r.d(t,{AES:function(){return O}});var i,e=r(9456),o=r(787),u=r(5693),f=r(9109),c=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),a=function(){return(a=Object.assign||function(n){for(var t,r=1,i=arguments.length;r<i;r++)for(var e in t=arguments[r])Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n}).apply(this,arguments)},s=[],h=[],v=[],w=[],l=[],d=[],b=[],y=[],p=[],m=[];!function(){for(var n=[],t=0;t<256;t++)n[t]=t<128?t<<1:t<<1^283;var r=0,i=0;for(t=0;t<256;t++){var e=i^i<<1^i<<2^i<<3^i<<4;e=e>>>8^255&e^99,s[r]=e,h[e]=r;var o=n[r],u=n[o],f=n[u],c=257*n[e]^16843008*e;v[r]=c<<24|c>>>8,w[r]=c<<16|c>>>16,l[r]=c<<8|c>>>24,d[r]=c,c=16843009*f^65537*u^257*o^16843008*r,b[e]=c<<24|c>>>8,y[e]=c<<16|c>>>16,p[e]=c<<8|c>>>24,m[e]=c,r?(r=o^n[n[n[f^o]]],i^=n[n[i]]):r=i=1}}();var j=[0,1,2,4,8,16,32,64,128,27,54],O=function(n){function t(t){var r=n.call(this,t)||this;return r.i=0,r.u=[],r.h=[],r.v=t,r.j(),r}return c(t,n),t.prototype.j=function(){var n;if(!this.i||this.O!==this.A){for(var t=this.O=this.A,r=t.words,i=t.nSigBytes/4,e=4*((this.i=i+6)+1),o=this.u=[],u=0;u<e;u++)u<i?o[u]=r[u]:(n=o[u-1],u%i?i>6&&u%i==4&&(n=s[n>>>24]<<24|s[n>>>16&255]<<16|s[n>>>8&255]<<8|s[255&n]):(n=s[(n=n<<8|n>>>24)>>>24]<<24|s[n>>>16&255]<<16|s[n>>>8&255]<<8|s[255&n],n^=j[u/i|0]<<24),o[u]=o[u-i]^n);this.h=[];for(var f=0;f<e;f++){u=e-f;n=f%4?o[u]:o[u-4],this.h[f]=f<4||u<=4?n:b[s[n>>>24]]^y[s[n>>>16&255]]^p[s[n>>>8&255]]^m[s[255&n]]}}},t.prototype.encryptBlock=function(n,t){this.k(n,t,this.u,v,w,l,d,s)},t.prototype.decryptBlock=function(n,t){var r=n[t+1];n[t+1]=n[t+3],n[t+3]=r,this.k(n,t,this.h,b,y,p,m,h),r=n[t+1],n[t+1]=n[t+3],n[t+3]=r},t.prototype.k=function(n,t,r,i,e,o,u,f){for(var c=this.i,a=n[t]^r[0],s=n[t+1]^r[1],h=n[t+2]^r[2],v=n[t+3]^r[3],w=4,l=1;l<c;l++){var d=i[a>>>24]^e[s>>>16&255]^o[h>>>8&255]^u[255&v]^r[w++],b=i[s>>>24]^e[h>>>16&255]^o[v>>>8&255]^u[255&a]^r[w++],y=i[h>>>24]^e[v>>>16&255]^o[a>>>8&255]^u[255&s]^r[w++],p=i[v>>>24]^e[a>>>16&255]^o[s>>>8&255]^u[255&h]^r[w++];a=d,s=b,h=y,v=p}var m=(f[a>>>24]<<24|f[s>>>16&255]<<16|f[h>>>8&255]<<8|f[255&v])^r[w++],j=(f[s>>>24]<<24|f[h>>>16&255]<<16|f[v>>>8&255]<<8|f[255&a])^r[w++],O=(f[h>>>24]<<24|f[v>>>16&255]<<16|f[a>>>8&255]<<8|f[255&s])^r[w++],g=(f[v>>>24]<<24|f[a>>>16&255]<<16|f[s>>>8&255]<<8|f[255&h])^r[w++];n[t]=m,n[t+1]=j,n[t+2]=O,n[t+3]=g},t.createEncryptor=function(n,r){return new t(a(a({},r=void 0===r?{}:r),{key:n,transformMode:e.t.ENC_TRANSFORM_MODE}))},t.createDecryptor=function(n,r){return new t(a(a({},r=void 0===r?{}:r),{key:n,transformMode:e.t.DEC_TRANSFORM_MODE}))},t.encrypt=function(n,r,i){if("string"==typeof r)return u.E.encrypt(t,n,r,i);if(r.nSigBytes%4!=0)throw new Error("Key size must be multiple of 32bit/4byte/1word");return f.D.encrypt(t,n,r,i)},t.decrypt=function(n,r,i){if("string"==typeof r)return u.E.decrypt(t,n,r,i);if(r.nSigBytes%4!=0)throw new Error("Key size must be multiple of 32bit/4byte/1word");return f.D.decrypt(t,n,r,i)},t.keySize=8,t}(o.G)},6367:function(n,t,r){r.d(t,{Hmac:function(){return e}});var i=r(4768),e=function(){function n(n,t){this.N=n,"string"==typeof t&&(t=i.d.parse(t));var r=n.blockSize,e=4*r;t.nSigBytes>e&&(t=n.finalize(t)),t.clamp();for(var o=this.I=t.clone(),u=this.S=t.clone(),f=o.words,c=u.words,a=0;a<r;a++)f[a]^=1549556828,c[a]^=909522486;u.nSigBytes=e,o.nSigBytes=e,this.reset()}return n.prototype.reset=function(){this.N.reset(),this.N.update(this.S)},n.prototype.update=function(n){return this.N.update(n),this},n.prototype.finalize=function(n){var t=this.N.finalize(n);return this.N.reset(),this.N.finalize(this.I.clone().concat(t))},n}()},5561:function(n,t,r){r.d(t,{SHA256:function(){return v}});var i,e=r(1868),o=r(3354),u=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),f=[],c=[];function a(n){for(var t=Math.sqrt(n),r=2;r<=t;r++)if(!(n%r))return!1;return!0}function s(n){return 4294967296*(n-(0|n))|0}!function(){for(var n=2,t=0;t<64;)a(n)&&(t<8&&(f[t]=s(Math.pow(n,.5))),c[t]=s(Math.pow(n,1/3)),t++),n++}();var h=[],v=function(n){function t(t){var r=n.call(this,t)||this;return r.U=new o.e(f.slice(0)),r.v=t,t&&void 0!==t.hash&&(r.U=t.hash.clone()),r}return u(t,n),t.prototype.j=function(){this.U=new o.e(f.slice(0))},t.prototype.H=function(n,t){for(var r=this.U.words,i=r[0],e=r[1],o=r[2],u=r[3],f=r[4],a=r[5],s=r[6],v=r[7],w=0;w<64;w++){if(w<16)h[w]=0|n[t+w];else{var l=h[w-15],d=(l<<25|l>>>7)^(l<<14|l>>>18)^l>>>3,b=h[w-2],y=(b<<15|b>>>17)^(b<<13|b>>>19)^b>>>10;h[w]=d+h[w-7]+y+h[w-16]}var p=i&e^i&o^e&o,m=(i<<30|i>>>2)^(i<<19|i>>>13)^(i<<10|i>>>22),j=v+((f<<26|f>>>6)^(f<<21|f>>>11)^(f<<7|f>>>25))+(f&a^~f&s)+c[w]+h[w];v=s,s=a,a=f,f=u+j|0,u=o,o=e,e=i,i=j+(m+p)|0}r[0]=r[0]+i|0,r[1]=r[1]+e|0,r[2]=r[2]+o|0,r[3]=r[3]+u|0,r[4]=r[4]+f|0,r[5]=r[5]+a|0,r[6]=r[6]+s|0,r[7]=r[7]+v|0},t.prototype.B=function(){var n=this.F.words,t=8*this.K,r=8*this.F.nSigBytes;return n[r>>>5]|=128<<24-r%32,n[14+(r+64>>>9<<4)]=Math.floor(t/4294967296),n[15+(r+64>>>9<<4)]=t,this.F.nSigBytes=4*n.length,this.L(),this.U},t.prototype.clone=function(){return new t({hash:this.U,blockSize:this.R,data:this.F,nBytes:this.K})},t.hash=function(n,r){return new t(r).finalize(n)},t}(e.P)},3354:function(n,t,r){r.d(t,{e:function(){return o}});var i=r(5720),e=r(9054),o=function(){function n(t,r){if(Array.isArray(t)||!t)return this.q=Array.isArray(t)?t:[],void(this.X="number"==typeof r?r:4*this.q.length);if(t instanceof n)return this.q=t.words.slice(),void(this.X=t.nSigBytes);var i;try{t instanceof ArrayBuffer?i=new Uint8Array(t):(t instanceof Uint8Array||t instanceof Int8Array||t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array)&&(i=new Uint8Array(t.buffer,t.byteOffset,t.byteLength))}catch(n){throw new Error("Invalid argument")}if(!i)throw new Error("Invalid argument");for(var e=i.byteLength,o=[],u=0;u<e;u++)o[u>>>2]|=i[u]<<24-u%4*8;this.q=o,this.X=e}return Object.defineProperty(n.prototype,"nSigBytes",{get:function(){return this.X},set:function(n){this.X=n},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"words",{get:function(){return this.q},enumerable:!1,configurable:!0}),n.prototype.toString=function(n){return n?n.stringify(this):i.p.stringify(this)},n.prototype.toUint8Array=function(){for(var n=this.q,t=this.X,r=new Uint8Array(t),i=0;i<t;i++)r[i]=n[i>>>2]>>>24-i%4*8&255;return r},n.prototype.concat=function(n){var t=n.words.slice(),r=n.nSigBytes;if(this.clamp(),this.X%4)for(var i=0;i<r;i++){var e=t[i>>>2]>>>24-i%4*8&255;this.q[this.X+i>>>2]|=e<<24-(this.X+i)%4*8}else for(i=0;i<r;i+=4)this.q[this.X+i>>>2]=t[i>>>2];return this.X+=r,this},n.prototype.clamp=function(){var n=this.X;this.q[n>>>2]&=4294967295<<32-n%4*8,this.q.length=Math.ceil(n/4)},n.prototype.clone=function(){return new n(this.q.slice(),this.X)},n.random=function(t){for(var r=[],i=0;i<t;i+=4)r.push((0,e.M)());return new n(r,t)},n}()},7211:function(n,t,r){r.d(t,{C:function(){return o}});var i=r(3354),e=r(4768),o=function(){function n(n){this.J=0,this.R=0,this.v=n,this.F=n&&void 0!==n.data?n.data.clone():new i.e,this.K=n&&"number"==typeof n.nBytes?n.nBytes:0}return Object.defineProperty(n.prototype,"blockSize",{get:function(){return this.R},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,t){this.F=void 0!==n?n.clone():new i.e,this.K="number"==typeof t?t:0},n.prototype.Y=function(n){var t="string"==typeof n?e.d.parse(n):n;this.F.concat(t),this.K+=t.nSigBytes},n.prototype.L=function(n){var t,r=this.F.words,e=this.F.nSigBytes,o=this.R,u=e/(4*this.R),f=(u=n?Math.ceil(u):Math.max((0|u)-this.J,0))*o,c=Math.min(4*f,e);if(f){for(var a=0;a<f;a+=o)this.H(r,a);t=r.splice(0,f),this.F.nSigBytes-=c}return new i.e(t,c)},n.prototype.H=function(n,t){throw new Error("Not implemented")},n}()},1868:function(n,t,r){r.d(t,{P:function(){return u}});var i,e=r(7211),o=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),u=function(n){function t(t){var r=n.call(this,t)||this;return r.R=16,r.v=t,t&&"number"==typeof t.blockSize&&(r.R=t.blockSize),r.reset(t?t.data:void 0,t?t.nBytes:void 0),r}return o(t,n),Object.defineProperty(t.prototype,"blockSize",{get:function(){return this.R},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,r){n.prototype.reset.call(this,t,r),this.j()},t.prototype.update=function(n){return this.Y(n),this.L(),this},t.prototype.finalize=function(n){return n&&this.Y(n),this.B()},t.prototype.j=function(){throw new Error("Not implemented")},t.prototype.B=function(){throw new Error("Not implemented")},t}(e.C)},787:function(n,t,r){r.d(t,{G:function(){return a}});var i,e=r(9456),o=r(4344),u=r(7919),f=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),c=function(){return(c=Object.assign||function(n){for(var t,r=1,i=arguments.length;r<i;r++)for(var e in t=arguments[r])Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n}).apply(this,arguments)},a=function(n){function t(t){var r=n.call(this,t)||this;return r.R=4,r.Z=o.n,r.$=u.l,r.v=t,r.Z=void 0!==t.mode?t.mode:r.Z,r.$=void 0!==t.padding?t.padding:r.$,r.reset(null==t?void 0:t.data,null==t?void 0:t.nBytes),r}return f(t,n),Object.defineProperty(t.prototype,"mode",{get:function(){return this.nn},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"padding",{get:function(){return this.$},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,r){var i;n.prototype.reset.call(this,t,r),this.tn===e.t.ENC_TRANSFORM_MODE?i=this.Z.createEncryptor:(i=this.Z.createDecryptor,this.J=1),this.Z&&this.rn===i?this.nn=new this.Z({cipher:this,iv:this.en}):(this.nn=i.call(this.Z,{cipher:this,iv:this.en}),this.rn=i)},t.prototype.H=function(n,t){var r;null===(r=this.nn)||void 0===r||r.processBlock(n,t)},t.prototype.B=function(){var n,t=this.$;return this.tn===e.t.ENC_TRANSFORM_MODE?(t.pad(this.F,this.blockSize),n=this.L(!0)):(n=this.L(!0),t.unpad(n)),n},t.prototype.encryptBlock=function(n,t){throw new Error("Not implemented")},t.prototype.decryptBlock=function(n,t){throw new Error("Not implemented")},t.createEncryptor=function(n,r){return new t(c(c({},r=void 0===r?{}:r),{key:n,transformMode:e.t.ENC_TRANSFORM_MODE}))},t.createDecryptor=function(n,r){return new t(c(c({},r=void 0===r?{}:r),{key:n,transformMode:e.t.DEC_TRANSFORM_MODE}))},t}(e.t)},9456:function(n,t,r){r.d(t,{t:function(){return f}});var i,e=r(7211),o=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),u=function(){return(u=Object.assign||function(n){for(var t,r=1,i=arguments.length;r<i;r++)for(var e in t=arguments[r])Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n}).apply(this,arguments)},f=function(n){function t(t){var r=n.call(this,t)||this;return r.tn=1,r.v=t,r.A=t.key,r.en=void 0!==t.iv?t.iv:r.en,r.tn=void 0!==t.transformMode?t.transformMode:r.tn,r}return o(t,n),Object.defineProperty(t.prototype,"iv",{get:function(){return this.en},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,r){n.prototype.reset.call(this,t,r),this.j()},t.prototype.process=function(n){return this.Y(n),this.L()},t.prototype.finalize=function(n){return n&&this.Y(n),this.B()},t.prototype.j=function(){throw new Error("Not implemented")},t.prototype.H=function(n,t){throw new Error("Not implemented")},t.prototype.B=function(){throw new Error("Not implemented")},t.createEncryptor=function(n,r){return new t(u(u({},r=void 0===r?{}:r),{key:n,transformMode:t.ENC_TRANSFORM_MODE}))},t.createDecryptor=function(n,r){return new t(u(u({},r=void 0===r?{}:r),{key:n,transformMode:t.DEC_TRANSFORM_MODE}))},t.ENC_TRANSFORM_MODE=1,t.DEC_TRANSFORM_MODE=2,t.keySize=4,t.ivSize=4,t}(e.C)},2505:function(n,t,r){r.d(t,{Q:function(){return e}});var i=r(1232),e=function(){function n(n){this.formatter=i.w,n&&(this.cipherText=n.cipherText,this.key=n.key,this.iv=n.iv,this.salt=n.salt,this.Algorithm=n.Algorithm,this.mode=n.mode,this.padding=n.padding,this.blockSize=n.blockSize,this.formatter=n.formatter||i.w)}return n.prototype.toString=function(n){return(n||this.formatter).stringify(this)},n}()},5693:function(n,t,r){r.d(t,{E:function(){return c}});var i=r(9109),e=r(2214),o=r(2505),u=r(1232),f=function(){return(f=Object.assign||function(n){for(var t,r=1,i=arguments.length;r<i;r++)for(var e in t=arguments[r])Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n}).apply(this,arguments)},c={encrypt:function(n,t,r,u){var c=u?f({},u):{},a=u&&u.KDF?u.KDF:e.s,s={};u&&u.kdfHasher&&(s.kdfHasher=u.kdfHasher),u&&u.kdfIterations&&(s.kdfIterations=u.kdfIterations),u&&u.kdfModule&&(s.kdfModule=u.kdfModule);var h=a.execute(r,n.keySize,n.ivSize,c.kdfSalt,s);c.iv=h.iv;var v=i.D.encrypt(n,t,h.key,c);return new o.Q(f(f({},v),{key:h.key,iv:h.iv,salt:h.salt}))},decrypt:function(n,t,r,o){var c=o?f({},o):{},a=c.KDF?c.KDF:e.s,s=c.formatter?c.formatter:u.w,h=(0,i.W)(t,s),v={};o&&o.kdfHasher&&(v.kdfHasher=o.kdfHasher),o&&o.kdfIterations&&(v.kdfIterations=o.kdfIterations),o&&o.kdfModule&&(v.kdfModule=o.kdfModule);var w=a.execute(r,n.keySize,n.ivSize,h.salt,v);return c.iv=w.iv,i.D.decrypt(n,h,w.key,c)}}},9109:function(n,t,r){r.d(t,{W:function(){return o},D:function(){return u}});var i=r(1232),e=r(2505);function o(n,t){return"string"==typeof n?t.parse(n):n}var u={encrypt:function(n,t,r,o){var u=n.createEncryptor(r,o),f=u.finalize(t);return new e.Q({cipherText:f,key:r,iv:u.iv,Algorithm:n,mode:u.mode,padding:u.padding,blockSize:u.blockSize,formatter:(null==o?void 0:o.formatter)||i.w})},decrypt:function(n,t,r,e){var u=n.createDecryptor(r,e),f=o(t,(null==e?void 0:e.formatter)||i.w);return u.finalize(f.cipherText||"")}}},1232:function(n,t,r){r.d(t,{w:function(){return u}});var i=r(2505),e=r(3354),o=r(1773),u={stringify:function(n){var t=n.cipherText,r=n.salt;return t?r?new e.e([1398893684,1701076831]).concat(r).concat(t).toString(o.D):t.toString(o.D):""},parse:function(n){var t,r=o.D.parse(n),u=r.words;return 1398893684===u[0]&&1701076831===u[1]&&(t=new e.e(u.slice(2,4)),u.splice(0,4),r.nSigBytes-=16),new i.Q({cipherText:r,salt:t})}}},2214:function(n,t,r){r.d(t,{s:function(){return f}});var i=r(3354),e=r(2505),o=r(7008),u=function(){return(u=Object.assign||function(n){for(var t,r=1,i=arguments.length;r<i;r++)for(var e in t=arguments[r])Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n}).apply(this,arguments)},f={execute:function(n,t,r,f,c){f||(f=i.e.random(8));var a=c&&c.kdfModule||o.E,s=c?{Hasher:c.kdfHasher,iterations:c.kdfIterations}:{},h=a.getKey(n,f,u(u({},s),{keySize:t+r})),v=new i.e(h.words.slice(t),4*r);return h.nSigBytes=4*t,new e.Q({key:h,iv:v,salt:f})}}},7008:function(n,t,r){r.d(t,{E:function(){return a}});var i,e=r(5561),o=r(6367),u=r(3354),f=r(9541),c=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),a=function(n){function t(t){var r=n.call(this,t)||this;return r.on=4,r.un=e.SHA256,r.fn=1e4,t&&(r.on=void 0!==t.keySize?t.keySize:r.on,r.un=void 0!==t.Hasher?t.Hasher:r.un,r.fn=void 0!==t.iterations?t.iterations:r.fn),r}return c(t,n),t.prototype.compute=function(n,t){for(var r=new o.Hmac(new this.un,n),i=new u.e,e=new u.e([1]),f=i.words,c=e.words,a=this.on,s=this.fn;f.length<a;){var h=r.update(t).finalize(e);r.reset();for(var v=h.words,w=v.length,l=h,d=1;d<s;d++){l=r.finalize(l),r.reset();for(var b=l.words,y=0;y<w;y++)v[y]^=b[y]}i.concat(h),c[0]++}return i.nSigBytes=4*a,i},t.getKey=function(n,r,i){return new t(i).compute(n,r)},t}(f._)},9541:function(n,t,r){r.d(t,{_:function(){return i}});var i=function(){function n(n){this.v=n}return n.prototype.compute=function(n,t){throw new Error("Not implemented")},n.getKey=function(n,t,r){throw new Error("Not implemented")},n}()},1863:function(n,t,r){r.d(t,{T:function(){return i}});var i=function(){function n(n){this.v=n,this.cn=n.cipher,this.en=n.iv}return n.prototype.processBlock=function(n,t){},n.createEncryptor=function(n){throw new Error("Not implemented yet")},n.createDecryptor=function(n){throw new Error("Not implemented yet")},n}()},4344:function(n,t,r){r.d(t,{n:function(){return u}});var i,e=r(1863),o=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),u=function(n){function t(t){var r=n.call(this,t)||this;return r.an=[],r}return o(t,n),t.prototype.xorBlock=function(n,t,r){var i,e=this.en;e?(i=e.words,this.en=void 0):i=this.an;for(var o=0;o<r;o++)n[t+o]^=i[o]},t.createEncryptor=function(n){return new t.Encryptor(n)},t.createDecryptor=function(n){return new t.Decryptor(n)},t.Encryptor=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return o(t,n),t.prototype.processBlock=function(n,t){var r=this.cn,i=r.blockSize;this.xorBlock(n,t,i),r.encryptBlock(n,t),this.an=n.slice(t,t+i)},t}(t),t.Decryptor=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return o(t,n),t.prototype.processBlock=function(n,t){var r=this.cn,i=r.blockSize,e=n.slice(t,t+i);r.decryptBlock(n,t),this.xorBlock(n,t,i),this.an=e},t}(t),t}(e.T)},4055:function(n,t,r){r.d(t,{I4:function(){return e},z6:function(){return o}});var i=r(3354);function e(n){var t=n.nSigBytes%16;if(0!==t){for(var r=16-t,e=[],o=Math.floor(r/4),u=0;u<o;u++)e.push(0);r%4>0&&e.push(0),n.concat(new i.e(e,r))}}function o(n,t){return new i.e(n.words.slice(),t)}},7919:function(n,t,r){r.d(t,{l:function(){return e}});var i=r(3354);var e={pad:function(n,t){for(var r=4*t,e=r-n.nSigBytes%r,o=e<<24|e<<16|e<<8|e,u=[],f=0;f<e;f+=4)u.push(o);var c=new i.e(u,e);n.concat(c)},unpad:function(n){var t=255&n.words[n.nSigBytes-1>>>2];n.nSigBytes-=t}}},1756:function(n,t,r){r.d(t,{w:function(){return u}});var i,e="undefined"!=typeof navigator&&navigator.userAgent?navigator.userAgent.toLowerCase():"",o=(i=parseInt((/msie (\d+)/.exec(e)||[])[1],10),isNaN(i)?(i=parseInt((/trident\/.*; rv:(\d+)/.exec(e)||[])[1],10),!isNaN(i)&&i):i);function u(n,t){return!1!==o&&(!t||("<"===n?o<t:"<="===n?o<=t:">"===n?o>t:">="===n?o>=t:o===t))}},1773:function(n,t,r){r.d(t,{D:function(){return f}});for(var i=r(3354),e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",o=[],u=0;u<e.length;u++)o[e.charCodeAt(u)]=u;var f={stringify:function(n){var t=n.words,r=n.nSigBytes;n.clamp();for(var i=[],o=0;o<r;o+=3)for(var u=(t[o>>>2]>>>24-o%4*8&255)<<16|(t[o+1>>>2]>>>24-(o+1)%4*8&255)<<8|t[o+2>>>2]>>>24-(o+2)%4*8&255,f=0;f<4&&o+.75*f<r;f++)i.push(e.charAt(u>>>6*(3-f)&63));var c=e.charAt(64);if(c)for(;i.length%4;)i.push(c);return i.join("")},parse:function(n){var t=n.length,r=e.charAt(64);if(r){var u=n.indexOf(r);-1!==u&&(t=u)}for(var f=[],c=0,a=0;a<t;a++)if(a%4){var s=o[n.charCodeAt(a-1)]<<a%4*2|o[n.charCodeAt(a)]>>>6-a%4*2;f[c>>>2]|=s<<24-c%4*8,c++}return new i.e(f,c)}}},5720:function(n,t,r){r.d(t,{p:function(){return e}});var i=r(3354),e={stringify:function(n){for(var t=n.nSigBytes,r=n.words,i=[],e=0;e<t;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(n){var t=n.length;if(t%2!=0)throw new Error("Hex string count must be even");for(var r=[],e=0;e<t;e+=2)r[e>>>3]|=parseInt(n.substr(e,2),16)<<24-e%8*4;return new i.e(r,t/2)}}},8702:function(n,t,r){r.d(t,{m:function(){return e}});var i=r(3354),e={stringify:function(n){for(var t=n.nSigBytes,r=n.words,i=[],e=0;e<t;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(n){for(var t=n.length,r=[],e=0;e<t;e++)r[e>>>2]|=(255&n.charCodeAt(e))<<24-e%4*8;return new i.e(r,t)}}},4768:function(n,t,r){r.d(t,{d:function(){return e}});var i=r(8702),e={stringify:function(n){try{return decodeURIComponent(escape(i.m.stringify(n)))}catch(n){throw new Error("Malformed UTF-8 data")}},parse:function(n){return i.m.parse(unescape(encodeURIComponent(n)))}}},9054:function(n,t,r){r.d(t,{M:function(){return e}});var i=r(1756);var e=function(){if("undefined"!=typeof window){var n=window.crypto||window.msCrypto;if(!n){if((0,i.w)("<",11))return console.warn("IE <= 10 uses insecure random generator. Please consider to use IE11 or another modern browser"),function(){return Math.floor(512*Math.random())%256};throw new Error("Crypto module not found")}return function(){return n.getRandomValues(new Uint32Array(1))[0]}}return void 0!==r.g&&r.g.crypto?function(){return r.g.crypto.randomBytes(4).readInt32LE()}:function(){return require("crypto").randomBytes(4).readInt32LE()}}()},5607:function(n,t,r){r.d(t,{V:function(){return c}});var i,e=r(1863),o=r(3354),u=r(4055),f=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),c=function(n){function t(r){var i=n.call(this,r)||this;if(i.sn=[],i.hn=[],i.vn=[],4!==r.cipher.blockSize)throw new Error("In GCM block cipher mode, cipher block size must be 128bit");var e=r.cipher,o=r.iv,u=[0,0,0,0];return e.encryptBlock(u,0),i.sn=u,i.hn=t.getJ0(u,null==o?void 0:o.words),i.vn=i.hn.slice(),i}return f(t,n),t.getJ0=function(n,r){var i;if(r&&0!==r.length)if(3===r.length)i=[r[0],r[1],r[2],1];else{for(var e=r.length%4>0?4-r.length%4:0,o=r.slice(),u=0;u<e+2;u++)o.push(0);o.push(0),o.push(32*r.length),i=t.GHASH(n,o)}else i=[0,0,0,1];return i},t.inc32=function(n){var t=n.slice(),r=t[3]>>>0,i=r+1>>>0<r;if(t[3]=t[3]+1|0,i){var e=t[2]>>>0,o=e+1>>>0<e;t[2]=t[2]+1|0,o&&(t[1]=t[1]+1|0)}return t},t.mul=function(n,t){for(var r=[3774873600,0,0,0],i=[0,0,0,0],e=t.slice(),o=0;o<128;o++){(n[o>>>5]>>>31-o%32&1)>0&&(i[0]=i[0]^e[0],i[1]=i[1]^e[1],i[2]=i[2]^e[2],i[3]=i[3]^e[3]);var u=(1&e[3])>>>0,f=(1&e[0])>>>0,c=(1&e[1])>>>0,a=(1&e[2])>>>0;e[0]=e[0]>>>1,e[1]=e[1]>>>1|(f?2147483648:0),e[2]=e[2]>>>1|(c?2147483648:0),e[3]=e[3]>>>1|(a?2147483648:0),u>0&&(e[0]^=r[0],e[1]^=r[1],e[2]^=r[2],e[3]^=r[3])}return i},t.GHASH=function(n,r){if(n.length%4!=0)throw new Error("Length of 32bit word array 'H' must be multiple of 4(128bit)");if(r.length%4!=0)throw new Error("Length of 32bit word array 'X' must be multiple of 4(128bit)");for(var i=r.length,e=[0,0,0,0],o=0;o<i;o+=4)e[0]=e[0]^r[o],e[1]=e[1]^r[o+1],e[2]=e[2]^r[o+2],e[3]=e[3]^r[o+3],e=t.mul(e,n);return e},t.GCTR=function(n,r,i){if(0===i.nSigBytes)return i.clone();if(4!==r.length)throw new Error("Initial Counter Block size must be 128bit");for(var e=i.words,u=Math.ceil(i.nSigBytes/16),f=[r.slice()],c=1;c<u;c++){var a=t.inc32(f[c-1]);f.push(a)}var s=new o.e;for(c=0;c<u;c++){n.encryptBlock(f[c],0);var h=i.nSigBytes%16;if(c<u-1||0===h){var v=e[4*c]^f[c][0],w=e[4*c+1]^f[c][1],l=e[4*c+2]^f[c][2],d=e[4*c+3]^f[c][3],b=new o.e([v,w,l,d]);s.concat(b)}else{for(var y=[],p=0,m=Math.floor(h/4),j=0;j<m;j++){var O=e[4*c+j]^f[c][j];y.push(O),p+=4}var g=h%4;if(g>0){var _=e[4*c+m]<<32-8*g^f[c][m];y.push(_),p+=g}var A=new o.e(y,p);s.concat(A)}}return s.nSigBytes=i.nSigBytes,s.clamp(),s},t.mac=function(n,r,i,e,f,c){var a=new n({key:r,iv:i}),s=[0,0,0,0];a.encryptBlock(s,0);var h=t.getJ0(s,i.words),v=(null==e?void 0:e.clone())||new o.e,w=[0,8*v.nSigBytes],l=(null==f?void 0:f.clone())||new o.e,d=[0,8*l.nSigBytes],b=c||16;(0,u.I4)(v),(0,u.I4)(l);var y=v.words.concat(l.words).concat(w).concat(d),p=t.GHASH(s,y),m=t.GCTR(a,h,new o.e(p));return(0,u.z6)(m,b)},t.createEncryptor=function(n){return new t.Encryptor(n)},t.createDecryptor=function(n){return new t.Decryptor(n)},t.Encryptor=function(n){function r(){return null!==n&&n.apply(this,arguments)||this}return f(r,n),r.prototype.processBlock=function(n,r){var i=this.cn.blockSize;this.vn=t.inc32(this.vn);for(var e=new o.e(n.slice(r,r+i)),u=t.GCTR(this.cn,this.vn,e),f=0;f<i;f++)n[r+f]=u.words[f]},r}(t),t.Decryptor=function(n){function r(){return null!==n&&n.apply(this,arguments)||this}return f(r,n),r.prototype.processBlock=function(n,r){var i=this.cn.blockSize;this.vn=t.inc32(this.vn);for(var e=new o.e(n.slice(r,r+i)),u=t.GCTR(this.cn,this.vn,e),f=0;f<i;f++)n[r+f]=u.words[f]},r}(t),t}(e.T)}},t={};function r(i){var e=t[i];if(void 0!==e)return e.exports;var o=t[i]={exports:{}};return n[i](o,o.exports,r),o.exports}r.d=function(n,t){for(var i in t)r.o(t,i)&&!r.o(n,i)&&Object.defineProperty(n,i,{enumerable:!0,get:t[i]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"wn",{value:!0})};var i={};return function(){r.r(i),r.d(i,{GMAC:function(){return u}});var n=r(4768),t=r(3354),e=r(9691),o=r(5607);function u(r,i,u,f,c){var a="string"==typeof r?n.d.parse(r):r,s=u||new t.e([0,0,0,0]),h=c&&c.Cipher?c.Cipher:e.AES,v="string"==typeof i?n.d.parse(i):i,w=f||16;return o.V.mac(h,v,s,a,void 0,w)}}(),i}()}));