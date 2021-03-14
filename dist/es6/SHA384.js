import { Word64, Word64Array } from "./lib/Word64Array";
import { SHA512 } from "./SHA512";
export class SHA384 extends SHA512 {
    constructor(props) {
        super(props);
        this._hash = new Word64Array([
            new Word64(0xcbbb9d5d, 0xc1059ed8), new Word64(0x629a292a, 0x367cd507),
            new Word64(0x9159015a, 0x3070dd17), new Word64(0x152fecd8, 0xf70e5939),
            new Word64(0x67332667, 0xffc00b31), new Word64(0x8eb44a87, 0x68581511),
            new Word64(0xdb0c2e0d, 0x64f98fa7), new Word64(0x47b5481d, 0xbefa4fa4)
        ]);
        this._props = props;
        if (props && typeof props.hash !== "undefined") {
            this._hash = props.hash.clone();
        }
    }
    _doReset() {
        this._hash = new Word64Array([
            new Word64(0xcbbb9d5d, 0xc1059ed8), new Word64(0x629a292a, 0x367cd507),
            new Word64(0x9159015a, 0x3070dd17), new Word64(0x152fecd8, 0xf70e5939),
            new Word64(0x67332667, 0xffc00b31), new Word64(0x8eb44a87, 0x68581511),
            new Word64(0xdb0c2e0d, 0x64f98fa7), new Word64(0x47b5481d, 0xbefa4fa4)
        ]);
    }
    _doFinalize() {
        const hash = super._doFinalize.call(this);
        hash.nSigBytes -= 16;
        return hash;
    }
    clone() {
        const props = { hash: this._hash, blockSize: this._blockSize, data: this._data, nBytes: this._nBytes };
        return new SHA384(props);
    }
    static hash(message, props) {
        return new SHA384(props).finalize(message);
    }
}
