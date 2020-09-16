const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  mode: "development",
  context: __dirname, // to automatically find tsconfig.json
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
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      }
    }),
  ],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {loader: "ts-loader", options: {transpileOnly: true}}
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", "js"],
  },
  output: {
    path: path.resolve(__dirname, "test", "build"),
    filename: "[name].js",
    library: ["JsCrypto", "[name]"],
    libraryExport: "default",
    libraryTarget: "umd",
    globalObject: "this",
  }
};