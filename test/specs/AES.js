const expect = require("expect.js");
const {AES} = require("../../test/build/AES");
const {Hex, Word32Array} = require("../../test/build/lib");

describe("aes", function(){
  it("test encrypt key size 128", function(){
    const expectedResult = "69c4e0d86a7b0430d8cdb78070b4c55a";
    const message = Hex.parse("00112233445566778899aabbccddeeff");
    const key = Hex.parse("000102030405060708090a0b0c0d0e0f");
    const props = {};
    expect(AES.encrypt(message, key, props)).to.be(expectedResult);
  });
  it("digest 'what do ya want for nothing?' with 'Jefe' as expected", function(){
    const expectedResult = "750c783e6ab0b503eaa86e310a5db738";
    const message = "what do ya want for nothing?";
    const key = "Jefe";
    expect(HmacMD5(message, key).toString()).to.be(expectedResult);
  });
  it("digest long message and key as expected", function(){
    const expectedResult = "56be34521d144c88dbb8c733f0e8b3f6";
    const message = Hex.parse("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
    const key = Hex.parse("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    expect(HmacMD5(message, key).toString()).to.be(expectedResult);
  });
  it("digest 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' with 'A' as expected", function(){
    const expectedResult = "7ee2a3cc979ab19865704644ce13355c";
    const message = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const key = "A";
    expect(HmacMD5(message, key).toString()).to.be(expectedResult);
  });
  it("digest 'abcdefghijklmnopqrstuvwxyz' with 'A' as expected", function(){
    const expectedResult = "0e1bd89c43e3e6e3b3f8cf1d5ba4f77a";
    const message = "abcdefghijklmnopqrstuvwxyz";
    const key = "A";
    expect(HmacMD5(message, key).toString()).to.be(expectedResult);
  });
  
  it("update", function(){
    const hmac = new Hmac(new MD5(), Hex.parse("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddddddd'));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddd'));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddd'));
    
    const message = Hex.parse("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
    const key = Hex.parse("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    expect(HmacMD5(message, key).toString()).to.be(hmac.finalize().toString());
  });
  
  it("input integrity", function(){
    const message = new Word32Array([0x12345678]);
    const key = new Word32Array([0x12345678]);
    
    const expectedMessage = message.toString();
    const expectedKey = key.toString();
    
    HmacMD5(message, key);
    
    expect(message.toString()).to.be(expectedMessage);
    expect(key.toString()).to.be(expectedKey);
  });
  
  it("respect key sigBytes", function(){
    const key = Word32Array.random(8);
    key.setSignificantBytes(4);
    
    const keyClamped = key.clone();
    keyClamped.clamp();
    
    expect(HmacMD5("Message", key).toString()).to.be(HmacMD5("Message", keyClamped).toString());
  });
});
