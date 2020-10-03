const path = require("path");
// const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

exports.mainEntry = () => {
  return {
    lib: "./src/lib/index.ts",
    all: "./src/all.ts",
    Word32Array: "./src/Word32Array.ts",
    Word64Array: "./src/Word64Array.ts",
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
    AES: "./src/AES.ts",
    DES: "./src/DES.ts",
  };
};

exports.mainOutput = (isProd) => {
  return {
    path: isProd ? path.resolve(__dirname, "dist") : path.resolve(__dirname, "test", "build"),
    filename: "[name].js",
    library: ["JsCrypto"],
    libraryTarget: "umd",
    globalObject: "this",
  };
};

exports.modeModuleEntry = () => {
  return {
    CBC: "./src/mode/CBC.ts",
    CFB: "./src/mode/CFB.ts",
    CTR: "./src/mode/CTR.ts",
    ECB: "./src/mode/ECB.ts",
    OFB: "./src/mode/OFB.ts",
  };
};

exports.modeModuleOutput = (isProd) => {
  return {
    path: isProd ? path.resolve(__dirname, "dist", "mode") : path.resolve(__dirname, "test", "build", "mode"),
    filename: "[name].js",
    library: ["JsCrypto", "mode"],
    libraryTarget: "umd",
    globalObject: "this",
  };
};

exports.padModuleEntry = () => {
  return {
    AnsiX923: "./src/pad/AnsiX923.ts",
    ISO10126: "./src/pad/ISO10126.ts",
    ISO97971: "./src/pad/ISO97971.ts",
    Pkcs7: "./src/pad/Pkcs7.ts",
    Noop: "./src/pad/Noop.ts",
    Zero: "./src/pad/Zero.ts",
  };
};

exports.padModuleOutput = (isProd) => {
  return {
    path: isProd ? path.resolve(__dirname, "dist", "pad") : path.resolve(__dirname, "test", "build", "pad"),
    filename: "[name].js",
    library: ["JsCrypto", "pad"],
    libraryTarget: "umd",
    globalObject: "this",
  };
};

exports.encoderModuleEntry = () => {
  return {
    Base64: "./src/encoder/Base64.ts",
    Hex: "./src/encoder/Hex.ts",
    Latin1: "./src/encoder/Latin1.ts",
    Utf8: "./src/encoder/Utf8.ts",
  };
};

exports.encoderModuleOutput = (isProd) => {
  return {
    path: isProd ? path.resolve(__dirname, "dist", "encoder") : path.resolve(__dirname, "test", "build", "encoder"),
    filename: "[name].js",
    library: ["JsCrypto", "encoder"],
    libraryTarget: "umd",
    globalObject: "this",
  };
};



exports.baseConfig = (isProd) => {
  return {
    mode: isProd ? "production" : "development",
    context: __dirname, // to automatically find tsconfig.json
    plugins: isProd ? [/*new CleanWebpackPlugin()*/] : [
      // new CleanWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          files: './src/**/*.{ts,tsx,js,jsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
        }
      }),
    ],
    devtool: isProd ? undefined : "source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {loader: "ts-loader", options: {transpileOnly: true, configFile: isProd ? "tsconfig.es5.json" : "tsconfig.json"}},
          ],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", "js"],
    },
    optimization: isProd ? {
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
    } : undefined,
  };
};
