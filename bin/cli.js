#!/usr/bin/env node

const hashCommands = [
  "md5", "sha1", "sha3", "sha224", "sha256", "sha384", "sha512", "ripemd160"
];

const hmacCommands = [
  "hmac-md5", "hmac-sha1", "hmac-sha224", "hmac-sha256", "hmac-sha384", "hmac-sha512"
];

const cipherCommands = [
  "aes", "des", "des3", "rc4"
];

const exeCommand = "npx jscrypto"// process.argv.slice(0, 2).join(" ");

const manJsCrypto = [
  `Usage: ${exeCommand} <hash|hmac|cipher> [command options]\n`,
  "\n",
  "  hash: " + hashCommands.join(", ") + "\n",
  "  hmac: " + hmacCommands.join(", ") + "\n",
  "  cipher: " + cipherCommands.join(", ") + "\n",
].join("");

const manJsCryptoHash = [
  `${exeCommand} <hash> message [-msg hex|base64|utf8] [-out hex|base64]\n`,
  "\n",
  `  <hash>: ${hashCommands.join(", ")}\n`,
  "  default:\n",
  "    -msg: utf8 ... recognize message as utf-8 string\n",
  "    -out: hex ... output hashed binary as hex string\n",
  "  example: \n",
  "    #Output of below 3 examples are the same\n",
  "    npx jscrypto sha1 test\n",
  "    npx jscrypto sha1 74657374 -in hex\n",
  "    npx jscrypto sha1 dGVzdA== -in base64\n",
].join("");

const manJsCryptoHmac = [
  `${exeCommand} <hmac> message key [-msg hex|base64|utf8] [-key hex|base64|utf8] [-out hex|base64]\n`,
  "\n",
  `  <hmac>: ${hmacCommands.join(", ")}\n`,
  "  default:\n",
  "    -msg: utf8 ... recognize message as utf-8 string\n",
  "    -key: utf8 ... recognize key as utf-8 string\n",
  "    -out: hex ... output hashed binary as hex string\n",
  "  example: \n",
  "    #Output of below 3 examples are the same\n",
  "    npx jscrypto hmac-sha1 test key\n",
  "    npx jscrypto hmac-sha1 74657374 6b6579 -msg hex -key hex\n",
  "    npx jscrypto hmac-sha1 dGVzdA== a2V5 -msg base64 -key base64\n",
].join("");

const manJsCryptoCipher = [
  `${exeCommand} <cipher> <enc|dec> <message> key [-msg hex|base64|utf8] [-key hex|base64|utf8] [-out hex|base64|utf8] [-mode cbc|ecb|ofb|cfb|ctr] [-pad pkcs7|iso10126|iso97971|ansix923|nopadding] [-kdf pbkdf2|evpkdf] [-kdfIter n] [-kdfHasher hash]\n`,
  "\n",
  `  <cipher>: ${cipherCommands.join(", ")}\n`,
  "  <message>: If encrypting, utf8/hex/base64 value. If decrypting, base64 encoded encrypted string\n",
  "  default:\n",
  "    -msg: utf8 ... recognize message as utf-8 string\n",
  "    -key: utf8 ... recognize key as utf-8 string\n",
  "    -out: hex ... for decryption only. output hashed binary as hex string\n",
  "    -mode: cbc ... Cipher block chaining as block cipher mode\n",
  "    -pad: pkcs7 ... Pkcs7 padding as block padding\n",
  "    -kdf: pbkdf2 ... PBKDF2 as key derivation function\n",
  "    -kdfIter: 10000 ... kdf iteration count\n",
  "    -kdfHasher: sha256 ... kdf hasher\n",
  "  example: \n",
  "    #Encrypt (Output would not be the same because of a random salt, but can be decrypted with the same key)\n",
  "    npx jscrypto aes enc test password\n",
  "    npx jscrypto aes enc 74657374 70617373776f7264 -msg hex -key hex\n",
  "    npx jscrypto aes enc dGVzdA== cGFzc3dvcmQ= -msg base64 -key base64\n",
  "    #Decrypt\n",
  "    npx jscrypto aes dec U2FsdGVkX19Kf/wItWMuaTrQYV3OljA3Cr9WPMhC6Tk= password -out utf8\n",
  "    npx jscrypto aes dec A2pYDd/3oeENsRFGA1Y0Mg== 70617373776f7264 -key hex -out utf8\n",
  "    npx jscrypto aes dec A2pYDd/3oeENsRFGA1Y0Mg== cGFzc3dvcmQ= -key base64 -out utf8\n",
].join("");

const man = [
  manJsCrypto,
  manJsCryptoHash,
  manJsCryptoHmac,
  manJsCryptoCipher,
].join("\n\n");

// const resolve = (file) => `../dist/${file}`; // Use if you git clone this project and want to debug cli.js
const path = require("path");
const resolve = (file) => path.join("..", file);

const args = process.argv.slice(2);

if(args.length < 1){
  console.error("ERROR: command is not specified");
  console.error("");
  console.log(man);
  process.exit(1);
}

const command = args[0];
if(hashCommands.includes(command)){
  doHash();
}
else if(hmacCommands.includes(command)){
  doHmac();
}
else if(cipherCommands.includes(command)){
  doCipher();
}
else{
  console.error("ERROR: Unknown command");
  console.error("");
  console.log(man);
  process.exit(1);
}

function doHash(){
  const messageArg = args[1];
  const optionArgs = args.slice(2);
  const options = {
    msg: "utf8",
    out: "hex",
  };
  
  if(optionArgs){
    for(let i=0;i<optionArgs.length;i++){
      const o1 = optionArgs[i];
      const o2 = optionArgs[i+1];
      if(o1 === "-msg"){
        if(!["hex", "base64", "utf8"].includes(o2)){
          console.error("ERROR: Unknown -in value");
          console.error("");
          console.log(manJsCryptoHash);
          process.exit(1);
        }
        options.msg = o2;
        i += 1;
      }
      else if(o1 === "-out"){
        if(!["hex", "base64", "utf8"].includes(o2)){
          console.error("ERROR: Unknown -out value");
          console.error("");
          console.log(manJsCryptoHash);
          process.exit(1);
        }
        options.out = o2;
        i += 1;
      }
      else{
        console.error("ERROR: Unknown option");
        console.error("");
        console.log(manJsCryptoHash);
        process.exit(1);
      }
    }
  }
  
  let Hasher;
  switch (command.toLowerCase()){
    case "md5": Hasher = require(resolve("MD5")).MD5; break;
    case "sha1": Hasher = require(resolve("SHA1")).SHA1; break;
    case "sha3": Hasher = require(resolve("SHA3")).SHA3; break;
    case "sha224": Hasher = require(resolve("SHA224")).SHA224; break;
    case "sha256": Hasher = require(resolve("SHA256")).SHA256; break;
    case "sha384": Hasher = require(resolve("SHA384")).SHA384; break;
    case "sha512": Hasher = require(resolve("SHA512")).SHA512; break;
    case "ripemd160": Hasher = require(resolve("RIPEMD160")).RIPEMD160; break;
    default:
      console.error("ERROR: Unknown hash");
      console.error("");
      console.log(manJsCryptoHash);
      process.exit(1);
  }
  
  let message;
  if(options.msg.toLowerCase() === "utf8"){
    message = messageArg;
  }
  else if(options.msg.toLowerCase() === "hex"){
    if(!/^[0-9a-fA-F]+$/.test(messageArg)){
      console.error("ERROR: Invalid Hex input");
      process.exit(1);
    }
    else if(messageArg.length % 2 !== 0){
      console.error("ERROR: Hex character count must be even");
      process.exit(1);
    }
    
    const {Hex} = require(resolve("Hex")); 
    message = Hex.parse(messageArg);
  }
  else if(options.msg.toLowerCase() === "base64"){
    const {Base64} = require(resolve("Base64"));
    message = Base64.parse(messageArg);
  }
  else{
    console.error("ERROR: unknown -msg value");
    process.exit(1);
  }
  
  let outputEncoding;
  if(options.out.toLowerCase() === "hex"){
    outputEncoding = require(resolve("Hex")).Hex;
  }
  else if(options.out.toLowerCase() === "base64"){
    outputEncoding = require(resolve("Base64")).Base64;
  }
  else{
    console.error("ERROR: unknown -out value");
    process.exit(1);
  }
  
  const result = Hasher.hash(message);
  let output;
  try{
    output = result.toString(outputEncoding);
  }
  catch(e){
    if(options.out === "utf8"){
      console.error("ERROR: Byte array could not be recognized as UTF-8");
    }
    else{
      console.error("ERROR: Failed to hash message");
    }
    process.exit(1);
  }
  
  console.log(output);
  process.exit(0);
}

function doHmac(){
  const messageArg = args[1] || "";
  const keyArg = args[2] || "";
  const optionArgs = args.slice(3);
  const options = {
    msg: "utf8",
    key: "utf8",
    out: "hex",
  };
  
  if(optionArgs){
    for(let i=0;i<optionArgs.length;i++){
      const o1 = optionArgs[i];
      const o2 = optionArgs[i+1];
      if(o1 === "-msg"){
        if(!["hex", "base64", "utf8"].includes(o2)){
          console.error("ERROR: Unknown -msg value");
          console.error("");
          console.log(manJsCryptoHmac);
          process.exit(1);
        }
        options.msg = o2;
        i += 1;
      }
      else if(o1 === "-key"){
        if(!["hex", "base64", "utf8"].includes(o2)){
          console.error("ERROR: Unknown -key value");
          console.error("");
          console.log(manJsCryptoHmac);
          process.exit(1);
        }
        options.key = o2;
        i += 1;
      }
      else if(o1 === "-out"){
        if(!["hex", "base64", "utf8"].includes(o2)){
          console.error("ERROR: Unknown -out value");
          console.error("");
          console.log(manJsCryptoHmac);
          process.exit(1);
        }
        options.out = o2;
        i += 1;
      }
      else{
        console.error("ERROR: Unknown option");
        console.error("");
        console.log(manJsCryptoHmac);
        process.exit(1);
      }
    }
  }
  
  let Hasher;
  switch (command.replace(/-/g, "").toLowerCase()){
    case "hmacmd5": Hasher = require(resolve("HmacMD5")).HmacMD5; break;
    case "hmacsha1": Hasher = require(resolve("HmacSHA1")).HmacSHA1; break;
    case "hmacsha224": Hasher = require(resolve("HmacSHA224")).HmacSHA224; break;
    case "hmacsha256": Hasher = require(resolve("HmacSHA256")).HmacSHA256; break;
    case "hmacsha384": Hasher = require(resolve("HmacSHA384")).HmacSHA384; break;
    case "hmacsha512": Hasher = require(resolve("HmacSHA512")).HmacSHA512; break;
    default:
      console.error("ERROR: Unknown hmac hasher");
      console.error("");
      console.log(manJsCryptoHmac);
      process.exit(1);
  }
  
  let message;
  if(options.msg.toLowerCase() === "utf8"){
    message = messageArg;
  }
  else if(options.msg.toLowerCase() === "hex"){
    if(!/^[0-9a-fA-F]+$/.test(messageArg)){
      console.error("ERROR: Invalid Hex input");
      process.exit(1);
    }
    else if(messageArg.length % 2 !== 0){
      console.error("ERROR: Hex character count must be even");
      process.exit(1);
    }
    
    const {Hex} = require(resolve("Hex"));
    message = Hex.parse(messageArg);
  }
  else if(options.msg.toLowerCase() === "base64"){
    const {Base64} = require(resolve("Base64"));
    message = Base64.parse(messageArg);
  }
  else{
    console.error("ERROR: unknown -msg value");
    process.exit(1);
  }
  
  let key;
  if(options.key.toLowerCase() === "utf8"){
    key = keyArg;
  }
  else if(options.key.toLowerCase() === "hex"){
    if(!/^[0-9a-zA-Z]+$/.test(keyArg)){
      console.error("ERROR: Invalid Hex input");
      process.exit(1);
    }
    else if(keyArg.length % 2 !== 0){
      console.error("ERROR: Hex character count must be even");
      process.exit(1);
    }
    
    const {Hex} = require(resolve("Hex"));
    key = Hex.parse(keyArg);
  }
  else if(options.key.toLowerCase() === "base64"){
    const {Base64} = require(resolve("Base64"));
    key = Base64.parse(keyArg);
  }
  else{
    console.error("ERROR: unknown -key value");
    process.exit(1);
  }
  
  let outputEncoding;
  if(options.out.toLowerCase() === "hex"){
    outputEncoding = require(resolve("Hex")).Hex;
  }
  else if(options.out.toLowerCase() === "base64"){
    outputEncoding = require(resolve("Base64")).Base64;
  }
  else{
    console.error("ERROR: unknown -out value");
    process.exit(1);
  }
  
  const result = Hasher(message, key);
  let output;
  try{
    output = result.toString(outputEncoding);
  }
  catch(e){
    if(options.out === "utf8"){
      console.error("ERROR: Byte array could not be recognized as UTF-8");
    }
    else{
      console.error("ERROR: Failed to hash message");
    }
    process.exit(1);
  }
  
  console.log(output);
  process.exit(0);
}

function doCipher(){
  const encTypeArg = args[1];
  const messageArg = args[2] || "";
  const keyArg = args[3] || "";
  const optionArgs = args.slice(4);
  const options = {
    msg: "utf8",
    key: "utf8",
    out: "", // default value will be set later
    mode: "cbc",
    pad: "pkcs7",
    kdf: "pbkdf2",
    iter: 10000,
    hasher: "sha256"
  };
  
  if(optionArgs){
    for(let i=0;i<optionArgs.length;i++){
      const o1 = optionArgs[i];
      const o2 = optionArgs[i+1];
      if(o1 === "-msg"){
        if(!["hex", "base64", "utf8"].includes(o2)){
          console.error("ERROR: Unknown -msg value");
          console.error("");
          console.log(manJsCryptoCipher);
          process.exit(1);
        }
        options.msg = o2;
        i += 1;
      }
      else if(o1 === "-key"){
        if(!["hex", "base64", "utf8"].includes(o2)){
          console.error("ERROR: Unknown -key value");
          console.error("");
          console.log(manJsCryptoCipher);
          process.exit(1);
        }
        options.key = o2;
        i += 1;
      }
      else if(o1 === "-out"){
        if(!["hex", "base64", "utf8"].includes(o2)){
          console.error("ERROR: Unknown -out value");
          console.error("");
          console.log(manJsCryptoCipher);
          process.exit(1);
        }
        options.out = o2;
        i += 1;
      }
      else if(o1 === "-mode"){
        if(!["cbc", "ecb", "cfb", "ofb", "ctr"].includes(o2)){
          console.error("ERROR: Unknown -mode value");
          console.error("");
          console.log(manJsCryptoCipher);
          process.exit(1);
        }
        options.mode = o2;
        i += 1;
      }
      else if(o1 === "-pad"){
        if(!["ansix923", "iso10126", "iso97971", "nopadding", "pkcs7"].includes(o2)){
          console.error("ERROR: Unknown -pad value");
          console.error("");
          console.log(manJsCryptoCipher);
          process.exit(1);
        }
        options.pad = o2;
        i += 1;
      }
      else if(o1 === "-kdf"){
        if(!["pbkdf2", "evpkdf"].includes(o2)){
          console.error("ERROR: Unknown -kdf value");
          console.error("");
          console.log(manJsCryptoCipher);
          process.exit(1);
        }
        options.kdf = o2;
        i += 1;
      }
      else if(o1 === "-kdfIter"){
        if(isNaN(+o2) || !isFinite(+o2)){
          console.error("ERROR: -iter value must be number");
          console.error("");
          console.log(manJsCryptoCipher);
          process.exit(1);
        }
        options.iter = +o2;
        i += 1;
      }
      else if(o1 === "-kdfHasher"){
        if(!hashCommands.includes(o2.toLowerCase())){
          console.error("ERROR: Unknown -kdf value");
          console.error("");
          console.log(manJsCryptoCipher);
          process.exit(1);
        }
        options.hasher = o2.toLowerCase();
        i += 1;
      }
      else{
        console.error("ERROR: Unknown option");
        console.error("");
        console.log(manJsCryptoCipher);
        process.exit(1);
      }
    }
  }
  
  let Cipher;
  switch (command.toLowerCase()){
    case "aes": Cipher = require(resolve("AES")).AES; break;
    case "des": Cipher = require(resolve("DES")).DES; break;
    case "des3": Cipher = require(resolve("DES3")).DES3; break;
    case "rabbit": Cipher = require(resolve("Rabbit ")).Rabbit; break;
    case "rc4": Cipher = require(resolve("RC4")).RC4; break;
    default:
      console.error("ERROR: Unknown cipher");
      console.error("");
      console.log(manJsCryptoCipher);
      process.exit(1);
  }
  
  let encType;
  if(["enc", "dec"].includes(encTypeArg)){
    encType = encTypeArg;
  }
  else{
    console.error("ERROR: Must specify enc/dec");
    console.error("");
    console.log(manJsCryptoCipher);
    process.exit(1);
  }
  
  let message;
  if(encType === "enc"){
    if(options.msg.toLowerCase() === "utf8"){
      message = messageArg;
    }
    else if(options.msg.toLowerCase() === "hex"){
      if(!/^[0-9a-fA-F]+$/.test(messageArg)){
        console.error("ERROR: Invalid Hex input");
        process.exit(1);
      }
      else if(messageArg.length % 2 !== 0){
        console.error("ERROR: Hex character count must be even");
        process.exit(1);
      }
    
      const {Hex} = require(resolve("Hex"));
      message = Hex.parse(messageArg);
    }
    else if(options.msg.toLowerCase() === "base64"){
      const {Base64} = require(resolve("Base64"));
      message = Base64.parse(messageArg);
    }
    else{
      console.error("ERROR: unknown -msg value");
      process.exit(1);
    }
  }
  else{ // encType === "dec"
    message = messageArg;
  }
  
  let key;
  if(options.key.toLowerCase() === "utf8"){
    key = keyArg;
  }
  else if(options.key.toLowerCase() === "hex"){
    if(!/^[0-9a-zA-Z]+$/.test(keyArg)){
      console.error("ERROR: Invalid Hex input");
      process.exit(1);
    }
    else if(keyArg.length % 2 !== 0){
      console.error("ERROR: Hex character count must be even");
      process.exit(1);
    }
    
    const {Hex} = require(resolve("Hex"));
    key = Hex.parse(keyArg);
    
    if(command === "aes" && key.nSigBytes % 4 !== 0){
      console.error("ERROR: Key size for AES must be multiple of 32bit/4byte/1word");
      process.exit(1);
    }
    else if(command === "des3" && ![8,16].includes(key.nSigBytes) && key.nSigBytes < 24){
      console.error("ERROR: 3DES requires the key length to be 64, 128, 192 or >192 bits.");
      process.exit(1);
    }
  }
  else if(options.key.toLowerCase() === "base64"){
    const {Base64} = require(resolve("Base64"));
    key = Base64.parse(keyArg);
  
    if(command === "aes" && key.nSigBytes % 4 !== 0){
      console.error("ERROR: Key size for AES must be multiple of 32bit/4byte/1word");
      process.exit(1);
    }
    else if(command === "des3" && ![8,16].includes(key.nSigBytes) && key.nSigBytes < 24){
      console.error("ERROR: 3DES requires the key length to be 64, 128, 192 or >192 bits.");
      process.exit(1);
    }
  }
  else{
    console.error("ERROR: unknown -key value");
    process.exit(1);
  }
  
  // Decide -out default value
  if(!options.out){
    if(encType === "enc"){
      options.out = "base64";
    }
    else{
      options.out = "hex";
    }
  }
  else if(encType === "enc" && options.out.toLowerCase() === "utf8"){
    console.error("ERROR: '-out utf8' cannot be used on encryption");
    process.exit(1);
  }
  
  let outputEncoding;
  if(options.out.toLowerCase() === "hex"){
    outputEncoding = require(resolve("Hex")).Hex;
  }
  else if(options.out.toLowerCase() === "base64"){
    outputEncoding = require(resolve("Base64")).Base64;
  }
  else if(options.out.toLowerCase() === "utf8"){
    outputEncoding = require(resolve("Utf8")).Utf8;
  }
  else{
    console.error("ERROR: unknown -out value");
    process.exit(1);
  }
  
  let mode;
  if(options.mode.toLowerCase() === "cbc"){
    mode = require(resolve("mode/CBC")).CBC;
  }
  else if(options.mode.toLowerCase() === "ecb"){
    mode = require(resolve("mode/ECB")).ECB;
  }
  else if(options.mode.toLowerCase() === "ofb"){
    mode = require(resolve("mode/OFB")).OFB;
  }
  else if(options.mode.toLowerCase() === "cfb"){
    mode = require(resolve("mode/CFB")).CFB;
  }
  else if(options.mode.toLowerCase() === "ctr"){
    mode = require(resolve("mode/CTR")).CTR;
  }
  else{
    console.error("ERROR: unknown -mode value");
    process.exit(1);
  }
  
  let padding;
  if(options.pad.toLowerCase() === "ansix923"){
    padding = require(resolve("pad/AnsiX923")).AnsiX923;
  }
  else if(options.pad.toLowerCase() === "iso10126"){
    padding = require(resolve("pad/ISO10126")).ISO10126;
  }
  else if(options.pad.toLowerCase() === "iso97971"){
    padding = require(resolve("pad/ISO97971")).ISO97971;
  }
  else if(options.pad.toLowerCase() === "nopadding"){
    padding = require(resolve("pad/NoPadding")).NoPadding;
  }
  else if(options.pad.toLowerCase() === "pkcs7"){
    padding = require(resolve("pad/Pkcs7")).Pkcs7;
  }
  else if(options.pad.toLowerCase() === "zero"){
    padding = require(resolve("pad/Zero")).Zero;
  }
  else{
    console.error("ERROR: unknown -pad value");
    process.exit(1);
  }
  
  let kdfModule;
  if(options.kdf.toLowerCase() === "pbkdf2"){
    kdfModule = require(resolve("PBKDF2")).PBKDF2;
  }
  else if(options.kdf.toLowerCase() === "evpkdf"){
    kdfModule = require(resolve("EvpKDF")).EvpKDF;
  }
  else{
    console.error("ERROR: unknown -kdf value");
    process.exit(1);
  }
  
  let kdfIterations = options.iter;
  
  let kdfHasher;
  switch (options.hasher.toLowerCase()){
    case "md5": kdfHasher = require(resolve("MD5")).MD5; break;
    case "sha1": kdfHasher = require(resolve("SHA1")).SHA1; break;
    case "sha3": kdfHasher = require(resolve("SHA3")).SHA3; break;
    case "sha224": kdfHasher = require(resolve("SHA224")).SHA224; break;
    case "sha256": kdfHasher = require(resolve("SHA256")).SHA256; break;
    case "sha384": kdfHasher = require(resolve("SHA384")).SHA384; break;
    case "sha512": kdfHasher = require(resolve("SHA512")).SHA512; break;
    case "ripemd160": kdfHasher = require(resolve("RIPEMD160")).RIPEMD160; break;
    default:
      console.error("ERROR: Unknown hash");
      process.exit(1);
  }
  
  let result;
  
  if(encType === "enc"){
    result = Cipher.encrypt(message, key, {mode, padding, kdfModule, kdfIterations, kdfHasher});
  }
  else{
    result = Cipher.decrypt(message, key, {mode, padding, kdfModule, kdfIterations, kdfHasher});
  }
  
  let output;
  try{
    if(encType === "enc"){
      if(options.out.toLowerCase() === "base64"){
        output = result.toString();
      }
      else{
        const {Base64} = require(resolve("Base64"));
        const word = Base64.parse(result.toString());
        output = word.toString(require(resolve("Hex")).Hex);
      }
    }
    else{
      output = result.toString(outputEncoding);
    }
  }
  catch(e){
    if(options.out === "utf8"){
      console.error("ERROR: Byte array could not be recognized as UTF-8");
    }
    else{
      console.error("ERROR: Failed to decrypt message");
    }
    process.exit(1);
  }
  
  console.log(output);
  process.exit(0);
}