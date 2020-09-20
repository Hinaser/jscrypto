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
  const crypto: Crypto | NodeCrypto = (() => {
    // Native crypto from window (Browser)
    if (typeof window !== "undefined") {
      const c = window.crypto || window.msCrypto;
      if (!c) {
        throw new Error("Crypto module not found");
      }
      return c;
    }
    else if (typeof global !== "undefined" && global.crypto) {
      return global.crypto as Crypto | NodeCrypto;
    }
    throw new Error("Unable to find crypto module");
  })();
  
  if (typeof (crypto as Crypto).getRandomValues === "function") {
    return function rand() {
      return (crypto as Crypto).getRandomValues(new Uint32Array(1))[0];
    };
  }
  
  if (typeof (crypto as NodeCrypto).randomBytes === "function") {
    return function rand() {
      return (crypto as NodeCrypto).randomBytes(4).readInt32LE();
    }
  }
  
  throw new Error("Unable to find crypto module");
}

export const random = makeRandFunction();
