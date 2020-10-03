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
  {
    ...baseConfig("production"),
    entry: {...encoderModuleEntry()},
    output: {...encoderModuleOutput("production")},
  },
];
