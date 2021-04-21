const expect = require("expect.js");
const {
  Word32Array,
  mode: {CCM},
  pad: {NoPadding},
  AES,
  Hex,
  Utf8,
} = require("../../../test/build/");

describe("mode/CCM", function(){
  it("test B0", function(){
    const t = 12;
    const Q = new Word32Array([0, 17409 << 8], 7);
    const N = Hex.parse("13d4a35d71a50000");
    const B02 = CCM.getB0(true, t, Q, N);
    expect(B02.toString()).to.be("6e13d4a35d71a5000000000000004401");
  });
  
  describe("Klen=128, Tlen=32, Nlen=56, Alen=64, Plen=32", function(){
    const K = Hex.parse("404142434445464748494a4b4c4d4e4f");
    const N = Hex.parse("10111213141516");
    const A = Hex.parse("0001020304050607");
    const P = Hex.parse("20212223");
    const t = 32/8;
  
    it("test encryption/decryption/mac", function(){
      // Test MAC
      const cbcMac = CCM.mac(AES, K, N, A, P, t);
      expect(cbcMac.toString()).to.be("4dac255d");
    });
  
    it("test encryption/decryption", function(){
      // Test encryption
      const encrypted = AES.encrypt(P, K, { iv: N, mode: CCM, padding: NoPadding });
      expect(encrypted.cipherText.toString()).to.be("7162015b");
    
      // Test decryption
      const decrypted = AES.decrypt(encrypted, K, {iv: N, mode: CCM, padding: NoPadding});
      expect(decrypted.toString()).to.be(P.toString());
    });
  
    it("test ciphertext/mac combining function", function(){
      const cbcMac = CCM.mac(AES, K, N, A, P, t);
      const encrypted = AES.encrypt(P, K, { iv: N, mode: CCM, padding: NoPadding });
      const concatenatedCipherText = encrypted.cipherText.clone().concat(cbcMac);
    
      expect(concatenatedCipherText.toString()).to.be("7162015b4dac255d");
      expect(CCM.combineCipherTextAndAuthTag(encrypted.cipherText, cbcMac).toString()).to.be(concatenatedCipherText.toString())
    });
  
    it("test ciphertext/mac split function", function(){
      const cbcMac = CCM.mac(AES, K, N, A, P, t);
      const encrypted = AES.encrypt(P, K, { iv: N, mode: CCM, padding: NoPadding });
      const combinedCiphertext = CCM.combineCipherTextAndAuthTag(encrypted.cipherText, cbcMac);
      const result = CCM.splitCipherTextAndAuthTag(combinedCiphertext, t);
    
      expect(result.cipherText.toString()).to.be(encrypted.cipherText.toString());
      expect(result.authTag.toString()).to.be(cbcMac.toString());
    });
  });
  
  describe("Klen=128, Tlen=48, Nlen=64, Alen=128, Plen=128", function(){
    const K = Hex.parse("404142434445464748494a4b4c4d4e4f");
    const N = Hex.parse("1011121314151617");
    const A = Hex.parse("000102030405060708090a0b0c0d0e0f");
    const P = Hex.parse("202122232425262728292a2b2c2d2e2f");
    const t = 48/8;
    
    it("test encryption/decryption/mac", function(){
      // Test MAC
      const cbcMac = CCM.mac(AES, K, N, A, P, t);
      expect(cbcMac.toString()).to.be("1fc64fbfaccd");
    });
    
    it("test encryption/decryption", function(){
      // Test encryption
      const encrypted = AES.encrypt(P, K, { iv: N, mode: CCM, padding: NoPadding });
      expect(encrypted.cipherText.toString()).to.be("d2a1f0e051ea5f62081a7792073d593d");
      
      // Test decryption
      const decrypted = AES.decrypt(encrypted, K, {iv: N, mode: CCM, padding: NoPadding});
      expect(decrypted.toString()).to.be(P.toString());
    });
    
    it("test ciphertext/mac combining function", function(){
      const cbcMac = CCM.mac(AES, K, N, A, P, t);
      const encrypted = AES.encrypt(P, K, { iv: N, mode: CCM, padding: NoPadding });
      const concatenatedCipherText = encrypted.cipherText.clone().concat(cbcMac);
      
      expect(concatenatedCipherText.toString()).to.be("d2a1f0e051ea5f62081a7792073d593d1fc64fbfaccd");
      expect(CCM.combineCipherTextAndAuthTag(encrypted.cipherText, cbcMac).toString()).to.be(concatenatedCipherText.toString())
    });
    
    it("test ciphertext/mac split function", function(){
      const cbcMac = CCM.mac(AES, K, N, A, P, t);
      const encrypted = AES.encrypt(P, K, { iv: N, mode: CCM, padding: NoPadding });
      const combinedCiphertext = CCM.combineCipherTextAndAuthTag(encrypted.cipherText, cbcMac);
      const result = CCM.splitCipherTextAndAuthTag(combinedCiphertext, t);
      
      expect(result.cipherText.toString()).to.be(encrypted.cipherText.toString());
      expect(result.authTag.toString()).to.be(cbcMac.toString());
    });
  })
  
  describe("Klen=128, Tlen=64, Nlen=96, Alen=160, Plen=192", function(){
    const K = Hex.parse("404142434445464748494a4b4c4d4e4f");
    const N = Hex.parse("101112131415161718191a1b");
    const A = Hex.parse("000102030405060708090a0b0c0d0e0f10111213");
    const P = Hex.parse("202122232425262728292a2b2c2d2e2f3031323334353637");
    const t = 64/8;
    
    it("test encryption/decryption/mac", function(){
      // Test MAC
      const cbcMac = CCM.mac(AES, K, N, A, P, t);
      expect(cbcMac.toString()).to.be("484392fbc1b09951");
    });
    
    it("test encryption/decryption", function(){
      // Test encryption
      const encrypted = AES.encrypt(P, K, { iv: N, mode: CCM, padding: NoPadding });
      expect(encrypted.cipherText.toString()).to.be("e3b201a9f5b71a7a9b1ceaeccd97e70b6176aad9a4428aa5");
      
      // Test decryption
      const decrypted = AES.decrypt(encrypted, K, {iv: N, mode: CCM, padding: NoPadding});
      expect(decrypted.toString()).to.be(P.toString());
    });
    
    it("test ciphertext/mac combining function", function(){
      const cbcMac = CCM.mac(AES, K, N, A, P, t);
      const encrypted = AES.encrypt(P, K, { iv: N, mode: CCM, padding: NoPadding });
      const concatenatedCipherText = encrypted.cipherText.clone().concat(cbcMac);
      
      expect(concatenatedCipherText.toString()).to.be("e3b201a9f5b71a7a9b1ceaeccd97e70b6176aad9a4428aa5484392fbc1b09951");
      expect(CCM.combineCipherTextAndAuthTag(encrypted.cipherText, cbcMac).toString()).to.be(concatenatedCipherText.toString())
    });
    
    it("test ciphertext/mac split function", function(){
      const cbcMac = CCM.mac(AES, K, N, A, P, t);
      const encrypted = AES.encrypt(P, K, { iv: N, mode: CCM, padding: NoPadding });
      const combinedCiphertext = CCM.combineCipherTextAndAuthTag(encrypted.cipherText, cbcMac);
      const result = CCM.splitCipherTextAndAuthTag(combinedCiphertext, t);
      
      expect(result.cipherText.toString()).to.be(encrypted.cipherText.toString());
      expect(result.authTag.toString()).to.be(cbcMac.toString());
    });
  });
});
