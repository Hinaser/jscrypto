const expect = require("expect.js");
const {Hmac} = require("../../test/build/Hmac");
const {SHA384} = require("../../test/build/SHA384");
const {HmacSHA384} = require("../../test/build/HmacSHA384");
const {Hex, Word32Array} = require("../../test/build/lib");

describe("hmac-sha384", function(){
  it("digest 'Hi There' as expected", function(){
    const expectedResult = "7afaa633e20d379b02395915fbc385ff8dc27dcd3885e1068ab942eeab52ec1f20ad382a92370d8b2e0ac8b83c4d53bf";
    const message = "Hi There";
    const key = Hex.parse("0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b");
    expect(HmacSHA384(message, key).toString()).to.be(expectedResult);
  });
  it("digest 'what do ya want for nothing?' with 'Jefe' as expected", function(){
    const expectedResult = "af45d2e376484031617f78d2b58a6b1b9c7ef464f5a01b47e42ec3736322445e8e2240ca5e69e2c78b3239ecfab21649";
    const message = "what do ya want for nothing?";
    const key = "Jefe";
    expect(HmacSHA384(message, key).toString()).to.be(expectedResult);
  });
  it("digest long message and key as expected", function(){
    const expectedResult = "1383e82e28286b91f4cc7afbd13d5b5c6f887c05e7c4542484043a37a5fe45802a9470fb663bd7b6570fe2f503fc92f5";
    const message = Hex.parse("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
    const key = Hex.parse("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    expect(HmacSHA384(message, key).toString()).to.be(expectedResult);
  });
  it("digest 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' with 'A' as expected", function(){
    const expectedResult = "365dfb271adb8e30fe6c74220b75df1b38c2d19b9d37f2e5a0ec2f3f22bd0406bf5b786e98d81b82c36d3d8a1be6cd07";
    const message = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const key = "A";
    expect(HmacSHA384(message, key).toString()).to.be(expectedResult);
  });
  it("digest 'abcdefghijklmnopqrstuvwxyz' with 'A' as expected", function(){
    const expectedResult = "a8357d5e84da64140e41545562ae0782e2a58e39c6cd98939fad8d9080e774c84b7eaca4ba07f6dbf0f12eab912c5285";
    const message = "abcdefghijklmnopqrstuvwxyz";
    const key = "A";
    expect(HmacSHA384(message, key).toString()).to.be(expectedResult);
  });
  
  it("update", function(){
    const hmac = new Hmac(new SHA384(), Hex.parse("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddddddd'));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddd'));
    hmac.update(Hex.parse('dddddddddddddddddddddddddddddddd'));
    
    const message = Hex.parse("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
    const key = Hex.parse("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    expect(HmacSHA384(message, key).toString()).to.be(hmac.finalize().toString());
  });
  
  it("input integrity", function(){
    const message = new Word32Array([0x12345678]);
    const key = new Word32Array([0x12345678]);
    
    const expectedMessage = message.toString();
    const expectedKey = key.toString();
    
    HmacSHA384(message, key);
    
    expect(message.toString()).to.be(expectedMessage);
    expect(key.toString()).to.be(expectedKey);
  });
  
  it("respect key sigBytes", function(){
    const key = Word32Array.random(8);
    key.setSignificantBytes(4);
    
    const keyClamped = key.clone();
    keyClamped.clamp();
    
    expect(HmacSHA384("Message", key).toString()).to.be(HmacSHA384("Message", keyClamped).toString());
  });
});
