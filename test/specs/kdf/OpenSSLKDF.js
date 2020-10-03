const expect = require("expect.js");
const {
  Hex,
  OpenSSLKDF,
} = require("../../../test/build/all");

describe("kdf/OpenSSLKDF", function(){
  it("test vector", function(){
    const derivedParams = OpenSSLKDF.execute("password", 256/32, 128/32, Hex.parse("0a9d8620cf7219f1"));
    
    expect(derivedParams.key.toString()).to.be("50f32e0ec9408e02ff42364a52aac95c3694fc027256c6f488bf84b8e60effcd");
    expect(derivedParams.iv.toString()).to.be("81381e39b94fd692dff7e2239a298cb6");
    expect(derivedParams.salt.toString()).to.be("0a9d8620cf7219f1");
  });
});
