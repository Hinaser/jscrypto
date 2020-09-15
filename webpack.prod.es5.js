const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    all: "./src/all.ts",
    SHA256: "./src/main/hash/SHA256.ts",
    MD5: "./src/main/hash/MD5.ts",
    HMAC: "./src/main/hash/HMAC.ts",
    HMACSHA256: "./src/main/hash/HMACSHA256.ts",
    HMACMD5: "./src/main/hash/HMACMD5.ts",
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
    filename: "[name].js",
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
