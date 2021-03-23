const {
  baseConfig,
  mainEntry,
  mainOutput,
  modeModuleEntry,
  modeModuleOutput,
  padModuleEntry,
  padModuleOutput,
  formatterModuleEntry,
  formatterModuleOutput,
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
    entry: {...formatterModuleEntry()},
    output: {...formatterModuleOutput()},
  },
];
