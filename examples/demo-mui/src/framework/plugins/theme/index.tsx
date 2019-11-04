import { CssBaseline } from "@material-ui/core";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { IHooks, IOption, IPlugin } from "@spax/core";
import { log } from "@spax/debug";
import { useTheme } from "@spax/theme";
import React from "react";

export default {
  name: "Theme",
  deps: ["Router"],
  plug: (
    { render }: IHooks,
    { overrides }: IOption,
  ) => {
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
