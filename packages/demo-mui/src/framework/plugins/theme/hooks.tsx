import { Hidden } from "@material-ui/core";
import { green, lime } from "@material-ui/core/colors";
import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { useGlobalState } from "@spax/hooks";
import { useT } from "@spax/i18n";
import { useMatchedArrayOfBlockAndParams } from "@spax/router";
import { recursive } from "merge";
import React, { useEffect, useMemo } from "react";

export function useLayout(): React.FC<{ option: any }> {
  const matched = useMatchedArrayOfBlockAndParams();

  if (matched && matched[0] && matched[0][0]) {
    return matched[0][0].layout === "blank"
      ? require("./layouts/Blank").default
      : require("./layouts/Admin").default;
  }

  // 模块未匹配到，等待……，但是需要将 children 下传，否则无法触发匹配
  return ({ children }) => (<Hidden>{children}</Hidden>);
}

export function useTitle(fallback: string): void {
  const matched = useMatchedArrayOfBlockAndParams();
  const { t } = useT();

  useEffect(() => {
    document.title = matched
      .filter(([{ title, path }]) => Boolean(title) && path !== "/" )
      .map(([{ title }]) => t(title))
      .reverse()
      .concat(fallback)
      .join(" - ");
    // reset the title
    return () => {
      document.title = fallback;
    };
  }, [fallback, matched, t]);
}

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
