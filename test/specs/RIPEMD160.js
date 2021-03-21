const expect = require("expect.js");
const {Word32Array, RIPEMD160} = require("../../test/build");

describe("ripemd160", function(){
  it("digest 'The quick brown fox jumps over the lazy dog' as expected", function(){
    expect(RIPEMD160.hash("The quick brown fox jumps over the lazy dog").toString()).to.be("37f332f68db77bd9d7edd4969571ad671cf9dd3b");
  });
  it("digest 'The quick brown fox jumps over the lazy cog' as expected", function(){
    expect(RIPEMD160.hash("The quick brown fox jumps over the lazy cog").toString()).to.be("132072df690933835eb8b6ad0b77e7b6f14acad7");
  });
  it("digest '' as expected", function(){
    expect(RIPEMD160.hash("").toString()).to.be("9c1185a5c5e9fc54612808977ee8f548b2258d31");
  });
});
