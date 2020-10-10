const expect = require("expect.js");
const {
  Latin1,
  Word32Array,
} = require("../../../test/build/all");

describe("encoder/Latin1", function(){
  it("test stringify", function(){
    const expectedValue = "\x12\x34\x56\x78";
    expect(Latin1.stringify(new Word32Array([0x12345678],))).to.be(expectedValue);
  });
  
  it("test parse", function(){
    const expectedValue = new Word32Array([0x12345678]).toString();
    expect(Latin1.parse("\x12\x34\x56\x78").toString()).to.be(expectedValue);
  });
});
