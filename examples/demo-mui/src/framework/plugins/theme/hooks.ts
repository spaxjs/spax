import { green, lime } from "@material-ui/core/colors";
import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { useGlobalState } from "@spax/hooks";
import { recursive } from "merge";
import { useMemo } from "react";

export function useTheme(overrides: Partial<Theme> = {}) {
  const [ type ] = useGlobalState<"light" | "dark">("theme-type");
  return useMemo(() => {
    const raw = createMuiTheme({
      palette: {
        type,
        primary: green,
        secondary: lime,
      },
    });

    return recursive(raw, {
      palette: {
        primary: {
          contrastText: "#ffffff",
        },
        secondary: {
          contrastText: raw.palette.primary.main,
        },
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
    }, overrides);
  }, [type, overrides]);
}
