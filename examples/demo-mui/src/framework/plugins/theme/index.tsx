import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { IPlugin, IPO, ISlots } from "@spax/core";
import { log } from "@spax/debug";
import { setType, useTheme } from "@spax/theme";
import React from "react";

export default {
  name: "Theme",
  deps: ["Router"],
  plug: ({ init, render }: ISlots, { paletteType, overrides }: IPO) => {
    init.tap(() => {
      setType(paletteType);
    });

    render.tap(
      (element: React.ReactNode): React.ReactNode => {
        return <ThemeRoot overrides={overrides}>{element}</ThemeRoot>;
      },
    );
  },
} as IPlugin;

interface ThemeRootProps {
  children: React.ReactNode;
  overrides: Partial<ThemeOptions>;
}

const ThemeRoot = ({ children, overrides }: ThemeRootProps) => {
  const theme = useTheme(overrides);

  if (process.env.NODE_ENV === "development") {
    log("Theme config: %O", theme);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
