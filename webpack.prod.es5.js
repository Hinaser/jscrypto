const {
  baseConfig,
  mainEntry,
  mainOutput,
  modeModuleEntry,
  modeModuleOutput,
} = require("./webpack.common");

module.exports = [
  {
    ...baseConfig("production"),
    entry: {...mainEntry()},
    output: {...mainOutput("production")},
  },
  {
    ...baseConfig("production"),
    entry: {...modeModuleEntry()},
    output: {...modeModuleOutput("production")},
  }
];
