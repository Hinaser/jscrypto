const expect = require("expect.js");
const {CBCMAC, Hex} = require("../../test/build");

describe("cbc-mac", function(){
  it("test mac with plaintext and associated data", function(){
    const message = Hex.parse("0001020304050607");
    const key = Hex.parse("404142434445464748494a4b4c4d4e4f");
    const nonce = Hex.parse("10111213141516");
    const t = 32/8;
  
    expect(CBCMAC(message, key, nonce, {tagLength: t}).toString()).to.be("7d3869c0");
  });
});
