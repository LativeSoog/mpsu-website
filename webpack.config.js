const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.js",
  mode: isProduction ? "production" : "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/", // Добавлено
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [isProduction ? MiniCssExtractPlugin.loader : "style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: [isProduction ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"],
      },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset/resource" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 8080,
  },
};
