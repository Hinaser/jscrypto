const expect = require("expect.js");
const {Word32Array} = require("../../../test/build/lib");
const {OFB} = require("../../../test/build/mode/OFB");
const {NoPadding} = require("../../../test/build/pad/NoPadding");
const {AES} = require("../../../test/build/AES");

describe("mode/OFB", function(){
  const data = {};
  data.message = new Word32Array([
    0x00010203, 0x04050607, 0x08090a0b, 0x0c0d0e0f,
    0x10111213, 0x14151617, 0x18191a1b, 0x1c1d1e1f
  ]);
  data.key = new Word32Array([0x20212223, 0x24252627, 0x28292a2b, 0x2c2d2e2f]);
  data.iv = new Word32Array([0x30313233, 0x34353637, 0x38393a3b, 0x3c3d3e3f]);
  
  it("test encryptor", function(){
    // Compute expected
    const expected = data.message.clone();
    const aes = AES.createEncryptor(data.key);
  
    // First block XORed with encrypted IV
    const keyStream = data.iv.words.slice(0);
    aes.encryptBlock(keyStream, 0);
    for(let i=0;i<4;i++) {
      expected.words[i] ^= keyStream[i];
    }
  
    // Subsequent blocks XORed with encrypted previous keystream
    aes.encryptBlock(keyStream, 0);
    for (let i=4;i<8;i++) {
      expected.words[i] ^= keyStream[i % 4];
    }
    
    // Compute actual
    const actual = AES.encrypt(data.message, data.key, { iv: data.iv, mode: OFB, padding: NoPadding }).cipherText;
    
    // Test
    expect(actual.toString()).to.be(expected.toString());
  });
  
  it("test decryptor", function(){
    const encrypted = AES.encrypt(data.message, data.key, { iv: data.iv, mode: OFB, padding: NoPadding });
    const decrypted = AES.decrypt(encrypted, data.key, { iv: data.iv, mode: OFB, padding: NoPadding });
    
    expect(decrypted.toString()).to.be(data.message.toString());
  });
});
