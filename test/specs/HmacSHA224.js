const expect = require("expect.js");
const {Hmac} = require("../../test/build/Hmac");
const {SHA224} = require("../../test/build/SHA224");
const {HmacSHA224} = require("../../test/build/HmacSHA224");
const {Hex, Word32Array} = require("../../test/build/lib");

describe("hmac-sha224", function(){
  it("digest 'Hi There' as expected", function(){
    const expectedResult = "4e841ce7a4ae83fbcf71e3cd64bfbf277f73a14680aae8c518ac7861";
    const message = "Hi There";
    const key = Hex.parse("0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b");
    expect(HmacSHA224(message, key).toString()).to.be(expectedResult);
  });
  it("digest 'what do ya want for nothing?' with 'Jefe' as expected", function(){
    const expectedResult = "a30e01098bc6dbbf45690f3a7e9e6d0f8bbea2a39e6148008fd05e44";
    const message = "what do ya want for nothing?";
    const key = "Jefe";
    expect(HmacSHA224(message, key).toString()).to.be(expectedResult);
  });
  it("digest long message and key as expected", function(){
    const expectedResult = "cbff7c2716bbaa7c77bed4f491d3e8456cb6c574e92f672b291acf5b";
    const message = Hex.parse("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
    const key = Hex.parse("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    expect(HmacSHA224(message, key).toString()).to.be(expectedResult);
  });
  it("digest 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' with 'A' as expected", function(){
    const expectedResult = "61bf669da4fdcd8e5c3bd09ebbb4a986d3d1b298d3ca05c511f7aeff";
    const message = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const key = "A";
    expect(HmacSHA224(message, key).toString()).to.be(expectedResult);
  });
  it("digest 'abcdefghijklmnopqrstuvwxyz' with 'A' as expected", function(){
    const expectedResult = "16fc69ada3c3edc1fe9144d6b98d93393833ae442bedf681110a1176";
    const message = "abcdefghijklmnopqrstuvwxyz";
    const key = "A";
    expect(HmacSHA224(message, key).toString()).to.be(expectedResult);
  });
  
  it("update", function(){
    const hmac = new Hmac(new SHA224(), Hex.parse("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddddddd'));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddd'));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddd'));
    
    const message = Hex.parse("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
    const key = Hex.parse("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    expect(HmacSHA224(message, key).toString()).to.be(hmac.finalize().toString());
  });
  
  it("input integrity", function(){
    const message = new Word32Array([0x12345678]);
    const key = new Word32Array([0x12345678]);
    
    const expectedMessage = message.toString();
    const expectedKey = key.toString();
    
    HmacSHA224(message, key);
    
    expect(message.toString()).to.be(expectedMessage);
    expect(key.toString()).to.be(expectedKey);
  });
  
  it("respect key sigBytes", function(){
    const key = Word32Array.random(8);
    key.setSignificantBytes(4);
    
    const keyClamped = key.clone();
    keyClamped.clamp();
    
    expect(HmacSHA224("Message", key).toString()).to.be(HmacSHA224("Message", keyClamped).toString());
  });
});
