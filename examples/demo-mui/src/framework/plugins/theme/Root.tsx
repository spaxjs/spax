import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { IPO } from "@spax/core";
import { debug } from "@spax/debug";
import React from "react";
import { useTheme } from "./hooks";

export const Root: React.FC<{ option: IPO }> = ({children, option}: any) => {
  const theme = useTheme(option.overrides);

  if (process.env.NODE_ENV === "development")
    debug("Theme config: %O", theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
