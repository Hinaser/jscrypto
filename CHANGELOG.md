##[Unreleased]
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

## [0.0.0] - 2021-03-21
Initial release.

[Unreleased]: https://github.com/Hinaser/jscrypto/compare/v0.0.0...v0.0.1
[0.0.0]: https://github.com/Hinaser/jscrypto/releases/tag/v0.0.0