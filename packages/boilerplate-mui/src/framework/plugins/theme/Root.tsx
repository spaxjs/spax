import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { IPO } from "@wugui/core";
import { debug } from "@wugui/debug";
import React from "react";
import { DocumentTitle } from "./components/DocumentTitle";
import { Layout } from "./Layout";
import getTheme from "./theme";

export const Root: React.FC<{ option: IPO }> = ({children, option}: any) => {
  const theme = getTheme("light");

  if (process.env.NODE_ENV === "development")
    debug("Theme config: %O", theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DocumentTitle fallback={option.siteTitle} />
      <Layout option={option}>
        {children}
      </Layout>
    </ThemeProvider>
  );
};
