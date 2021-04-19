const expect = require("expect.js");
const {CBCMAC, Hex} = require("../../test/build");

describe("cbc-mac", function(){
  it("test mac with plaintext and associated data", function(){
    const K = Hex.parse("404142434445464748494a4b4c4d4e4f");
    const N = Hex.parse("10111213141516");
    const A = Hex.parse("0001020304050607");
    const P = Hex.parse("20212223");
    const t = 32/8;
  
    expect(CBCMAC(P, K, N, A, {tagLength: t}).toString()).to.be("4dac255d");
  });
});
