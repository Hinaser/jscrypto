const expect = require("expect.js");
const Hmac = require("../../dist/HMAC");
const Sha256 = require("../../dist/SHA256");
const HmacSHA256 = require("../../dist/HMACSHA256");
const {Hex, Word32Array} = require("../../dist/Lib");

describe("hmac-sha256", function(){
  it("digest 'Hi There' as expected", function(){
    const expectedResult = "492ce020fe2534a5789dc3848806c78f4f6711397f08e7e7a12ca5a4483c8aa6";
    const message = "Hi There";
    const key = Hex.parse("0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b");
    expect(HmacSHA256(message, key).toString()).to.be(expectedResult);
  });
  it("digest 'what do ya want for nothing?' with 'Jefe' as expected", function(){
    const expectedResult = "5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843";
    const message = "what do ya want for nothing?";
    const key = "Jefe";
    expect(HmacSHA256(message, key).toString()).to.be(expectedResult);
  });
  it("digest long message and key as expected", function(){
    const expectedResult = "7dda3cc169743a6484649f94f0eda0f9f2ff496a9733fb796ed5adb40a44c3c1";
    const message = Hex.parse("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
    const key = Hex.parse("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    expect(HmacSHA256(message, key).toString()).to.be(expectedResult);
  });
  it("digest 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' with 'A' as expected", function(){
    const expectedResult = "a89dc8178c1184a62df87adaa77bf86e93064863d93c5131140b0ae98b866687";
    const message = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const key = "A";
    expect(HmacSHA256(message, key).toString()).to.be(expectedResult);
  });
  it("digest 'abcdefghijklmnopqrstuvwxyz' with 'A' as expected", function(){
    const expectedResult = "d8cb78419c02fe20b90f8b77427dd9f81817a751d74c2e484e0ac5fc4e6ca986";
    const message = "abcdefghijklmnopqrstuvwxyz";
    const key = "A";
    expect(HmacSHA256(message, key).toString()).to.be(expectedResult);
  });
  
  it("update", function(){
    const hmac = new Hmac(new Sha256(), Hex.parse("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddddddd'));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddd'));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddd'));
    
    const message = Hex.parse("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
    const key = Hex.parse("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    expect(HmacSHA256(message, key).toString()).to.be(hmac.finalize().toString());
  });
  
  it("input integrity", function(){
    const message = new Word32Array([0x12345678]);
    const key = new Word32Array([0x12345678]);
    
    const expectedMessage = message.toString();
    const expectedKey = key.toString();
    
    HmacSHA256(message, key);
    
    expect(message.toString()).to.be(expectedMessage);
    expect(key.toString()).to.be(expectedKey);
  });
  
  it("respect key sigBytes", function(){
    const key = Word32Array.random(8);
    key.setSignificantBytes(4);
    
    const keyClamped = key.clone();
    keyClamped.clamp();
    
    expect(HmacSHA256("Message", key).toString()).to.be(HmacSHA256("Message", keyClamped).toString());
  });
});
