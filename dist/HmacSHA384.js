!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.JsCrypto=t():n.JsCrypto=t()}(this,(function(){return function(n){var t={};function e(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return n[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=n,e.c=t,e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:r})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"u",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.u)return n;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var i in n)e.d(r,i,function(t){return n[t]}.bind(null,i));return r},e.n=function(n){var t=n&&n.u?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=20)}([function(n,t,e){"use strict";e.d(t,"a",(function(){return u})),e.d(t,"b",(function(){return o}));var r=e(3),i=e(1),u=function(){function n(n,t){this.high=n,this.low=t}return n.prototype.clone=function(){return new n(this.high,this.low)},n}(),o=function(){function n(n,t){this.h=n||[],this.v="number"==typeof t?t:8*this.h.length}return n.prototype.to32=function(){for(var n=[],t=0;t<this.h.length;t++){var e=this.h[t];n.push(e.high),n.push(e.low)}return new i.a(n,this.v)},n.prototype.raw=function(){return this.h},n.prototype.slice=function(){return this.h.slice()},n.prototype.length=function(){return this.v},n.prototype.setSignificantBytes=function(n){this.v=n},n.prototype.toString=function(n){return n?n.stringify(this.to32()):r.a.stringify(this.to32())},n.prototype.clone=function(){for(var t=this.h.slice(),e=0;e<t.length;e++)t[e]=t[e].clone();return new n(t,this.v)},n}()},function(n,t,e){"use strict";e.d(t,"a",(function(){return u}));var r=e(3),i=e(5),u=function(){function n(n,t){this.h=n||[],this.v="number"==typeof t?t:4*this.h.length}return n.prototype.raw=function(){return this.h},n.prototype.slice=function(n,t){return this.h.slice(n,t)},n.prototype.length=function(){return this.v},n.prototype.setSignificantBytes=function(n){this.v=n},n.prototype.toString=function(n){return n?n.stringify(this):r.a.stringify(this)},n.prototype.concat=function(n){var t=n.slice(),e=n.length();if(this.clamp(),this.v%4)for(var r=0;r<e;r++){var i=t[r>>>2]>>>24-r%4*8&255;this.h[this.v+r>>>2]|=i<<24-(this.v+r)%4*8}else for(r=0;r<e;r+=4)this.h[this.v+r>>>2]=t[r>>>2];return this.v+=e,this},n.prototype.clamp=function(){var n=this.v;this.h[n>>>2]&=4294967295<<32-n%4*8,this.h.length=Math.ceil(n/4)},n.prototype.clone=function(){return new n(this.h.slice(),this.v)},n.random=function(t){for(var e=[],r=0;r<t;r++)e.push(Object(i.a)());return new n(e,t)},n}()},function(n,t,e){"use strict";e.d(t,"a",(function(){return i}));var r=e(1),i={stringify:function(n){for(var t=n.length(),e=n.raw(),r=[],i=0;i<t;i++){var u=e[i>>>2]>>>24-i%4*8&255;r.push(String.fromCharCode(u))}return r.join("")},parse:function(n){for(var t=n.length,e=[],i=0;i<t;i++)e[i>>>2]|=(255&n.charCodeAt(i))<<24-i%4*8;return new r.a(e,t)}}},function(n,t,e){"use strict";e.d(t,"a",(function(){return i}));var r=e(1),i={stringify:function(n){for(var t=n.length(),e=n.raw(),r=[],i=0;i<t;i++){var u=e[i>>>2]>>>24-i%4*8&255;r.push((u>>>4).toString(16)),r.push((15&u).toString(16))}return r.join("")},parse:function(n){for(var t=n.length,e=[],i=0;i<t;i+=2)e[i>>>3]|=parseInt(n.substr(i,2),16)<<24-i%8*4;return new r.a(e,t/2)}}},function(n,t,e){"use strict";e.d(t,"a",(function(){return i}));var r=e(2),i={stringify:function(n){try{return decodeURIComponent(escape(r.a.stringify(n)))}catch(n){throw new Error("Malformed UTF-8 data")}},parse:function(n){return r.a.parse(unescape(encodeURIComponent(n)))}}},function(n,t,e){"use strict";(function(n){e.d(t,"a",(function(){return r}));var r=function(){if("undefined"!=typeof window){var t=window.crypto||window.msCrypto;if(!t)throw new Error("Crypto module not found");return function(){return t.getRandomValues(new Uint32Array(1))[0]}}return void 0!==n&&n.crypto?function(){return n.crypto.randomBytes(4).readInt32LE()}:function(){return require("crypto").randomBytes(4).readInt32LE()}}()}).call(this,e(8))},function(n,t,e){"use strict";e.d(t,"a",(function(){return o}));var r,i=e(7),u=(r=function(n,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])})(n,t)},function(n,t){function e(){this.constructor=n}r(n,t),n.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}),o=function(n){function t(t){var e=n.call(this,t)||this;return e.j=16,e.O=t,t&&"number"==typeof t.blockSize&&(e.j=t.blockSize),e.reset(t?t.data:void 0,t?t.nBytes:void 0),e}return u(t,n),Object.defineProperty(t.prototype,"blockSize",{get:function(){return this.j},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,e){n.prototype.reset.call(this,t,e),this._()},t.prototype.update=function(n){return this.g(n),this.S(),this},t.prototype.finalize=function(n){return n&&this.g(n),this.M()},t.prototype._=function(){throw new Error("Not implemented")},t.prototype.M=function(){throw new Error("Not implemented")},t}(i.a)},function(n,t,e){"use strict";e.d(t,"a",(function(){return u}));var r=e(1),i=e(4),u=function(){function n(n){this.A=0,this.j=0,this.O=n,this.H=n&&void 0!==n.data?n.data.clone():new r.a,this.k=n&&"number"==typeof n.nBytes?n.nBytes:0}return Object.defineProperty(n.prototype,"blockSize",{get:function(){return this.j},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,t){this.H=void 0!==n?n.clone():new r.a,this.k="number"==typeof t?t:0},n.prototype.g=function(n){var t="string"==typeof n?i.a.parse(n):n;this.H.concat(t),this.k+=t.length()},n.prototype.S=function(n){var t,e=this.H.raw(),i=this.H.length(),u=this.j,o=i/(4*this.j),f=(o=n?Math.ceil(o):Math.max((0|o)-this.A,0))*u,c=Math.min(4*f,i);if(f){for(var s=0;s<f;s+=u)this.U(e,s);t=e.splice(0,f),this.H.setSignificantBytes(this.H.length()-c)}return new r.a(t,c)},n.prototype.U=function(n,t){throw new Error("Not implemented")},n}()},function(n,t){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(n){"object"==typeof window&&(e=window)}n.exports=e},function(n,t,e){"use strict";e.r(t),e.d(t,"Hmac",(function(){return i}));var r=e(4),i=function(){function n(n,t){this.C=n,"string"==typeof t&&(t=r.a.parse(t));var e=n.blockSize,i=4*e;t.length()>i&&(t=n.finalize(t)),t.clamp();for(var u=this.I=t.clone(),o=this.N=t.clone(),f=u.raw(),c=o.raw(),s=0;s<e;s++)f[s]^=1549556828,c[s]^=909522486;o.setSignificantBytes(i),u.setSignificantBytes(i),this.reset()}return n.prototype.reset=function(){this.C.reset(),this.C.update(this.N)},n.prototype.update=function(n){return this.C.update(n),this},n.prototype.finalize=function(n){var t=this.C.finalize(n);return this.C.reset(),this.C.finalize(this.I.clone().concat(t))},n}()},,function(n,t,e){"use strict";e.r(t),e.d(t,"SHA512",(function(){return s}));var r,i=e(6),u=e(0),o=(r=function(n,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])})(n,t)},function(n,t){function e(){this.constructor=n}r(n,t),n.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}),f=[new u.a(1116352408,3609767458),new u.a(1899447441,602891725),new u.a(3049323471,3964484399),new u.a(3921009573,2173295548),new u.a(961987163,4081628472),new u.a(1508970993,3053834265),new u.a(2453635748,2937671579),new u.a(2870763221,3664609560),new u.a(3624381080,2734883394),new u.a(310598401,1164996542),new u.a(607225278,1323610764),new u.a(1426881987,3590304994),new u.a(1925078388,4068182383),new u.a(2162078206,991336113),new u.a(2614888103,633803317),new u.a(3248222580,3479774868),new u.a(3835390401,2666613458),new u.a(4022224774,944711139),new u.a(264347078,2341262773),new u.a(604807628,2007800933),new u.a(770255983,1495990901),new u.a(1249150122,1856431235),new u.a(1555081692,3175218132),new u.a(1996064986,2198950837),new u.a(2554220882,3999719339),new u.a(2821834349,766784016),new u.a(2952996808,2566594879),new u.a(3210313671,3203337956),new u.a(3336571891,1034457026),new u.a(3584528711,2466948901),new u.a(113926993,3758326383),new u.a(338241895,168717936),new u.a(666307205,1188179964),new u.a(773529912,1546045734),new u.a(1294757372,1522805485),new u.a(1396182291,2643833823),new u.a(1695183700,2343527390),new u.a(1986661051,1014477480),new u.a(2177026350,1206759142),new u.a(2456956037,344077627),new u.a(2730485921,1290863460),new u.a(2820302411,3158454273),new u.a(3259730800,3505952657),new u.a(3345764771,106217008),new u.a(3516065817,3606008344),new u.a(3600352804,1432725776),new u.a(4094571909,1467031594),new u.a(275423344,851169720),new u.a(430227734,3100823752),new u.a(506948616,1363258195),new u.a(659060556,3750685593),new u.a(883997877,3785050280),new u.a(958139571,3318307427),new u.a(1322822218,3812723403),new u.a(1537002063,2003034995),new u.a(1747873779,3602036899),new u.a(1955562222,1575990012),new u.a(2024104815,1125592928),new u.a(2227730452,2716904306),new u.a(2361852424,442776044),new u.a(2428436474,593698344),new u.a(2756734187,3733110249),new u.a(3204031479,2999351573),new u.a(3329325298,3815920427),new u.a(3391569614,3928383900),new u.a(3515267271,566280711),new u.a(3940187606,3454069534),new u.a(4118630271,4000239992),new u.a(116418474,1914138554),new u.a(174292421,2731055270),new u.a(289380356,3203993006),new u.a(460393269,320620315),new u.a(685471733,587496836),new u.a(852142971,1086792851),new u.a(1017036298,365543100),new u.a(1126000580,2618297676),new u.a(1288033470,3409855158),new u.a(1501505948,4234509866),new u.a(1607167915,987167468),new u.a(1816402316,1246189591)],c=[];!function(){for(var n=0;n<80;n++)c[n]=new u.a(0,0)}();var s=function(n){function t(t){var e=n.call(this,t)||this;return e.j=32,e.B=new u.b([new u.a(1779033703,4089235720),new u.a(3144134277,2227873595),new u.a(1013904242,4271175723),new u.a(2773480762,1595750129),new u.a(1359893119,2917565137),new u.a(2600822924,725511199),new u.a(528734635,4215389547),new u.a(1541459225,327033209)]),e.O=t,t&&void 0!==t.hash&&(e.B=t.hash.clone()),e}return o(t,n),t.prototype._=function(){this.B=new u.b([new u.a(1779033703,4089235720),new u.a(3144134277,2227873595),new u.a(1013904242,4271175723),new u.a(2773480762,1595750129),new u.a(1359893119,2917565137),new u.a(2600822924,725511199),new u.a(528734635,4215389547),new u.a(1541459225,327033209)])},t.prototype.U=function(n,t){for(var e=this.B.raw(),r=e[0],i=e[1],u=e[2],o=e[3],s=e[4],w=e[5],h=e[6],a=e[7],v=r.high,b=r.low,l=i.high,d=i.low,p=u.high,y=u.low,m=o.high,j=o.low,O=s.high,_=s.low,g=w.high,S=w.low,M=h.high,A=h.low,E=a.high,H=a.low,k=v,x=b,z=l,U=d,C=p,I=y,N=m,B=j,F=O,R=_,q=g,T=S,D=M,G=A,J=E,K=H,L=0;L<80;L++){var P=void 0,Q=void 0,V=c[L];if(L<16)Q=V.high=0|n[t+2*L],P=V.low=0|n[t+2*L+1];else{var W=c[L-15],X=W.high,Y=W.low,Z=(X>>>1|Y<<31)^(X>>>8|Y<<24)^X>>>7,$=(Y>>>1|X<<31)^(Y>>>8|X<<24)^(Y>>>7|X<<25),nn=c[L-2],tn=nn.high,en=nn.low,rn=(tn>>>19|en<<13)^(tn<<3|en>>>29)^tn>>>6,un=(en>>>19|tn<<13)^(en<<3|tn>>>29)^(en>>>6|tn<<26),on=c[L-7],fn=on.high,cn=on.low,sn=c[L-16],wn=sn.high,hn=sn.low;Q=(Q=(Q=Z+fn+((P=$+cn)>>>0<$>>>0?1:0))+rn+((P+=un)>>>0<un>>>0?1:0))+wn+((P+=hn)>>>0<hn>>>0?1:0),V.high=Q,V.low=P}var an=F&q^~F&D,vn=R&T^~R&G,bn=k&z^k&C^z&C,ln=x&U^x&I^U&I,dn=(k>>>28|x<<4)^(k<<30|x>>>2)^(k<<25|x>>>7),pn=(x>>>28|k<<4)^(x<<30|k>>>2)^(x<<25|k>>>7),yn=(F>>>14|R<<18)^(F>>>18|R<<14)^(F<<23|R>>>9),mn=(R>>>14|F<<18)^(R>>>18|F<<14)^(R<<23|F>>>9),jn=f[L],On=jn.high,_n=jn.low,gn=K+mn,Sn=J+yn+(gn>>>0<K>>>0?1:0),Mn=pn+ln;J=D,K=G,D=q,G=T,q=F,T=R,F=N+(Sn=(Sn=(Sn=Sn+an+((gn+=vn)>>>0<vn>>>0?1:0))+On+((gn+=_n)>>>0<_n>>>0?1:0))+Q+((gn+=P)>>>0<P>>>0?1:0))+((R=B+gn|0)>>>0<B>>>0?1:0)|0,N=C,B=I,C=z,I=U,z=k,U=x,k=Sn+(dn+bn+(Mn>>>0<pn>>>0?1:0))+((x=gn+Mn|0)>>>0<gn>>>0?1:0)|0}b=r.low=b+x,r.high=v+k+(b>>>0<x>>>0?1:0),d=i.low=d+U,i.high=l+z+(d>>>0<U>>>0?1:0),y=u.low=y+I,u.high=p+C+(y>>>0<I>>>0?1:0),j=o.low=j+B,o.high=m+N+(j>>>0<B>>>0?1:0),_=s.low=_+R,s.high=O+F+(_>>>0<R>>>0?1:0),S=w.low=S+T,w.high=g+q+(S>>>0<T>>>0?1:0),A=h.low=A+G,h.high=M+D+(A>>>0<G>>>0?1:0),H=a.low=H+K,a.high=E+J+(H>>>0<K>>>0?1:0)},t.prototype.M=function(){var n=this.H,t=n.raw(),e=8*this.k,r=8*n.length();return t[r>>>5]|=128<<24-r%32,t[30+(r+128>>>10<<5)]=Math.floor(e/4294967296),t[31+(r+128>>>10<<5)]=e,n.setSignificantBytes(4*t.length),this.S(),this.B.to32()},t.prototype.clone=function(){return new t({hash:this.B,blockSize:this.j,data:this.H,nBytes:this.k})},t.hash=function(n,e){return new t(e).finalize(n)},t}(i.a)},,,,function(n,t,e){"use strict";e.r(t),e.d(t,"SHA384",(function(){return f}));var r,i=e(0),u=e(11),o=(r=function(n,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])})(n,t)},function(n,t){function e(){this.constructor=n}r(n,t),n.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}),f=function(n){function t(t){var e=n.call(this,t)||this;return e.B=new i.b([new i.a(3418070365,3238371032),new i.a(1654270250,914150663),new i.a(2438529370,812702999),new i.a(355462360,4144912697),new i.a(1731405415,4290775857),new i.a(2394180231,1750603025),new i.a(3675008525,1694076839),new i.a(1203062813,3204075428)]),e.O=t,t&&void 0!==t.hash&&(e.B=t.hash.clone()),e}return o(t,n),t.prototype._=function(){this.B=new i.b([new i.a(3418070365,3238371032),new i.a(1654270250,914150663),new i.a(2438529370,812702999),new i.a(355462360,4144912697),new i.a(1731405415,4290775857),new i.a(2394180231,1750603025),new i.a(3675008525,1694076839),new i.a(1203062813,3204075428)])},t.prototype.M=function(){var t=n.prototype.M.call(this);return t.setSignificantBytes(t.length()-16),t},t.prototype.clone=function(){return new t({hash:this.B,blockSize:this.j,data:this.H,nBytes:this.k})},t.hash=function(n,e){return new t(e).finalize(n)},t}(u.SHA512)},,,,,function(n,t,e){"use strict";e.r(t),e.d(t,"HmacSHA384",(function(){return u}));var r=e(9),i=e(15);function u(n,t){return new r.Hmac(new i.SHA384,t).finalize(n)}}])}));