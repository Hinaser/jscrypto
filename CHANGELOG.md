<!--
## [1.0.0]
### Changed
- Pass initializing vector as Word32Array to constructor of BlockCipherMode instead of just a 32bit number array.  
  \*This may enable developers to use non-32bit-aligned iv value to block cipher mode in future release.  
  \*This change may not be breaking lib compatibility unless developers directly instantiate BlockCipherMode or  
    creating original BlockCipherMode extending old BlockCipherMode class.
- Calculating authTag in GCM/CCM now requires developer to manually call authTag function.  
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
  const authTag = GCM.hash(AES, key, iv, authData, encrypted.cipherText);
  
  //////////////////////
  // AES-CCM
  //////////////////////
  // BEFORE
  const encrypted = AES.encrypt(msg, key, { iv, mode: CCM, padding: NoPadding, authData });
  encrypted.authTag !== undefined; // This returns true. authTag is automatically calculated on encryption.

  // AFTER
  const encrypted = AES.encrypt(msg, key, { iv, mode: CCM, padding: NoPadding, authData });
  encrypted.authTag === undefined; // This returns true. authTag must be manually calculated as below.
  const authTag = CCM.hash(AES, key, iv, authData, msg); // Note: CCM requires original plaintext to get authTag.
  ```
-->
## [0.2.1]
### Added
- CCM block cipher mode (Counter mode/CBC-MAC)  
  **Note**  
  At this version, length of Nonce(iv) is fixed to (recognized as) 8bytes.  
  Thus max byte length of Payload is the one which can be represented in 7bytes. (=2^56-1 byte)

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
[0.2.1]: https://github.com/Hinaser/jscrypto/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/Hinaser/jscrypto/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Hinaser/jscrypto/compare/v0.0.2...v0.1.0
[0.0.2]: https://github.com/Hinaser/jscrypto/releases/tag/v0.0.2
[0.0.1]: https://github.com/Hinaser/jscrypto/releases/tag/v0.0.1
[0.0.0]: https://github.com/Hinaser/jscrypto/releases/tag/v0.0.0