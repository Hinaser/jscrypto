!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.SHA1=n():(t.JsCrypto=t.JsCrypto||{},t.JsCrypto.SHA1=n())}(this,(function(){return function(t){var n={};function r(i){if(n[i])return n[i].exports;var e=n[i]={i:i,l:!1,exports:{}};return t[i].call(e.exports,e,e.exports,r),e.l=!0,e.exports}return r.m=t,r.c=n,r.d=function(t,n,i){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:i})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"u",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.u)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var e in t)r.d(i,e,function(n){return t[n]}.bind(null,e));return i},r.n=function(t){var n=t&&t.u?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="",r(r.s=19)}([,function(t,n,r){"use strict";r.d(n,"a",(function(){return o}));var i=r(3),e=r(5),o=function(){function t(t,n){this.h=t||[],this.v="number"==typeof n?n:4*this.h.length}return t.prototype.raw=function(){return this.h},t.prototype.slice=function(){return this.h.slice()},t.prototype.length=function(){return this.v},t.prototype.setSignificantBytes=function(t){this.v=t},t.prototype.toString=function(t){return t?t.stringify(this.h,this.v):i.a.stringify(this.h,this.v)},t.prototype.concat=function(t){var n=t.slice(),r=t.length();if(this.clamp(),this.v%4)for(var i=0;i<r;i++){var e=n[i>>>2]>>>24-i%4*8&255;this.h[this.v+i>>>2]|=e<<24-(this.v+i)%4*8}else for(i=0;i<r;i+=4)this.h[this.v+i>>>2]=n[i>>>2];return this.v+=r,this},t.prototype.clamp=function(){var t=this.v;this.h[t>>>2]&=4294967295<<32-t%4*8,this.h.length=Math.ceil(t/4)},t.prototype.clone=function(){return new t(this.h.slice(),this.v)},t.random=function(n){for(var r=[],i=0;i<n;i++)r.push(Object(e.a)());return new t(r,n)},t}()},function(t,n,r){"use strict";r.d(n,"a",(function(){return e}));var i=r(1),e={stringify:function(t,n){for(var r=[],i=0;i<n;i++){var e=t[i>>>2]>>>24-i%4*8&255;r.push(String.fromCharCode(e))}return r.join("")},parse:function(t){for(var n=t.length,r=[],e=0;e<n;e++)r[e>>>2]|=(255&t.charCodeAt(e))<<24-e%4*8;return new i.a(r,n)}}},function(t,n,r){"use strict";r.d(n,"a",(function(){return e}));var i=r(1),e={stringify:function(t,n){for(var r=[],i=0;i<n;i++){var e=t[i>>>2]>>>24-i%4*8&255;r.push((e>>>4).toString(16)),r.push((15&e).toString(16))}return r.join("")},parse:function(t){for(var n=t.length,r=[],e=0;e<n;e+=2)r[e>>>3]|=parseInt(t.substr(e,2),16)<<24-e%8*4;return new i.a(r,n/2)}}},function(t,n,r){"use strict";r.d(n,"a",(function(){return e}));var i=r(2),e={stringify:function(t,n){try{return decodeURIComponent(escape(i.a.stringify(t,n)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return i.a.parse(unescape(encodeURIComponent(t)))}}},function(t,n,r){"use strict";(function(t){r.d(n,"a",(function(){return i}));var i=function(){var n=function(){if("undefined"!=typeof window){var n=window.crypto||window.msCrypto;if(!n)throw new Error("Crypto module not found");return n}if(void 0!==t&&t.crypto)return t.crypto;throw new Error("Unable to find crypto module")}();if("function"==typeof n.getRandomValues)return function(){return n.getRandomValues(new Uint32Array(1))[0]};if("function"==typeof n.randomBytes)return function(){return n.randomBytes(4).readInt32LE()};throw new Error("Unable to find crypto module")}()}).call(this,r(7))},function(t,n,r){"use strict";r.d(n,"a",(function(){return c}));var i,e=r(1),o=r(4),u=function(){function t(t){this.j=0,this.O=0,this._=t,this.g=t&&void 0!==t.data?t.data.clone():new e.a,this.M=t&&"number"==typeof t.nBytes?t.nBytes:0}return t.prototype.reset=function(t,n){this.g=void 0!==t?t.clone():new e.a,this.M="number"==typeof n?n:0},t.prototype.append=function(t){"string"==typeof t&&(t=o.a.parse(t)),this.g.concat(t),this.M+=t.length()},t.prototype.process=function(t){var n,r=this.g.raw(),i=this.g.length(),o=this.O,u=i/(4*this.O),f=(u=t?Math.ceil(u):Math.max((0|u)-this.j,0))*o,c=Math.min(4*f,i);if(f){for(var s=0;s<f;s+=o)this.doProcessBlock(r,s);n=r.splice(0,f),this.g.setSignificantBytes(this.g.length()-c)}return new e.a(n,c)},t}(),f=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),c=function(t){function n(n){var r=t.call(this,n)||this;return r.O=16,r._=n,n&&"number"==typeof n.blockSize&&(r.O=n.blockSize),r.reset(n?n.data:void 0,n?n.nBytes:void 0),r}return f(n,t),Object.defineProperty(n.prototype,"blockSize",{get:function(){return this.O},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,r){t.prototype.reset.call(this,n,r),this.doReset()},n.prototype.update=function(t){return this.append(t),this.process(),this},n.prototype.finalize=function(t){return t&&this.append(t),this.doFinalize()},n}(u)},function(t,n){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},,,,,,,,,,,,function(t,n,r){"use strict";r.r(n);var i,e=r(6),o=r(1),u=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),f=[],c=function(t){function n(n){var r=t.call(this,n)||this;return r.S=new o.a([1732584193,4023233417,2562383102,271733878,3285377520]),r._=n,n&&void 0!==n.hash&&(r.S=n.hash.clone()),r}return u(n,t),n.prototype.doReset=function(){this.S=new o.a([1732584193,4023233417,2562383102,271733878,3285377520])},n.prototype.doProcessBlock=function(t,n){for(var r=this.S.raw(),i=r[0],e=r[1],o=r[2],u=r[3],c=r[4],s=0;s<80;s++){if(s<16)f[s]=0|t[n+s];else{var h=f[s-3]^f[s-8]^f[s-14]^f[s-16];f[s]=h<<1|h>>>31}var a=(i<<5|i>>>27)+c+f[s];a+=s<20?1518500249+(e&o|~e&u):s<40?1859775393+(e^o^u):s<60?(e&o|e&u|o&u)-1894007588:(e^o^u)-899497514,c=u,u=o,o=e<<30|e>>>2,e=i,i=a}r[0]=r[0]+i|0,r[1]=r[1]+e|0,r[2]=r[2]+o|0,r[3]=r[3]+u|0,r[4]=r[4]+c|0},n.prototype.doFinalize=function(){var t=this.g.raw(),n=8*this.M,r=8*this.g.length();return t[r>>>5]|=128<<24-r%32,t[14+(r+64>>>9<<4)]=Math.floor(n/4294967296),t[15+(r+64>>>9<<4)]=n,this.g.setSignificantBytes(4*t.length),this.process(),this.S},n.prototype.clone=function(){return new n({hash:this.S,blockSize:this.O,data:this.g,nBytes:this.M})},n.hash=function(t,r){return new n(r).finalize(t)},n}(e.a);n.default=c}]).default}));