import { green, lime } from "@material-ui/core/colors";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import React from "react";
import Loading from "../components/interaction/Loading";
import store from "../store";

export default {
  version: "0.0.1",
  plugins: {
    i18n: {
      fallbackLng: "zh",
    },
    store,
    layout: {
      logoImage: require("images/logo.png"),
      siteTitle: "spax",
    },
    theme: {
      paletteType: "light",
      overrides: {
        palette: {
          primary: green,
          secondary: lime,
        },
        typography: {
          h1: {
            fontSize: 32,
          },
          h2: {
            fontSize: 28,
          },
          h3: {
            fontSize: 24,
          },
          h4: {
            fontSize: 20,
          },
          h5: {
            fontSize: 16,
          },
          h6: {
            fontSize: 12,
          },
        },
        custom: {
          sidebar: {
            width: 200,
          },
        },
      } as Partial<ThemeOptions>,
    },
    lazy: {
      fallback: <Loading />,
    },
    auth: {
      roleKey: "role",
      Forbidden: require("../components/exception/Forbidden").default,
    },
    router: {
      NotFound: require("../components/exception/NotFound").default,
    },
  },
};
