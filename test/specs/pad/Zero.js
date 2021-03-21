const expect = require("expect.js");
const {Word32Array} = require("../../../test/build/lib");
const {Zero} = require("../../../test/build/pad/Zero");

describe("pad/Zero", function(){
  it("test pad", function(){
    const data = new Word32Array([0xdddddd00], 3);
    Zero.pad(data, 2);
    
    expect(data.toString()).to.be(new Word32Array([0xdddddd00, 0x00000000]).toString());
  });
  
  it("test pad clamp", function(){
    const data = new Word32Array([0xdddddddd, 0xdddddddd], 3);
    Zero.pad(data, 2);
    
    expect(data.toString()).to.be(new Word32Array([0xdddddd00, 0x00000000]).toString());
  });
  
  it("test unpad", function(){
    const data = new Word32Array([0xdddddd00, 0x00000000]);
    Zero.unpad(data);
    
    expect(data.toString()).to.be(new Word32Array([0xdddddd00], 3).toString());
  });
});
