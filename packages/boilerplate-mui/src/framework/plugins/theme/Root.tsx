import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { IPO } from "@wugui/core";
import { debug } from "@wugui/debug";
import React from "react";
import DocumentTitle from "./DocumentTitle";
import { useLayout } from "./hooks";
import getTheme from "./theme";

const Root: React.FC<{ option: IPO }> = (props: any) => {
  const Layout = useLayout();

  const theme = getTheme("light");

  if (process.env.NODE_ENV === "development")
    debug("Theme config: %O", theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DocumentTitle fallback={props.option.siteTitle} />
      <Layout option={props.option}>
        {props.children}
      </Layout>
    </ThemeProvider>
  );
};

export default Root;
