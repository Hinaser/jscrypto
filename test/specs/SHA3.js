const expect = require("expect.js");
const {Word32Array, Hex} = require("../../test/build/lib");
const {SHA3} = require("../../test/build/SHA3");

describe("sha3", function(){
  it("digest '' with outputLength:512 as expected", function(){
    expect(SHA3.hash("", {outputLength: 512}).toString()).to.be("0eab42de4c3ceb9235fc91acffe746b29c29a8c366b7c60e4e67c466f36a4304c00fa9caf9d87976ba469bcbe06713b435f091ef2769fb160cdab33d3670680e");
  });
  it("digest a message with outputLength:512 as expected", function(){
    const expectedResult = "81950e7096d31d4f22e3db71cac725bf59e81af54c7ca9e6aeee71c010fc5467466312a01aa5c137cfb140646941556796f612c9351268737c7e9a2b9631d1fa";
    const message = Hex.parse("3a3a819c48efde2ad914fbf00e18ab6bc4f14513ab27d0c178a188b61431e7f5623cb66b23346775d386b50e982c493adbbfc54b9a3cd383382336a1a0b2150a15358f336d03ae18f666c7573d55c4fd181c29e6ccfde63ea35f0adf5885cfc0a3d84a2b2e4dd24496db789e663170cef74798aa1bbcd4574ea0bba40489d764b2f83aadc66b148b4a0cd95246c127d5871c4f11418690a5ddf01246a0c80a43c70088b6183639dcfda4125bd113a8f49ee23ed306faac576c3fb0c1e256671d817fc2534a52f5b439f72e424de376f4c565cca82307dd9ef76da5b7c4eb7e085172e328807c02d011ffbf33785378d79dc266f6a5be6bb0e4a92eceebaeb1");
    expect(SHA3.hash(message, {outputLength: 512}).toString()).to.be(expectedResult);
  });
  
  it("digest '' with outputLength:384 as expected", function(){
    const expectedResult = "2c23146a63a29acf99e73b88f8c24eaa7dc60aa771780ccc006afbfa8fe2479b2dd2b21362337441ac12b515911957ff";
    expect(SHA3.hash("", {outputLength: 384}).toString()).to.be(expectedResult);
  });
  it("digest a message with outputLength:384 as expected", function(){
    const expectedResult = "6bff1c8405a3fe594e360e3bccea1ebcd509310dc79b9e45c263783d7a5dd662c6789b18bd567dbdda1554f5bee6a860";
    const message = Hex.parse("3a3a819c48efde2ad914fbf00e18ab6bc4f14513ab27d0c178a188b61431e7f5623cb66b23346775d386b50e982c493adbbfc54b9a3cd383382336a1a0b2150a15358f336d03ae18f666c7573d55c4fd181c29e6ccfde63ea35f0adf5885cfc0a3d84a2b2e4dd24496db789e663170cef74798aa1bbcd4574ea0bba40489d764b2f83aadc66b148b4a0cd95246c127d5871c4f11418690a5ddf01246a0c80a43c70088b6183639dcfda4125bd113a8f49ee23ed306faac576c3fb0c1e256671d817fc2534a52f5b439f72e424de376f4c565cca82307dd9ef76da5b7c4eb7e085172e328807c02d011ffbf33785378d79dc266f6a5be6bb0e4a92eceebaeb1");
    expect(SHA3.hash(message, {outputLength: 384}).toString()).to.be(expectedResult);
  });
  
  it("digest '' with outputLength:256 as expected", function(){
    const expectedResult = "c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470";
    expect(SHA3.hash("", {outputLength: 256}).toString()).to.be(expectedResult);
  });
  it("digest a message with outputLength:256 as expected", function(){
    const expectedResult = "348fb774adc970a16b1105669442625e6adaa8257a89effdb5a802f161b862ea";
    const message = Hex.parse("3a3a819c48efde2ad914fbf00e18ab6bc4f14513ab27d0c178a188b61431e7f5623cb66b23346775d386b50e982c493adbbfc54b9a3cd383382336a1a0b2150a15358f336d03ae18f666c7573d55c4fd181c29e6ccfde63ea35f0adf5885cfc0a3d84a2b2e4dd24496db789e663170cef74798aa1bbcd4574ea0bba40489d764b2f83aadc66b148b4a0cd95246c127d5871c4f11418690a5ddf01246a0c80a43c70088b6183639dcfda4125bd113a8f49ee23ed306faac576c3fb0c1e256671d817fc2534a52f5b439f72e424de376f4c565cca82307dd9ef76da5b7c4eb7e085172e328807c02d011ffbf33785378d79dc266f6a5be6bb0e4a92eceebaeb1");
    expect(SHA3.hash(message, {outputLength: 256}).toString()).to.be(expectedResult);
  });
  
  it("digest '' with outputLength:224 as expected", function(){
    const expectedResult = "f71837502ba8e10837bdd8d365adb85591895602fc552b48b7390abd";
    expect(SHA3.hash("", {outputLength: 224}).toString()).to.be(expectedResult);
  });
  it("digest a message with outputLength:224 as expected", function(){
    const expectedResult = "5af56987ea9cf11fcd0eac5ebc14b037365e9b1123e31cb2dfc7929a";
    const message = Hex.parse("3a3a819c48efde2ad914fbf00e18ab6bc4f14513ab27d0c178a188b61431e7f5623cb66b23346775d386b50e982c493adbbfc54b9a3cd383382336a1a0b2150a15358f336d03ae18f666c7573d55c4fd181c29e6ccfde63ea35f0adf5885cfc0a3d84a2b2e4dd24496db789e663170cef74798aa1bbcd4574ea0bba40489d764b2f83aadc66b148b4a0cd95246c127d5871c4f11418690a5ddf01246a0c80a43c70088b6183639dcfda4125bd113a8f49ee23ed306faac576c3fb0c1e256671d817fc2534a52f5b439f72e424de376f4c565cca82307dd9ef76da5b7c4eb7e085172e328807c02d011ffbf33785378d79dc266f6a5be6bb0e4a92eceebaeb1");
    expect(SHA3.hash(message, {outputLength: 224}).toString()).to.be(expectedResult);
  });
  
  it("digest a message with default outputLength as expected", function(){
    const expectedResult = "0eab42de4c3ceb9235fc91acffe746b29c29a8c366b7c60e4e67c466f36a4304c00fa9caf9d87976ba469bcbe06713b435f091ef2769fb160cdab33d3670680e";
    expect(SHA3.hash("").toString()).to.be(expectedResult);
  });
  
  it("clone", function(){
    const sha3 = new SHA3();
    
    expect(SHA3.hash("a").toString()).to.be(sha3.update("a").clone().finalize().toString());
    expect(SHA3.hash("ab").toString()).to.be(sha3.update("b").clone().finalize().toString());
    expect(SHA3.hash("abc").toString()).to.be(sha3.update("c").clone().finalize().toString());
  });
  
  it("input integrity", function(){
    const message = new Word32Array([0x12345678]);
    const expectedResult = message.toString();
    SHA3.hash(message);
    expect(message.toString()).to.be(expectedResult);
  });
  
  it("shortcut", function(){
    expect(SHA3.hash("").toString()).to.be(new SHA3().finalize("").toString());
  });
});
