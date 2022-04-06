/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const ZipPlugin = require("zip-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

const config = {
  //what are the entry points to our functions
  entry: {
    RecipeCreateUpdate:
      "./artifacts/compiled-ts/lambdas/recipes/create-update.js",
    RecipeDelete: "./artifacts/compiled-ts/lambdas/recipes/delete.js",
    RecipeGetById: "./artifacts/compiled-ts/lambdas/recipes/get-by-id.js",
    RecipeGetByUser: "./artifacts/compiled-ts/lambdas/recipes/get-by-user.js",
    UserCreateUpdate: "./artifacts/compiled-ts/lambdas/users/create-update.js",
    UserGet: "./artifacts/compiled-ts/lambdas/users/get.js",
  },
  //how we want the output
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "artifacts/built-lambdas/js"),
    libraryTarget: "umd",
  },
  target: "node",
  mode: "production",
  optimization: { minimize: true },
};
//finally zip the output directory, ready to deploy
const pluginConfig = {
  plugins: Object.keys(config.entry).map((entryName) => {
    return new ZipPlugin({
      path: path.resolve(__dirname, "artifacts/built-lambdas/zip"),
      filename: entryName,
      extension: "zip",
      include: [entryName],
    });
  }),
};

pluginConfig.plugins.push(new Dotenv());

const webpackConfig = Object.assign(config, pluginConfig);
module.exports = webpackConfig;
