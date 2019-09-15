import { CssBaseline } from "@material-ui/core";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider } from "@material-ui/styles";
import { IHooks, IPO, TPlugin } from "@spax/core";
import { debug } from "@spax/debug";
import { setType, useTheme } from "@spax/theme";
import React from "react";

export default [
  "Theme",
  ["Router"],
  ({ init, render }: IHooks, { paletteType, overrides }: IPO) => {
    init.tap(() => {
      setType(paletteType);
    });

    render.tap(
      (element: React.ReactNode): React.ReactNode => {
        return <Root overrides={overrides}>{element}</Root>;
      },
    );
  },
] as TPlugin;

interface RootProps { children: React.ReactNode; overrides: Partial<ThemeOptions>; }

const Root: React.FC<RootProps> = ({children, overrides}: RootProps) => {
  const theme = useTheme(overrides);

  if (process.env.NODE_ENV === "development")
    debug("Theme config: %O", theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
