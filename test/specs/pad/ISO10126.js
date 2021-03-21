const expect = require("expect.js");
const {pad: {ISO10126}, Word32Array} = require("../../../test/build");

describe("pad/ISO10126", function(){
  const data = {};
  data.random = Word32Array.random;
  
  before(function(){
    Word32Array.random = function(nBytes){
      const words = [];
      for(let i=0;i<nBytes;i+=4){
        words.push([0x11223344]);
      }
      return new Word32Array(words, nBytes);
    };
  });
  
  after(function(){
    Word32Array.random = data.random;
  });
  
  it("test pad", function(){
    const data = new Word32Array([0xdddddd00], 3);
    ISO10126.pad(data, 2);
    
    expect(data.toString()).to.be(new Word32Array([0xdddddd11, 0x22334405]).toString());
  });
  
  it("test pad clamp", function(){
    const data = new Word32Array([0xdddddddd, 0xdddddddd], 3);
    ISO10126.pad(data, 2);
    
    expect(data.toString()).to.be(new Word32Array([0xdddddd11, 0x22334405]).toString());
  });
  
  it("test unpad", function(){
    const data = new Word32Array([0xdddddd11, 0x22334405]);
    ISO10126.unpad(data);
    
    expect(data.toString()).to.be(new Word32Array([0xdddddd00], 3).toString());
  });
});
