!function(n,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.pad=e():(n.JsCrypto=n.JsCrypto||{},n.JsCrypto.pad=e())}(this,(function(){return function(n){var e={};function t(r){if(e[r])return e[r].exports;var u=e[r]={i:r,l:!1,exports:{}};return n[r].call(u.exports,u,u.exports,t),u.l=!0,u.exports}return t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:r})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"u",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.u)return n;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var u in n)t.d(r,u,function(e){return n[e]}.bind(null,u));return r},t.n=function(n){var e=n&&n.u?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=4)}([function(n,e,t){"use strict";t.d(e,"a",(function(){return r}));var r={pad:function(n,e){var t=4*e;n.clamp(),n.setSignificantBytes(n.length()+t-(n.length()%t||t))},unpad:function(n){for(var e=n.raw(),t=n.length()-1;t>=0;t--)if(e[t>>>2]>>>24-t%4*8&255){n.setSignificantBytes(t+1);break}}}},,,,function(n,e,t){"use strict";t.r(e);var r=t(0);t.d(e,"Zero",(function(){return r.a}))}])}));