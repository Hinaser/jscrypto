!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.JsCrypto=t():n.JsCrypto=t()}(this,(function(){return function(){"use strict";var n={3354:function(n,t,r){r.d(t,{e:function(){return o}});var i=r(5720),e=r(9054),o=function(){function n(n,t){if(Array.isArray(n)||!n)return this.t=Array.isArray(n)?n:[],void(this.i="number"==typeof t?t:4*this.t.length);var r;if(n instanceof ArrayBuffer)r=new Uint8Array(n);else{if(!(n instanceof Uint8Array||n instanceof Int8Array||n instanceof Uint8ClampedArray||n instanceof Int16Array||n instanceof Uint16Array||n instanceof Int32Array||n instanceof Uint32Array||n instanceof Float32Array||n instanceof Float64Array))throw new Error("Invalid argument");r=new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}if(!r)return this.t=[],void(this.i=0);for(var i=r.byteLength,e=[],o=0;o<i;o++)e[o>>>2]|=r[o]<<24-o%4*8;this.t=e,this.i=i}return Object.defineProperty(n.prototype,"nSigBytes",{get:function(){return this.i},set:function(n){this.i=n},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"words",{get:function(){return this.t},enumerable:!1,configurable:!0}),n.prototype.toString=function(n){return n?n.stringify(this):i.p.stringify(this)},n.prototype.toUint8Array=function(){for(var n=this.t,t=this.i,r=new Uint8Array(t),i=0;i<t;i++)r[i]=n[i>>>2]>>>24-i%4*8&255;return r},n.prototype.concat=function(n){var t=n.words.slice(),r=n.nSigBytes;if(this.clamp(),this.i%4)for(var i=0;i<r;i++){var e=t[i>>>2]>>>24-i%4*8&255;this.t[this.i+i>>>2]|=e<<24-(this.i+i)%4*8}else for(i=0;i<r;i+=4)this.t[this.i+i>>>2]=t[i>>>2];return this.i+=r,this},n.prototype.clamp=function(){var n=this.i;this.t[n>>>2]&=4294967295<<32-n%4*8,this.t.length=Math.ceil(n/4)},n.prototype.clone=function(){return new n(this.t.slice(),this.i)},n.random=function(t){for(var r=[],i=0;i<t;i+=4)r.push((0,e.M)());return new n(r,t)},n}()},6957:function(n,t,r){r.d(t,{r:function(){return o}});var i=r(5720),e=r(3354),o=function(){function n(n,t){this.high=n,this.low=t}return n.prototype.clone=function(){return new n(this.high,this.low)},n}();!function(){function n(n,t){this.t=n||[],this.i="number"==typeof t?t:8*this.t.length}Object.defineProperty(n.prototype,"nSigBytes",{get:function(){return this.i},set:function(n){this.i=n},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"words",{get:function(){return this.t},enumerable:!1,configurable:!0}),n.prototype.to32=function(){for(var n=[],t=0;t<this.t.length;t++){var r=this.t[t];n.push(r.high),n.push(r.low)}return new e.e(n,this.i)},n.prototype.toString=function(n){return n?n.stringify(this.to32()):i.p.stringify(this.to32())},n.prototype.clone=function(){for(var t=this.t.slice(),r=0;r<t.length;r++)t[r]=t[r].clone();return new n(t,this.i)}}()},7211:function(n,t,r){r.d(t,{C:function(){return o}});var i=r(3354),e=r(4768),o=function(){function n(n){this.u=0,this.h=0,this.v=n,this.l=n&&void 0!==n.data?n.data.clone():new i.e,this.j=n&&"number"==typeof n.nBytes?n.nBytes:0}return Object.defineProperty(n.prototype,"blockSize",{get:function(){return this.h},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,t){this.l=void 0!==n?n.clone():new i.e,this.j="number"==typeof t?t:0},n.prototype.A=function(n){var t="string"==typeof n?e.d.parse(n):n;this.l.concat(t),this.j+=t.nSigBytes},n.prototype.O=function(n){var t,r=this.l.words,e=this.l.nSigBytes,o=this.h,u=e/(4*this.h),f=(u=n?Math.ceil(u):Math.max((0|u)-this.u,0))*o,a=Math.min(4*f,e);if(f){for(var c=0;c<f;c+=o)this.U(r,c);t=r.splice(0,f),this.l.nSigBytes-=a}return new i.e(t,a)},n.prototype.U=function(n,t){throw new Error("Not implemented")},n}()},1868:function(n,t,r){r.d(t,{P:function(){return u}});var i,e=r(7211),o=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),u=function(n){function t(t){var r=n.call(this,t)||this;return r.h=16,r.v=t,t&&"number"==typeof t.blockSize&&(r.h=t.blockSize),r.reset(t?t.data:void 0,t?t.nBytes:void 0),r}return o(t,n),Object.defineProperty(t.prototype,"blockSize",{get:function(){return this.h},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,r){n.prototype.reset.call(this,t,r),this.I()},t.prototype.update=function(n){return this.A(n),this.O(),this},t.prototype.finalize=function(n){return n&&this.A(n),this.S()},t.prototype.I=function(){throw new Error("Not implemented")},t.prototype.S=function(){throw new Error("Not implemented")},t}(e.C)},1756:function(n,t,r){r.d(t,{w:function(){return u}});var i,e="undefined"!=typeof navigator&&navigator.userAgent?navigator.userAgent.toLowerCase():"",o=(i=parseInt((/msie (\d+)/.exec(e)||[])[1],10),isNaN(i)?(i=parseInt((/trident\/.*; rv:(\d+)/.exec(e)||[])[1],10),!isNaN(i)&&i):i);function u(n,t){return!1!==o&&(!t||("<"===n?o<t:"<="===n?o<=t:">"===n?o>t:">="===n?o>=t:o===t))}},5720:function(n,t,r){r.d(t,{p:function(){return e}});var i=r(3354),e={stringify:function(n){for(var t=n.nSigBytes,r=n.words,i=[],e=0;e<t;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(n){var t=n.length;if(t%2!=0)throw new Error("Hex string count must be even");for(var r=[],e=0;e<t;e+=2)r[e>>>3]|=parseInt(n.substr(e,2),16)<<24-e%8*4;return new i.e(r,t/2)}}},8702:function(n,t,r){r.d(t,{m:function(){return e}});var i=r(3354),e={stringify:function(n){for(var t=n.nSigBytes,r=n.words,i=[],e=0;e<t;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(n){for(var t=n.length,r=[],e=0;e<t;e++)r[e>>>2]|=(255&n.charCodeAt(e))<<24-e%4*8;return new i.e(r,t)}}},4768:function(n,t,r){r.d(t,{d:function(){return e}});var i=r(8702),e={stringify:function(n){try{return decodeURIComponent(escape(i.m.stringify(n)))}catch(n){throw new Error("Malformed UTF-8 data")}},parse:function(n){return i.m.parse(unescape(encodeURIComponent(n)))}}},9054:function(n,t,r){r.d(t,{M:function(){return e}});var i=r(1756);var e=function(){if("undefined"!=typeof window){var n=window.crypto||window.msCrypto;if(!n){if((0,i.w)("<",11))return console.warn("IE <= 10 uses insecure random generator. Please consider to use IE11 or another modern browser"),function(){return Math.floor(512*Math.random())%256};throw new Error("Crypto module not found")}return function(){return n.getRandomValues(new Uint32Array(1))[0]}}return void 0!==r.g&&r.g.crypto?function(){return r.g.crypto.randomBytes(4).readInt32LE()}:function(){var n="crypt";return n+=String.fromCharCode(111),require(n).randomBytes(4).readInt32LE()}}()}},t={};function r(i){var e=t[i];if(void 0!==e)return e.exports;var o=t[i]={exports:{}};return n[i](o,o.exports,r),o.exports}r.d=function(n,t){for(var i in t)r.o(t,i)&&!r.o(n,i)&&Object.defineProperty(n,i,{enumerable:!0,get:t[i]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"_",{value:!0})};var i={};return function(){r.r(i),r.d(i,{SHA3:function(){return h}});var n,t=r(6957),e=r(1868),o=r(3354),u=(n=function(t,r){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(t,r)},function(t,r){function i(){this.constructor=t}n(t,r),t.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}),f=[],a=[],c=[];!function(){for(var n=1,r=0,i=0;i<24;i++){f[n+5*r]=(i+1)*(i+2)/2%64;var e=(2*n+3*r)%5;n=r%5,r=e}for(var o=0;o<5;o++)for(var u=0;u<5;u++)a[o+5*u]=u+(2*o+3*u)%5*5;for(var s=1,h=0;h<24;h++){for(var v=0,w=0,d=0;d<7;d++){if(1&s){var b=(1<<d)-1;b<32?w^=1<<b:v^=1<<b-32}128&s?s=s<<1^113:s<<=1}c[h]=new t.r(v,w)}}();var s=[];!function(){for(var n=0;n<25;n++)s[n]=new t.r(0,0)}();var h=function(n){function r(r){var i=n.call(this,r)||this;if(i.h=32,i.N=[],i.B=512,i.v=r,r){if(void 0!==r.outputLength){if(![224,256,384,512].includes(r.outputLength))throw new Error("Unsupported output length.");i.B=r.outputLength}void 0!==r.state&&(i.N=r.state.map((function(n){return n.clone()})))}if(0===i.N.length)for(var e=0;e<25;e++)i.N[e]=new t.r(0,0);return i.h=(1600-2*i.B)/32,i}return u(r,n),r.prototype.I=function(){this.N=[];for(var n=0;n<25;n++)this.N[n]=new t.r(0,0);this.h=(1600-2*this.B)/32},r.prototype.U=function(n,t){for(var r=this.N,i=this.h/2,e=0;e<i;e++){var o=n[t+2*e],u=n[t+2*e+1];o=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),u=16711935&(u<<8|u>>>24)|4278255360&(u<<24|u>>>8),r[e].high^=u,r[e].low^=o}for(var h=0;h<24;h++){for(var v=0;v<5;v++){for(var w=0,d=0,b=0;b<5;b++){w^=(E=r[v+5*b]).high,d^=E.low}var l=s[v];l.high=w,l.low=d}for(v=0;v<5;v++){var y=s[(v+4)%5],p=s[(v+1)%5],m=p.high,g=p.low;for(w=y.high^(m<<1|g>>>31),d=y.low^(g<<1|m>>>31),b=0;b<5;b++){(E=r[v+5*b]).high^=w,E.low^=d}}for(var j=1;j<25;j++){w=void 0,d=void 0;var A=r[j].high,O=r[j].low,U=f[j];U<32?(w=A<<U|O>>>32-U,d=O<<U|A>>>32-U):(w=O<<U-32|A>>>64-U,d=A<<U-32|O>>>64-U);var I=s[a[j]];I.high=w,I.low=d}var M=s[0],S=r[0];M.high=S.high,M.low=S.low;for(v=0;v<5;v++)for(b=0;b<5;b++){var E=r[j=v+5*b],_=s[j],N=s[(v+1)%5+5*b],x=s[(v+2)%5+5*b];E.high=_.high^~N.high&x.high,E.low=_.low^~N.low&x.low}var C=r[0],B=c[h];C.high^=B.high,C.low^=B.low}},r.prototype.S=function(){var n=this.l,t=n.words,r=8*n.nSigBytes,i=32*this.blockSize;t[r>>>5]|=1<<24-r%32,t[(Math.ceil((r+1)/i)*i>>>5)-1]|=128,n.nSigBytes=4*t.length,this.O();for(var e=this.N,u=this.B/8,f=u/8,a=[],c=0;c<f;c++){var s=e[c],h=s.high,v=s.low;h=16711935&(h<<8|h>>>24)|4278255360&(h<<24|h>>>8),v=16711935&(v<<8|v>>>24)|4278255360&(v<<24|v>>>8),a.push(v),a.push(h)}return new o.e(a,u)},r.prototype.clone=function(){return new r({outputLength:this.B,state:this.N,blockSize:this.h,data:this.l,nBytes:this.j})},r.hash=function(n,t){return new r(t).finalize(n)},r}(e.P)}(),i}()}));