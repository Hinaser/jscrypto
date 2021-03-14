const expect = require("expect.js");
const {
  Utf8,
  Word32Array,
} = require("../../../test/build");

describe("encoder/Utf8", function(){
  it("test stringify 1", function(){
    const expectedValue = "$";
    expect(Utf8.stringify(new Word32Array([0x24000000], 1))).to.be(expectedValue);
  });
  
  it("test stringify 2", function(){
    const expectedValue = "¢";
    expect(Utf8.stringify(new Word32Array([0xc2a20000], 2))).to.be(expectedValue);
  });
  
  it("test stringify 3", function(){
    const expectedValue = "€";
    expect(Utf8.stringify(new Word32Array([0xe282ac00], 3))).to.be(expectedValue);
  });
  
  it("test stringify 4", function(){
    const expectedValue = "𤭢";
    expect(Utf8.stringify(new Word32Array([0xf0a4ada2], 4))).to.be(expectedValue);
  });
  
  it("test parse 1", function(){
    const expectedValue = new Word32Array([0x24000000], 1).toString();
    expect(Utf8.parse("$").toString()).to.be(expectedValue);
  });
  
  it("test parse 2", function(){
    const expectedValue = new Word32Array([0xc2a20000], 2).toString();
    expect(Utf8.parse("¢").toString()).to.be(expectedValue);
  });
  
  it("test parse 3", function(){
    const expectedValue = new Word32Array([0xe282ac00], 3).toString();
    expect(Utf8.parse("€").toString()).to.be(expectedValue);
  });
  
  it("test parse 4", function(){
    const expectedValue = new Word32Array([0xf0a4ada2], 4).toString();
    expect(Utf8.parse("𤭢").toString()).to.be(expectedValue);
  });
});
