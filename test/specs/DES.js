const expect = require("expect.js");
const {
  Word32Array,
  Hex,
  mode: {ECB},
  pad: {Noop},
  SHA256,
  SerializableCipher,
  PasswordBasedCipher,
  DES,
} = require("../../test/build/all");

describe("des", function(){
  it("test encrypt 1", function(){
    const expectedResult = "95a8d72813daa94d";
    const message = Hex.parse("0000000000000000");
    const key = Hex.parse("8000000000000000");
    const props = {mode: ECB, padding: Noop};
    expect(DES.encrypt(message, key, props).cipherText.toString()).to.be(expectedResult);
  });
  it("test encrypt 2", function(){
    const expectedResult = "1de5279dae3bed6f";
    const message = Hex.parse("0000000000000000");
    const key = Hex.parse("0000000000002000");
    const props = {mode: ECB, padding: Noop};
    expect(DES.encrypt(message, key, props).cipherText.toString()).to.be(expectedResult);
  });
  it("test encrypt 3", function(){
    const expectedResult = "1d1ca853ae7c0c5f";
    const message = Hex.parse("0000000000002000");
    const key = Hex.parse("0000000000000000");
    const props = {mode: ECB, padding: Noop};
    expect(DES.encrypt(message, key, props).cipherText.toString()).to.be(expectedResult);
  });
  it("test encrypt 4", function(){
    const expectedResult = "ac978c247863388f";
    const message = Hex.parse("3232323232323232");
    const key = Hex.parse("3232323232323232");
    const props = {mode: ECB, padding: Noop};
    expect(DES.encrypt(message, key, props).cipherText.toString()).to.be(expectedResult);
  });
  it("test encrypt 5", function(){
    const expectedResult = "3af1703d76442789";
    const message = Hex.parse("6464646464646464");
    const key = Hex.parse("6464646464646464");
    const props = {mode: ECB, padding: Noop};
    expect(DES.encrypt(message, key, props).cipherText.toString()).to.be(expectedResult);
  });
  it("test encrypt 6", function(){
    const expectedResult = "a020003c5554f34c";
    const message = Hex.parse("9696969696969696");
    const key = Hex.parse("9696969696969696");
    const props = {mode: ECB, padding: Noop};
    expect(DES.encrypt(message, key, props).cipherText.toString()).to.be(expectedResult);
  });
  
  it("test decrypt 1", function(){
    const expectedResult = "0000000000000000";
    const encryptedMessage = Hex.parse("95a8d72813daa94d");
    const key = Hex.parse("8000000000000000");
    const props = {mode: ECB, padding: Noop};
    expect(DES.decrypt({cipherText: encryptedMessage}, key, props).toString()).to.be(expectedResult);
  });
  it("test decrypt 2", function(){
    const expectedResult = "0000000000000000";
    const encryptedMessage = Hex.parse("1de5279dae3bed6f");
    const key = Hex.parse("0000000000002000");
    const props = {mode: ECB, padding: Noop};
    expect(DES.decrypt({cipherText: encryptedMessage}, key, props).toString()).to.be(expectedResult);
  });
  it("test decrypt 3", function(){
    const expectedResult = "0000000000002000";
    const encryptedMessage = Hex.parse("1d1ca853ae7c0c5f");
    const key = Hex.parse("0000000000000000");
    const props = {mode: ECB, padding: Noop};
    expect(DES.decrypt({cipherText: encryptedMessage}, key, props).toString()).to.be(expectedResult);
  });
  it("test decrypt 4", function(){
    const expectedResult = "3232323232323232";
    const encryptedMessage = Hex.parse("ac978c247863388f");
    const key = Hex.parse("3232323232323232");
    const props = {mode: ECB, padding: Noop};
    expect(DES.decrypt({cipherText: encryptedMessage}, key, props).toString()).to.be(expectedResult);
  });
  it("test decrypt 5", function(){
    const expectedResult = "6464646464646464";
    const encryptedMessage = Hex.parse("3af1703d76442789");
    const key = Hex.parse("6464646464646464");
    const props = {mode: ECB, padding: Noop};
    expect(DES.decrypt({cipherText: encryptedMessage}, key, props).toString()).to.be(expectedResult);
  });
  it("test decrypt 6", function(){
    const expectedResult = "9696969696969696";
    const encryptedMessage = Hex.parse("a020003c5554f34c");
    const key = Hex.parse("9696969696969696");
    const props = {mode: ECB, padding: Noop};
    expect(DES.decrypt({cipherText: encryptedMessage}, key, props).toString()).to.be(expectedResult);
  });
  
  it("test multi part", function(){
    const expectedResult = DES.encrypt(
      Hex.parse("00112233445566778899aabbccddeeff"),
      Hex.parse("0123456789abcdef"),
      {mode: ECB, padding: Noop},
    ).cipherText.toString();
    const key = Hex.parse("0123456789abcdef");
    const props = {mode: ECB, padding: Noop};
    const des3 = DES.createEncryptor(key, props);
    
    const ciphertext1 = des3.process(Hex.parse('001122334455'));
    const ciphertext2 = des3.process(Hex.parse('66778899aa'));
    const ciphertext3 = des3.process(Hex.parse('bbccddeeff'));
    const ciphertext4 = des3.finalize();
    
    expect(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString()).to.be(expectedResult);
  });
  
  it("test input integrity", function(){
    const message = Hex.parse('00112233445566778899aabbccddeeff');
    const key = Hex.parse('0001020304050607');
    const iv = Hex.parse('08090a0b0c0d0e0f');
    
    const expectedMessage = message.toString();
    const expectedKey = key.toString();
    const expectedIv = iv.toString();
    
    DES.encrypt(message, key, { iv });
    
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
    expect(DES.encrypt("Hi There", SHA256.hash("Jefe"), {mode: ECB, padding: Noop}).cipherText.toString())
      .to.be(DES.createEncryptor(SHA256.hash("Jefe"), {mode: ECB, padding: Noop}).finalize("Hi There").toString());
    
    expect(DES.encrypt("Hi There", SHA256.hash("Jefe"), {mode: ECB, padding: Noop}).toString())
      .to.be(SerializableCipher.encrypt(DES, "Hi There", SHA256.hash("Jefe"), {mode: ECB, padding: Noop}).toString());
    
    expect(DES.encrypt("Hi There", "Jefe", {mode: ECB, padding: Noop}).toString())
      .to.be(PasswordBasedCipher.encrypt(DES, "Hi There", "Jefe", {mode: ECB, padding: Noop}).toString());
    
    // Restore random method
    Word32Array.random = random;
  });
});
