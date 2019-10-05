import { green, lime } from "@material-ui/core/colors";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { IOptions } from "@spax/framework";
import { useGlobalState } from "@spax/hooks";
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
        const [role] = useGlobalState<string>("role");
        return hasAuth(role, authority);
      },
      Forbidden: require("../components/exception/Forbidden").default,
    },
    router: {
      NotFound: require("../components/exception/NotFound").default,
    },
  },
} as IOptions;

function hasAuth(role: string, authority: string[]): boolean {
  if (authority.length === 0) {
    return true;
  }
  if (!role) {
    return false;
  }
  return authority.indexOf(role) !== -1;
}
