# Changelog

## [1.0.2] - 2021-07-08
### Fixed
- Fixed an issue where invalid Hex string could be parsed without error.  
  For example, invalid Hex string `1g` was recognized as `0x01`.

## [1.0.1] - 2021-06-20
### Fixed
- Fixed an issue where building jscrypto with webpack shows warning messages like below:  
  `Critical dependency: the request of a dependency is an expression`

## [1.0.0] - 2021-04-22
### Added
- Added [CCM block cipher mode (Counter mode/CBC-MAC)](https://github.com/Hinaser/jscrypto/blob/master/API.md#ccm)  
  https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38c.pdf
- Added [CBC-MAC](https://github.com/Hinaser/jscrypto/blob/master/API.md#cbc-mac)
- Added tag length option to [GMAC](https://github.com/Hinaser/jscrypto/blob/master/API.md#gmac) and [GCM](https://github.com/Hinaser/jscrypto/blob/master/API.md#gcm)
- Exposed `CipherParams` class to public.

### Changed
**Small breaking change**
- Pass initializing vector as Word32Array to constructor of BlockCipherMode instead of just a 32bit number array.  
  \*This may enable developers to use non-32bit-aligned iv value to block cipher mode in future release.  
  \*This change may not be breaking lib compatibility unless developers directly instantiate BlockCipherMode or  
    creating original BlockCipherMode extending old BlockCipherMode class.
  ```js
  // BEFORE
  const gcm = new GCM({cipher: AES, iv: [0x11223344]});
  
  // AFTER
  const gcm = new GCM({cipher: AES, iv: new Word32Array([0x11223344], 4)});
  ```

**Breaking change**
- Changed GMAC hash function name from `GCM.hash()` to `GCM.mac()`.
- Calculating authTag in GCM now requires developer to manually call authTag function.  
  Encryption/Decryption and MAC Generation are now calculated independently.
  ```js
  //////////////////////
  // AES-GCM
  //////////////////////
  // BEFORE
  const encrypted = AES.encrypt(msg, key, { iv, mode: GCM, padding: NoPadding, authData });
  encrypted.authTag !== undefined; // This returns true. authTag is automatically calculated on encryption.

  // AFTER
  const encrypted = AES.encrypt(msg, key, { iv, mode: GCM, padding: NoPadding, authData });
  encrypted.authTag === undefined; // This returns true. authTag must be manually calculated as below.
  const authTag = GCM.mac(AES, key, iv, authData, encrypted.cipherText);
  ```

## [0.2.0] - 2021-04-07
### Added
- Added GCM block cipher mode. (Galois Counter Mode)
- Added GMAC (Galois Message Authentication Code)

## [0.1.0] - 2021-03-30
### Added
- Added CLI executable  
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

<!-- [Unreleased]: https://github.com/Hinaser/jscrypto/compare/v0.1.0...v0.2.0 -->
[1.0.2]: https://github.com/Hinaser/jscrypto/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/Hinaser/jscrypto/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Hinaser/jscrypto/compare/v0.2.0...v1.0.0
[0.2.0]: https://github.com/Hinaser/jscrypto/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Hinaser/jscrypto/compare/v0.0.2...v0.1.0
[0.0.2]: https://github.com/Hinaser/jscrypto/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/Hinaser/jscrypto/compare/v0.0.0...v0.0.1
[0.0.0]: https://github.com/Hinaser/jscrypto/compare/tag/v0.0.0