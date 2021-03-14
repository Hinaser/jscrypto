import { Hasher } from "./lib/algorithm/Hasher";
import { Word32Array } from "./lib/Word32Array";
// Hash values
const H = [];
// Round constants
const K = [];
function isPrime(n) {
    const sqrtN = Math.sqrt(n);
    for (let factor = 2; factor <= sqrtN; factor++) {
        if (!(n % factor)) {
            return false;
        }
    }
    return true;
}
function getFractionalBits(n) {
    return ((n - (n | 0)) * 0x100000000) | 0;
}
(function computeRoundConstants() {
    let n = 2;
    let nPrime = 0;
    while (nPrime < 64) {
        if (isPrime(n)) {
            if (nPrime < 8) {
                H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
            }
            K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));
            nPrime++;
        }
        n++;
    }
})();
// Reusable object
const W = [];
export class SHA256 extends Hasher {
    constructor(props) {
        super(props);
        this._hash = new Word32Array(H.slice(0));
        this._props = props;
        if (props && typeof props.hash !== "undefined") {
            this._hash = props.hash.clone();
        }
    }
    _doReset() {
        this._hash = new Word32Array(H.slice(0));
    }
    _doProcessBlock(words, offset) {
        const _H = this._hash.words;
        let a = _H[0];
        let b = _H[1];
        let c = _H[2];
        let d = _H[3];
        let e = _H[4];
        let f = _H[5];
        let g = _H[6];
        let h = _H[7];
        for (let i = 0; i < 64; i++) {
            if (i < 16) {
                W[i] = words[offset + i] | 0;
            }
            else {
                const gamma0x = W[i - 15];
                const gamma0 = ((gamma0x << 25) | (gamma0x >>> 7))
                    ^ ((gamma0x << 14) | (gamma0x >>> 18))
                    ^ (gamma0x >>> 3);
                const gamma1x = W[i - 2];
                const gamma1 = ((gamma1x << 15) | (gamma1x >>> 17))
                    ^ ((gamma1x << 13) | (gamma1x >>> 19))
                    ^ (gamma1x >>> 10);
                W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
            }
            const ch = (e & f) ^ (~e & g);
            const maj = (a & b) ^ (a & c) ^ (b & c);
            const sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
            const sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7) | (e >>> 25));
            const t1 = h + sigma1 + ch + K[i] + W[i];
            const t2 = sigma0 + maj;
            h = g;
            g = f;
            f = e;
            e = (d + t1) | 0;
            d = c;
            c = b;
            b = a;
            a = (t1 + t2) | 0;
        }
        // Intermediate hash value
        _H[0] = (_H[0] + a) | 0;
        _H[1] = (_H[1] + b) | 0;
        _H[2] = (_H[2] + c) | 0;
        _H[3] = (_H[3] + d) | 0;
        _H[4] = (_H[4] + e) | 0;
        _H[5] = (_H[5] + f) | 0;
        _H[6] = (_H[6] + g) | 0;
        _H[7] = (_H[7] + h) | 0;
    }
    _doFinalize() {
        const words = this._data.words;
        const nBitsTotal = this._nBytes * 8;
        const nBitsLeft = this._data.nSigBytes * 8;
        // Add padding
        words[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        words[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
        words[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
        this._data.nSigBytes = words.length * 4;
        // Hash final blocks
        this._process();
        // Return final computed hash
        return this._hash;
    }
    clone() {
        const props = { hash: this._hash, blockSize: this._blockSize, data: this._data, nBytes: this._nBytes };
        return new SHA256(props);
    }
    static hash(message, props) {
        return new SHA256(props).finalize(message);
    }
}
