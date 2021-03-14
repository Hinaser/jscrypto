const expect = require("expect.js");
const {
  Utf16,
  Utf16LE,
  Word32Array,
} = require("../../../test/build");

describe("encoder/Utf16", function(){
  it("test stringify 1", function(){
    const expectedValue = "z";
    expect(Utf16.stringify(new Word32Array([0x007a0000], 2))).to.be(expectedValue);
  });
  
  it("test stringify 2", function(){
    const expectedValue = "水";
    expect(Utf16.stringify(new Word32Array([0x6c340000], 2))).to.be(expectedValue);
  });
  
  it("test stringify 3", function(){
    const expectedValue = "𐀀";
    expect(Utf16.stringify(new Word32Array([0xd800dc00], 4))).to.be(expectedValue);
  });
  
  it("test stringify 4", function(){
    const expectedValue = "𝄞";
    expect(Utf16.stringify(new Word32Array([0xd834dd1e], 4))).to.be(expectedValue);
  });
  
  it("test stringify 5", function(){
    const expectedValue = "􏿽";
    expect(Utf16.stringify(new Word32Array([0xdbffdffd], 4))).to.be(expectedValue);
  });
  
  it("test stringify LE", function(){
    const expectedValue = "􏿽";
    expect(Utf16LE.stringify(new Word32Array([0xffdbfddf], 4))).to.be(expectedValue);
  });
  
  it("test parse 1", function(){
    const expectedValue = new Word32Array([0x007a0000], 2).toString();
    expect(Utf16.parse("z").toString()).to.be(expectedValue);
  });
  
  it("test parse 2", function(){
    const expectedValue = new Word32Array([0x6c340000], 2).toString();
    expect(Utf16.parse("水").toString()).to.be(expectedValue);
  });
  
  it("test parse 3", function(){
    const expectedValue = new Word32Array([0xd800dc00], 4).toString();
    expect(Utf16.parse("𐀀").toString()).to.be(expectedValue);
  });
  
  it("test parse 4", function(){
    const expectedValue = new Word32Array([0xd834dd1e], 4).toString();
    expect(Utf16.parse("𝄞").toString()).to.be(expectedValue);
  });
  
  it("test parse 5", function(){
    const expectedValue = new Word32Array([0xdbffdffd], 4).toString();
    expect(Utf16.parse("􏿽").toString()).to.be(expectedValue);
  });
  
  it("test parse LE", function(){
    const expectedValue = new Word32Array([0xffdbfddf], 4).toString();
    expect(Utf16LE.parse("􏿽").toString()).to.be(expectedValue);
  });
});
