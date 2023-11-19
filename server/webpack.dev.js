const path = require('path');

module.exports = {
  entry: "./index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist-dev"),
    publicPath: "/",
    filename: "[name].js",
    clean: true,
  },
  target: "node",
  mode: 'development',
  resolve: {
    extensions: [".js"],
    fallback: {
        "mock-aws-s3": false,
        "pg-hstore": false,
        "nock": false,
        "aws-sdk": false,
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