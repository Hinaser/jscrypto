!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.JsCrypto=t():n.JsCrypto=t()}(this,(function(){return function(n){var t={};function e(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return n[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=n,e.c=t,e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:r})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"u",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.u)return n;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var i in n)e.d(r,i,function(t){return n[t]}.bind(null,i));return r},e.n=function(n){var t=n&&n.u?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=22)}([function(n,t,e){"use strict";e.d(t,"a",(function(){return u})),e.d(t,"b",(function(){return o}));var r=e(3),i=e(1),u=function(){function n(n,t){this.high=n,this.low=t}return n.prototype.clone=function(){return new n(this.high,this.low)},n}(),o=function(){function n(n,t){this.h=n||[],this.v="number"==typeof t?t:8*this.h.length}return Object.defineProperty(n.prototype,"nSigBytes",{get:function(){return this.v},set:function(n){this.v=n},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"words",{get:function(){return this.h},enumerable:!1,configurable:!0}),n.prototype.to32=function(){for(var n=[],t=0;t<this.h.length;t++){var e=this.h[t];n.push(e.high),n.push(e.low)}return new i.a(n,this.v)},n.prototype.toString=function(n){return n?n.stringify(this.to32()):r.a.stringify(this.to32())},n.prototype.clone=function(){for(var t=this.h.slice(),e=0;e<t.length;e++)t[e]=t[e].clone();return new n(t,this.v)},n}()},function(n,t,e){"use strict";e.d(t,"a",(function(){return u}));var r=e(3),i=e(5),u=function(){function n(n,t){this.h=n||[],this.v="number"==typeof t?t:4*this.h.length}return Object.defineProperty(n.prototype,"nSigBytes",{get:function(){return this.v},set:function(n){this.v=n},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"words",{get:function(){return this.h},enumerable:!1,configurable:!0}),n.prototype.toString=function(n){return n?n.stringify(this):r.a.stringify(this)},n.prototype.concat=function(n){var t=n.words.slice(),e=n.nSigBytes;if(this.clamp(),this.v%4)for(var r=0;r<e;r++){var i=t[r>>>2]>>>24-r%4*8&255;this.h[this.v+r>>>2]|=i<<24-(this.v+r)%4*8}else for(r=0;r<e;r+=4)this.h[this.v+r>>>2]=t[r>>>2];return this.v+=e,this},n.prototype.clamp=function(){var n=this.v;this.h[n>>>2]&=4294967295<<32-n%4*8,this.h.length=Math.ceil(n/4)},n.prototype.clone=function(){return new n(this.h.slice(),this.v)},n.random=function(t){for(var e=[],r=0;r<t;r++)e.push(Object(i.a)());return new n(e,t)},n}()},function(n,t,e){"use strict";e.d(t,"a",(function(){return i}));var r=e(1),i={stringify:function(n){for(var t=n.nSigBytes,e=n.words,r=[],i=0;i<t;i++){var u=e[i>>>2]>>>24-i%4*8&255;r.push(String.fromCharCode(u))}return r.join("")},parse:function(n){for(var t=n.length,e=[],i=0;i<t;i++)e[i>>>2]|=(255&n.charCodeAt(i))<<24-i%4*8;return new r.a(e,t)}}},function(n,t,e){"use strict";e.d(t,"a",(function(){return i}));var r=e(1),i={stringify:function(n){for(var t=n.nSigBytes,e=n.words,r=[],i=0;i<t;i++){var u=e[i>>>2]>>>24-i%4*8&255;r.push((u>>>4).toString(16)),r.push((15&u).toString(16))}return r.join("")},parse:function(n){for(var t=n.length,e=[],i=0;i<t;i+=2)e[i>>>3]|=parseInt(n.substr(i,2),16)<<24-i%8*4;return new r.a(e,t/2)}}},function(n,t,e){"use strict";e.d(t,"a",(function(){return i}));var r=e(2),i={stringify:function(n){try{return decodeURIComponent(escape(r.a.stringify(n)))}catch(n){throw new Error("Malformed UTF-8 data")}},parse:function(n){return r.a.parse(unescape(encodeURIComponent(n)))}}},function(n,t,e){"use strict";(function(n){e.d(t,"a",(function(){return r}));var r=function(){if("undefined"!=typeof window){var t=window.crypto||window.msCrypto;if(!t)throw new Error("Crypto module not found");return function(){return t.getRandomValues(new Uint32Array(1))[0]}}return void 0!==n&&n.crypto?function(){return n.crypto.randomBytes(4).readInt32LE()}:function(){return require("crypto").randomBytes(4).readInt32LE()}}()}).call(this,e(8))},function(n,t,e){"use strict";e.d(t,"a",(function(){return o}));var r,i=e(7),u=(r=function(n,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])})(n,t)},function(n,t){function e(){this.constructor=n}r(n,t),n.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}),o=function(n){function t(t){var e=n.call(this,t)||this;return e.j=16,e.g=t,t&&"number"==typeof t.blockSize&&(e.j=t.blockSize),e.reset(t?t.data:void 0,t?t.nBytes:void 0),e}return u(t,n),Object.defineProperty(t.prototype,"blockSize",{get:function(){return this.j},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,e){n.prototype.reset.call(this,t,e),this.O()},t.prototype.update=function(n){return this.S(n),this._(),this},t.prototype.finalize=function(n){return n&&this.S(n),this.M()},t.prototype.O=function(){throw new Error("Not implemented")},t.prototype.M=function(){throw new Error("Not implemented")},t}(i.a)},function(n,t,e){"use strict";e.d(t,"a",(function(){return u}));var r=e(1),i=e(4),u=function(){function n(n){this.A=0,this.j=0,this.g=n,this.H=n&&void 0!==n.data?n.data.clone():new r.a,this.U=n&&"number"==typeof n.nBytes?n.nBytes:0}return Object.defineProperty(n.prototype,"blockSize",{get:function(){return this.j},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,t){this.H=void 0!==n?n.clone():new r.a,this.U="number"==typeof t?t:0},n.prototype.S=function(n){var t="string"==typeof n?i.a.parse(n):n;this.H.concat(t),this.U+=t.nSigBytes},n.prototype._=function(n){var t,e=this.H.words,i=this.H.nSigBytes,u=this.j,o=i/(4*this.j),f=(o=n?Math.ceil(o):Math.max((0|o)-this.A,0))*u,c=Math.min(4*f,i);if(f){for(var s=0;s<f;s+=u)this.k(e,s);t=e.splice(0,f),this.H.nSigBytes-=c}return new r.a(t,c)},n.prototype.k=function(n,t){throw new Error("Not implemented")},n}()},function(n,t){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(n){"object"==typeof window&&(e=window)}n.exports=e},function(n,t,e){"use strict";e.r(t),e.d(t,"Hmac",(function(){return i}));var r=e(4),i=function(){function n(n,t){this.B=n,"string"==typeof t&&(t=r.a.parse(t));var e=n.blockSize,i=4*e;t.nSigBytes>i&&(t=n.finalize(t)),t.clamp();for(var u=this.C=t.clone(),o=this.I=t.clone(),f=u.words,c=o.words,s=0;s<e;s++)f[s]^=1549556828,c[s]^=909522486;o.nSigBytes=i,u.nSigBytes=i,this.reset()}return n.prototype.reset=function(){this.B.reset(),this.B.update(this.I)},n.prototype.update=function(n){return this.B.update(n),this},n.prototype.finalize=function(n){var t=this.B.finalize(n);return this.B.reset(),this.B.finalize(this.C.clone().concat(t))},n}()},,function(n,t,e){"use strict";e.r(t),e.d(t,"SHA512",(function(){return s}));var r,i=e(6),u=e(0),o=(r=function(n,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])})(n,t)},function(n,t){function e(){this.constructor=n}r(n,t),n.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}),f=[new u.a(1116352408,3609767458),new u.a(1899447441,602891725),new u.a(3049323471,3964484399),new u.a(3921009573,2173295548),new u.a(961987163,4081628472),new u.a(1508970993,3053834265),new u.a(2453635748,2937671579),new u.a(2870763221,3664609560),new u.a(3624381080,2734883394),new u.a(310598401,1164996542),new u.a(607225278,1323610764),new u.a(1426881987,3590304994),new u.a(1925078388,4068182383),new u.a(2162078206,991336113),new u.a(2614888103,633803317),new u.a(3248222580,3479774868),new u.a(3835390401,2666613458),new u.a(4022224774,944711139),new u.a(264347078,2341262773),new u.a(604807628,2007800933),new u.a(770255983,1495990901),new u.a(1249150122,1856431235),new u.a(1555081692,3175218132),new u.a(1996064986,2198950837),new u.a(2554220882,3999719339),new u.a(2821834349,766784016),new u.a(2952996808,2566594879),new u.a(3210313671,3203337956),new u.a(3336571891,1034457026),new u.a(3584528711,2466948901),new u.a(113926993,3758326383),new u.a(338241895,168717936),new u.a(666307205,1188179964),new u.a(773529912,1546045734),new u.a(1294757372,1522805485),new u.a(1396182291,2643833823),new u.a(1695183700,2343527390),new u.a(1986661051,1014477480),new u.a(2177026350,1206759142),new u.a(2456956037,344077627),new u.a(2730485921,1290863460),new u.a(2820302411,3158454273),new u.a(3259730800,3505952657),new u.a(3345764771,106217008),new u.a(3516065817,3606008344),new u.a(3600352804,1432725776),new u.a(4094571909,1467031594),new u.a(275423344,851169720),new u.a(430227734,3100823752),new u.a(506948616,1363258195),new u.a(659060556,3750685593),new u.a(883997877,3785050280),new u.a(958139571,3318307427),new u.a(1322822218,3812723403),new u.a(1537002063,2003034995),new u.a(1747873779,3602036899),new u.a(1955562222,1575990012),new u.a(2024104815,1125592928),new u.a(2227730452,2716904306),new u.a(2361852424,442776044),new u.a(2428436474,593698344),new u.a(2756734187,3733110249),new u.a(3204031479,2999351573),new u.a(3329325298,3815920427),new u.a(3391569614,3928383900),new u.a(3515267271,566280711),new u.a(3940187606,3454069534),new u.a(4118630271,4000239992),new u.a(116418474,1914138554),new u.a(174292421,2731055270),new u.a(289380356,3203993006),new u.a(460393269,320620315),new u.a(685471733,587496836),new u.a(852142971,1086792851),new u.a(1017036298,365543100),new u.a(1126000580,2618297676),new u.a(1288033470,3409855158),new u.a(1501505948,4234509866),new u.a(1607167915,987167468),new u.a(1816402316,1246189591)],c=[];!function(){for(var n=0;n<80;n++)c[n]=new u.a(0,0)}();var s=function(n){function t(t){var e=n.call(this,t)||this;return e.j=32,e.N=new u.b([new u.a(1779033703,4089235720),new u.a(3144134277,2227873595),new u.a(1013904242,4271175723),new u.a(2773480762,1595750129),new u.a(1359893119,2917565137),new u.a(2600822924,725511199),new u.a(528734635,4215389547),new u.a(1541459225,327033209)]),e.g=t,t&&void 0!==t.hash&&(e.N=t.hash.clone()),e}return o(t,n),t.prototype.O=function(){this.N=new u.b([new u.a(1779033703,4089235720),new u.a(3144134277,2227873595),new u.a(1013904242,4271175723),new u.a(2773480762,1595750129),new u.a(1359893119,2917565137),new u.a(2600822924,725511199),new u.a(528734635,4215389547),new u.a(1541459225,327033209)])},t.prototype.k=function(n,t){for(var e=this.N.words,r=e[0],i=e[1],u=e[2],o=e[3],s=e[4],w=e[5],h=e[6],a=e[7],v=r.high,b=r.low,l=i.high,d=i.low,p=u.high,y=u.low,m=o.high,j=o.low,g=s.high,O=s.low,S=w.high,_=w.low,M=h.high,A=h.low,E=a.high,x=a.low,H=v,U=b,k=l,z=d,B=p,C=y,I=m,N=j,F=g,R=O,q=S,T=_,D=M,G=A,J=E,K=x,L=0;L<80;L++){var P=void 0,Q=void 0,V=c[L];if(L<16)Q=V.high=0|n[t+2*L],P=V.low=0|n[t+2*L+1];else{var W=c[L-15],X=W.high,Y=W.low,Z=(X>>>1|Y<<31)^(X>>>8|Y<<24)^X>>>7,$=(Y>>>1|X<<31)^(Y>>>8|X<<24)^(Y>>>7|X<<25),nn=c[L-2],tn=nn.high,en=nn.low,rn=(tn>>>19|en<<13)^(tn<<3|en>>>29)^tn>>>6,un=(en>>>19|tn<<13)^(en<<3|tn>>>29)^(en>>>6|tn<<26),on=c[L-7],fn=on.high,cn=on.low,sn=c[L-16],wn=sn.high,hn=sn.low;Q=(Q=(Q=Z+fn+((P=$+cn)>>>0<$>>>0?1:0))+rn+((P+=un)>>>0<un>>>0?1:0))+wn+((P+=hn)>>>0<hn>>>0?1:0),V.high=Q,V.low=P}var an=F&q^~F&D,vn=R&T^~R&G,bn=H&k^H&B^k&B,ln=U&z^U&C^z&C,dn=(H>>>28|U<<4)^(H<<30|U>>>2)^(H<<25|U>>>7),pn=(U>>>28|H<<4)^(U<<30|H>>>2)^(U<<25|H>>>7),yn=(F>>>14|R<<18)^(F>>>18|R<<14)^(F<<23|R>>>9),mn=(R>>>14|F<<18)^(R>>>18|F<<14)^(R<<23|F>>>9),jn=f[L],gn=jn.high,On=jn.low,Sn=K+mn,_n=J+yn+(Sn>>>0<K>>>0?1:0),Mn=pn+ln;J=D,K=G,D=q,G=T,q=F,T=R,F=I+(_n=(_n=(_n=_n+an+((Sn+=vn)>>>0<vn>>>0?1:0))+gn+((Sn+=On)>>>0<On>>>0?1:0))+Q+((Sn+=P)>>>0<P>>>0?1:0))+((R=N+Sn|0)>>>0<N>>>0?1:0)|0,I=B,N=C,B=k,C=z,k=H,z=U,H=_n+(dn+bn+(Mn>>>0<pn>>>0?1:0))+((U=Sn+Mn|0)>>>0<Sn>>>0?1:0)|0}b=r.low=b+U,r.high=v+H+(b>>>0<U>>>0?1:0),d=i.low=d+z,i.high=l+k+(d>>>0<z>>>0?1:0),y=u.low=y+C,u.high=p+B+(y>>>0<C>>>0?1:0),j=o.low=j+N,o.high=m+I+(j>>>0<N>>>0?1:0),O=s.low=O+R,s.high=g+F+(O>>>0<R>>>0?1:0),_=w.low=_+T,w.high=S+q+(_>>>0<T>>>0?1:0),A=h.low=A+G,h.high=M+D+(A>>>0<G>>>0?1:0),x=a.low=x+K,a.high=E+J+(x>>>0<K>>>0?1:0)},t.prototype.M=function(){var n=this.H,t=n.words,e=8*this.U,r=8*n.nSigBytes;return t[r>>>5]|=128<<24-r%32,t[30+(r+128>>>10<<5)]=Math.floor(e/4294967296),t[31+(r+128>>>10<<5)]=e,n.nSigBytes=4*t.length,this._(),this.N.to32()},t.prototype.clone=function(){return new t({hash:this.N,blockSize:this.j,data:this.H,nBytes:this.U})},t.hash=function(n,e){return new t(e).finalize(n)},t}(i.a)},,,,,,,,,,,function(n,t,e){"use strict";e.r(t),e.d(t,"HmacSHA512",(function(){return u}));var r=e(9),i=e(11);function u(n,t){return new r.Hmac(new i.SHA512,t).finalize(n)}}])}));