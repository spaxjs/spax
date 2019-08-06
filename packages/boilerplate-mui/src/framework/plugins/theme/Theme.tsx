import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { useLayout, useTitle } from "./hooks";

const defaultTheme = createMuiTheme();

export default function Theme(props: any) {
  const Layout = useLayout();

  useTitle(props.option.siteTitle);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Layout option={props.option}>
        {props.children}
      </Layout>
    </ThemeProvider>
  );
}
