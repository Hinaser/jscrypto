import { Hasher } from "./lib/algorithm/Hasher";
import { Word64, Word64Array } from "./lib/Word64Array";
const K = [
    new Word64(0x428a2f98, 0xd728ae22), new Word64(0x71374491, 0x23ef65cd),
    new Word64(0xb5c0fbcf, 0xec4d3b2f), new Word64(0xe9b5dba5, 0x8189dbbc),
    new Word64(0x3956c25b, 0xf348b538), new Word64(0x59f111f1, 0xb605d019),
    new Word64(0x923f82a4, 0xaf194f9b), new Word64(0xab1c5ed5, 0xda6d8118),
    new Word64(0xd807aa98, 0xa3030242), new Word64(0x12835b01, 0x45706fbe),
    new Word64(0x243185be, 0x4ee4b28c), new Word64(0x550c7dc3, 0xd5ffb4e2),
    new Word64(0x72be5d74, 0xf27b896f), new Word64(0x80deb1fe, 0x3b1696b1),
    new Word64(0x9bdc06a7, 0x25c71235), new Word64(0xc19bf174, 0xcf692694),
    new Word64(0xe49b69c1, 0x9ef14ad2), new Word64(0xefbe4786, 0x384f25e3),
    new Word64(0x0fc19dc6, 0x8b8cd5b5), new Word64(0x240ca1cc, 0x77ac9c65),
    new Word64(0x2de92c6f, 0x592b0275), new Word64(0x4a7484aa, 0x6ea6e483),
    new Word64(0x5cb0a9dc, 0xbd41fbd4), new Word64(0x76f988da, 0x831153b5),
    new Word64(0x983e5152, 0xee66dfab), new Word64(0xa831c66d, 0x2db43210),
    new Word64(0xb00327c8, 0x98fb213f), new Word64(0xbf597fc7, 0xbeef0ee4),
    new Word64(0xc6e00bf3, 0x3da88fc2), new Word64(0xd5a79147, 0x930aa725),
    new Word64(0x06ca6351, 0xe003826f), new Word64(0x14292967, 0x0a0e6e70),
    new Word64(0x27b70a85, 0x46d22ffc), new Word64(0x2e1b2138, 0x5c26c926),
    new Word64(0x4d2c6dfc, 0x5ac42aed), new Word64(0x53380d13, 0x9d95b3df),
    new Word64(0x650a7354, 0x8baf63de), new Word64(0x766a0abb, 0x3c77b2a8),
    new Word64(0x81c2c92e, 0x47edaee6), new Word64(0x92722c85, 0x1482353b),
    new Word64(0xa2bfe8a1, 0x4cf10364), new Word64(0xa81a664b, 0xbc423001),
    new Word64(0xc24b8b70, 0xd0f89791), new Word64(0xc76c51a3, 0x0654be30),
    new Word64(0xd192e819, 0xd6ef5218), new Word64(0xd6990624, 0x5565a910),
    new Word64(0xf40e3585, 0x5771202a), new Word64(0x106aa070, 0x32bbd1b8),
    new Word64(0x19a4c116, 0xb8d2d0c8), new Word64(0x1e376c08, 0x5141ab53),
    new Word64(0x2748774c, 0xdf8eeb99), new Word64(0x34b0bcb5, 0xe19b48a8),
    new Word64(0x391c0cb3, 0xc5c95a63), new Word64(0x4ed8aa4a, 0xe3418acb),
    new Word64(0x5b9cca4f, 0x7763e373), new Word64(0x682e6ff3, 0xd6b2b8a3),
    new Word64(0x748f82ee, 0x5defb2fc), new Word64(0x78a5636f, 0x43172f60),
    new Word64(0x84c87814, 0xa1f0ab72), new Word64(0x8cc70208, 0x1a6439ec),
    new Word64(0x90befffa, 0x23631e28), new Word64(0xa4506ceb, 0xde82bde9),
    new Word64(0xbef9a3f7, 0xb2c67915), new Word64(0xc67178f2, 0xe372532b),
    new Word64(0xca273ece, 0xea26619c), new Word64(0xd186b8c7, 0x21c0c207),
    new Word64(0xeada7dd6, 0xcde0eb1e), new Word64(0xf57d4f7f, 0xee6ed178),
    new Word64(0x06f067aa, 0x72176fba), new Word64(0x0a637dc5, 0xa2c898a6),
    new Word64(0x113f9804, 0xbef90dae), new Word64(0x1b710b35, 0x131c471b),
    new Word64(0x28db77f5, 0x23047d84), new Word64(0x32caab7b, 0x40c72493),
    new Word64(0x3c9ebe0a, 0x15c9bebc), new Word64(0x431d67c4, 0x9c100d4c),
    new Word64(0x4cc5d4be, 0xcb3e42b6), new Word64(0x597f299c, 0xfc657e2a),
    new Word64(0x5fcb6fab, 0x3ad6faec), new Word64(0x6c44198c, 0x4a475817),
];
const W = [];
(function computeConstants() {
    for (let i = 0; i < 80; i++) {
        W[i] = new Word64(0, 0);
    }
})();
export class SHA512 extends Hasher {
    constructor(props) {
        super(props);
        this._blockSize = 1024 / 32;
        this._hash = new Word64Array([
            new Word64(0x6a09e667, 0xf3bcc908), new Word64(0xbb67ae85, 0x84caa73b),
            new Word64(0x3c6ef372, 0xfe94f82b), new Word64(0xa54ff53a, 0x5f1d36f1),
            new Word64(0x510e527f, 0xade682d1), new Word64(0x9b05688c, 0x2b3e6c1f),
            new Word64(0x1f83d9ab, 0xfb41bd6b), new Word64(0x5be0cd19, 0x137e2179)
        ]);
        this._props = props;
        if (props && typeof props.hash !== "undefined") {
            this._hash = props.hash.clone();
        }
    }
    _doReset() {
        this._hash = new Word64Array([
            new Word64(0x6a09e667, 0xf3bcc908), new Word64(0xbb67ae85, 0x84caa73b),
            new Word64(0x3c6ef372, 0xfe94f82b), new Word64(0xa54ff53a, 0x5f1d36f1),
            new Word64(0x510e527f, 0xade682d1), new Word64(0x9b05688c, 0x2b3e6c1f),
            new Word64(0x1f83d9ab, 0xfb41bd6b), new Word64(0x5be0cd19, 0x137e2179)
        ]);
    }
    _doProcessBlock(words, offset) {
        // Shortcuts
        const H = this._hash.words;
        const H0 = H[0];
        const H1 = H[1];
        const H2 = H[2];
        const H3 = H[3];
        const H4 = H[4];
        const H5 = H[5];
        const H6 = H[6];
        const H7 = H[7];
        const H0h = H0.high;
        let H0l = H0.low;
        const H1h = H1.high;
        let H1l = H1.low;
        const H2h = H2.high;
        let H2l = H2.low;
        const H3h = H3.high;
        let H3l = H3.low;
        const H4h = H4.high;
        let H4l = H4.low;
        const H5h = H5.high;
        let H5l = H5.low;
        const H6h = H6.high;
        let H6l = H6.low;
        const H7h = H7.high;
        let H7l = H7.low;
        // Working variables
        let ah = H0h;
        let al = H0l;
        let bh = H1h;
        let bl = H1l;
        let ch = H2h;
        let cl = H2l;
        let dh = H3h;
        let dl = H3l;
        let eh = H4h;
        let el = H4l;
        let fh = H5h;
        let fl = H5l;
        let gh = H6h;
        let gl = H6l;
        let hh = H7h;
        let hl = H7l;
        // Rounds
        for (let i = 0; i < 80; i++) {
            let Wil;
            let Wih;
            // Shortcut
            const Wi = W[i];
            // Extend message
            if (i < 16) {
                Wih = Wi.high = words[offset + i * 2] | 0;
                Wil = Wi.low = words[offset + i * 2 + 1] | 0;
            }
            else {
                // Gamma0
                const gamma0x = W[i - 15];
                const gamma0xh = gamma0x.high;
                const gamma0xl = gamma0x.low;
                const gamma0h = ((gamma0xh >>> 1) | (gamma0xl << 31))
                    ^ ((gamma0xh >>> 8) | (gamma0xl << 24))
                    ^ (gamma0xh >>> 7);
                const gamma0l = ((gamma0xl >>> 1) | (gamma0xh << 31))
                    ^ ((gamma0xl >>> 8) | (gamma0xh << 24))
                    ^ ((gamma0xl >>> 7) | (gamma0xh << 25));
                // Gamma1
                const gamma1x = W[i - 2];
                const gamma1xh = gamma1x.high;
                const gamma1xl = gamma1x.low;
                const gamma1h = ((gamma1xh >>> 19) | (gamma1xl << 13))
                    ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
                const gamma1l = ((gamma1xl >>> 19) | (gamma1xh << 13))
                    ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));
                // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
                const Wi7 = W[i - 7];
                const Wi7h = Wi7.high;
                const Wi7l = Wi7.low;
                const Wi16 = W[i - 16];
                const Wi16h = Wi16.high;
                const Wi16l = Wi16.low;
                Wil = gamma0l + Wi7l;
                Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
                Wil = Wil + gamma1l;
                Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
                Wil = Wil + Wi16l;
                Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);
                Wi.high = Wih;
                Wi.low = Wil;
            }
            const chh = (eh & fh) ^ (~eh & gh);
            const chl = (el & fl) ^ (~el & gl);
            const majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
            const majl = (al & bl) ^ (al & cl) ^ (bl & cl);
            const sigma0h = ((ah >>> 28) | (al << 4)) ^ ((ah << 30) | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
            const sigma0l = ((al >>> 28) | (ah << 4)) ^ ((al << 30) | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
            const sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
            const sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));
            // t1 = h + sigma1 + ch + K[i] + W[i]
            const Ki = K[i];
            const Kih = Ki.high;
            const Kil = Ki.low;
            let t1l = hl + sigma1l;
            let t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
            t1l = t1l + chl;
            t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
            t1l = t1l + Kil;
            t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
            t1l = t1l + Wil;
            t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);
            // t2 = sigma0 + maj
            const t2l = sigma0l + majl;
            const t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);
            // Update working variables
            hh = gh;
            hl = gl;
            gh = fh;
            gl = fl;
            fh = eh;
            fl = el;
            el = (dl + t1l) | 0;
            eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
            dh = ch;
            dl = cl;
            ch = bh;
            cl = bl;
            bh = ah;
            bl = al;
            al = (t1l + t2l) | 0;
            ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
        }
        // Intermediate hash value
        H0l = H0.low = (H0l + al);
        H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
        H1l = H1.low = (H1l + bl);
        H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
        H2l = H2.low = (H2l + cl);
        H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
        H3l = H3.low = (H3l + dl);
        H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
        H4l = H4.low = (H4l + el);
        H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
        H5l = H5.low = (H5l + fl);
        H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
        H6l = H6.low = (H6l + gl);
        H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
        H7l = H7.low = (H7l + hl);
        H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
    }
    _doFinalize() {
        // Shortcuts
        const data = this._data;
        const dataWords = data.words;
        const nBitsTotal = this._nBytes * 8;
        const nBitsLeft = data.nSigBytes * 8;
        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
        dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
        data.nSigBytes = dataWords.length * 4;
        // Hash final blocks
        this._process();
        // Convert hash to 32-bit word array before returning
        return this._hash.to32();
    }
    clone() {
        const props = { hash: this._hash, blockSize: this._blockSize, data: this._data, nBytes: this._nBytes };
        return new SHA512(props);
    }
    static hash(message, props) {
        return new SHA512(props).finalize(message);
    }
}
