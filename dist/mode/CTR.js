!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.JsCrypto=n():(t.JsCrypto=t.JsCrypto||{},t.JsCrypto.mode=n())}(this,(function(){return(()=>{"use strict";var t={d:(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},o:(t,n)=>Object.prototype.hasOwnProperty.call(t,n),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"t",{value:!0})}},n={};t.r(n),t.d(n,{CTR:()=>i});var e,o=function(){function t(t){this.i=t,this.u=t.cipher,this.h=t.iv}return t.prototype.processBlock=function(t,n){},t.createEncryptor=function(t){throw new Error("Not implemented yet")},t.createDecryptor=function(t){throw new Error("Not implemented yet")},t}(),r=(e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e])})(t,n)},function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}),i=function(t){function n(n){var e=t.call(this,n)||this;return e.l=[],e}return r(n,t),n.createEncryptor=function(t){return new n.Encryptor(t)},n.createDecryptor=function(t){return new n.Decryptor(t)},n.Encryptor=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return r(n,t),n.prototype.processBlock=function(t,n){var e=this.u,o=e.blockSize,r=this.h,i=this.l;r&&(i=this.l=r.slice(0),this.h=void 0);var u=i.slice(0);e.encryptBlock(u,0),i[o-1]=i[o-1]+1|0;for(var f=0;f<o;f++)t[n+f]^=u[f]},n}(n),n.Decryptor=n.Encryptor,n}(o);return n})()}));