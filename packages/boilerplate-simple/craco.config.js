// const { blue, red, gold } = require("@ant-design/colors");
const path = require("path");

const getAliasForCommonLibraries = (modules) => {
  return modules.reduce((obj, name) => {
    return Object.assign(obj, {
      [name]: path.resolve(__dirname, "node_modules", name),
    });
  }, {});
};

module.exports = {
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          if (!webpackConfig.resolve) webpackConfig.resolve = {};
          if (!webpackConfig.resolve.alias) webpackConfig.resolve.alias = {};
          Object.assign(webpackConfig.resolve.alias, getAliasForCommonLibraries([
            "react",
            "react-dom",
            "react-hot-loader",
            "@types/node",
            "@types/react",
            "@types/react-dom",
          ]));

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
    },
    {
      plugin: require("craco-antd"),
      options: {
        customizeTheme: {
          // "@layout-body-background": "#171717",
          // "@background-color-base": "#262626",
          // "@body-background": "#404041",
          // "@layout-sider-background": "#171F22",
          // "@component-background": "#171F22",
          // "@layout-header-background": "#171F22",
          // "@menu-dark-submenu-bg": "#171F22",
          // "@input-bg": "#313133",
          // "@btn-default-bg": "#262626",
          // "@border-color-base": "rgba(255, 255, 255, 0.25)",
          // "@border-color-split": "#363636",
          // "@heading-color": "#E3E3E3",
          // "@text-color": "#E3E3E3",
          // "@text-color-secondary": "fade(#fff, 65%)",
          // "@table-selected-row-bg": "#3a3a3a",
          // "@table-expanded-row-bg": "#3b3b3b",
          // "@table-header-bg": "#3a3a3b",
          // "@table-row-hover-bg": "#3a3a3b",
          // "@layout-trigger-color": "fade(#fff, 80%)",
          // "@layout-trigger-background": "#313232",
          // "@alert-message-color": "fade(#000, 67%)",
          // "@item-hover-bg": `fade(${blue[5]}, 20%)`,
          // "@item-active-bg": `fade(${blue[5]}, 40%)`,
          // "@disabled-color": "rgba(255, 255, 255, 0.25)",
          // "@tag-default-bg": "#262628",
          // "@popover-bg": "#262629",
          // "@wait-icon-color": "fade(#fff, 64%)",
          // "@background-color-light": `fade(${blue[5]}, 40%)`,
          // "@collapse-header-bg": "#262629",
          // "@info-color": "#313133",
          // "@highlight-color": red[7],
          // "@warning-color": gold[9],
          "@primary-color": "#52C41A"
        },
        lessLoaderOptions: {
          noIeCompat: true
        }
      }
    }
  ]
};
