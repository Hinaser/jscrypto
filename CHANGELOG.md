## [Unreleased]
### Added
- Added CLI executable  
  ```cmd
  Usage: jscrypto <command> [command options]

  <command>: hash|hmac|cipher
  hash: md5, sha1, sha3, sha224, sha256, sha384, sha512, ripemd160
  hmac: hmac-md5, hmac-sha1, hmac-sha224, hmac-sha256, hmac-sha384, hmac-sha512
  cipher: aes, des, des3, rc4

  
  jscrypto <hash> message [-in hex|base64|string] [-out hex|base64]

    default:
      -in: string ... recognize message as utf-8 string
      -out: hex ... output hashed binary as hex string
    example:
      #Output of below 3 examples are the same
      jscrypto sha1 test
      jscrypto sha1 74657374 -in hex
      jscrypto sha1 dGVzdA== -in base64


  jscrypto <hmac> message key [msg hex|base64|string] [-key hex|base64|string] [-out hex|base64]

    default:
      -msg: string ... recognize message as utf-8 string
      -key: string ... recognize key as utf-8 string
      -out: hex ... output hashed binary as hex string
    example:
      #Output of below 3 examples are the same
      jscrypto hmac-sha1 test key
      jscrypto hmac-sha1 74657374 6b6579 -msg hex -key hex
      jscrypto hmac-sha1 dGVzdA== a2V5 -msg base64 -key base64


  jscrypto <cipher> message key [-msg hex|base64|string] [-key hex|base64|string] [-out hex|base64] [-mode cbc|ecb|ofb|cfb] [-pad pkcs7|iso10126|iso97971|ansix923|nopadding] [-kdf pbkdf2|evpkdf]

    default:
      -msg: string ... recognize message as utf-8 string
      -key: string ... recognize key as utf-8 string
      -out: hex ... output hashed binary as hex string
      -mode: cbc ... Code block chaining as block cipher mode
      -pad: pkcs7 ... Pkcs7 padding as block padding
      -kdf: pbkdf2 ... PBKDF2 as key derivation function
    example:
      #Output of below 3 examples are the same
      jscrypto aes test key
      jscrypto aes 74657374 6b6579 -msg hex -key hex
      jscrypto aes dGVzdA== a2V5 -msg base64 -key base64

  ```
- Added HmacSHA1 (`jscrypto/HmacSHA1`, `jscrypto/es6/HmacSHA1`)

## [0.0.2] - 2021-03-28
### Changed
- Removed typescript source file from npm package to reduce package size.
- Word32Array can be initialized/cloned by `new Word32Array(anotherWord32Array)`.

### Fixed
- Added missing kdf modules(`jscrypto/EvpKDF`, `jscrypto/PBKDF2`, `jscrypto/OpenSSLKDF`).

## [0.0.1] - 2021-03-23
### Fixed
- Fixed an issue where encoder/kdf modules have the different loading path.  
  ```html
  <!-- BEFORE THIS FIX -->
  <!-- Load from index.js -->
  <script src="dist/index.js"></script>
  var word = JsCrypto.Hex.parse("00112233");
  <!-- Load from individual modules -->
  <script src="dist/encoder/Hex.js"></script>
  var word = JsCrypto.encode.Hex.parse("00112233");
  
  <!-- AFTER THIS FIX -->
  <script src="dist/Hex.js"></script>
  var word = JsCrypto.Hex.parse("00112233");
  ```
- Fixed an issue where loading multiple modules in browser only preserves the last module.
   ```html
  <script src="dist/AES.js"></script>
  <script src="dist/DES.js"></script>
  // OK
  var word1 = JsCrypto.DES.encrypt("message", "key");
  // ERROR
  var word2 = JsCrypto.AES.encrypt("message", "key");
   ```

## [0.0.0] - 2021-03-21
Initial release.

<!-- [Unreleased]: https://github.com/Hinaser/jscrypto/compare/v0.1.0...v0.1.1 -->
[Unreleased]: https://github.com/Hinaser/jscrypto/compare/v0.0.2...v0.1.0
[0.0.2]: https://github.com/Hinaser/jscrypto/releases/tag/v0.0.2
[0.0.1]: https://github.com/Hinaser/jscrypto/releases/tag/v0.0.1
[0.0.0]: https://github.com/Hinaser/jscrypto/releases/tag/v0.0.0