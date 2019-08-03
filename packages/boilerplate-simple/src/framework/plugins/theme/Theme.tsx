import React from "react";
import { useLayout, useTitle } from "./hooks";

export default function Theme(props: any) {
  const Layout = useLayout();

  useTitle(props.option.siteTitle);

  return (
    <Layout option={props.option}>
      {props.children}
    </Layout>
  );
}
