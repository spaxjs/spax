import { useExact, useMatchedChild } from "@wugui/plugin-router";
import LocalCount from "components/LocalCount";
import React, { ReactElement } from "react";

export default function UI(props: any): ReactElement<void> {
  const exact = useExact(props);
  const MatchedChild = useMatchedChild(props);

  // 如果当前路由指向子孙，则只显示子孙
  return exact ? (
    <LocalCount title={props.title} />
  ) : <MatchedChild />;
}
