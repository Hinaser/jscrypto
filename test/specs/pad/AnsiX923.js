const expect = require("expect.js");
const {Word32Array} = require("../../../test/build/lib");
const {AnsiX923} = require("../../../test/build/pad/AnsiX923");

describe("pad/AnsiX923", function(){
  it("test pad", function(){
    const data = new Word32Array([0xdddddd00], 3);
    AnsiX923.pad(data, 2);
    
    expect(data.toString()).to.be(new Word32Array([0xdddddd00, 0x00000005]).toString());
  });
  
  it("test pad clamp", function(){
    const data = new Word32Array([0xdddddddd, 0xdddddddd], 3);
    AnsiX923.pad(data, 2);
    
    expect(data.toString()).to.be(new Word32Array([0xdddddd00, 0x00000005]).toString());
  });
  
  it("test unpad", function(){
    const data = new Word32Array([0xdddddd00, 0x00000005]);
    AnsiX923.unpad(data);
    
    expect(data.toString()).to.be(new Word32Array([0xdddddd00], 3).toString());
  });
});
