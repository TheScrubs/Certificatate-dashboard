const path = require("path");

const config = {
  mode: "development",
  entry: "../client/public/test",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    alias: {
      node_modules: path.join(__dirname, "../", "client", "node_modules"),
    },
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    open: true,
    port: 3003,
    historyApiFallback: true,
    hot: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};

module.exports = config;
