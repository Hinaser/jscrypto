const {
  baseConfig,
  mainEntry,
  mainOutput,
  modeModuleEntry,
  modeModuleOutput,
  padModuleEntry,
  padModuleOutput,
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
  },
  {
    ...baseConfig("production"),
    entry: {...padModuleEntry()},
    output: {...padModuleOutput("production")},
  },
];
