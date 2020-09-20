const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    all: "./src/all.ts",
    SHA1: "./src/SHA1.ts",
    SHA224: "./src/SHA224.ts",
    SHA256: "./src/SHA256.ts",
    SHA384: "./src/SHA384.ts",
    SHA512: "./src/SHA512.ts",
    SHA3: "./src/SHA3.ts",
    MD5: "./src/MD5.ts",
    Hmac: "./src/Hmac.ts",
    HmacSHA224: "./src/HmacSHA224.ts",
    HmacSHA256: "./src/HmacSHA256.ts",
    HmacSHA384: "./src/HmacSHA384.ts",
    HmacSHA512: "./src/HmacSHA512.ts",
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
    library: ["JsCrypto"],
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
