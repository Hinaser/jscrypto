const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    all: "./src/all.ts",
    SHA256: "./src/SHA256.ts",
    MD5: "./src/MD5.ts",
    Hmac: "./src/Hmac.ts",
    HmacSHA256: "./src/HmacSHA256.ts",
    HmacMD5: "./src/HmacMD5.ts",
    lib: "./src/lib/index.ts",
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
