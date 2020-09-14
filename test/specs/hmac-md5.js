const expect = require("expect.js");
const Hmac = require("../../dist/HMAC");
const MD5 = require("../../dist/MD5");
const HmacMD5 = require("../../dist/HMACMD5");
const {Hex, Word32Array} = require("../../dist/Lib");

describe("hmac-md5", function(){
  it("digest 'Hi There' as expected", function(){
    const expectedResult = "9294727a3638bb1c13f48ef8158bfc9d";
    const message = "Hi There";
    const key = Hex.parse("0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b");
    expect(HmacMD5(message, key).toString()).to.be(expectedResult);
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
