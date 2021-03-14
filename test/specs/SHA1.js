const expect = require("expect.js");
const {Word32Array, SHA1} = require("../../test/build");

describe("sha1", function(){
  it("digest '' as expected", function(){
    expect(SHA1.hash("").toString()).to.be("da39a3ee5e6b4b0d3255bfef95601890afd80709");
  });
  it("digest 'a' as expected", function(){
    expect(SHA1.hash("a").toString()).to.be("86f7e437faa5a7fce15d1ddcb9eaeaea377667b8");
  });
  it("digest 'abc' as expected", function(){
    expect(SHA1.hash("abc").toString()).to.be("a9993e364706816aba3e25717850c26c9cd0d89d");
  });
  it("digest 'message digest' as expected", function(){
    expect(SHA1.hash("message digest").toString()).to.be("c12252ceda8be8994d5fa0290a47231c1d16aae3");
  });
  it("digest 'abcdefghijklmnopqrstuvwxyz' as expected", function(){
    expect(SHA1.hash("abcdefghijklmnopqrstuvwxyz").toString()).to.be("32d10c7b8cf96570ca04ce37f2a19d84240d3a89");
  });
  it("digest 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' as expected", function(){
    expect(SHA1.hash("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789").toString()).to.be("761c457bf73b14d27e9e9265c46f4b4dda11f940");
  });
  it("digest '12345678901234567890123456789012345678901234567890123456789012345678901234567890' as expected", function(){
    expect(SHA1.hash("12345678901234567890123456789012345678901234567890123456789012345678901234567890").toString()).to.be("50abf5706a150990a08b2c5ea40fa0e585554732");
  });
  
  it("update long message", function(){
    const sha1 = new SHA1();
    for(let i=0;i<100;i++){
      sha1.update("12345678901234567890123456789012345678901234567890");
    }
    
    expect(sha1.finalize().toString()).to.be("85e4c4b3933d5553ebf82090409a9d90226d845c");
  });
  
  it("input integrity", function(){
    const message = new Word32Array([0x12345678]);
    const expectedResult = message.toString();
    SHA1.hash(message);
    expect(message.toString()).to.be(expectedResult);
  });
  
  it("clone", function(){
    const sha1 = new SHA1();
    
    expect(SHA1.hash("a").toString()).to.be(sha1.update("a").clone().finalize().toString());
    expect(SHA1.hash("ab").toString()).to.be(sha1.update("b").clone().finalize().toString());
    expect(SHA1.hash("abc").toString()).to.be(sha1.update("c").clone().finalize().toString());
  });
  
  it("shortcut", function(){
    expect(SHA1.hash("").toString()).to.be(new SHA1().finalize("").toString());
  });
});
