const expect = require("expect.js");
const {Word32Array} = require("../../../test/build/lib");
const {Pkcs7} = require("../../../test/build/pad/Pkcs7");

describe("pad/Pkcs7", function(){
  it("test pad", function(){
    const data = new Word32Array([0xdddddd00], 3);
    Pkcs7.pad(data, 2);
    
    expect(data.toString()).to.be(new Word32Array([0xdddddd05, 0x05050505]).toString());
  });
  
  it("test pad clamp", function(){
    const data = new Word32Array([0xdddddddd, 0xdddddddd], 3);
    Pkcs7.pad(data, 2);
    
    expect(data.toString()).to.be(new Word32Array([0xdddddd05, 0x05050505]).toString());
  });
  
  it("test unpad", function(){
    const data = new Word32Array([0xdddddd05, 0x05050505]);
    Pkcs7.unpad(data);
    
    expect(data.toString()).to.be(new Word32Array([0xdddddd00], 3).toString());
  });
});
