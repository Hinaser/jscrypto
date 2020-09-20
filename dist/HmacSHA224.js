!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.HmacSHA224=n():(t.JsCrypto=t.JsCrypto||{},t.JsCrypto.HmacSHA224=n())}(this,(function(){return function(t){var n={};function i(r){if(n[r])return n[r].exports;var e=n[r]={i:r,l:!1,exports:{}};return t[r].call(e.exports,e,e.exports,i),e.l=!0,e.exports}return i.m=t,i.c=n,i.d=function(t,n,r){i.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"u",{value:!0})},i.t=function(t,n){if(1&n&&(t=i(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.u)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var e in t)i.d(r,e,function(n){return t[n]}.bind(null,e));return r},i.n=function(t){var n=t&&t.u?function(){return t.default}:function(){return t};return i.d(n,"a",n),n},i.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},i.p="",i(i.s=15)}([,function(t,n,i){"use strict";i.d(n,"a",(function(){return u}));var r=i(3),e=i(5),u=function(){function t(t,n){this.h=t||[],this.v="number"==typeof n?n:4*this.h.length}return t.prototype.raw=function(){return this.h},t.prototype.slice=function(){return this.h.slice()},t.prototype.length=function(){return this.v},t.prototype.setSignificantBytes=function(t){this.v=t},t.prototype.toString=function(t){return t?t.stringify(this.h,this.v):r.a.stringify(this.h,this.v)},t.prototype.concat=function(t){var n=t.slice(),i=t.length();if(this.clamp(),this.v%4)for(var r=0;r<i;r++){var e=n[r>>>2]>>>24-r%4*8&255;this.h[this.v+r>>>2]|=e<<24-(this.v+r)%4*8}else for(r=0;r<i;r+=4)this.h[this.v+r>>>2]=n[r>>>2];return this.v+=i,this},t.prototype.clamp=function(){var t=this.v;this.h[t>>>2]&=4294967295<<32-t%4*8,this.h.length=Math.ceil(t/4)},t.prototype.clone=function(){return new t(this.h.slice(),this.v)},t.random=function(n){for(var i=[],r=0;r<n;r++)i.push(Object(e.a)());return new t(i,n)},t}()},function(t,n,i){"use strict";i.d(n,"a",(function(){return e}));var r=i(1),e={stringify:function(t,n){for(var i=[],r=0;r<n;r++){var e=t[r>>>2]>>>24-r%4*8&255;i.push(String.fromCharCode(e))}return i.join("")},parse:function(t){for(var n=t.length,i=[],e=0;e<n;e++)i[e>>>2]|=(255&t.charCodeAt(e))<<24-e%4*8;return new r.a(i,n)}}},function(t,n,i){"use strict";i.d(n,"a",(function(){return e}));var r=i(1),e={stringify:function(t,n){for(var i=[],r=0;r<n;r++){var e=t[r>>>2]>>>24-r%4*8&255;i.push((e>>>4).toString(16)),i.push((15&e).toString(16))}return i.join("")},parse:function(t){for(var n=t.length,i=[],e=0;e<n;e+=2)i[e>>>3]|=parseInt(t.substr(e,2),16)<<24-e%8*4;return new r.a(i,n/2)}}},function(t,n,i){"use strict";i.d(n,"a",(function(){return e}));var r=i(2),e={stringify:function(t,n){try{return decodeURIComponent(escape(r.a.stringify(t,n)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return r.a.parse(unescape(encodeURIComponent(t)))}}},function(t,n,i){"use strict";(function(t){i.d(n,"a",(function(){return r}));var r=function(){if("undefined"!=typeof window){var n=window.crypto||window.msCrypto;if(!n)throw new Error("Crypto module not found");return function(){return n.getRandomValues(new Uint32Array(1))[0]}}return void 0!==t&&t.crypto?function(){return t.crypto.randomBytes(4).readInt32LE()}:function(){return require("crypto").randomBytes(4).readInt32LE()}}()}).call(this,i(7))},function(t,n,i){"use strict";i.d(n,"a",(function(){return c}));var r,e=i(1),u=i(4),o=function(){function t(t){this.j=0,this.O=0,this._=t,this.M=t&&void 0!==t.data?t.data.clone():new e.a,this.g=t&&"number"==typeof t.nBytes?t.nBytes:0}return t.prototype.reset=function(t,n){this.M=void 0!==t?t.clone():new e.a,this.g="number"==typeof n?n:0},t.prototype.append=function(t){"string"==typeof t&&(t=u.a.parse(t)),this.M.concat(t),this.g+=t.length()},t.prototype.process=function(t){var n,i=this.M.raw(),r=this.M.length(),u=this.O,o=r/(4*this.O),f=(o=t?Math.ceil(o):Math.max((0|o)-this.j,0))*u,c=Math.min(4*f,r);if(f){for(var s=0;s<f;s+=u)this.doProcessBlock(i,s);n=i.splice(0,f),this.M.setSignificantBytes(this.M.length()-c)}return new e.a(n,c)},t}(),f=(r=function(t,n){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])})(t,n)},function(t,n){function i(){this.constructor=t}r(t,n),t.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}),c=function(t){function n(n){var i=t.call(this,n)||this;return i.O=16,i._=n,n&&"number"==typeof n.blockSize&&(i.O=n.blockSize),i.reset(n?n.data:void 0,n?n.nBytes:void 0),i}return f(n,t),Object.defineProperty(n.prototype,"blockSize",{get:function(){return this.O},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,i){t.prototype.reset.call(this,n,i),this.doReset()},n.prototype.update=function(t){return this.append(t),this.process(),this},n.prototype.finalize=function(t){return t&&this.append(t),this.doFinalize()},n}(o)},function(t,n){var i;i=function(){return this}();try{i=i||new Function("return this")()}catch(t){"object"==typeof window&&(i=window)}t.exports=i},function(t,n,i){"use strict";i.r(n);var r=i(4),e=function(){function t(t,n){this.S=t,"string"==typeof n&&(n=r.a.parse(n));var i=t.blockSize,e=4*i;n.length()>e&&(n=t.finalize(n)),n.clamp();for(var u=this.A=n.clone(),o=this.U=n.clone(),f=u.raw(),c=o.raw(),s=0;s<i;s++)f[s]^=1549556828,c[s]^=909522486;o.setSignificantBytes(e),u.setSignificantBytes(e),this.reset()}return t.prototype.reset=function(){this.S.reset(),this.S.update(this.U)},t.prototype.update=function(t){return this.S.update(t),this},t.prototype.finalize=function(t){var n=this.S.finalize(t);return this.S.reset(),this.S.finalize(this.A.clone().concat(n))},t}();n.default=e},function(t,n,i){"use strict";i.r(n);var r,e=i(6),u=i(1),o=(r=function(t,n){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])})(t,n)},function(t,n){function i(){this.constructor=t}r(t,n),t.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}),f=[],c=[];function s(t){for(var n=Math.sqrt(t),i=2;i<=n;i++)if(!(t%i))return!1;return!0}function h(t){return 4294967296*(t-(0|t))|0}!function(){for(var t=2,n=0;n<64;)s(t)&&(n<8&&(f[n]=h(Math.pow(t,.5))),c[n]=h(Math.pow(t,1/3)),n++),t++}();var a=[],v=function(t){function n(n){var i=t.call(this,n)||this;return i.k=new u.a(f.slice(0)),i._=n,n&&void 0!==n.hash&&(i.k=n.hash.clone()),i}return o(n,t),n.prototype.doReset=function(){this.k=new u.a(f.slice(0))},n.prototype.doProcessBlock=function(t,n){for(var i=this.k.raw(),r=i[0],e=i[1],u=i[2],o=i[3],f=i[4],s=i[5],h=i[6],v=i[7],b=0;b<64;b++){if(b<16)a[b]=0|t[n+b];else{var w=a[b-15],d=(w<<25|w>>>7)^(w<<14|w>>>18)^w>>>3,l=a[b-2],p=(l<<15|l>>>17)^(l<<13|l>>>19)^l>>>10;a[b]=d+a[b-7]+p+a[b-16]}var y=r&e^r&u^e&u,j=(r<<30|r>>>2)^(r<<19|r>>>13)^(r<<10|r>>>22),O=v+((f<<26|f>>>6)^(f<<21|f>>>11)^(f<<7|f>>>25))+(f&s^~f&h)+c[b]+a[b];v=h,h=s,s=f,f=o+O|0,o=u,u=e,e=r,r=O+(j+y)|0}i[0]=i[0]+r|0,i[1]=i[1]+e|0,i[2]=i[2]+u|0,i[3]=i[3]+o|0,i[4]=i[4]+f|0,i[5]=i[5]+s|0,i[6]=i[6]+h|0,i[7]=i[7]+v|0},n.prototype.doFinalize=function(){var t=this.M.raw(),n=8*this.g,i=8*this.M.length();return t[i>>>5]|=128<<24-i%32,t[14+(i+64>>>9<<4)]=Math.floor(n/4294967296),t[15+(i+64>>>9<<4)]=n,this.M.setSignificantBytes(4*t.length),this.process(),this.k},n.prototype.clone=function(){return new n({hash:this.k,blockSize:this.O,data:this.M,nBytes:this.g})},n.hash=function(t,i){return new n(i).finalize(t)},n}(e.a);n.default=v},,,function(t,n,i){"use strict";i.r(n);var r,e=i(1),u=i(9),o=(r=function(t,n){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])})(t,n)},function(t,n){function i(){this.constructor=t}r(t,n),t.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}),f=function(t){function n(n){var i=t.call(this,n)||this;return i.k=new e.a([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428]),i._=n,n&&void 0!==n.hash&&(i.k=n.hash.clone()),i}return o(n,t),n.prototype.doReset=function(){this.k=new e.a([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])},n.prototype.doFinalize=function(){var n=t.prototype.doFinalize.call(this);return n.setSignificantBytes(n.length()-4),n},n.prototype.clone=function(){return new n({hash:this.k,blockSize:this.O,data:this.M,nBytes:this.g})},n.hash=function(t,i){return new n(i).finalize(t)},n}(u.default);n.default=f},,,function(t,n,i){"use strict";i.r(n),i.d(n,"default",(function(){return u}));var r=i(8),e=i(12);function u(t,n){return new r.default(new e.default,n).finalize(t)}}]).default}));