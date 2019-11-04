import { green, lime } from "@material-ui/core/colors";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { IOptions } from "@spax/core";
import React from "react";
import Loading from "../components/interaction/Loading";

export default {
  i18n: {
    fallbackLng: "zh",
  },
  layout: {
    logoImage: require("images/logo.png"),
    siteTitle: "Spax",
  },
  theme: {
    paletteType: "light",
    overrides: {
      palette: {
        primary: Object.assign(green, {
          contrastText: "#ffffff",
        }),
        secondary: Object.assign(lime, {
          contrastText: green[500],
        }),
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
    useAuth: function useAuth(authority: string[]) {
      return true;
    },
    Forbidden: require("../components/exception/Forbidden").default,
  },
  router: {
    NotFound: require("../components/exception/NotFound").default,
  },
} as IOptions;
