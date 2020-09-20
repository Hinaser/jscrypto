interface WindowEx extends Window {
  /**
   * Native (experimental IE 11) crypto from window (Browser)
   */
  msCrypto?: Crypto;
}

/**
 * @ignore
 */
declare let window: WindowEx;
type NodeCrypto = { randomBytes: (size: number) => { readInt32LE: () => number } };

function makeRandFunction(): () => number {
  if (typeof window !== "undefined") {
    const c = window.crypto || window.msCrypto;
    if (!c) {
      throw new Error("Crypto module not found");
    }
    return function rand(){
      return (c as Crypto).getRandomValues(new Uint32Array(1))[0];
    };
  }
  else if (typeof global !== "undefined" && global.crypto) {
    return function rand(){
      return ((global.crypto as unknown) as NodeCrypto).randomBytes(4).readInt32LE();
    };
  }
  else if(typeof require === "function"){
    return function rand(){
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return (__non_webpack_require__("crypto") as NodeCrypto).randomBytes(4).readInt32LE();
    }
  }
  throw new Error("Unable to find crypto module");
}

export const random = makeRandFunction();
