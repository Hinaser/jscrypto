# jscrypto
![Build](https://github.com/Hinaser/jscrypto/actions/workflows/test.yml/badge.svg?)

[crypto-js](https://github.com/brix/crypto-js) clone for modern javascript environments.

- Supports both ES6/CommonJS module loading.
- Written in Typescript with many type hints.
- Reduced bundle size when using webpack v4.  
  - When bundling only SHA256 module, the webpack-ed js file might be less than 6kb,  
    while bundled size with `crypto-js` might be larger than 100kb because webpack v4 cannot eliminate dead codes.
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
```ecmascript 6
// Load whole library modules.
const JsCrypto = require("jscrypto");
console.log(JsCrypto.SHA256.hash("test").toString());
...
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
import JsCrypto from "jscrypto/es6"; // Heavy loading. Not recommended.
console.log(JsCrypto.SHA256.hash("test").toString());
...
import {SHA256} from "jscrypto/es6/SHA256"; // Recommended
console.log(SHA256.hash("test").toString());
```

**Additional note for webpack.config with webpack v5**  
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
import * as JsCrypto from "jscrypto/es6"; // Heavy loading. Not recommended.
console.log(JsCrypto.SHA256.hash("test").toString());
...
import {SHA256} from "jscrypto/es6/SHA256"; // Recommended
console.log(SHA256.hash("test").toString());
```

**Additional note for webpack.config with webpack v5**  
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
**Hash** `MD5`, `SHA1`, `SHA3`, `SHA224`, `SHA256`, `SHA384`, `SHA512`, `RIPEMD160`,  
**Message/Key Hash** `HMAC-MD5`, `HMAC-SHA1`, `HMAC-SHA3`, `HMAC-SHA224`, `HMAC-SHA256`, `HMAC-SHA384`, `HMAC-SHA512`  
**Block Cipher** `AES`, `DES`, `DES3`

### *Basic structure*
**Word** `Word32Array`, `Word64Array`  
**Encoder** [`Base64`](#base64), `Hex`, `Latin1`, `Utf8`, `Utf16`  

### *Misc*
**Stream Cipher** `Rabbits`, `RC4`, `RC4Drop`  
**Key Derive Function** `OpenSSLKDF`, `EvpKDF`, `PBKDF2`  
**Block Cipher mode** `CBC`, `CFB`, `CTR`, `ECB`, `OFB`  
**Block Padding** `AnsiX923`, `ISO10126`, `ISO97971`, `Noop`, `Pkcs7`, `Zero`  
**Formatter** `OpenSSLFormatter`

---

### Word
The basic instance holding binary value.
<h4 id='word32array'>Word32Array</h4>

```js
var w1 = new JsCrypto.Word32Array([0x1234567, 0x89abcdef]); // Array of 32bit words

// Word32Array.toString(encoder?: IEncoder)
w1.toString(); // "0123456789abcdef"
w1.toString(JsCrypto.Hex); // "0123456789abcdef"

var w2 = new JsCrypto.Word32Array([0x1234567, 0x89abcdef], 6); // Second argument is the number of significant bytes
w2.toString(); // "0123456789ab"

var w3 = new JsCrypto.Word32Array([0x01234567, 0x89abcdef]);
w3.toString(JsCrypto.Base64); // "ASNFZ4mrze8="
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
  JsCrypto.Base64.stringify(w); //  "AAAAAA=="

  // Base64.parse
  JsCrypto.Base64.parse("AAAAAA==").toString(); // "00000000"
```
