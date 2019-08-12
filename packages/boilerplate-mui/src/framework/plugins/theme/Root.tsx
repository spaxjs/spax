import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { debug } from "@wugui/utils";
import React from "react";
import { useLayout, useTitle } from "./hooks";
import getTheme from "./theme";

export default function Root(props: any) {
  const Layout = useLayout();

  useTitle(props.option.siteTitle);

  const theme = getTheme("light");

  if (process.env.NODE_ENV === "development")
    debug("Theme config: %O", theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout option={props.option}>
        {props.children}
      </Layout>
    </ThemeProvider>
  );
}
