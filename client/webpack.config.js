const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifestPlugin = require("webpack-pwa-manifest");
const path = require("path");

module.exports = {
  devServer: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  output: {
    filename: "app.bundle.js",
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/assets/logo.png",
    }),
    new WebpackPwaManifestPlugin({
      name: "Dizce Company",
      shortname: "Dizce Company",
      description: "Dizce Company App",
      orientation: "portrait",
      display: "standalone",
      scope: "/",
      theme_color: "#456BD9",
      background_color: "#fff",
      start_url: "/",
      icons: [
        {
          src: path.resolve("src/assets/logo.png"),
          sizes: [96, 128, 192, 256, 384, 512],
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: false,
            },
          },
        ],
      },
    ],
  },
};
