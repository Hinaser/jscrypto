!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.mode=t():(n.JsCrypto=n.JsCrypto||{},n.JsCrypto.mode=t())}(this,(function(){return function(n){var t={};function e(r){if(t[r])return t[r].exports;var u=t[r]={i:r,l:!1,exports:{}};return n[r].call(u.exports,u,u.exports,e),u.l=!0,u.exports}return e.m=n,e.c=t,e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:r})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"u",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.u)return n;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var u in n)e.d(r,u,function(t){return n[t]}.bind(null,u));return r},e.n=function(n){var t=n&&n.u?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=3)}([function(n,t,e){"use strict";e.d(t,"a",(function(){return r}));var r=function(){function n(n){this.h=n,this.v=n.cipher,this.j=n.iv}return n.prototype.processBlock=function(n,t){},n.createEncryptor=function(n){throw new Error("Not implemented yet")},n.createDecryptor=function(n){throw new Error("Not implemented yet")},n}()},,,function(n,t,e){"use strict";e.r(t),e.d(t,"CTR",(function(){return i}));var r,u=e(0),o=(r=function(n,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])})(n,t)},function(n,t){function e(){this.constructor=n}r(n,t),n.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}),i=function(n){function t(t){var e=n.call(this,t)||this;return e.O=[],e}return o(t,n),t.createEncryptor=function(n){return new t.Encryptor(n)},t.createDecryptor=function(n){return new t.Decryptor(n)},t.Encryptor=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return o(t,n),t.prototype.processBlock=function(n,t){var e=this.v,r=e.blockSize,u=this.j,o=this.O;u&&(o=this.O=u.slice(0),this.j=void 0);var i=o.slice(0);e.encryptBlock(i,0),o[r-1]=o[r-1]+1|0;for(var f=0;f<r;f++)n[t+f]^=i[f]},t}(t),t.Decryptor=t.Encryptor,t}(u.a)}])}));