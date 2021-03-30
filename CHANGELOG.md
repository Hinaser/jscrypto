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

<!-- [Unreleased]: https://github.com/Hinaser/jscrypto/compare/v0.1.0...v0.1.1 -->
[0.1.0]: https://github.com/Hinaser/jscrypto/compare/v0.0.2...v0.1.0
[0.0.2]: https://github.com/Hinaser/jscrypto/releases/tag/v0.0.2
[0.0.1]: https://github.com/Hinaser/jscrypto/releases/tag/v0.0.1
[0.0.0]: https://github.com/Hinaser/jscrypto/releases/tag/v0.0.0