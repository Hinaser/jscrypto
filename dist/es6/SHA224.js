import { Word32Array } from "./lib/Word32Array";
import { SHA256 } from "./SHA256";
export class SHA224 extends SHA256 {
    constructor(props) {
        super(props);
        this._hash = new Word32Array([
            0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
            0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
        ]);
        this._props = props;
        if (props && typeof props.hash !== "undefined") {
            this._hash = props.hash.clone();
        }
    }
    _doReset() {
        this._hash = new Word32Array([
            0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
            0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
        ]);
    }
    _doFinalize() {
        const hash = super._doFinalize.call(this);
        hash.nSigBytes -= 4;
        return hash;
    }
    clone() {
        const props = { hash: this._hash, blockSize: this._blockSize, data: this._data, nBytes: this._nBytes };
        return new SHA224(props);
    }
    static hash(message, props) {
        return new SHA224(props).finalize(message);
    }
}
