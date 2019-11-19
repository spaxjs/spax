const path = require("path");
const { override, babelInclude, addWebpackAlias } = require("customize-cra");

const resolve = (...dest) => {
  return path.resolve(__dirname, ...dest);
};

const getAliasForCommonLibraries = (modules) => {
  return modules.reduce((obj, name) => {
    return Object.assign(obj, {
      [name]: resolve("node_modules", name),
    });
  }, {});
};

module.exports = override(
  babelInclude([
    resolve("src"), // make sure you link your own source
    // resolve("node_modules", "@spax"),
  ]),
  addWebpackAlias(getAliasForCommonLibraries([
    "react",
    "react-dom",
    "react-hot-loader",
    "react-router-dom",
    "@types/node",
    "@types/react",
    "@types/react-dom",
    "@types/react-router-dom"
  ])),
);
