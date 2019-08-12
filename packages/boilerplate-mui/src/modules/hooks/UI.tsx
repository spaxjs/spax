import { ArrowBack } from "@material-ui/icons";
import { useExact, useMatchedChild } from "@wugui/router";
import React from "react";

export default function UI(props: any) {
  const exact = useExact(props);
  const MatchedChild = useMatchedChild(props);

  return exact ? (
    <>
      <ArrowBack fontSize="large" />
      请从左侧菜单进入子模块
      <pre>{`const exact = useExact(props);
const MatchedChild = useMatchedChild(props);

return exact ? (
  <>
    <ArrowBack fontSize="large" />
    请从左侧菜单进入子模块
  </>
) : <MatchedChild />`}</pre>
    </>
  ) : <MatchedChild />;
}
