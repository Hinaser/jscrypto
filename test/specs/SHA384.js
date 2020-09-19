const expect = require("expect.js");
const {Word32Array} = require("../../test/build/lib");
const SHA384 = require("../../test/build/SHA384");

describe("sha384", function(){
  it("digest '' as expected", function(){
    expect(SHA384.hash("").toString()).to.be("38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b");
  });
  it("digest 'The quick brown fox jumps over the lazy dog' as expected", function(){
    expect(SHA384.hash("The quick brown fox jumps over the lazy dog").toString()).to.be("ca737f1014a48f4c0b6dd43cb177b0afd9e5169367544c494011e3317dbf9a509cb1e5dc1e85a941bbee3d7f2afbc9b1");
  });
  it("digest 'The quick brown fox jumps over the lazy dog.' as expected", function(){
    expect(SHA384.hash("The quick brown fox jumps over the lazy dog.").toString()).to.be("ed892481d8272ca6df370bf706e4d7bc1b5739fa2177aae6c50e946678718fc67a7af2819a021c2fc34e91bdb63409d7");
  });
  
  it("update long message", function(){
    const sha384 = new SHA384();
    for(let i=0;i<100;i++){
      sha384.update("12345678901234567890123456789012345678901234567890");
    }
    
    expect(sha384.finalize().toString()).to.be("297a519246d6f639a4020119e1f03fc8d77171647b2ff75ea4125b7150fed0cdcc93f8dca1c3c6a624d5e88d780d82cd");
  });
  
  it("clone", function(){
    const sha384 = new SHA384();
    
    expect(SHA384.hash("a").toString()).to.be(sha384.update("a").clone().finalize().toString());
    expect(SHA384.hash("ab").toString()).to.be(sha384.update("b").clone().finalize().toString());
    expect(SHA384.hash("abc").toString()).to.be(sha384.update("c").clone().finalize().toString());
  });
  
  it("input integrity", function(){
    const message = new Word32Array([0x12345678]);
    const expectedResult = message.toString();
    SHA384.hash(message);
    expect(message.toString()).to.be(expectedResult);
  });
  
  it("shortcut", function(){
    expect(SHA384.hash("").toString()).to.be(new SHA384().finalize("").toString());
  });
});
