!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.JsCrypto=n():t.JsCrypto=n()}(this,(function(){return function(t){var n={};function r(i){if(n[i])return n[i].exports;var e=n[i]={i:i,l:!1,exports:{}};return t[i].call(e.exports,e,e.exports,r),e.l=!0,e.exports}return r.m=t,r.c=n,r.d=function(t,n,i){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:i})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"u",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.u)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var e in t)r.d(i,e,function(n){return t[n]}.bind(null,e));return i},r.n=function(t){var n=t&&t.u?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="",r(r.s=17)}([,function(t,n,r){"use strict";r.d(n,"a",(function(){return u}));var i=r(3),e=r(5),u=function(){function t(t,n){this.h=t||[],this.v="number"==typeof n?n:4*this.h.length}return Object.defineProperty(t.prototype,"nSigBytes",{get:function(){return this.v},set:function(t){this.v=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"words",{get:function(){return this.h},enumerable:!1,configurable:!0}),t.prototype.toString=function(t){return t?t.stringify(this):i.a.stringify(this)},t.prototype.concat=function(t){var n=t.words.slice(),r=t.nSigBytes;if(this.clamp(),this.v%4)for(var i=0;i<r;i++){var e=n[i>>>2]>>>24-i%4*8&255;this.h[this.v+i>>>2]|=e<<24-(this.v+i)%4*8}else for(i=0;i<r;i+=4)this.h[this.v+i>>>2]=n[i>>>2];return this.v+=r,this},t.prototype.clamp=function(){var t=this.v;this.h[t>>>2]&=4294967295<<32-t%4*8,this.h.length=Math.ceil(t/4)},t.prototype.clone=function(){return new t(this.h.slice(),this.v)},t.random=function(n){for(var r=[],i=0;i<n;i++)r.push(Object(e.a)());return new t(r,n)},t}()},function(t,n,r){"use strict";r.d(n,"a",(function(){return e}));var i=r(1),e={stringify:function(t){for(var n=t.nSigBytes,r=t.words,i=[],e=0;e<n;e++){var u=r[e>>>2]>>>24-e%4*8&255;i.push(String.fromCharCode(u))}return i.join("")},parse:function(t){for(var n=t.length,r=[],e=0;e<n;e++)r[e>>>2]|=(255&t.charCodeAt(e))<<24-e%4*8;return new i.a(r,n)}}},function(t,n,r){"use strict";r.d(n,"a",(function(){return e}));var i=r(1),e={stringify:function(t){for(var n=t.nSigBytes,r=t.words,i=[],e=0;e<n;e++){var u=r[e>>>2]>>>24-e%4*8&255;i.push((u>>>4).toString(16)),i.push((15&u).toString(16))}return i.join("")},parse:function(t){for(var n=t.length,r=[],e=0;e<n;e+=2)r[e>>>3]|=parseInt(t.substr(e,2),16)<<24-e%8*4;return new i.a(r,n/2)}}},function(t,n,r){"use strict";r.d(n,"a",(function(){return e}));var i=r(2),e={stringify:function(t){try{return decodeURIComponent(escape(i.a.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return i.a.parse(unescape(encodeURIComponent(t)))}}},function(t,n,r){"use strict";(function(t){r.d(n,"a",(function(){return i}));var i=function(){if("undefined"!=typeof window){var n=window.crypto||window.msCrypto;if(!n)throw new Error("Crypto module not found");return function(){return n.getRandomValues(new Uint32Array(1))[0]}}return void 0!==t&&t.crypto?function(){return t.crypto.randomBytes(4).readInt32LE()}:function(){return require("crypto").randomBytes(4).readInt32LE()}}()}).call(this,r(8))},function(t,n,r){"use strict";r.d(n,"a",(function(){return o}));var i,e=r(7),u=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),o=function(t){function n(n){var r=t.call(this,n)||this;return r.j=16,r.g=n,n&&"number"==typeof n.blockSize&&(r.j=n.blockSize),r.reset(n?n.data:void 0,n?n.nBytes:void 0),r}return u(n,t),Object.defineProperty(n.prototype,"blockSize",{get:function(){return this.j},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,r){t.prototype.reset.call(this,n,r),this.O()},n.prototype.update=function(t){return this.M(t),this._(),this},n.prototype.finalize=function(t){return t&&this.M(t),this.S()},n.prototype.O=function(){throw new Error("Not implemented")},n.prototype.S=function(){throw new Error("Not implemented")},n}(e.a)},function(t,n,r){"use strict";r.d(n,"a",(function(){return u}));var i=r(1),e=r(4),u=function(){function t(t){this.U=0,this.j=0,this.g=t,this.k=t&&void 0!==t.data?t.data.clone():new i.a,this.A=t&&"number"==typeof t.nBytes?t.nBytes:0}return Object.defineProperty(t.prototype,"blockSize",{get:function(){return this.j},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,n){this.k=void 0!==t?t.clone():new i.a,this.A="number"==typeof n?n:0},t.prototype.M=function(t){var n="string"==typeof t?e.a.parse(t):t;this.k.concat(n),this.A+=n.nSigBytes},t.prototype._=function(t){var n,r=this.k.words,e=this.k.nSigBytes,u=this.j,o=e/(4*this.j),f=(o=t?Math.ceil(o):Math.max((0|o)-this.U,0))*u,c=Math.min(4*f,e);if(f){for(var s=0;s<f;s+=u)this.C(r,s);n=r.splice(0,f),this.k.nSigBytes-=c}return new i.a(n,c)},t.prototype.C=function(t,n){throw new Error("Not implemented")},t}()},function(t,n){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,n,r){"use strict";r.r(n),r.d(n,"Hmac",(function(){return e}));var i=r(4),e=function(){function t(t,n){this.I=t,"string"==typeof n&&(n=i.a.parse(n));var r=t.blockSize,e=4*r;n.nSigBytes>e&&(n=t.finalize(n)),n.clamp();for(var u=this.N=n.clone(),o=this.B=n.clone(),f=u.words,c=o.words,s=0;s<r;s++)f[s]^=1549556828,c[s]^=909522486;o.nSigBytes=r,u.nSigBytes=r,this.reset()}return t.prototype.reset=function(){this.I.reset(),this.I.update(this.B)},t.prototype.update=function(t){return this.I.update(t),this},t.prototype.finalize=function(t){var n=this.I.finalize(t);return this.I.reset(),this.I.finalize(this.N.clone().concat(n))},t}()},,,function(t,n,r){"use strict";r.r(n),r.d(n,"MD5",(function(){return v}));var i,e=r(1),u=r(6),o=(i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),f=[];function c(t,n,r,i,e,u,o){var f=t+(n&r|~n&i)+e+o;return(f<<u|f>>>32-u)+n}function s(t,n,r,i,e,u,o){var f=t+(n&i|r&~i)+e+o;return(f<<u|f>>>32-u)+n}function a(t,n,r,i,e,u,o){var f=t+(n^r^i)+e+o;return(f<<u|f>>>32-u)+n}function h(t,n,r,i,e,u,o){var f=t+(r^(n|~i))+e+o;return(f<<u|f>>>32-u)+n}!function(){for(var t=0;t<64;t++)f[t]=4294967296*Math.abs(Math.sin(t+1))|0}();var v=function(t){function n(n){var r=t.call(this,n)||this;return r.D=new e.a([1732584193,4023233417,2562383102,271733878]),n&&void 0!==n.hash&&(r.D=n.hash.clone()),r}return o(n,t),n.prototype.O=function(){this.D=new e.a([1732584193,4023233417,2562383102,271733878])},n.prototype.C=function(t,n){for(var r=0;r<16;r++){var i=n+r,e=t[i];t[i]=16711935&(e<<8|e>>>24)|4278255360&(e<<24|e>>>8)}var u=this.D.words,o=t[n],v=t[n+1],b=t[n+2],l=t[n+3],w=t[n+4],d=t[n+5],p=t[n+6],y=t[n+7],m=t[n+8],j=t[n+9],g=t[n+10],O=t[n+11],M=t[n+12],_=t[n+13],S=t[n+14],E=t[n+15],x=u[0],U=u[1],k=u[2],z=u[3];x=c(x,U,k,z,o,7,f[0]),z=c(z,x,U,k,v,12,f[1]),k=c(k,z,x,U,b,17,f[2]),U=c(U,k,z,x,l,22,f[3]),x=c(x,U,k,z,w,7,f[4]),z=c(z,x,U,k,d,12,f[5]),k=c(k,z,x,U,p,17,f[6]),U=c(U,k,z,x,y,22,f[7]),x=c(x,U,k,z,m,7,f[8]),z=c(z,x,U,k,j,12,f[9]),k=c(k,z,x,U,g,17,f[10]),U=c(U,k,z,x,O,22,f[11]),x=c(x,U,k,z,M,7,f[12]),z=c(z,x,U,k,_,12,f[13]),k=c(k,z,x,U,S,17,f[14]),x=s(x,U=c(U,k,z,x,E,22,f[15]),k,z,v,5,f[16]),z=s(z,x,U,k,p,9,f[17]),k=s(k,z,x,U,O,14,f[18]),U=s(U,k,z,x,o,20,f[19]),x=s(x,U,k,z,d,5,f[20]),z=s(z,x,U,k,g,9,f[21]),k=s(k,z,x,U,E,14,f[22]),U=s(U,k,z,x,w,20,f[23]),x=s(x,U,k,z,j,5,f[24]),z=s(z,x,U,k,S,9,f[25]),k=s(k,z,x,U,l,14,f[26]),U=s(U,k,z,x,m,20,f[27]),x=s(x,U,k,z,_,5,f[28]),z=s(z,x,U,k,b,9,f[29]),k=s(k,z,x,U,y,14,f[30]),x=a(x,U=s(U,k,z,x,M,20,f[31]),k,z,d,4,f[32]),z=a(z,x,U,k,m,11,f[33]),k=a(k,z,x,U,O,16,f[34]),U=a(U,k,z,x,S,23,f[35]),x=a(x,U,k,z,v,4,f[36]),z=a(z,x,U,k,w,11,f[37]),k=a(k,z,x,U,y,16,f[38]),U=a(U,k,z,x,g,23,f[39]),x=a(x,U,k,z,_,4,f[40]),z=a(z,x,U,k,o,11,f[41]),k=a(k,z,x,U,l,16,f[42]),U=a(U,k,z,x,p,23,f[43]),x=a(x,U,k,z,j,4,f[44]),z=a(z,x,U,k,M,11,f[45]),k=a(k,z,x,U,E,16,f[46]),x=h(x,U=a(U,k,z,x,b,23,f[47]),k,z,o,6,f[48]),z=h(z,x,U,k,y,10,f[49]),k=h(k,z,x,U,S,15,f[50]),U=h(U,k,z,x,d,21,f[51]),x=h(x,U,k,z,M,6,f[52]),z=h(z,x,U,k,l,10,f[53]),k=h(k,z,x,U,g,15,f[54]),U=h(U,k,z,x,v,21,f[55]),x=h(x,U,k,z,m,6,f[56]),z=h(z,x,U,k,E,10,f[57]),k=h(k,z,x,U,p,15,f[58]),U=h(U,k,z,x,_,21,f[59]),x=h(x,U,k,z,w,6,f[60]),z=h(z,x,U,k,O,10,f[61]),k=h(k,z,x,U,b,15,f[62]),U=h(U,k,z,x,j,21,f[63]),u[0]=u[0]+x|0,u[1]=u[1]+U|0,u[2]=u[2]+k|0,u[3]=u[3]+z|0},n.prototype.S=function(){var t=this.k,n=t.words,r=8*this.A,i=8*t.nSigBytes;n[i>>>5]|=128<<24-i%32;var e=Math.floor(r/4294967296),u=r;n[15+(i+64>>>9<<4)]=16711935&(e<<8|e>>>24)|4278255360&(e<<24|e>>>8),n[14+(i+64>>>9<<4)]=16711935&(u<<8|u>>>24)|4278255360&(u<<24|u>>>8),t.nSigBytes=4*(n.length+1),this._();for(var o=this.D,f=o.words,c=0;c<4;c++){var s=f[c];f[c]=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8)}return o},n.prototype.clone=function(){return new n({hash:this.D,blockSize:this.j,data:this.k,nBytes:this.A})},n.hash=function(t){return(new n).finalize(t)},n}(u.a)},,,,,function(t,n,r){"use strict";r.r(n),r.d(n,"HmacMD5",(function(){return u}));var i=r(9),e=r(12);function u(t,n){return new i.Hmac(new e.MD5,n).finalize(t)}}])}));