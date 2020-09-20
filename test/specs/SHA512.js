const expect = require("expect.js");
const {Word32Array} = require("../../test/build/lib");
const {SHA512} = require("../../test/build/SHA512");

describe("sha512", function(){
  it("digest '' as expected", function(){
    expect(SHA512.hash("").toString()).to.be("cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e");
  });
  it("digest 'The quick brown fox jumps over the lazy dog' as expected", function(){
    expect(SHA512.hash("The quick brown fox jumps over the lazy dog").toString()).to.be("07e547d9586f6a73f73fbac0435ed76951218fb7d0c8d788a309d785436bbb642e93a252a954f23912547d1e8a3b5ed6e1bfd7097821233fa0538f3db854fee6");
  });
  it("digest 'The quick brown fox jumps over the lazy dog.' as expected", function(){
    expect(SHA512.hash("The quick brown fox jumps over the lazy dog.").toString()).to.be("91ea1245f20d46ae9a037a989f54f1f790f0a47607eeb8a14d12890cea77a1bbc6c7ed9cf205e67b7f2b8fd4c7dfd3a7a8617e45f3c463d481c7e586c39ac1ed");
  });
  
  it("update long message", function(){
    const sha512 = new SHA512();
    for(let i=0;i<100;i++){
      sha512.update("12345678901234567890123456789012345678901234567890");
    }
    
    expect(sha512.finalize().toString()).to.be("9bc64f37c54606dff234b6607e06683c7ba248558d0ec74a11525d9f59e0be566489cc9413c00ca5e9db705fc52ba71214bcf118f65072fe284af8f8cf9500af");
  });
  
  it("clone", function(){
    const sha512 = new SHA512();
    
    expect(SHA512.hash("a").toString()).to.be(sha512.update("a").clone().finalize().toString());
    expect(SHA512.hash("ab").toString()).to.be(sha512.update("b").clone().finalize().toString());
    expect(SHA512.hash("abc").toString()).to.be(sha512.update("c").clone().finalize().toString());
  });
  
  it("input integrity", function(){
    const message = new Word32Array([0x12345678]);
    const expectedResult = message.toString();
    SHA512.hash(message);
    expect(message.toString()).to.be(expectedResult);
  });
  
  it("shortcut", function(){
    expect(SHA512.hash("").toString()).to.be(new SHA512().finalize("").toString());
  });
});
