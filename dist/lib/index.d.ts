import { Word32Array } from "./Word32Array";
import { Word64, Word64Array } from "./Word64Array";
import { isIE } from "./browser";
declare const _default: {
    random: () => number;
    Word32Array: typeof Word32Array;
    Word64: typeof Word64;
    Word64Array: typeof Word64Array;
    isIE: typeof isIE;
    Utf8: import("./type").IEncoder;
    Latin1: import("./type").IEncoder;
    Hex: import("./type").IEncoder;
};
export default _default;
