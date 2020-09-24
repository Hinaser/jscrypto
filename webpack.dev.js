const {
  baseConfig,
  mainEntry,
  mainOutput,
  modeModuleEntry,
  modeModuleOutput,
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
  }
];
