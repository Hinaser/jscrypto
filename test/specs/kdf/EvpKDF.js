const expect = require("expect.js");
const {
  Hex,
  EvpKDF,
  Word32Array,
} = require("../../../test/build/all");

describe("kdf/EvpKDF", function(){
  it("test vector", function(){
    const expectedValue = "fdbdf3419fff98bdb0241390f62a9db35f4aba29d77566377997314ebfc709f20b5ca7b1081f94b1ac12e3c8ba87d05a"
    expect(EvpKDF.getKey("password", "saltsalt", {keySize: (256+128)/32}).toString()).to.be(expectedValue);
  });
  
  it("test input integrity", function(){
    const password = new Word32Array([0x12345678]);
    const salt = new Word32Array([0x12345678]);
  
    const expectedPassword = password.toString();
    const expectedSalt = salt.toString();
  
    EvpKDF.getKey(password, salt);
    
    expect(password.toString()).to.be(expectedPassword);
    expect(salt.toString()).to.be(expectedSalt);
  });
  
  it("test helper", function(){
    expect(EvpKDF.getKey("password", "saltsalt", {keySize: (256+128)/32}).toString())
      .to.be(new EvpKDF({keySize: (256+128)/32}).compute("password", "saltsalt").toString());
  });
});
