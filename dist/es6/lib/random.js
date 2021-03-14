function makeRandFunction() {
    if (typeof window !== "undefined") {
        const c = window.crypto || window.msCrypto;
        if (!c) {
            throw new Error("Crypto module not found");
        }
        return function rand() {
            return c.getRandomValues(new Uint32Array(1))[0];
        };
    }
    else if (typeof global !== "undefined" && global.crypto) {
        return function rand() {
            return global.crypto.randomBytes(4).readInt32LE();
        };
    }
    else if (typeof require === "function") {
        return function rand() {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return __non_webpack_require__("crypto").randomBytes(4).readInt32LE();
        };
    }
    throw new Error("Unable to find crypto module");
}
export const random = makeRandFunction();
