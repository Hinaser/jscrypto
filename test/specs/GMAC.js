const expect = require("expect.js");
const {GMAC, Hex} = require("../../test/build");

describe("gmac", function(){
  it("test mac with AAD (GMAC)", function(){
    const key = Hex.parse("55804F3AEB4E914DC91255944A1F565A");
    const iv = Hex.parse("BBBBBBBBBBBBBBBBBBBBBBBB");
    const aad = Hex.parse("1063509E5A672C092CAD0B1DC6CE009A61AAAAAAAAAAAA");
    
    expect(GMAC(aad, key, iv).toString().slice(0, 24)).to.be("44c955d63799428524e97993");
  });
  
  it("test mac with AAD (GMAC) with tagLength", function(){
    const key = Hex.parse("55804F3AEB4E914DC91255944A1F565A");
    const iv = Hex.parse("BBBBBBBBBBBBBBBBBBBBBBBB");
    const aad = Hex.parse("1063509E5A672C092CAD0B1DC6CE009A61AAAAAAAAAAAA");
    const tagLength = 8;
    
    expect(GMAC(aad, key, iv, tagLength).toString()).to.be("44c955d637994285");
  });
});
