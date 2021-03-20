!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.JsCrypto=n():t.JsCrypto=n()}(this,(function(){return(()=>{"use strict";var t={561:(t,n,r)=>{r.d(n,{SHA256:()=>v});var i,e=r(868),o=r(354),u=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),f=[],c=[];function s(t){for(var n=Math.sqrt(t),r=2;r<=n;r++)if(!(t%r))return!1;return!0}function a(t){return 4294967296*(t-(0|t))|0}!function(){for(var t=2,n=0;n<64;)s(t)&&(n<8&&(f[n]=a(Math.pow(t,.5))),c[n]=a(Math.pow(t,1/3)),n++),t++}();var h=[],v=function(t){function n(n){var r=t.call(this,n)||this;return r.t=new o.e(f.slice(0)),r.i=n,n&&void 0!==n.hash&&(r.t=n.hash.clone()),r}return u(n,t),n.prototype.u=function(){this.t=new o.e(f.slice(0))},n.prototype.h=function(t,n){for(var r=this.t.words,i=r[0],e=r[1],o=r[2],u=r[3],f=r[4],s=r[5],a=r[6],v=r[7],w=0;w<64;w++){if(w<16)h[w]=0|t[n+w];else{var b=h[w-15],y=(b<<25|b>>>7)^(b<<14|b>>>18)^b>>>3,l=h[w-2],d=(l<<15|l>>>17)^(l<<13|l>>>19)^l>>>10;h[w]=y+h[w-7]+d+h[w-16]}var p=i&e^i&o^e&o,m=(i<<30|i>>>2)^(i<<19|i>>>13)^(i<<10|i>>>22),j=v+((f<<26|f>>>6)^(f<<21|f>>>11)^(f<<7|f>>>25))+(f&s^~f&a)+c[w]+h[w];v=a,a=s,s=f,f=u+j|0,u=o,o=e,e=i,i=j+(m+p)|0}r[0]=r[0]+i|0,r[1]=r[1]+e|0,r[2]=r[2]+o|0,r[3]=r[3]+u|0,r[4]=r[4]+f|0,r[5]=r[5]+s|0,r[6]=r[6]+a|0,r[7]=r[7]+v|0},n.prototype.v=function(){var t=this.l.words,n=8*this.j,r=8*this.l.nSigBytes;return t[r>>>5]|=128<<24-r%32,t[14+(r+64>>>9<<4)]=Math.floor(n/4294967296),t[15+(r+64>>>9<<4)]=n,this.l.nSigBytes=4*t.length,this.A(),this.t},n.prototype.clone=function(){return new n({hash:this.t,blockSize:this.O,data:this.l,nBytes:this.j})},n.hash=function(t,r){return new n(r).finalize(t)},n}(e.P)},354:(t,n,r)=>{r.d(n,{e:()=>o});var i=r(720),e=r(54),o=function(){function t(t,n){if(Array.isArray(t)||!t)return this._=Array.isArray(t)?t:[],void(this.S="number"==typeof n?n:4*this._.length);var r;if(t instanceof ArrayBuffer)r=new Uint8Array(t);else{if(!(t instanceof Uint8Array||t instanceof Int8Array||t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array))throw new Error("Invalid argument");r=new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}if(!r)return this._=[],void(this.S=0);for(var i=r.byteLength,e=[],o=0;o<i;o++)e[o>>>2]|=r[o]<<24-o%4*8;this._=e,this.S=i}return Object.defineProperty(t.prototype,"nSigBytes",{get:function(){return this.S},set:function(t){this.S=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"words",{get:function(){return this._},enumerable:!1,configurable:!0}),t.prototype.toString=function(t){return t?t.stringify(this):i.p.stringify(this)},t.prototype.toUint8Array=function(){for(var t=this._,n=this.S,r=new Uint8Array(n),i=0;i<n;i++)r[i]=t[i>>>2]>>>24-i%4*8&255;return r},t.prototype.concat=function(t){var n=t.words.slice(),r=t.nSigBytes;if(this.clamp(),this.S%4)for(var i=0;i<r;i++){var e=n[i>>>2]>>>24-i%4*8&255;this._[this.S+i>>>2]|=e<<24-(this.S+i)%4*8}else for(i=0;i<r;i+=4)this._[this.S+i>>>2]=n[i>>>2];return this.S+=r,this},t.prototype.clamp=function(){var t=this.S;this._[t>>>2]&=4294967295<<32-t%4*8,this._.length=Math.ceil(t/4)},t.prototype.clone=function(){return new t(this._.slice(),this.S)},t.random=function(n){for(var r=[],i=0;i<n;i+=4)r.push((0,e.M)());return new t(r,n)},t}()},211:(t,n,r)=>{r.d(n,{C:()=>o});var i=r(354),e=r(768),o=function(){function t(t){this.U=0,this.O=0,this.i=t,this.l=t&&void 0!==t.data?t.data.clone():new i.e,this.j=t&&"number"==typeof t.nBytes?t.nBytes:0}return Object.defineProperty(t.prototype,"blockSize",{get:function(){return this.O},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,n){this.l=void 0!==t?t.clone():new i.e,this.j="number"==typeof n?n:0},t.prototype.I=function(t){var n="string"==typeof t?e.d.parse(t):t;this.l.concat(n),this.j+=n.nSigBytes},t.prototype.A=function(t){var n,r=this.l.words,e=this.l.nSigBytes,o=this.O,u=e/(4*this.O),f=(u=t?Math.ceil(u):Math.max((0|u)-this.U,0))*o,c=Math.min(4*f,e);if(f){for(var s=0;s<f;s+=o)this.h(r,s);n=r.splice(0,f),this.l.nSigBytes-=c}return new i.e(n,c)},t.prototype.h=function(t,n){throw new Error("Not implemented")},t}()},868:(t,n,r)=>{r.d(n,{P:()=>u});var i,e=r(211),o=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),u=function(t){function n(n){var r=t.call(this,n)||this;return r.O=16,r.i=n,n&&"number"==typeof n.blockSize&&(r.O=n.blockSize),r.reset(n?n.data:void 0,n?n.nBytes:void 0),r}return o(n,t),Object.defineProperty(n.prototype,"blockSize",{get:function(){return this.O},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,r){t.prototype.reset.call(this,n,r),this.u()},n.prototype.update=function(t){return this.I(t),this.A(),this},n.prototype.finalize=function(t){return t&&this.I(t),this.v()},n.prototype.u=function(){throw new Error("Not implemented")},n.prototype.v=function(){throw new Error("Not implemented")},n}(e.C)},720:(t,n,r)=>{r.d(n,{p:()=>e});var i=r(354),e={stringify:function(t){for(var n=t.nSigBytes,r=t.words,i=[],e=0;e<n;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(t){var n=t.length;if(n%2!=0)throw new Error("Hex string count must be even");for(var r=[],e=0;e<n;e+=2)r[e>>>3]|=parseInt(t.substr(e,2),16)<<24-e%8*4;return new i.e(r,n/2)}}},702:(t,n,r)=>{r.d(n,{m:()=>e});var i=r(354),e={stringify:function(t){for(var n=t.nSigBytes,r=t.words,i=[],e=0;e<n;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(t){for(var n=t.length,r=[],e=0;e<n;e++)r[e>>>2]|=(255&t.charCodeAt(e))<<24-e%4*8;return new i.e(r,n)}}},768:(t,n,r)=>{r.d(n,{d:()=>e});var i=r(702),e={stringify:function(t){try{return decodeURIComponent(escape(i.m.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return i.m.parse(unescape(encodeURIComponent(t)))}}},54:(t,n,r)=>{r.d(n,{M:()=>i});var i=function(){if("undefined"!=typeof window){var t=window.crypto||window.msCrypto;if(!t)throw new Error("Crypto module not found");return function(){return t.getRandomValues(new Uint32Array(1))[0]}}return void 0!==r.g&&r.g.crypto?function(){return r.g.crypto.randomBytes(4).readInt32LE()}:function(){var t="crypt";return t+=String.fromCharCode(111),require(t).randomBytes(4).readInt32LE()}}()}},n={};function r(i){var e=n[i];if(void 0!==e)return e.exports;var o=n[i]={exports:{}};return t[i](o,o.exports,r),o.exports}r.d=(t,n)=>{for(var i in n)r.o(n,i)&&!r.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:n[i]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),r.o=(t,n)=>Object.prototype.hasOwnProperty.call(t,n),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"k",{value:!0})};var i={};return(()=>{r.r(i),r.d(i,{SHA224:()=>u});var t,n=r(354),e=r(561),o=(t=function(n,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(n,r)},function(n,r){function i(){this.constructor=n}t(n,r),n.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}),u=function(t){function r(r){var i=t.call(this,r)||this;return i.t=new n.e([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428]),i.i=r,r&&void 0!==r.hash&&(i.t=r.hash.clone()),i}return o(r,t),r.prototype.u=function(){this.t=new n.e([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])},r.prototype.v=function(){var n=t.prototype.v.call(this);return n.nSigBytes-=4,n},r.prototype.clone=function(){return new r({hash:this.t,blockSize:this.O,data:this.l,nBytes:this.j})},r.hash=function(t,n){return new r(n).finalize(t)},r}(e.SHA256)})(),i})()}));