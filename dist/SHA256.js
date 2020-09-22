!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.JsCrypto=n():t.JsCrypto=n()}(this,(function(){return function(t){var n={};function r(i){if(n[i])return n[i].exports;var e=n[i]={i:i,l:!1,exports:{}};return t[i].call(e.exports,e,e.exports,r),e.l=!0,e.exports}return r.m=t,r.c=n,r.d=function(t,n,i){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:i})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"u",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.u)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var e in t)r.d(i,e,function(n){return t[n]}.bind(null,e));return i},r.n=function(t){var n=t&&t.u?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="",r(r.s=10)}([,function(t,n,r){"use strict";r.d(n,"a",(function(){return u}));var i=r(3),e=r(5),u=function(){function t(t,n){this.h=t||[],this.v="number"==typeof n?n:4*this.h.length}return t.prototype.raw=function(){return this.h},t.prototype.slice=function(t,n){return this.h.slice(t,n)},t.prototype.length=function(){return this.v},t.prototype.setSignificantBytes=function(t){this.v=t},t.prototype.toString=function(t){return t?t.stringify(this):i.a.stringify(this)},t.prototype.concat=function(t){var n=t.slice(),r=t.length();if(this.clamp(),this.v%4)for(var i=0;i<r;i++){var e=n[i>>>2]>>>24-i%4*8&255;this.h[this.v+i>>>2]|=e<<24-(this.v+i)%4*8}else for(i=0;i<r;i+=4)this.h[this.v+i>>>2]=n[i>>>2];return this.v+=r,this},t.prototype.clamp=function(){var t=this.v;this.h[t>>>2]&=4294967295<<32-t%4*8,this.h.length=Math.ceil(t/4)},t.prototype.clone=function(){return new t(this.h.slice(),this.v)},t.random=function(n){for(var r=[],i=0;i<n;i++)r.push(Object(e.a)());return new t(r,n)},t}()},function(t,n,r){"use strict";r.d(n,"a",(function(){return e}));var i=r(1),e={stringify:function(t){for(var n=t.length(),r=t.raw(),i=[],e=0;e<n;e++){var u=r[e>>>2]>>>24-e%4*8&255;i.push(String.fromCharCode(u))}return i.join("")},parse:function(t){for(var n=t.length,r=[],e=0;e<n;e++)r[e>>>2]|=(255&t.charCodeAt(e))<<24-e%4*8;return new i.a(r,n)}}},function(t,n,r){"use strict";r.d(n,"a",(function(){return e}));var i=r(1),e={stringify:function(t){for(var n=t.length(),r=t.raw(),i=[],e=0;e<n;e++){var u=r[e>>>2]>>>24-e%4*8&255;i.push((u>>>4).toString(16)),i.push((15&u).toString(16))}return i.join("")},parse:function(t){for(var n=t.length,r=[],e=0;e<n;e+=2)r[e>>>3]|=parseInt(t.substr(e,2),16)<<24-e%8*4;return new i.a(r,n/2)}}},function(t,n,r){"use strict";r.d(n,"a",(function(){return e}));var i=r(2),e={stringify:function(t){try{return decodeURIComponent(escape(i.a.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return i.a.parse(unescape(encodeURIComponent(t)))}}},function(t,n,r){"use strict";(function(t){r.d(n,"a",(function(){return i}));var i=function(){if("undefined"!=typeof window){var n=window.crypto||window.msCrypto;if(!n)throw new Error("Crypto module not found");return function(){return n.getRandomValues(new Uint32Array(1))[0]}}return void 0!==t&&t.crypto?function(){return t.crypto.randomBytes(4).readInt32LE()}:function(){return require("crypto").randomBytes(4).readInt32LE()}}()}).call(this,r(8))},function(t,n,r){"use strict";r.d(n,"a",(function(){return o}));var i,e=r(7),u=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),o=function(t){function n(n){var r=t.call(this,n)||this;return r.j=16,r.O=n,n&&"number"==typeof n.blockSize&&(r.j=n.blockSize),r.reset(n?n.data:void 0,n?n.nBytes:void 0),r}return u(n,t),Object.defineProperty(n.prototype,"blockSize",{get:function(){return this.j},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,r){t.prototype.reset.call(this,n,r),this.g()},n.prototype.update=function(t){return this.M(t),this._(),this},n.prototype.finalize=function(t){return t&&this.M(t),this.S()},n.prototype.g=function(){throw new Error("Not implemented")},n.prototype.S=function(){throw new Error("Not implemented")},n}(e.a)},function(t,n,r){"use strict";r.d(n,"a",(function(){return u}));var i=r(1),e=r(4),u=function(){function t(t){this.A=0,this.j=0,this.O=t,this.U=t&&void 0!==t.data?t.data.clone():new i.a,this.k=t&&"number"==typeof t.nBytes?t.nBytes:0}return Object.defineProperty(t.prototype,"blockSize",{get:function(){return this.j},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,n){this.U=void 0!==t?t.clone():new i.a,this.k="number"==typeof n?n:0},t.prototype.M=function(t){"string"==typeof t&&(t=e.a.parse(t)),this.U.concat(t),this.k+=t.length()},t.prototype._=function(t){var n,r=this.U.raw(),e=this.U.length(),u=this.j,o=e/(4*this.j),f=(o=t?Math.ceil(o):Math.max((0|o)-this.A,0))*u,c=Math.min(4*f,e);if(f){for(var s=0;s<f;s+=u)this.C(r,s);n=r.splice(0,f),this.U.setSignificantBytes(this.U.length()-c)}return new i.a(n,c)},t.prototype.C=function(t,n){throw new Error("Not implemented")},t}()},function(t,n){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},,function(t,n,r){"use strict";r.r(n),r.d(n,"SHA256",(function(){return v}));var i,e=r(6),u=r(1),o=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),f=[],c=[];function s(t){for(var n=Math.sqrt(t),r=2;r<=n;r++)if(!(t%r))return!1;return!0}function h(t){return 4294967296*(t-(0|t))|0}!function(){for(var t=2,n=0;n<64;)s(t)&&(n<8&&(f[n]=h(Math.pow(t,.5))),c[n]=h(Math.pow(t,1/3)),n++),t++}();var a=[],v=function(t){function n(n){var r=t.call(this,n)||this;return r.I=new u.a(f.slice(0)),r.O=n,n&&void 0!==n.hash&&(r.I=n.hash.clone()),r}return o(n,t),n.prototype.g=function(){this.I=new u.a(f.slice(0))},n.prototype.C=function(t,n){for(var r=this.I.raw(),i=r[0],e=r[1],u=r[2],o=r[3],f=r[4],s=r[5],h=r[6],v=r[7],b=0;b<64;b++){if(b<16)a[b]=0|t[n+b];else{var l=a[b-15],w=(l<<25|l>>>7)^(l<<14|l>>>18)^l>>>3,d=a[b-2],p=(d<<15|d>>>17)^(d<<13|d>>>19)^d>>>10;a[b]=w+a[b-7]+p+a[b-16]}var y=i&e^i&u^e&u,m=(i<<30|i>>>2)^(i<<19|i>>>13)^(i<<10|i>>>22),j=v+((f<<26|f>>>6)^(f<<21|f>>>11)^(f<<7|f>>>25))+(f&s^~f&h)+c[b]+a[b];v=h,h=s,s=f,f=o+j|0,o=u,u=e,e=i,i=j+(m+y)|0}r[0]=r[0]+i|0,r[1]=r[1]+e|0,r[2]=r[2]+u|0,r[3]=r[3]+o|0,r[4]=r[4]+f|0,r[5]=r[5]+s|0,r[6]=r[6]+h|0,r[7]=r[7]+v|0},n.prototype.S=function(){var t=this.U.raw(),n=8*this.k,r=8*this.U.length();return t[r>>>5]|=128<<24-r%32,t[14+(r+64>>>9<<4)]=Math.floor(n/4294967296),t[15+(r+64>>>9<<4)]=n,this.U.setSignificantBytes(4*t.length),this._(),this.I},n.prototype.clone=function(){return new n({hash:this.I,blockSize:this.j,data:this.U,nBytes:this.k})},n.hash=function(t,r){return new n(r).finalize(t)},n}(e.a)}])}));