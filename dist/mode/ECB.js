!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.mode=t():(n.JsCrypto=n.JsCrypto||{},n.JsCrypto.mode=t())}(this,(function(){return function(n){var t={};function e(u){if(t[u])return t[u].exports;var r=t[u]={i:u,l:!1,exports:{}};return n[u].call(r.exports,r,r.exports,e),r.l=!0,r.exports}return e.m=n,e.c=t,e.d=function(n,t,u){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:u})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"u",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.u)return n;var u=Object.create(null);if(e.r(u),Object.defineProperty(u,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var r in n)e.d(u,r,function(t){return n[t]}.bind(null,r));return u},e.n=function(n){var t=n&&n.u?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=4)}([function(n,t,e){"use strict";e.d(t,"a",(function(){return u}));var u=function(){function n(n){this.h=n,this.j=n.cipher,this.v=n.iv}return n.prototype.processBlock=function(n,t){},n.createEncryptor=function(n){throw new Error("Not implemented yet")},n.createDecryptor=function(n){throw new Error("Not implemented yet")},n}()},,,,function(n,t,e){"use strict";e.r(t),e.d(t,"ECB",(function(){return i}));var u,r=e(0),o=(u=function(n,t){return(u=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])})(n,t)},function(n,t){function e(){this.constructor=n}u(n,t),n.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}),i=function(n){function t(t){return n.call(this,t)||this}return o(t,n),t.createEncryptor=function(n){return new t.Encryptor(n)},t.createDecryptor=function(n){return new t.Decryptor(n)},t.Encryptor=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return o(t,n),t.prototype.processBlock=function(n,t){this.j.encryptBlock(n,t)},t}(t),t.Decryptor=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return o(t,n),t.prototype.processBlock=function(n,t){this.j.decryptBlock(n,t)},t}(t),t}(r.a)}])}));