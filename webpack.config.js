const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "public/index.html"),
  filename: "./index.html"
});
module.exports = {
  entry: path.join(__dirname, "src/index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
            plugins: [
              "@babel/plugin-transform-react-jsx",
              "@babel/plugin-proposal-class-properties"
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    htmlWebpackPlugin,
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          src: "./src"
        }
      }
    ]
  ],

  resolve: {
    alias: {
      src: path.resolve("./src"),
      src: path.resolve(__dirname, "src/")
    },
    extensions: [".js", ".jsx"]
  },

  devServer: {
    port: 3004
  }
};
