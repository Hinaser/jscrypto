const expect = require("expect.js");
const {
  Word32Array,
  Hex,
  mode: {ECB},
  pad: {Noop},
  SHA256,
  SerializableCipher,
  PasswordBasedCipher,
  DES3,
} = require("../../test/build/all");

describe("des", function(){
  it("test encrypt 1", function(){
    const expectedResult = "95a8d72813daa94d";
    const message = Hex.parse("0000000000000000");
    const key = Hex.parse("800101010101010180010101010101018001010101010101");
    const props = {mode: ECB, padding: Noop};
    expect(DES3.encrypt(message, key, props).cipherText.toString()).to.be(expectedResult);
  });
  it("test encrypt 2", function(){
    const expectedResult = "869efd7f9f265a09";
    const message = Hex.parse("0000000000000000");
    const key = Hex.parse("010101010101010201010101010101020101010101010102");
    const props = {mode: ECB, padding: Noop};
    expect(DES3.encrypt(message, key, props).cipherText.toString()).to.be(expectedResult);
  });
  it("test encrypt 3", function(){
    const expectedResult = "95f8a5e5dd31d900";
    const message = Hex.parse("8000000000000000");
    const key = Hex.parse("010101010101010101010101010101010101010101010101");
    const props = {mode: ECB, padding: Noop};
    expect(DES3.encrypt(message, key, props).cipherText.toString()).to.be(expectedResult);
  });
  
  it("test encrypt 4", function(){
    const expectedResult = "166b40b44aba4bd6";
    const encryptedMessage = Hex.parse("0000000000000001");
    const key = Hex.parse("010101010101010101010101010101010101010101010101");
    const props = {mode: ECB, padding: Noop};
    expect(DES3.decrypt({cipherText: encryptedMessage}, key, props).toString()).to.be(expectedResult);
  });
  it("test decrypt 1", function(){
    const expectedResult = "0000000000000000";
    const encryptedMessage = Hex.parse("95a8d72813daa94d");
    const key = Hex.parse("800101010101010180010101010101018001010101010101");
    const props = {mode: ECB, padding: Noop};
    expect(DES3.decrypt({cipherText: encryptedMessage}, key, props).toString()).to.be(expectedResult);
  });
  it("test decrypt 2", function(){
    const expectedResult = "0000000000000000";
    const encryptedMessage = Hex.parse("869efd7f9f265a09");
    const key = Hex.parse("010101010101010201010101010101020101010101010102");
    const props = {mode: ECB, padding: Noop};
    expect(DES3.decrypt({cipherText: encryptedMessage}, key, props).toString()).to.be(expectedResult);
  });
  it("test decrypt 3", function(){
    const expectedResult = "8000000000000000";
    const encryptedMessage = Hex.parse("95f8a5e5dd31d900");
    const key = Hex.parse("010101010101010101010101010101010101010101010101");
    const props = {mode: ECB, padding: Noop};
    expect(DES3.decrypt({cipherText: encryptedMessage}, key, props).toString()).to.be(expectedResult);
  });
  it("test decrypt 4", function(){
    const expectedResult = "0000000000000001";
    const encryptedMessage = Hex.parse("166b40b44aba4bd6");
    const key = Hex.parse("010101010101010101010101010101010101010101010101");
    const props = {mode: ECB, padding: Noop};
    expect(DES3.decrypt({cipherText: encryptedMessage}, key, props).toString()).to.be(expectedResult);
  });
  
  it("test multi part", function(){
    const expectedResult = DES3.encrypt(
      Hex.parse("00112233445566778899aabbccddeeff"),
      Hex.parse("000102030405060708090a0b0c0d0e0f1011121314151617"),
      {mode: ECB, padding: Noop},
    ).cipherText.toString();
    const key = Hex.parse("000102030405060708090a0b0c0d0e0f1011121314151617");
    const props = {mode: ECB, padding: Noop};
    const des3 = DES3.createEncryptor(key, props);
    
    const ciphertext1 = des3.process(Hex.parse('001122334455'));
    const ciphertext2 = des3.process(Hex.parse('66778899aa'));
    const ciphertext3 = des3.process(Hex.parse('bbccddeeff'));
    const ciphertext4 = des3.finalize();
    
    expect(ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString()).to.be(expectedResult);
  });
  
  it("test input integrity", function(){
    const message = Hex.parse('00112233445566778899aabbccddeeff');
    const key = Hex.parse('000102030405060708090a0b0c0d0e0f1011121314151617');
    const iv = Hex.parse('08090a0b0c0d0e0f');
    
    const expectedMessage = message.toString();
    const expectedKey = key.toString();
    const expectedIv = iv.toString();
    
    DES3.encrypt(message, key, { iv });
    
    expect(message.toString()).to.be(expectedMessage);
    expect(key.toString()).to.be(expectedKey);
    expect(iv.toString()).to.be(expectedIv);
  });
  
  it("test 64bit key", function(){
    const message = Hex.parse('00112233445566778899aabbccddeeff');
    const key = Hex.parse('0011223344556677');
    const extendedKey = Hex.parse('001122334455667700112233445566770011223344556677')
  
    const output1 = DES3.encrypt(message, key, { mode: ECB }).toString();
    const output2 = DES3.encrypt(message, extendedKey, { mode: ECB }).toString();
  
    expect(output2).to.be(output1);
  });
  
  it("test 128bit key", function(){
    const message = Hex.parse('00112233445566778899aabbccddeeff');
    const key = Hex.parse('00112233445566778899aabbccddeeff');
    const extendedKey = Hex.parse('00112233445566778899aabbccddeeff0011223344556677')
    
    const output1 = DES3.encrypt(message, key, { mode: ECB }).toString();
    const output2 = DES3.encrypt(message, extendedKey, { mode: ECB }).toString();
    
    expect(output2).to.be(output1);
  });
  
  it("test 256bit key", function(){
    const message = Hex.parse('00112233445566778899aabbccddeeff');
    const key = Hex.parse('00112233445566778899aabbccddeeff0112233445566778899aabbccddeeff0');
    const truncatedKey = Hex.parse('00112233445566778899aabbccddeeff0112233445566778')
    
    const output1 = DES3.encrypt(message, key, { mode: ECB }).toString();
    const output2 = DES3.encrypt(message, truncatedKey, { mode: ECB }).toString();
    
    expect(output2).to.be(output1);
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
    expect(DES3.encrypt("Hi There", SHA256.hash("Jefe"), {mode: ECB, padding: Noop}).cipherText.toString())
      .to.be(DES3.createEncryptor(SHA256.hash("Jefe"), {mode: ECB, padding: Noop}).finalize("Hi There").toString());
    
    expect(DES3.encrypt("Hi There", SHA256.hash("Jefe"), {mode: ECB, padding: Noop}).toString())
      .to.be(SerializableCipher.encrypt(DES3, "Hi There", SHA256.hash("Jefe"), {mode: ECB, padding: Noop}).toString());
    
    expect(DES3.encrypt("Hi There", "Jefe", {mode: ECB, padding: Noop}).toString())
      .to.be(PasswordBasedCipher.encrypt(DES3, "Hi There", "Jefe", {mode: ECB, padding: Noop}).toString());
    
    // Restore random method
    Word32Array.random = random;
  });
});
