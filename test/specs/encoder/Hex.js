const expect = require("expect.js");
const {
  Hex,
  Word32Array,
} = require("../../../test/build");

describe("encoder/Hex", function(){
  it("test stringify", function(){
    const expectedValue = "12345678";
    expect(Hex.stringify(new Word32Array([0x12345678],))).to.be(expectedValue);
  });
  
  it("test parse", function(){
    const expectedValue = new Word32Array([0x12345678]).toString();
    expect(Hex.parse("12345678").toString()).to.be(expectedValue);
  });
});
