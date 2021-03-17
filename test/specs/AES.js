const expect = require("expect.js");
const {
  Word32Array,
  Hex,
  Utf8,
  mode: {ECB, CBC},
  pad: {NoPadding, Pkcs7},
  SHA256,
  SerializableCipher,
  PasswordBasedCipher,
  AES,
} = require("../../test/build");

describe("aes", function(){
  it("test encrypt key size 128", function(){
    const expectedResult = "69c4e0d86a7b0430d8cdb78070b4c55a";
    const message = Hex.parse("00112233445566778899aabbccddeeff");
    const key = Hex.parse("000102030405060708090a0b0c0d0e0f");
    const props = {mode: ECB, padding: NoPadding};
    expect(AES.encrypt(message, key, props).cipherText.toString()).to.be(expectedResult);
  });
  it("test encrypt key size 192", function(){
    const expectedResult = "dda97ca4864cdfe06eaf70a0ec0d7191";
    const message = Hex.parse("00112233445566778899aabbccddeeff");
    const key = Hex.parse("000102030405060708090a0b0c0d0e0f1011121314151617");
    const props = {mode: ECB, padding: NoPadding};
    expect(AES.encrypt(message, key, props).cipherText.toString()).to.be(expectedResult);
  });
  it("test encrypt key size 256", function(){
    const expectedResult = "8ea2b7ca516745bfeafc49904b496089";
    const message = Hex.parse("00112233445566778899aabbccddeeff");
    const key = Hex.parse("000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f");
    const props = {mode: ECB, padding: NoPadding};
    expect(AES.encrypt(message, key, props).cipherText.toString()).to.be(expectedResult);
  });
  
  it("test decrypt key size 128", function(){
    const expectedResult = "00112233445566778899aabbccddeeff";
    const encryptedMessage = Hex.parse("69c4e0d86a7b0430d8cdb78070b4c55a");
    const key = Hex.parse("000102030405060708090a0b0c0d0e0f");
    const props = {mode: ECB, padding: NoPadding};
    expect(AES.decrypt({cipherText: encryptedMessage}, key, props).toString()).to.be(expectedResult);
  });
  it("test decrypt key size 192", function(){
    const expectedResult = "00112233445566778899aabbccddeeff";
    const encryptedMessage = Hex.parse("dda97ca4864cdfe06eaf70a0ec0d7191");
    const key = Hex.parse("000102030405060708090a0b0c0d0e0f1011121314151617");
    const props = {mode: ECB, padding: NoPadding};
    expect(AES.decrypt({cipherText: encryptedMessage}, key, props).toString()).to.be(expectedResult);
  });
  it("test decrypt key size 256", function(){
    const expectedResult = "00112233445566778899aabbccddeeff";
    const encryptedMessage = Hex.parse("8ea2b7ca516745bfeafc49904b496089");
    const key = Hex.parse("000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f");
    const props = {mode: ECB, padding: NoPadding};
    expect(AES.decrypt({cipherText: encryptedMessage}, key, props).toString()).to.be(expectedResult);
  });
  
  it("test encrypt/decrypt string", function(){
    const message = "message";
    const key = "key";
    
    const encryptedData = AES.encrypt(message, key).toString();
    expect(AES.decrypt(encryptedData, key).toString(Utf8)).to.be(message);
  });
  
  it("test multi part", function(){
    const expectedResult = "69c4e0d86a7b0430d8cdb78070b4c55a";
    const key = Hex.parse("000102030405060708090a0b0c0d0e0f");
    const props = {mode: ECB, padding: NoPadding};
    const aes = AES.createEncryptor(key, props);
  
    const ciphertext1 = aes.process(Hex.parse('001122334455'));
    const ciphertext2 = aes.process(Hex.parse('66778899aa'));
    const ciphertext3 = aes.process(Hex.parse('bbccddeeff'));
    const ciphertext4 = aes.finalize();
    
    expect(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString()).to.be(expectedResult);
  });
  
  it("test input integrity", function(){
    const message = Hex.parse('00112233445566778899aabbccddeeff');
    const key = Hex.parse('000102030405060708090a0b0c0d0e0f');
    const iv = Hex.parse('101112131415161718191a1b1c1d1e1f');
  
    const expectedMessage = message.toString();
    const expectedKey = key.toString();
    const expectedIv = iv.toString();
  
    AES.encrypt(message, key, { iv });
  
    expect(message.toString()).to.be(expectedMessage);
    expect(key.toString()).to.be(expectedKey);
    expect(iv.toString()).to.be(expectedIv);
  });
  
  it("test helper", function(){
    // Save original random method
    const random = Word32Array.random;
  
    // Replace random method with one that returns a predictable value
    Word32Array.random = function (nBytes) {
      const words = [];
      for(let i=0;i<nBytes;i+=4){
        words.push([0x11223344]);
      }
    
      return new Word32Array(words, nBytes);
    };
  
    // Test
    expect(AES.encrypt("Hi There", SHA256.hash("Jefe"), {mode: ECB, padding: NoPadding}).cipherText.toString())
      .to.be(AES.createEncryptor(SHA256.hash("Jefe"), {mode: ECB, padding: NoPadding}).finalize("Hi There").toString());
    
    expect(AES.encrypt("Hi There", SHA256.hash("Jefe"), {mode: ECB, padding: NoPadding}).toString())
      .to.be(SerializableCipher.encrypt(AES, "Hi There", SHA256.hash("Jefe"), {mode: ECB, padding: NoPadding}).toString());
    
    expect(AES.encrypt("Hi There", "Jefe", {mode: ECB, padding: NoPadding}).toString())
      .to.be(PasswordBasedCipher.encrypt(AES, "Hi There", "Jefe", {mode: ECB, padding: NoPadding}).toString());
  
    // Restore random method
    Word32Array.random = random;
  });
});
