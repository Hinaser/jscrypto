// Constants tables
import { Word64 } from "./lib/Word64Array";
import { Hasher } from "./lib/algorithm/Hasher";
import { Word32Array } from "./lib/Word32Array";
const RHO_OFFSETS = [];
const PI_INDEXES = [];
const ROUND_CONSTANTS = [];
// Compute Constants
(function computeConstants() {
    // Compute rho offset constants
    let x = 1;
    let y = 0;
    for (let t = 0; t < 24; t++) {
        RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;
        const newX = y % 5;
        const newY = (2 * x + 3 * y) % 5;
        x = newX;
        y = newY;
    }
    // Compute pi index constants
    for (let p = 0; p < 5; p++) {
        for (let q = 0; q < 5; q++) {
            PI_INDEXES[p + 5 * q] = q + ((2 * p + 3 * q) % 5) * 5;
        }
    }
    // Compute round constants
    let LFSR = 0x01;
    for (let i = 0; i < 24; i++) {
        let roundConstantMsw = 0;
        let roundConstantLsw = 0;
        for (let j = 0; j < 7; j++) {
            if (LFSR & 0x01) {
                const bitPosition = (1 << j) - 1;
                if (bitPosition < 32) {
                    roundConstantLsw ^= 1 << bitPosition;
                }
                else /* if (bitPosition >= 32) */ {
                    roundConstantMsw ^= 1 << (bitPosition - 32);
                }
            }
            // Compute next LFSR
            if (LFSR & 0x80) {
                // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
                LFSR = (LFSR << 1) ^ 0x71;
            }
            else {
                LFSR <<= 1;
            }
        }
        ROUND_CONSTANTS[i] = new Word64(roundConstantMsw, roundConstantLsw);
    }
}());
// Reusable objects for temporary values
const T = [];
(function () {
    for (let i = 0; i < 25; i++) {
        T[i] = new Word64(0, 0);
    }
}());
export class SHA3 extends Hasher {
    constructor(props) {
        super(props);
        this._blockSize = 1024 / 32;
        this._state = [];
        this._outputLength = 512;
        this._props = props;
        if (props) {
            if (typeof props.outputLength !== "undefined") {
                if (![224, 256, 384, 512].includes(props.outputLength)) {
                    throw new Error("Unsupported output length.");
                }
                this._outputLength = props.outputLength;
            }
            if (typeof props.state !== "undefined") {
                this._state = props.state.map(s => s.clone());
            }
        }
        if (this._state.length === 0) {
            for (let i = 0; i < 25; i++) {
                this._state[i] = new Word64(0, 0);
            }
        }
        this._blockSize = (1600 - 2 * this._outputLength) / 32;
    }
    _doReset() {
        this._state = [];
        for (let i = 0; i < 25; i++) {
            this._state[i] = new Word64(0, 0);
        }
        this._blockSize = (1600 - 2 * this._outputLength) / 32;
    }
    _doProcessBlock(words, offset) {
        // Shortcuts
        const state = this._state;
        const nBlockSizeLanes = this._blockSize / 2;
        // Absorb
        for (let i = 0; i < nBlockSizeLanes; i++) {
            // Shortcuts
            let W2i = words[offset + 2 * i];
            let W2i1 = words[offset + 2 * i + 1];
            // Swap endian
            W2i = ((((W2i << 8) | (W2i >>> 24)) & 0x00ff00ff) |
                (((W2i << 24) | (W2i >>> 8)) & 0xff00ff00));
            W2i1 = ((((W2i1 << 8) | (W2i1 >>> 24)) & 0x00ff00ff) |
                (((W2i1 << 24) | (W2i1 >>> 8)) & 0xff00ff00));
            // Absorb message into state
            state[i].high ^= W2i1;
            state[i].low ^= W2i;
        }
        // Rounds
        for (let round = 0; round < 24; round++) {
            // Theta
            for (let x = 0; x < 5; x++) {
                // Mix column lanes
                let tMsw = 0;
                let tLsw = 0;
                for (let y = 0; y < 5; y++) {
                    const l = state[x + 5 * y];
                    tMsw ^= l.high;
                    tLsw ^= l.low;
                }
                // Temporary values
                const Tx = T[x];
                Tx.high = tMsw;
                Tx.low = tLsw;
            }
            for (let x = 0; x < 5; x++) {
                // Shortcuts
                const Tx4 = T[(x + 4) % 5];
                const Tx1 = T[(x + 1) % 5];
                const Tx1Msw = Tx1.high;
                const Tx1Lsw = Tx1.low;
                // Mix surrounding columns
                const tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
                const tLsw = Tx4.low ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
                for (let y = 0; y < 5; y++) {
                    const l = state[x + 5 * y];
                    l.high ^= tMsw;
                    l.low ^= tLsw;
                }
            }
            // Rho Pi
            for (let laneIndex = 1; laneIndex < 25; laneIndex++) {
                let tMsw;
                let tLsw;
                // Shortcuts
                const laneMsw = state[laneIndex].high;
                const laneLsw = state[laneIndex].low;
                const rhoOffset = RHO_OFFSETS[laneIndex];
                // Rotate lanes
                if (rhoOffset < 32) {
                    tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
                    tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
                }
                else /* if (rhoOffset >= 32) */ {
                    tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
                    tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
                }
                // Transpose lanes
                const TPiLane = T[PI_INDEXES[laneIndex]];
                TPiLane.high = tMsw;
                TPiLane.low = tLsw;
            }
            // Rho pi at x = y = 0
            const T0 = T[0];
            const state0 = state[0];
            T0.high = state0.high;
            T0.low = state0.low;
            // Chi
            for (let x = 0; x < 5; x++) {
                for (let y = 0; y < 5; y++) {
                    // Shortcuts
                    const laneIndex = x + 5 * y;
                    const l = state[laneIndex];
                    const TLane = T[laneIndex];
                    const Tx1Lane = T[((x + 1) % 5) + 5 * y];
                    const Tx2Lane = T[((x + 2) % 5) + 5 * y];
                    // Mix rows
                    l.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
                    l.low = TLane.low ^ (~Tx1Lane.low & Tx2Lane.low);
                }
            }
            // Iota
            const lane = state[0];
            const roundConstant = ROUND_CONSTANTS[round];
            lane.high ^= roundConstant.high;
            lane.low ^= roundConstant.low;
        }
    }
    _doFinalize() {
        // Shortcuts
        const data = this._data;
        const dataWords = data.words;
        const nBitsLeft = data.nSigBytes * 8;
        const blockSizeBits = this.blockSize * 32;
        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
        dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
        data.nSigBytes = dataWords.length * 4;
        // Hash final blocks
        this._process();
        // Shortcuts
        const state = this._state;
        const outputLengthBytes = this._outputLength / 8;
        const outputLengthLanes = outputLengthBytes / 8;
        // Squeeze
        const hashWords = [];
        for (let i = 0; i < outputLengthLanes; i++) {
            // Shortcuts
            const lane = state[i];
            let laneMsw = lane.high;
            let laneLsw = lane.low;
            // Swap endian
            laneMsw = ((((laneMsw << 8) | (laneMsw >>> 24)) & 0x00ff00ff) |
                (((laneMsw << 24) | (laneMsw >>> 8)) & 0xff00ff00));
            laneLsw = ((((laneLsw << 8) | (laneLsw >>> 24)) & 0x00ff00ff) |
                (((laneLsw << 24) | (laneLsw >>> 8)) & 0xff00ff00));
            // Squeeze state to retrieve hash
            hashWords.push(laneLsw);
            hashWords.push(laneMsw);
        }
        // Return final computed hash
        return new Word32Array(hashWords, outputLengthBytes);
    }
    clone() {
        const props = {
            outputLength: this._outputLength,
            state: this._state,
            blockSize: this._blockSize,
            data: this._data,
            nBytes: this._nBytes,
        };
        return new SHA3(props);
    }
    static hash(message, props) {
        return new SHA3(props).finalize(message);
    }
}
