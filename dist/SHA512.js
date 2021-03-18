!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.JsCrypto=t():n.JsCrypto=t()}(this,(function(){return function(n){var t={};function e(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return n[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=n,e.c=t,e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:r})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"u",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.u)return n;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var i in n)e.d(r,i,function(t){return n[t]}.bind(null,i));return r},e.n=function(n){var t=n&&n.u?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=22)}([function(n,t,e){"use strict";e.d(t,"a",(function(){return o})),e.d(t,"b",(function(){return u}));var r=e(2),i=e(1),o=function(){function n(n,t){this.high=n,this.low=t}return n.prototype.clone=function(){return new n(this.high,this.low)},n}(),u=function(){function n(n,t){this.h=n||[],this.v="number"==typeof t?t:8*this.h.length}return Object.defineProperty(n.prototype,"nSigBytes",{get:function(){return this.v},set:function(n){this.v=n},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"words",{get:function(){return this.h},enumerable:!1,configurable:!0}),n.prototype.to32=function(){for(var n=[],t=0;t<this.h.length;t++){var e=this.h[t];n.push(e.high),n.push(e.low)}return new i.a(n,this.v)},n.prototype.toString=function(n){return n?n.stringify(this.to32()):r.a.stringify(this.to32())},n.prototype.clone=function(){for(var t=this.h.slice(),e=0;e<t.length;e++)t[e]=t[e].clone();return new n(t,this.v)},n}()},function(n,t,e){"use strict";e.d(t,"a",(function(){return o}));var r=e(2),i=e(7),o=function(){function n(n,t){if(Array.isArray(n)||!n)return this.h=Array.isArray(n)?n:[],void(this.v="number"==typeof t?t:4*this.h.length);var e;if(n instanceof ArrayBuffer)e=new Uint8Array(n);else{if(!(n instanceof Uint8Array||n instanceof Int8Array||n instanceof Uint8ClampedArray||n instanceof Int16Array||n instanceof Uint16Array||n instanceof Int32Array||n instanceof Uint32Array||n instanceof Float32Array||n instanceof Float64Array))throw new Error("Invalid argument");e=new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}if(!e)return this.h=[],void(this.v=0);for(var r=e.byteLength,i=[],o=0;o<r;o++)i[o>>>2]|=e[o]<<24-o%4*8;this.h=i,this.v=r}return Object.defineProperty(n.prototype,"nSigBytes",{get:function(){return this.v},set:function(n){this.v=n},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"words",{get:function(){return this.h},enumerable:!1,configurable:!0}),n.prototype.toString=function(n){return n?n.stringify(this):r.a.stringify(this)},n.prototype.toUint8Array=function(){for(var n=this.h,t=this.v,e=new Uint8Array(t),r=0;r<t;r++)e[r]=n[r>>>2]>>>24-r%4*8&255;return e},n.prototype.concat=function(n){var t=n.words.slice(),e=n.nSigBytes;if(this.clamp(),this.v%4)for(var r=0;r<e;r++){var i=t[r>>>2]>>>24-r%4*8&255;this.h[this.v+r>>>2]|=i<<24-(this.v+r)%4*8}else for(r=0;r<e;r+=4)this.h[this.v+r>>>2]=t[r>>>2];return this.v+=e,this},n.prototype.clamp=function(){var n=this.v;this.h[n>>>2]&=4294967295<<32-n%4*8,this.h.length=Math.ceil(n/4)},n.prototype.clone=function(){return new n(this.h.slice(),this.v)},n.random=function(t){for(var e=[],r=0;r<t;r+=4)e.push(Object(i.a)());return new n(e,t)},n}()},function(n,t,e){"use strict";e.d(t,"a",(function(){return i}));var r=e(1),i={stringify:function(n){for(var t=n.nSigBytes,e=n.words,r=[],i=0;i<t;i++){var o=e[i>>>2]>>>24-i%4*8&255;r.push((o>>>4).toString(16)),r.push((15&o).toString(16))}return r.join("")},parse:function(n){for(var t=n.length,e=[],i=0;i<t;i+=2)e[i>>>3]|=parseInt(n.substr(i,2),16)<<24-i%8*4;return new r.a(e,t/2)}}},function(n,t,e){"use strict";e.d(t,"a",(function(){return i}));var r=e(1),i={stringify:function(n){for(var t=n.nSigBytes,e=n.words,r=[],i=0;i<t;i++){var o=e[i>>>2]>>>24-i%4*8&255;r.push(String.fromCharCode(o))}return r.join("")},parse:function(n){for(var t=n.length,e=[],i=0;i<t;i++)e[i>>>2]|=(255&n.charCodeAt(i))<<24-i%4*8;return new r.a(e,t)}}},function(n,t,e){"use strict";e.d(t,"a",(function(){return i}));var r=e(3),i={stringify:function(n){try{return decodeURIComponent(escape(r.a.stringify(n)))}catch(n){throw new Error("Malformed UTF-8 data")}},parse:function(n){return r.a.parse(unescape(encodeURIComponent(n)))}}},,function(n,t,e){"use strict";e.d(t,"a",(function(){return o}));var r=e(1),i=e(4),o=function(){function n(n){this.j=0,this.g=0,this.A=n,this.O=n&&void 0!==n.data?n.data.clone():new r.a,this.S=n&&"number"==typeof n.nBytes?n.nBytes:0}return Object.defineProperty(n.prototype,"blockSize",{get:function(){return this.g},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,t){this.O=void 0!==n?n.clone():new r.a,this.S="number"==typeof t?t:0},n.prototype.U=function(n){var t="string"==typeof n?i.a.parse(n):n;this.O.concat(t),this.S+=t.nSigBytes},n.prototype._=function(n){var t,e=this.O.words,i=this.O.nSigBytes,o=this.g,u=i/(4*this.g),f=(u=n?Math.ceil(u):Math.max((0|u)-this.j,0))*o,c=Math.min(4*f,i);if(f){for(var s=0;s<f;s+=o)this.M(e,s);t=e.splice(0,f),this.O.nSigBytes-=c}return new r.a(t,c)},n.prototype.M=function(n,t){throw new Error("Not implemented")},n}()},function(n,t,e){"use strict";(function(n){e.d(t,"a",(function(){return r}));var r=function(){if("undefined"!=typeof window){var t=window.crypto||window.msCrypto;if(!t)throw new Error("Crypto module not found");return function(){return t.getRandomValues(new Uint32Array(1))[0]}}return void 0!==n&&n.crypto?function(){return n.crypto.randomBytes(4).readInt32LE()}:function(){var n="crypt";return n+=String.fromCharCode(111),require(n).randomBytes(4).readInt32LE()}}()}).call(this,e(13))},function(n,t,e){"use strict";e.d(t,"a",(function(){return u}));var r,i=e(6),o=(r=function(n,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])})(n,t)},function(n,t){function e(){this.constructor=n}r(n,t),n.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}),u=function(n){function t(t){var e=n.call(this,t)||this;return e.g=16,e.A=t,t&&"number"==typeof t.blockSize&&(e.g=t.blockSize),e.reset(t?t.data:void 0,t?t.nBytes:void 0),e}return o(t,n),Object.defineProperty(t.prototype,"blockSize",{get:function(){return this.g},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,e){n.prototype.reset.call(this,t,e),this.I()},t.prototype.update=function(n){return this.U(n),this._(),this},t.prototype.finalize=function(n){return n&&this.U(n),this.B()},t.prototype.I=function(){throw new Error("Not implemented")},t.prototype.B=function(){throw new Error("Not implemented")},t}(i.a)},,,,,function(n,t){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(n){"object"==typeof window&&(e=window)}n.exports=e},,,,,,,,,function(n,t,e){"use strict";e.r(t),e.d(t,"SHA512",(function(){return s}));var r,i=e(8),o=e(0),u=(r=function(n,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])})(n,t)},function(n,t){function e(){this.constructor=n}r(n,t),n.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}),f=[new o.a(1116352408,3609767458),new o.a(1899447441,602891725),new o.a(3049323471,3964484399),new o.a(3921009573,2173295548),new o.a(961987163,4081628472),new o.a(1508970993,3053834265),new o.a(2453635748,2937671579),new o.a(2870763221,3664609560),new o.a(3624381080,2734883394),new o.a(310598401,1164996542),new o.a(607225278,1323610764),new o.a(1426881987,3590304994),new o.a(1925078388,4068182383),new o.a(2162078206,991336113),new o.a(2614888103,633803317),new o.a(3248222580,3479774868),new o.a(3835390401,2666613458),new o.a(4022224774,944711139),new o.a(264347078,2341262773),new o.a(604807628,2007800933),new o.a(770255983,1495990901),new o.a(1249150122,1856431235),new o.a(1555081692,3175218132),new o.a(1996064986,2198950837),new o.a(2554220882,3999719339),new o.a(2821834349,766784016),new o.a(2952996808,2566594879),new o.a(3210313671,3203337956),new o.a(3336571891,1034457026),new o.a(3584528711,2466948901),new o.a(113926993,3758326383),new o.a(338241895,168717936),new o.a(666307205,1188179964),new o.a(773529912,1546045734),new o.a(1294757372,1522805485),new o.a(1396182291,2643833823),new o.a(1695183700,2343527390),new o.a(1986661051,1014477480),new o.a(2177026350,1206759142),new o.a(2456956037,344077627),new o.a(2730485921,1290863460),new o.a(2820302411,3158454273),new o.a(3259730800,3505952657),new o.a(3345764771,106217008),new o.a(3516065817,3606008344),new o.a(3600352804,1432725776),new o.a(4094571909,1467031594),new o.a(275423344,851169720),new o.a(430227734,3100823752),new o.a(506948616,1363258195),new o.a(659060556,3750685593),new o.a(883997877,3785050280),new o.a(958139571,3318307427),new o.a(1322822218,3812723403),new o.a(1537002063,2003034995),new o.a(1747873779,3602036899),new o.a(1955562222,1575990012),new o.a(2024104815,1125592928),new o.a(2227730452,2716904306),new o.a(2361852424,442776044),new o.a(2428436474,593698344),new o.a(2756734187,3733110249),new o.a(3204031479,2999351573),new o.a(3329325298,3815920427),new o.a(3391569614,3928383900),new o.a(3515267271,566280711),new o.a(3940187606,3454069534),new o.a(4118630271,4000239992),new o.a(116418474,1914138554),new o.a(174292421,2731055270),new o.a(289380356,3203993006),new o.a(460393269,320620315),new o.a(685471733,587496836),new o.a(852142971,1086792851),new o.a(1017036298,365543100),new o.a(1126000580,2618297676),new o.a(1288033470,3409855158),new o.a(1501505948,4234509866),new o.a(1607167915,987167468),new o.a(1816402316,1246189591)],c=[];!function(){for(var n=0;n<80;n++)c[n]=new o.a(0,0)}();var s=function(n){function t(t){var e=n.call(this,t)||this;return e.g=32,e.C=new o.b([new o.a(1779033703,4089235720),new o.a(3144134277,2227873595),new o.a(1013904242,4271175723),new o.a(2773480762,1595750129),new o.a(1359893119,2917565137),new o.a(2600822924,725511199),new o.a(528734635,4215389547),new o.a(1541459225,327033209)]),e.A=t,t&&void 0!==t.hash&&(e.C=t.hash.clone()),e}return u(t,n),t.prototype.I=function(){this.C=new o.b([new o.a(1779033703,4089235720),new o.a(3144134277,2227873595),new o.a(1013904242,4271175723),new o.a(2773480762,1595750129),new o.a(1359893119,2917565137),new o.a(2600822924,725511199),new o.a(528734635,4215389547),new o.a(1541459225,327033209)])},t.prototype.M=function(n,t){for(var e=this.C.words,r=e[0],i=e[1],o=e[2],u=e[3],s=e[4],w=e[5],a=e[6],h=e[7],v=r.high,b=r.low,l=i.high,y=i.low,d=o.high,p=o.low,m=u.high,j=u.low,g=s.high,A=s.low,O=w.high,S=w.low,U=a.high,_=a.low,M=h.high,I=h.low,E=v,x=b,B=l,C=y,F=d,k=p,z=m,N=j,R=g,q=A,H=O,T=S,D=U,G=_,J=M,K=I,L=0;L<80;L++){var P=void 0,Q=void 0,V=c[L];if(L<16)Q=V.high=0|n[t+2*L],P=V.low=0|n[t+2*L+1];else{var W=c[L-15],X=W.high,Y=W.low,Z=(X>>>1|Y<<31)^(X>>>8|Y<<24)^X>>>7,$=(Y>>>1|X<<31)^(Y>>>8|X<<24)^(Y>>>7|X<<25),nn=c[L-2],tn=nn.high,en=nn.low,rn=(tn>>>19|en<<13)^(tn<<3|en>>>29)^tn>>>6,on=(en>>>19|tn<<13)^(en<<3|tn>>>29)^(en>>>6|tn<<26),un=c[L-7],fn=un.high,cn=un.low,sn=c[L-16],wn=sn.high,an=sn.low;Q=(Q=(Q=Z+fn+((P=$+cn)>>>0<$>>>0?1:0))+rn+((P+=on)>>>0<on>>>0?1:0))+wn+((P+=an)>>>0<an>>>0?1:0),V.high=Q,V.low=P}var hn=R&H^~R&D,vn=q&T^~q&G,bn=E&B^E&F^B&F,ln=x&C^x&k^C&k,yn=(E>>>28|x<<4)^(E<<30|x>>>2)^(E<<25|x>>>7),dn=(x>>>28|E<<4)^(x<<30|E>>>2)^(x<<25|E>>>7),pn=(R>>>14|q<<18)^(R>>>18|q<<14)^(R<<23|q>>>9),mn=(q>>>14|R<<18)^(q>>>18|R<<14)^(q<<23|R>>>9),jn=f[L],gn=jn.high,An=jn.low,On=K+mn,Sn=J+pn+(On>>>0<K>>>0?1:0),Un=dn+ln;J=D,K=G,D=H,G=T,H=R,T=q,R=z+(Sn=(Sn=(Sn=Sn+hn+((On+=vn)>>>0<vn>>>0?1:0))+gn+((On+=An)>>>0<An>>>0?1:0))+Q+((On+=P)>>>0<P>>>0?1:0))+((q=N+On|0)>>>0<N>>>0?1:0)|0,z=F,N=k,F=B,k=C,B=E,C=x,E=Sn+(yn+bn+(Un>>>0<dn>>>0?1:0))+((x=On+Un|0)>>>0<On>>>0?1:0)|0}b=r.low=b+x,r.high=v+E+(b>>>0<x>>>0?1:0),y=i.low=y+C,i.high=l+B+(y>>>0<C>>>0?1:0),p=o.low=p+k,o.high=d+F+(p>>>0<k>>>0?1:0),j=u.low=j+N,u.high=m+z+(j>>>0<N>>>0?1:0),A=s.low=A+q,s.high=g+R+(A>>>0<q>>>0?1:0),S=w.low=S+T,w.high=O+H+(S>>>0<T>>>0?1:0),_=a.low=_+G,a.high=U+D+(_>>>0<G>>>0?1:0),I=h.low=I+K,h.high=M+J+(I>>>0<K>>>0?1:0)},t.prototype.B=function(){var n=this.O,t=n.words,e=8*this.S,r=8*n.nSigBytes;return t[r>>>5]|=128<<24-r%32,t[30+(r+128>>>10<<5)]=Math.floor(e/4294967296),t[31+(r+128>>>10<<5)]=e,n.nSigBytes=4*t.length,this._(),this.C.to32()},t.prototype.clone=function(){return new t({hash:this.C,blockSize:this.g,data:this.O,nBytes:this.S})},t.hash=function(n,e){return new t(e).finalize(n)},t}(i.a)}])}));