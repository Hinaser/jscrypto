# jscrypto
![Build](https://github.com/Hinaser/jscrypto/actions/workflows/test.yml/badge.svg?)

[crypto-js](https://github.com/brix/crypto-js) enhancement for modern js environments.

- Loadable from ES6/CommonJS/Typescript/Browser runtimes.
- Written in Typescript with many type declarations.
- Reduced bundle size when using webpack v4.  
  - When bundling only SHA256 module, the webpack-ed js file might be less than 6kb,  
    while bundled size with `crypto-js` might be larger than 100kb because webpack v4 cannot eliminate dead codes efficiently.
  - For webpack v5, bundle size with `crypto-js` can be greatly reduced by enhanced tree-shaking.
    However, sometimes library requiring `crypto-js` doesn't run in commonJS environments like AWS lambda,  
    or local node runtime environment for it fails to load crypto module from node environment.

## Install

```
npm install jscrypto
# or
yarn add jscrypto
```

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

**For webpack v5**  
Please add `{"crypto": "crypto"}` entry to `resolve.fallback` in `webpack.config.js` to suppress warning from webpack v5. 
```
module.exports = {
  ...
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {"crypto": "crypto"} // <- Please add this entry to your webpack.config.js
  },
  ...
}
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

**For webpack v5**  
Please add `{"crypto": false}` entry to `resolve.fallback` in `webpack.config.js` to suppress warning from webpack v5.
```
module.exports = {
  ...
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {"crypto": "false"} // <- Please add this entry to your webpack.config.js
  },
  ...
}
```

### Browser
Copy js files/directories under `/dist` dir into somewhere browser can access.  
Then directly load js file into `<script>` tag.
```html
<script src="dist/index.js"></script> <!-- All modules are loaded into browser -->
<script src="dist/SHA256.js"></script><!-- Only SHA256 module is loaded into browser -->
<script type="text/javascript">
  // This will output: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
  console.log(JsCrypto.SHA256.hash("test").toString());
</script>
```

## API
`jscrypto` supports crypto modules as well as `cryptojs`.

### *Popular*
**Hash** [`MD5`](#md5), [`SHA1`](#sha1), [`SHA3`](#sha3), [`SHA224`](#sha224), [`SHA256`](#sha256), [`SHA384`](#sha384), [`SHA512`](#sha512), [`RIPEMD160`](#ripemd160),  
**Message/Key Hash** [`HMAC-MD5`](#hmac-md5), [`HMAC-SHA224`](#hmac-sha224), [`HMAC-SHA256`](#hmac-sha256), [`HMAC-SHA384`](#hmac-sha384), [`HMAC-SHA512`](#hmac-sha512)  
**Block Cipher** [`AES`](#aes), [`DES`](#des), [`DES3`](#des3)

### *Basic structure*
**Word** [`Word32Array`](#word32array), [`Word64Array`](#word64array)  
**Encoder** [`Base64`](#base64), [`Hex`](#hex), [`Latin1`](#latin1), [`Utf8`](#utf8), [`Utf16`](#utf16)

### *Misc*
**Stream Cipher** [`Rabbits`](API.md#rabbits), [`RC4`](API.md#rC4), [`RC4Drop`](API.md#rC4Drop)  
**Key Derive Function** [`OpenSSLKDF`](API.md#openSSLKDF), [`EvpKDF`](API.md#evpKDF), [`PBKDF2`](API.md#pBKDF2)  
**Block Cipher mode** [`CBC`](API.md#cBC), [`CFB`](API.md#cFB), [`CTR`](API.md#cTR), [`ECB`](API.md#eCB), [`OFB`](API.md#oFB)  
**Block Padding** [`AnsiX923`](API.md#ansiX923), [`ISO10126`](API.md#iSO10126), [`ISO97971`](API.md#iSO97971), [`NoPadding`](API.md#nopadding), [`Pkcs7`](API.md#pkcs7), [`Zero`](API.md#zero)  
**Formatter** [`OpenSSLFormatter`](API.md#openSSLFormatter)

---

### Hash
#### General
Hash module can take both string/binary word as a hashing target.
```js
JsCrypto.SHA256.hash("string");
// or
var w = new Word32Array([0x61626364]); // Binary representation of "abcd"
JsCrypt.SHA256.hash(w);
// or
// Byte array can be hashed.
// ArrayBuffer | Uint8Array | Int8Array | Uint8ClampedArray | Int16Array | Uint16Array 
// Int32Array | Uint32Array | Float32Array | Float64Array
var w = new Word32Array(typedArray);
JsCrypt.SHA256.hash(w);
```

<h4 id='md5'>MD5</h4>

```js
// MD.hash(string)
// Return value of 'hash' is Word32Array
var hashedWord = JsCrypto.MD5.hash("abc");
hashedWord.toString(); // "900150983cd24fb0d6963f7d28e17f72"
hashedWord.toString(JsCrypto.Hex); // "900150983cd24fb0d6963f7d28e17f72"
hashedWord.toString(JsCrypto.Base64); // "kAFQmDzST7DWlj99KOF/cg=="

// Binary words can be hashed as well.
// binary representation of "abc"
var w = new JsCrypto.Word32Array([0x61626300], 3);
var hashedWord = JsCrypto.MD5.hash(w);
hashedWord.toString(); // "900150983cd24fb0d6963f7d28e17f72"

// binary representation of "abcd"
var w2 = new JsCrypto.Word32Array([0x61626364]);
var hashedWord = JsCrypto.MD5.hash(w2);
hashedWord.toString(); // "e2fc714c4727ee9395f324cd2e7f331f"

// You can do gradual update
var md5 = new JsCrypto.MD5("");
md5.update("a");
md5.update("b");
md5.update("c");
var hashedWord = md5.finalize();
hashedWord.toString(); // The same as Jscrypto.MD5.hash("abc").toString(); "900150983cd24fb0d6963f7d28e17f72"
```

<h4 id='sha1'>SHA1</h4>

```js
// SHA1.hash(string)
var hashedWord = JsCrypto.SHA1.hash("abc"); // Return value of 'hash' is Word32Array
hashedWord.toString(); //  "a9993e364706816aba3e25717850c26c9cd0d89d"
hashedWord.toString(JsCrypto.Hex); // "a9993e364706816aba3e25717850c26c9cd0d89d"
hashedWord.toString(JsCrypto.Base64); // "qZk+NkcGgWq6PiVxeFDCbJzQ2J0="

// Binary words can be hashed as well as MD5. See MD5 example above.
// You can do gradual update as well as MD5. See MD5 example above.
```

<h4 id='sha3'>SHA3</h4>

```js
// SHA3.hash(string)
var hashedWord = JsCrypto.SHA3.hash("abc"); // Return value of 'hash' is Word32Array
hashedWord.toString(); //  "18587dc2ea10...7aa511a9d00bb96"
hashedWord.toString(JsCrypto.Hex); // "18587dc2ea10...7aa511a9d00bb96"
hashedWord.toString(JsCrypto.Base64); // "GFh9wuoQa5oVY...plsZ13qlEanQC7lg=="

// Binary words can be hashed as well as MD5. See MD5 example above.
// You can do gradual update as well as MD5. See MD5 example above.
```

<h4 id='sha224'>SHA224</h4>

```js
// SHA224.hash(string)
var hashedWord = JsCrypto.SHA224.hash("abc"); // Return value of 'hash' is Word32Array
hashedWord.toString(); //  "23097d223405d8228642a477bda255b32aadbce4bda0b3f7e36c9da7"
hashedWord.toString(JsCrypto.Hex); // "23097d223405d8228642a477bda255b32aadbce4bda0b3f7e36c9da7"
hashedWord.toString(JsCrypto.Base64); // "Iwl9IjQF2CKGQqR3vaJVsyqtvOS9oLP342ydpw=="

// Binary words can be hashed as well as MD5. See MD5 example above.
// You can do gradual update as well as MD5. See MD5 example above.
```

<h4 id='sha256'>SHA256</h4>

```js
// SHA256.hash(string)
var hashedWord = JsCrypto.SHA256.hash("abc"); // Return value of 'hash' is Word32Array
hashedWord.toString(); //  "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
hashedWord.toString(JsCrypto.Hex); // "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
hashedWord.toString(JsCrypto.Base64); // "ungWv48Bz+pBQUDeXa4iI7ADYaOWF3qctBD/YfIAFa0="

// Binary words can be hashed as well as MD5. See MD5 example above.
// You can do gradual update as well as MD5. See MD5 example above.
```

<h4 id='sha384'>SHA384</h4>

```js
// SHA384.hash(string)
var hashedWord = JsCrypto.SHA384.hash("abc"); // Return value of 'hash' is Word32Array
hashedWord.toString(); //  "cb00753f45a35...2358baeca134c825a7"
hashedWord.toString(JsCrypto.Hex); // "cb00753f45a35...2358baeca134c825a7"
hashedWord.toString(JsCrypto.Base64); // "ywB1P0WjXou1oD1pm...croefMI1i67KE0yCWn"

// Binary words can be hashed as well as MD5. See MD5 example above.
// You can do gradual update as well as MD5. See MD5 example above.
```

<h4 id='sha512'>SHA512</h4>

```js
// SHA512.hash(string)
var hashedWord = JsCrypto.SHA512.hash("abc"); // Return value of 'hash' is Word32Array
hashedWord.toString(); //  "ddaf35a19361...2a9ac94fa54ca49f"
hashedWord.toString(JsCrypto.Hex); // "ddaf35a19361...2a9ac94fa54ca49f"
hashedWord.toString(JsCrypto.Base64); // "3a81oZNherrMQXNJ...2Q86A4qmslPpUyknw=="

// Binary words can be hashed as well as MD5. See MD5 example above.
// You can do gradual update as well as MD5. See MD5 example above.
```

<h4 id='ripemd160'>RIPEMD160</h4>

```js
// RIPEMD160.hash(string)
var hashedWord = JsCrypto.RIPEMD160.hash("abc"); // Return value of 'hash' is Word32Array
hashedWord.toString(); //  "8eb208f7e05d987a9b044a8e98c6b087f15a0bfc"
hashedWord.toString(JsCrypto.Hex); // "8eb208f7e05d987a9b044a8e98c6b087f15a0bfc"
hashedWord.toString(JsCrypto.Base64); // "jrII9+BdmHqbBEqOmMawh/FaC/w="

// Binary words can be hashed as well as MD5. See MD5 example above.
// You can do gradual update as well as MD5. See MD5 example above.
```

### Message/Key Hash
#### General
HMAC can be generated like below.
```js
var hmacMD5 = new JsCrypto.Hmac(new JsCrypto.MD5(), "key");
var words = hmacMD5.finalize("message");
words.toString(); //  "4e4748e62b463521f6775fbf921234b5"
// or
var hmacSHA1 = new JsCrypto.Hmac(new JsCrypto.SHA1(), "key");
var words = hmacSHA1.finalize("message");
words.toString(); // "2088df74d5f2146b48146caf4965377e9d0be3a4"
// or simply
JsCrypto.HmacSHA256("message", "key").toString(); // "6e9ef29b75fffc5b7ab...76917343065f58ed4a"

```

<h4 id='hmac-md5'>HMAC-MD5</h4>

```js
var hashedWord = JsCrypto.HmacMD5("message", "key");
hashedWord.toString(); // "4e4748e62b463521f6775fbf921234b5"
hashedWord.toString(JsCrypto.Base64); // "TkdI5itGNSH2d1+/khI0tQ=="

// Binary message can be hashed.
// Binary representation of "message"
var message = new JsCrypto.Word32Array([0x6d657373, 0x61676500], 7);
var hashedWord = JsCrypto.HmacMD5(message, "key");
hashedWord.toString(); // "4e4748e62b463521f6775fbf921234b5"

// Key also can be a binary
// Binary representation of "message"
var message = new JsCrypto.Word32Array([0x6d657373, 0x61676500], 7);
// Binary representation of "key"
var key = new JsCrypto.Word32Array([0x6b657900], 3);
var hashedWord = JsCrypto.HmacMD5(message, key);
hashedWord.toString(); // "4e4748e62b463521f6775fbf921234b5"

// Gradual update
var hmacMD5 = new JsCrypto.Hmac(new JsCrypto.MD5(), "key");
hmacMD5.update("me");
hmacMD5.update("ss");
hmacMD5.update("ag");
var w = hmacMD5.finalize("e");
w.toString(); // "4e4748e62b463521f6775fbf921234b5"
```

<h4 id='hmac-sha224'>HMAC-SHA224</h4>

```js
var hashedWord = JsCrypto.HmacSHA224("message", "key");
hashedWord.toString(); // "a0b5eecae3f74f0561a8da6f389f78f1a3895c8c183c31c1756d7925"
hashedWord.toString(JsCrypto.Base64); // "oLXuyuP3TwVhqNpvOJ948aOJXIwYPDHBdW15JQ=="

// Binary message can be hashed as well as HMAC-MD5. See HMAC-MD5 example above.
// Key also can be a binary as well as HMAC-MD5. See HMAC-MD5 example above.
// Can Gradual update as well as HMAC-MD5. See HMAC-MD5 example above.
```

<h4 id='hmac-sha256'>HMAC-SHA256</h4>

```js
var hashedWord = JsCrypto.HmacSHA256("message", "key");
hashedWord.toString(); // "6e9ef29b75fffc5b7abae527d58fdadb2fe42e7219011976917343065f58ed4a"
hashedWord.toString(JsCrypto.Base64); // "bp7ym3X//Ft6uuUn1Y/a2y/kLnIZARl2kXNDBl9Y7Uo="

// Binary message can be hashed as well as HMAC-MD5. See HMAC-MD5 example above.
// Key also can be a binary as well as HMAC-MD5. See HMAC-MD5 example above.
// Can Gradual update as well as HMAC-MD5. See HMAC-MD5 example above.
```

<h4 id='hmac-sha384'>HMAC-SHA384</h4>

```js
var hashedWord = JsCrypto.HmacSHA384("message", "key");
hashedWord.toString(); // "0fd3ae3237be98c64a075...544b9062c773b2d86f"
hashedWord.toString(JsCrypto.Base64); // "D9OuMje+m...EuQYsdzsthv"

// Binary message can be hashed as well as HMAC-MD5. See HMAC-MD5 example above.
// Key also can be a binary as well as HMAC-MD5. See HMAC-MD5 example above.
// Can Gradual update as well as HMAC-MD5. See HMAC-MD5 example above.
```

<h4 id='hmac-sha512'>HMAC-SHA512</h4>

```js
var hashedWord = JsCrypto.HmacSHA512("message", "key");
hashedWord.toString(); // ""e477384d7ca2...16810fa367e98"
hashedWord.toString(JsCrypto.Base64); // "5Hc4TXyiKd0UJuZ...xp9NdbQ0IWgQ+jZ+mA=="

// Binary message can be hashed as well as HMAC-MD5. See HMAC-MD5 example above.
// Key also can be a binary as well as HMAC-MD5. See HMAC-MD5 example above.
// Can Gradual update as well as HMAC-MD5. See HMAC-MD5 example above.
```

### Block Cipher

<h4 id="aes">AES</h4>

```js
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Encrypt/Decrypt string without specifying salt. (Salt is randomly chosen at runtime)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Default block cipher mode is CBC, pad is Pkcs7.
// Random base64 string which contains encrypted message and 'random' salt.
var encryptedData = JsCrypto.AES.encrypt("message", "key").toString();
// Binary data is returned as Word32Array.
var decryptedData = JsCrypto.AES.decrypt(encryptedData, "key");
decryptedData.toString(JsCrypto.Utf8); // "message"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Encrypt/Decrypt string with pre-defined salt.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var salt = new JsCrypto.Word32Array([0x00112233, 0x44556677]); // Or JsCrypto.Hex.parse("0011223344556677")
// Always "U2FsdGVkX1/X4t3MKrqHN8aVLgI2BvY5ZlW7QDJX9OM=" because of a fixed salt.
var encryptedData = JsCrypto.AES.encrypt("message", "key", {salt: salt}).toString();
// Binary data is returned as Word32Array.
var decryptedData = JsCrypto.AES.decrypt(encryptedData, "key");
decryptedData.toString(JsCrypto.Utf8); // "message"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// When you want to store/copy encrypted data somewhere, be sure to have 'stringified' data.
// Don't save 'encryptedDataObj' below, because this contains encryption key itself.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Always 'stringify' this 'encryptedDataObj' then port it anywhere.
var encryptedDataObj = JsCrypto.AES.encrypt("message", "key");
// Return value of 'toString()' is a Base64 string containing only encrypted data and salt
var encryptedData = encryptedDataObj.toString();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Encrypt not only a string but also binary data(ArrayBuffer, Uint8Array, etc)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fileElement = document.querySelector("input[type='file']");
const file = fileElement.files[0];
const reader = new FileReader();
reader.onload = function(e){
  const arrayBuffer = reader.result;
  const binaryWord = new Word32Array(arrayBuffer);
  const encryptedData = JsCrypto.AES.encrypt(binaryWord, "password").toString();
  
  // Store it to localStorage, etc.
  localStorage.setItem("secretFile", encryptedData);
  
  // You can decrypt it like below
  // Returned value is Word32Array
  const decryptedData = JsCrypto.AES.decrypt(encryptedData, "password");
  // Word32Array can be turned to Uint8Array.
  const decryptedFile = decryptedData.toUint8Array();
  // You can then convert it to ArrayBuffer;
  const decryptedFileArrayBuffer = decryptedFile.buffer;
};
reader.readAsArrayBuffer(file);
```

<h4 id="des">DES</h4>

```js
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Encrypt/Decrypt string without specifying salt. (Salt is randomly chosen at runtime)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Default block cipher mode is CBC, pad is Pkcs7.
// Random base64 string which contains encrypted message and 'random' salt.
var encryptedData = JsCrypto.DES.encrypt("message", "key").toString();
// Binary data is returned as Word32Array.
var decryptedData = JsCrypto.DES.decrypt(encryptedData, "key");
// Specify encoding and you get "message"
decryptedData.toString(JsCrypto.Utf8);

// For additinal feature, please see AES example and replace 'AES' to 'DES'.
```

<h4 id="des3">Triple-DES</h4>

```js
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Encrypt/Decrypt string without specifying salt. (Salt is randomly chosen at runtime)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Default block cipher mode is CBC, pad is Pkcs7.
// Random base64 string which contains encrypted message and 'random' salt.
var encryptedData = JsCrypto.DES3.encrypt("message", "key").toString();
// Binary data is returned as Word32Array.
var decryptedData = JsCrypto.DES3.decrypt(encryptedData, "key");
// Specify encoding and you get "message"
decryptedData.toString(JsCrypto.Utf8);

// For additinal feature, please see AES example and replace 'AES' to 'DES3'.
```

### Word
The basic instance holding binary value.
<h4 id='word32array'>Word32Array</h4>

```js
// Example of Word32Array constructor.
// Given 'new Word32Array(A, B)',  A: array of 32bit word, B: the number of significant bytes.

// Binary representation of "abcdefgh"
var abcdefgh = new JsCrypto.Word32Array([0x61626364, 0x65666768]);
// Binary representation of "abcdefg"
var abcdefg = new JsCrypto.Word32Array([0x61626364, 0x65666768], 7);
// Binary representation of "abcdef"
var abcdef = new JsCrypto.Word32Array([0x61626364, 0x65666768], 6);
// Binary representation of "abcd"
var abcd = new JsCrypto.Word32Array([0x61626364, 0x65666768], 4);
// This also represents "abcd"
var abcd2 = new JsCrypto.Word32Array([0x61626364]);

// Example of stringify
var w = new JsCrypto.Word32Array([0x1234567, 0x89abcdef]);
// Word32Array.toString(encoder?: IEncoder)
w.toString(); // "0123456789abcdef"
w.toString(JsCrypto.Hex); // "0123456789abcdef"
w.toString(JsCrypto.Base64); // "ASNFZ4mrze8="

// Word32Array can be genereated from parser.
// The same as 'new Word32Array([0x01234567, 0x89abcdef])'
JsCrypto.Hex.parse("0123456789abcdef");
// The same as 'new Word32Array([0x01234567, 0x89abcdef])'
JsCrypto.Base64.parse("ASNFZ4mrze8=");
// The same as 'new Word32Array([0x61626364])'
JsCrypto.Utf8.parse("abcd");
```

<h4 id='word64array'>Word64Array</h4>

```js
var w1 = new Word64Array([new Word64(0x00010203, 0x04050607)]);
w1.toString(); // "0001020304050607"
w1.nSigBytes; // 8

var w2 = w1.to32();
w2.toString(); // "0001020304050607"
w2.nSigBytes; // 8
```

### Encoder
<h4 id='base64'>Base64</h4>

```js
  var w = new JsCrypto.Word32Array([0x00000000]);
  
  // Base64.stringify
  JsCrypto.Base64.stringify(w); // "AAAAAA=="
  // or
  w.toString(JsCrypto.Base64); // "AAAAAA=="

  // Base64.parse
  JsCrypto.Base64.parse("AAAAAA=="); // Word32Array. 0x00000000
  JsCrypto.Base64.parse("AAAAAA==").toString(); // "00000000"
```

<h4 id='hex'>Hex</h4>

```js
  var w = new JsCrypto.Word32Array([0x00102030]);
  
  // Hex.stringify
  JsCrypto.Hex.stringify(w); //  "00102030"
  // or
  w.toString(JsCrypto.Hex); // "00102030"

  // Hex.parse
  JsCrypto.Hex.parse("00102030"); // Word32Array. 0x00102030
  JsCrypto.Hex.parse("00102030").toString(); // "00102030"
```

<h4 id='latin1'>Latin1</h4>

```js
  var w = new JsCrypto.Word32Array([0x616263ff]);
  
  // Latin1.stringify
  JsCrypto.Latin1.stringify(w); // "abcÿ"
  // or
  w.toString(JsCrypto.Latin1); // "abcÿ"

  // Latin1.parse
  JsCrypto.Latin1.parse("abcÿ"); // Word32Array. 0x616263ff
  JsCrypto.Latin1.parse("abcÿ").toString(); // "616263ff"
```

<h4 id='utf8'>UTF-8</h4>

```js
  var w = new JsCrypto.Word32Array([0xe3818200 | 0x00000061]); // e3-81-82 -> あ, 61 -> a
  
  // Utf8.stringify
  JsCrypto.Utf8.stringify(w); //  "あa"
  // or
  w.toString(JsCrypto.Utf8); // "あa"

  // Outside utf-8 code space cannot be stringified
  JsCrypto.Utf8.stringify(new JsCrypto.Word32Array([0x00aabbcc])); // Uncaught Error: Malformed UTF-8 data

  // Utf8.parse
  JsCrypto.Utf8.parse("あa"); // Word32Array. 0xe3818261
  JsCrypto.Utf8.parse("あa").toString(); // "e3818261"
```

<h4 id='utf16'>UTF-16</h4>

```js
  var w = new JsCrypto.Word32Array([0x30423044]); // 0x3042 = あ, 0x3044 = い in UTF-16
  
  // Utf16.stringify
  JsCrypto.Utf16.stringify(w); // "あい"
  // or
  w.toString(JsCrypto.Utf16); // "あい"

  // Utf16.parse
  JsCrypto.Utf16.parse("あい"); // Word32Array. 0x30423044
  JsCrypto.Utf16.parse("あい").toString(); // "30423044"
```

Continue to [API.md](API.md)
