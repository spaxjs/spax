const path = require("path");
const { whenProd } = require("@craco/craco");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const getAliasForCommonLibraries = (modules) => {
  return modules.reduce((obj, name) => {
    return Object.assign(obj, {
      [name]: path.resolve(__dirname, "node_modules", name)
    });
  }, {});
};

module.exports = {
  webpack: {
    plugins: whenProd(() => [new BundleAnalyzerPlugin()], [])
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          if (!webpackConfig.resolve) webpackConfig.resolve = {};
          if (!webpackConfig.resolve.alias) webpackConfig.resolve.alias = {};
          Object.assign(
            webpackConfig.resolve.alias,
            getAliasForCommonLibraries([
              "react",
              "react-dom",
              "react-hot-loader",
              "@types/node",
              "@types/react",
              "@types/react-dom"
            ])
          );

          if (!webpackConfig.module) webpackConfig.module = {};
          if (!webpackConfig.module.rules) webpackConfig.module.rules = [];
          webpackConfig.module.rules.unshift({
            test: /\.js$/,
            use: ["source-map-loader"],
            enforce: "pre"
          });

          return webpackConfig;
        }
      }
    }
  ]
};
