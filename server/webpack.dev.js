const path = require('path');

module.exports = {
  entry: "./index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js",
    clean: true,
  },
  target: "node",
  mode: 'development',
  resolve: {
    extensions: [".js", ".jsx"],
    fallback: {
        "mock-aws-s3": false,
        "pg-hstore": false,
        "nock": false,
        "aws-sdk": false,
        "bufferutil": false,
        "utf-8-validate":false
      },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
};