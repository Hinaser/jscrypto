const {
  baseConfig,
  mainEntry,
  mainOutput,
  modeModuleEntry,
  modeModuleOutput,
  padModuleEntry,
  padModuleOutput,
  encoderModuleEntry,
  encoderModuleOutput,
} = require("./webpack.common");

module.exports = [
  {
    ...baseConfig(),
    entry: {...mainEntry()},
    output: {...mainOutput()},
  },
  {
    ...baseConfig(),
    entry: {...modeModuleEntry()},
    output: {...modeModuleOutput()},
  },
  {
    ...baseConfig(),
    entry: {...padModuleEntry()},
    output: {...padModuleOutput()},
  },
  {
    ...baseConfig(),
    entry: {...encoderModuleEntry()},
    output: {...encoderModuleOutput()},
  },
];
