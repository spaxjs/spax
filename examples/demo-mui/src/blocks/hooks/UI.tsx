import { ArrowBack } from "@material-ui/icons";
import React from "react";

const code = `<>
  <ArrowBack fontSize="large" />
  请从左侧菜单进入子模块
</>`;

export default function UI(props: any) {
  return (
    <>
      {props.description}
      <ArrowBack fontSize="large" />
      请从左侧菜单进入子模块
      <pre>{code}</pre>
      {props.children}
    </>
  );
}
