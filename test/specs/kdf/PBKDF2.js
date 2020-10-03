const expect = require("expect.js");
const {
  Hex,
  PBKDF2,
  Word32Array,
} = require("../../../test/build/all");

describe("kdf/PBKDF2", function(){
  it("test key size 128", function(){
    const expectedValue = "cdedb5281bb2f801565a1122b2563515"
    expect(PBKDF2.getKey("password", "ATHENA.MIT.EDUraeburn", {keySize: 128/32}).toString()).to.be(expectedValue);
  });
  it("test key size 256", function(){
    const expectedValue = "cdedb5281bb2f801565a1122b25635150ad1f7a04bb9f3a333ecc0e2e1f70837"
    expect(PBKDF2.getKey("password", "ATHENA.MIT.EDUraeburn", {keySize: 256/32}).toString()).to.be(expectedValue);
  });
  it("test key size 128 iteration 2", function(){
    const expectedValue = "01dbee7f4a9e243e988b62c73cda935d"
    expect(PBKDF2.getKey("password", "ATHENA.MIT.EDUraeburn", {keySize: 128/32, iterations: 2}).toString()).to.be(expectedValue);
  });
  it("test key size 256 iteration 2", function(){
    const expectedValue = "01dbee7f4a9e243e988b62c73cda935da05378b93244ec8f48a99e61ad799d86"
    expect(PBKDF2.getKey("password", "ATHENA.MIT.EDUraeburn", {keySize: 256/32, iterations: 2}).toString()).to.be(expectedValue);
  });
  it("test key size 128 iteration 1200", function(){
    const expectedValue = "5c08eb61fdf71e4e4ec3cf6ba1f5512b"
    expect(PBKDF2.getKey("password", "ATHENA.MIT.EDUraeburn", {keySize: 128/32, iterations: 1200}).toString()).to.be(expectedValue);
  });
  it("test key size 256 iteration 1200", function(){
    const expectedValue = "5c08eb61fdf71e4e4ec3cf6ba1f5512ba7e52ddbc5e5142f708a31e2e62b1e13"
    expect(PBKDF2.getKey("password", "ATHENA.MIT.EDUraeburn", {keySize: 256/32, iterations: 1200}).toString()).to.be(expectedValue);
  });
  it("test key size 128 iteration 5", function(){
    const expectedValue = "d1daa78615f287e6a1c8b120d7062a49"
    expect(PBKDF2.getKey("password", Hex.parse("1234567878563412"), {keySize: 128/32, iterations: 5}).toString()).to.be(expectedValue);
  });
  it("test key size 256 iteration 5", function(){
    const expectedValue = "d1daa78615f287e6a1c8b120d7062a493f98d203e6be49a6adf4fa574b6e64ee"
    expect(PBKDF2.getKey("password", Hex.parse("1234567878563412"), {keySize: 256/32, iterations: 5}).toString()).to.be(expectedValue);
  });
  it("test key size 128 iteration 1200 passphrase equal to block size", function(){
    const expectedValue = "139c30c0966bc32ba55fdbf212530ac9"
    expect(PBKDF2.getKey("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "pass phrase equals block size", {keySize: 128/32, iterations: 1200}).toString()).to.be(expectedValue);
  });
  it("test key size 256 iteration 1200 passphrase equal to block size", function(){
    const expectedValue = "139c30c0966bc32ba55fdbf212530ac9c5ec59f1a452f5cc9ad940fea0598ed1"
    expect(PBKDF2.getKey("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "pass phrase equals block size", {keySize: 256/32, iterations: 1200}).toString()).to.be(expectedValue);
  });
  it("test key size 128 iteration 1200 passphrase exceeds block size", function(){
    const expectedValue = "9ccad6d468770cd51b10e6a68721be61"
    expect(PBKDF2.getKey("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "pass phrase exceeds block size", {keySize: 128/32, iterations: 1200}).toString()).to.be(expectedValue);
  });
  it("test key size 256 iteration 1200 passphrase exceeds block size", function(){
    const expectedValue = "9ccad6d468770cd51b10e6a68721be611a8b4d282601db3b36be9246915ec82a"
    expect(PBKDF2.getKey("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "pass phrase exceeds block size", {keySize: 256/32, iterations: 1200}).toString()).to.be(expectedValue);
  });
  it("test key size 128 iteration 50", function(){
    const expectedValue = "6b9cf26d45455a43a5b8bb276a403b39"
    expect(PBKDF2.getKey(Hex.parse("f09d849e"), "EXAMPLE.COMpianist", {keySize: 128/32, iterations: 50}).toString()).to.be(expectedValue);
  });
  it("test key size 256 iteration 50", function(){
    const expectedValue = "6b9cf26d45455a43a5b8bb276a403b39e7fe37a0c41e02c281ff3069e1e94f52"
    expect(PBKDF2.getKey(Hex.parse("f09d849e"), "EXAMPLE.COMpianist", {keySize: 256/32, iterations: 50}).toString()).to.be(expectedValue);
  });
  
  it("test input integrity", function(){
    const password = new Word32Array([0x12345678]);
    const salt = new Word32Array([0x12345678]);
    
    const expectedPassword = password.toString();
    const expectedSalt = salt.toString();
    
    PBKDF2.getKey(password, salt);
    
    expect(password.toString()).to.be(expectedPassword);
    expect(salt.toString()).to.be(expectedSalt);
  });
  
  it("test helper", function(){
    expect(PBKDF2.getKey("password", "ATHENA.MIT.EDUraeburn", {keySize: 128/32}).toString())
      .to.be(new PBKDF2({keySize: 128/32}).compute("password", "ATHENA.MIT.EDUraeburn").toString());
  });
});
