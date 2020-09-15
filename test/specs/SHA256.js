const expect = require("expect.js");
const {Word32Array} = require("../../test/build/lib");
const SHA256 = require("../../test/build/SHA256");

describe("sha256", function(){
  it("digest '' as expected", function(){
    expect(SHA256.hash("").toString()).to.be("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
  });
  it("digest 'a' as expected", function(){
    expect(SHA256.hash("a").toString()).to.be("ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb");
  });
  it("digest 'abc' as expected", function(){
    expect(SHA256.hash("abc").toString()).to.be("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
  });
  it("digest 'message digest' as expected", function(){
    expect(SHA256.hash("message digest").toString()).to.be("f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650");
  });
  it("digest 'abcdefghijklmnopqrstuvwxyz' as expected", function(){
    expect(SHA256.hash("abcdefghijklmnopqrstuvwxyz").toString()).to.be("71c480df93d6ae2f1efad1447c66c9525e316218cf51fc8d9ed832f2daf18b73");
  });
  it("digest 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' as expected", function(){
    expect(SHA256.hash("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789").toString()).to.be("db4bfcbd4da0cd85a60c3c37d3fbd8805c77f15fc6b1fdfe614ee0a7c8fdb4c0");
  });
  it("digest '12345678901234567890123456789012345678901234567890123456789012345678901234567890' as expected", function(){
    expect(SHA256.hash("12345678901234567890123456789012345678901234567890123456789012345678901234567890").toString()).to.be("f371bc4a311f2b009eef952dd83ca80e2b60026c8e935592d0f9c308453c813e");
  });
  
  it("update long message", function(){
    const sha256 = new SHA256();
    for(let i=0;i<100;i++){
      sha256.update("12345678901234567890123456789012345678901234567890");
    }
    
    expect(sha256.finalize().toString()).to.be("f8146961d9b73d8da49ccd526fca65439cdd5b402f76971556d5f52fd129843e");
  });
  
  it("input integrity", function(){
    const message = new Word32Array([0x12345678]);
    const expectedResult = message.toString();
    SHA256.hash(message);
    expect(message.toString()).to.be(expectedResult);
  });
  
  it("clone", function(){
    const sha256 = new SHA256();
    
    expect(SHA256.hash("a").toString()).to.be(sha256.update("a").clone().finalize().toString());
    expect(SHA256.hash("ab").toString()).to.be(sha256.update("b").clone().finalize().toString());
    expect(SHA256.hash("abc").toString()).to.be(sha256.update("c").clone().finalize().toString());
  });
  
  it("shortcut", function(){
    expect(SHA256.hash("").toString()).to.be(new SHA256().finalize("").toString());
  });
});
