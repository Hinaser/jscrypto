const expect = require("expect.js");
const {
  Word32Array,
  mode: {CCM},
  pad: {NoPadding},
  AES,
  Hex,
  Utf8,
} = require("../../../test/build/");

describe("mode/GCM", function(){
  it("test B0", function(){
    const t = 12;
    const Q = new Word32Array([0, 17409 << 8], 7);
    const N = new Word32Array([parseInt("00010011110101001010001101011101", 2), parseInt("01110001101001010000000000000000", 2)], 8);
    const B02 = CCM.getB0(true, t, Q, N);
    expect(B02.toString()).to.be("6e13d4a35d71a5000000000000004401");
  });
});
