#!/usr/bin/env node

const hashCommands = [
  "md5", "sha1", "sha3", "sha224", "sha256", "sha384", "sha512", "ripemd160"
];

const hmacCommands = [
  "hmac-md5", "hmac-sha1", "hmac-sha224", "hmac-sha256", "hmac-sha384", "hmac-sha512"
];

const cipherCommands = [
  "aes", "des", "des3", "rc4", "rc4drop"
];

const exeCommand = "jscrypto"// process.argv.slice(0, 2).join(" ");

const manJsCrypto = [
  `Usage: ${exeCommand} <command> [command options]\n`,
  "\n",
  "  <command>: hash|hmac|cipher",
  "\n",
  "  hash: " + hashCommands.join(", ") + "\n",
  "  hmac: " + hmacCommands.join(", ") + "\n",
  "  cipher: " + cipherCommands.join(", ") + "\n",
].join("");

const manJsCryptoHash = [
  `${exeCommand} <hash> message [-in hex|base64|string] [-out hex|base64]\n`,
  "\n",
  "  default:\n",
  "    -in: string ... recognize message as utf-8 string\n",
  "    -out: hex ... output hashed binary as hex string\n",
  "  example: \n",
  "    #Output of below 3 examples are the same\n",
  "    jscrypto sha1 test\n",
  "    jscrypto sha1 74657374 -in hex\n",
  "    jscrypto sha1 dGVzdA== -in base64\n",
].join("");

const manJsCryptoHmac = [
  `${exeCommand} <hmac> message key [msg hex|base64|string] [-key hex|base64|string] [-out hex|base64]\n`,
  "\n",
  "  default:\n",
  "    -msg: string ... recognize message as utf-8 string\n",
  "    -key: string ... recognize key as utf-8 string\n",
  "    -out: hex ... output hashed binary as hex string\n",
  "  example: \n",
  "    #Output of below 3 examples are the same\n",
  "    jscrypto hmac-sha1 test key\n",
  "    jscrypto hmac-sha1 74657374 6b6579 -msg hex -key hex\n",
  "    jscrypto hmac-sha1 dGVzdA== a2V5 -msg base64 -key base64\n",
].join("");

const manJsCryptoCipher = [
  `${exeCommand} <cipher> message key [-msg hex|base64|string] [-key hex|base64|string] [-out hex|base64] [-mode cbc|ecb|ofb|cfb] [-pad pkcs7|iso10126|iso97971|ansix923|nopadding] [-kdf pbkdf2|evpkdf]\n`,
  "\n",
  "  default:\n",
  "    -msg: string ... recognize message as utf-8 string\n",
  "    -key: string ... recognize key as utf-8 string\n",
  "    -out: hex ... output hashed binary as hex string\n",
  "    -mode: cbc ... Code block chaining as block cipher mode\n",
  "    -pad: pkcs7 ... Pkcs7 padding as block padding\n",
  "    -kdf: pbkdf2 ... PBKDF2 as key derivation function\n",
  "  example: \n",
  "    #Output of below 3 examples are the same\n",
  "    jscrypto aes test key\n",
  "    jscrypto aes 74657374 6b6579 -msg hex -key hex\n",
  "    jscrypto aes dGVzdA== a2V5 -msg base64 -key base64\n",
].join("");

const man = [
  manJsCrypto,
  manJsCryptoHash,
  manJsCryptoHmac,
  manJsCryptoCipher,
].join("\n\n");

const args = process.argv.slice(2);

if(args.length < 1){
  console.error(man);
  process.exit(1);
}
