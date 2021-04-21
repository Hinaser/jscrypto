# jscrypto
[![npm version](https://badge.fury.io/js/jscrypto.svg)](https://badge.fury.io/js/jscrypto)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Build](https://github.com/Hinaser/jscrypto/actions/workflows/test.yml/badge.svg?)

[crypto-js](https://github.com/brix/crypto-js) enhancement for modern js environments.

- Works in modern browsers and **IE9/10/11**.  
  \*IE9/10 uses weak random generator on cipher encryption with string password. Use it at your own risk.  
  \*If only using decryption or hash/hmac, weak random generator does not cause any trouble.
- Loadable with ES6/CommonJS/Typescript/Browser runtimes.
- Support [`GCM`][GCM]/[`GMAC`][GMAC]/[`CCM`][CCM]/[`CBC-MAC`][CBC-MAC] :tada::tada::tada:
- [CLI commands](#cli) available:  
  i.e. `npx jscrypto sha1 "message"`, `npx jscrypto aes enc "message" "password"`, etc.  
- Written in Typescript with rich type declarations.
- When bundling only SHA256 module, the webpack-ed js file can be less than 6kb.  
- Default parameters for Block cipher (AES/DES/Triple-DES) is tuned to be OpenSSL(1.1.1f) compatible.  
  Read further [here](#openssl-compat)

### Breaking changes for version 0.x.x users
There are several breaking changes between version 0.x and 1.x.  
Please see detail in [CHANGELOG](https://github.com/Hinaser/jscrypto/blob/master/CHANGELOG.md)


## Install

```
npm install jscrypto
# or
yarn add jscrypto
```

If you only want to use [CLI commands](#cli), you don't even need to install `jscrypto`.  
Just dispatch `npx` command like `npx jscrypto sha256 "message"`.  
Read further [here](#cli)

## Usage
### CommonJS Environment (Node.js environment like node CLI, AWS Lambda, etc)
```js
// Load whole library modules.
const JsCrypto = require("jscrypto");
console.log(JsCrypto.SHA256.hash("test").toString());

// or load only necessary modules (Recommended for faster loading and reduced size)
const {SHA256} = require("jscrypto/SHA256");
console.log(SHA256.hash("test").toString());
```

### ES6 Environment (i.e. Creating app/library with webpack/react-scripts or some es6-compatible bundlers)
**Be sure to load the module from `jscrypto/es6`.**  
This can greatly reduce bundle size by bundlers tree-shaking ability. 
Don't forget to add `/es6` following `jscrypto`
```ecmascript 6
// Load whole library modules.
import JsCrypto from "jscrypto/es6";
console.log(JsCrypto.SHA256.hash("test").toString());
...
import {SHA256} from "jscrypto/es6/SHA256"; // Recommended
console.log(SHA256.hash("test").toString());
```

### Typescript Environment
**Be sure to load the module from `jscrypto/es6`.**
```ecmascript 6
// Load whole library modules.
import * as JsCrypto from "jscrypto/es6";
console.log(JsCrypto.SHA256.hash("test").toString());
...
import {SHA256} from "jscrypto/es6/SHA256"; // Recommended
console.log(SHA256.hash("test").toString());
```

### Browser
Copy js files/directories under `/dist` dir into somewhere browser can access.  
Then directly load js file into `<script>` tag.
```html
<script src="dist/index.js"></script> <!-- All modules are loaded into browser -->
<script type="text/javascript">
  // This will output: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
  console.log(JsCrypto.SHA256.hash("test").toString());
</script>
<!-- OR -->
<script src="dist/SHA256.js"></script> <!-- Single module loading is lightweight and faster. -->
<script type="text/javascript">
  // This will output: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
  console.log(JsCrypto.SHA256.hash("test").toString());
</script>
```

<h3 id='cli'>CLI</h3>

Command Line Interface to try various crypto modules on terminal.
```cmd
  Usage: npx jscrypto <hash|hmac|cipher> [command options]

  hash: md5, sha1, sha3, sha224, sha256, sha384, sha512, ripemd160
  hmac: hmac-md5, hmac-sha1, hmac-sha224, hmac-sha256, hmac-sha384, hmac-sha512
  cipher: aes, des, des3, rc4

  
  $ npx jscrypto <hash> message [-msg hex|base64|utf8] [-out hex|base64]

    default:
      -msg: utf8 ... recognize message as utf-8 string
      -out: hex ... output hashed binary as hex string
    example:
      #Output of below 3 examples are the same
      npx jscrypto sha1 test
      npx jscrypto sha1 74657374 -msg hex
      npx jscrypto sha1 dGVzdA== -msg base64


  $ npx jscrypto <hmac> message key [msg hex|base64|utf8] [-key hex|base64|utf8] [-out hex|base64]

    default:
      -msg: utf8 ... recognize message as utf-8 string
      -key: utf8 ... recognize key as utf-8 string
      -out: hex ... output hashed binary as hex string
    example:
      #Output of below 3 examples are the same
      npx jscrypto hmac-sha1 test key
      npx jscrypto hmac-sha1 74657374 6b6579 -msg hex -key hex
      npx jscrypto hmac-sha1 dGVzdA== a2V5 -msg base64 -key base64


  $ npx jscrypto <cipher> message key [-msg hex|base64|utf8] [-key hex|base64|utf8] [-out hex|base64|utf8] [-mode cbc|ecb|ofb|cfb] [-pad pkcs7|iso10126|iso97971|ansix923|nopadding] [-kdf pbkdf2|evpkdf]

    default:
      -msg: utf8 ... recognize message as utf-8 string
      -key: utf8 ... recognize key as utf-8 string
      -out: base64|hex ... base64 on encryption, hex on decryption. Note: utf8 cannot be used on encryption.
      -mode: cbc ... Code block chaining as block cipher mode
      -pad: pkcs7 ... Pkcs7 padding as block padding
      -kdf: pbkdf2 ... PBKDF2 as key derivation function
    example:
      #Encrypt (Output would not be the same because of a random salt, but can be decrypted with the same key)
      npx jscrypto aes enc test password
      npx jscrypto aes enc 74657374 70617373776f7264 -msg hex -key hex
      npx jscrypto aes enc dGVzdA== cGFzc3dvcmQ= -msg base64 -key base64
      #Decrypt
      npx jscrypto aes dec U2FsdGVkX19Kf/wItWMuaTrQYV3OljA3Cr9WPMhC6Tk= password -out utf8
      npx jscrypto aes dec A2pYDd/3oeENsRFGA1Y0Mg== 70617373776f7264 -key hex -out utf8
      npx jscrypto aes dec A2pYDd/3oeENsRFGA1Y0Mg== cGFzc3dvcmQ= -key base64 -out utf8
```

<h3 id='openssl-compat'>OpenSSL compatibility</h3>

#### Encryption
  ```js
  encryptedData = JsCrypto.AES.encrypt("message", "secret phrase").toString();
  ```
is equivalent in OpenSSL (1.1.1f) to
  ```shell
  echo -n "message" | openssl enc -e -aes-256-cbc -pass pass:"secret phrase" -base64 -pbkdf2
  # Note: Because of a random salt, everytime it produces different base64 string.
  # But it is OK for decryption.
  ```

#### Decryption
Encrypted data can be decrypted by
  ```js
  JsCrypto.AES.decrypt(encryptedData, "secret phrase").toString(JsCrypto.Utf8); // "message"
  ```
or in OpenSSL
  ```shell
  echo "U2FsdGVkX1..." | openssl enc -d -aes-256-cbc -pass pass:"secret phrase" -base64 -pbkdf2
  # U2FsdGVkX1... is the output from either JsCrypto/OpenSSL encryption code/command.
  ```

## FAQ
#### Failed to import jscrypto in Typescript environment.

In most cases, your `tsconfig.json` is configured not to load npm module from `node_modules` folder.  
Check your `tsconfig.js` to be:
```json
{
  "compilerOptions": {
    "moduleResolution": "Node"
  }
}
```

## API
`jscrypto` supports crypto modules as well as `cryptojs`.

### *Popular*
**Hash** [`MD5`][MD5], [`SHA1`][SHA1], [`SHA3`][SHA3], [`SHA224`][SHA224], [`SHA256`][SHA256], [`SHA384`][SHA384], [`SHA512`][SHA512], [`RIPEMD160`][RIPEMD160],  
**Message/Key Hash** [`HMAC-MD5`][HMAC-MD5], [`HMAC-SHA224`][HMAC-SHA224], [`HMAC-SHA256`][HMAC-SHA256], [`HMAC-SHA384`][HMAC-SHA384], [`HMAC-SHA512`][HMAC-SHA512], [`GMAC`][GMAC], [`CBC-MAC`][CBC-MAC]  
**Block Cipher** [`AES`][AES], [`DES`][DES], [`Triple-DES`][Triple-DES]

### *Basic structure*
**Word** [`Word32Array`][Word32Array], [`Word64Array`][Word64Array]  
**Encoder** [`Base64`][Base64], [`Hex`][Hex], [`Latin1`][Latin1], [`Utf8`][Utf8], [`Utf16`][Utf16]

### *Misc*
**Stream Cipher** [`Rabbits`][Rabbits], [`RC4`][RC4], [`RC4Drop`][RC4Drop]  
**Key Derive Function** [`OpenSSLKDF`][OpenSSLKDF], [`EvpKDF`][EvpKDF], [`PBKDF2`][PBKDF2]  
**Block Cipher mode** [`CBC`][CBC], [`CFB`][CFB], [`CTR`][CTR], [`ECB`][ECB], [`OFB`][OFB], [`GCM`][GCM], [`CCM`][CCM]  
**Block Padding** [`AnsiX923`][AnsiX923], [`ISO10126`][ISO10126], [`ISO97971`][ISO97971], [`NoPadding`][NoPadding], [`Pkcs7`][Pkcs7], [`Zero`][Zero]  
**Formatter** [`OpenSSLFormatter`][OpenSSLFormatter]

[MD5]: https://github.com/Hinaser/jscrypto/blob/master/API.md#md5
[SHA1]: https://github.com/Hinaser/jscrypto/blob/master/API.md#sha1
[SHA3]: https://github.com/Hinaser/jscrypto/blob/master/API.md#sha3
[SHA224]: https://github.com/Hinaser/jscrypto/blob/master/API.md#sha224
[SHA256]: https://github.com/Hinaser/jscrypto/blob/master/API.md#sha256
[SHA384]: https://github.com/Hinaser/jscrypto/blob/master/API.md#sha384
[SHA512]: https://github.com/Hinaser/jscrypto/blob/master/API.md#sha512
[RIPEMD160]: https://github.com/Hinaser/jscrypto/blob/master/API.md#ripemd160
[HMAC-MD5]: https://github.com/Hinaser/jscrypto/blob/master/API.md#hmac-md5
[HMAC-SHA224]: https://github.com/Hinaser/jscrypto/blob/master/API.md#hmac-sha224
[HMAC-SHA256]: https://github.com/Hinaser/jscrypto/blob/master/API.md#hmac-sha256
[HMAC-SHA384]: https://github.com/Hinaser/jscrypto/blob/master/API.md#hmac-sha384
[HMAC-SHA512]: https://github.com/Hinaser/jscrypto/blob/master/API.md#hmac-sha512
[GMAC]: https://github.com/Hinaser/jscrypto/blob/master/API.md#gmac
[CBC-MAC]: https://github.com/Hinaser/jscrypto/blob/master/API.md#cbc-mac
[AES]: https://github.com/Hinaser/jscrypto/blob/master/API.md#aes
[AES-GCM]: https://github.com/Hinaser/jscrypto/blob/master/API.md#aes-gcm
[AES-CCM]: https://github.com/Hinaser/jscrypto/blob/master/API.md#aes-ccm
[DES]: https://github.com/Hinaser/jscrypto/blob/master/API.md#des
[Triple-DES]: https://github.com/Hinaser/jscrypto/blob/master/API.md#des3
[Word32Array]: https://github.com/Hinaser/jscrypto/blob/master/API.md#word32array
[Word64Array]: https://github.com/Hinaser/jscrypto/blob/master/API.md#mword64Array
[Base64]: https://github.com/Hinaser/jscrypto/blob/master/API.md#base64
[Hex]: https://github.com/Hinaser/jscrypto/blob/master/API.md#hex
[Latin1]: https://github.com/Hinaser/jscrypto/blob/master/API.md#latin1
[Utf8]: https://github.com/Hinaser/jscrypto/blob/master/API.md#utf8
[Utf16]: https://github.com/Hinaser/jscrypto/blob/master/API.md#utf16
[Rabbits]: https://github.com/Hinaser/jscrypto/blob/master/API.md#rabbits
[RC4]: https://github.com/Hinaser/jscrypto/blob/master/API.md#rc4
[RC4Drop]: https://github.com/Hinaser/jscrypto/blob/master/API.md#rc4drop
[OpenSSLKDF]: https://github.com/Hinaser/jscrypto/blob/master/API.md#opensslkdf
[EvpKDF]: https://github.com/Hinaser/jscrypto/blob/master/API.md#evpkdf
[PBKDF2]: https://github.com/Hinaser/jscrypto/blob/master/API.md#pbkdf2
[CBC]: https://github.com/Hinaser/jscrypto/blob/master/API.md#cbc
[CFB]: https://github.com/Hinaser/jscrypto/blob/master/API.md#cfb
[CTR]: https://github.com/Hinaser/jscrypto/blob/master/API.md#ctr
[ECB]: https://github.com/Hinaser/jscrypto/blob/master/API.md#ecb
[OFB]: https://github.com/Hinaser/jscrypto/blob/master/API.md#ofb
[GCM]: https://github.com/Hinaser/jscrypto/blob/master/API.md#gcm
[CCM]: https://github.com/Hinaser/jscrypto/blob/master/API.md#ccm
[AnsiX923]: https://github.com/Hinaser/jscrypto/blob/master/API.md#ansix923
[ISO10126]: https://github.com/Hinaser/jscrypto/blob/master/API.md#iso10126
[ISO97971]: https://github.com/Hinaser/jscrypto/blob/master/API.md#iso97971
[NoPadding]: https://github.com/Hinaser/jscrypto/blob/master/API.md#nopadding
[Pkcs7]: https://github.com/Hinaser/jscrypto/blob/master/API.md#pkcs7
[Zero]: https://github.com/Hinaser/jscrypto/blob/master/API.md#zero
[OpenSSLFormatter]: https://github.com/Hinaser/jscrypto/blob/master/API.md#opensslformatter
