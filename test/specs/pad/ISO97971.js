const expect = require("expect.js");
const {Word32Array} = require("../../../test/build/lib");
const {ISO97971} = require("../../../test/build/pad/ISO97971");

describe("pad/ISO97971", function(){
  it("test pad 1", function(){
    const data = new Word32Array([0xdddddd00], 3);
    ISO97971.pad(data, 1);
    
    expect(data.toString()).to.be(new Word32Array([0xdddddd80]).toString());
  });
  
  it("test pad 2", function(){
    const data = new Word32Array([0xdddddd00], 3);
    ISO97971.pad(data, 2);
    
    expect(data.toString()).to.be(new Word32Array([0xdddddd80, 0x00000000]).toString());
  });
  
  it("test pad clamp", function(){
    const data = new Word32Array([0xdddddddd, 0xdddddddd], 3);
    ISO97971.pad(data, 2);
    
    expect(data.toString()).to.be(new Word32Array([0xdddddd80, 0x00000000]).toString());
  });
  
  it("test unpad", function(){
    const data = new Word32Array([0xdddddd80, 0x00000000]);
    ISO97971.unpad(data);
    
    expect(data.toString()).to.be(new Word32Array([0xdddddd00], 3).toString());
  });
});
