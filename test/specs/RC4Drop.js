const expect = require("expect.js");
const {
  Word32Array,
  Hex,
  MD5,
  SerializableCipher,
  PasswordBasedCipher,
  RC4,
  RC4Drop,
} = require("../../test/build");

describe("rc4drop", function(){
  it("test drop", function(){
    const expectedResult = RC4.encrypt(Hex.parse("00000000000000000000000000000000"), Hex.parse("0123456789abcdef")).cipherText.toString().substr(16);
    const message = Hex.parse("0000000000000000");
    const key = Hex.parse("0123456789abcdef");
    const props = {drop: 2};
    expect(RC4Drop.encrypt(message, key, props).cipherText.toString()).to.be(expectedResult);
  });
});
