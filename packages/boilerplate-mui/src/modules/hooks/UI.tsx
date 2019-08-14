import { ArrowBack } from "@material-ui/icons";
import { Carrier } from "@wugui/router";
import React from "react";

export default function UI(props: any) {
  return (
    <Carrier {...props}>
      <ArrowBack fontSize="large" />
      请从左侧菜单进入子模块
      <pre>{`<Carrier {...props}>
  <ArrowBack fontSize="large" />
  请从左侧菜单进入子模块
</Carrier>`}</pre>
    </Carrier>
  );
}
