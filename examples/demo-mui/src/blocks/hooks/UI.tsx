import { ArrowBack } from "@material-ui/icons";
import { MatchedChildBockOrChildren } from "@spax/router";
import React from "react";

const code = `<MatchedChildBockOrChildren {...props}>
  <ArrowBack fontSize="large" />
  请从左侧菜单进入子模块
</MatchedChildBockOrChildren>`;

export default function UI(props: any) {
  return (
    <MatchedChildBockOrChildren {...props}>
      <ArrowBack fontSize="large" />
      请从左侧菜单进入子模块
      <pre>{code}</pre>
    </MatchedChildBockOrChildren>
  );
}
