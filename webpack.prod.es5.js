const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    SHA256: "./src/sha256.ts",
    HMAC: "./src/hmac.ts",
    HMACSHA256: "./src/hmac-sha256.ts",
    Lib: "./src/lib/index.ts",
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {loader: "ts-loader", options: {transpileOnly: true, configFile: "tsconfig.es5.json"}}
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", "js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].es5.min.js",
    library: ["JsCrypto", "[name]"],
    libraryExport: "default",
    libraryTarget: "umd",
    globalObject: "this",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: {
            properties: {
              regex: /^_.+/,
            }
          },
        }
      }),
    ]
  }
};
