import { Carrier } from "@wugui/router";
import LocalCount from "components/LocalCount";
import React, { ReactElement } from "react";

export default function UI(props: any): ReactElement<void> {
  // 如果当前路由指向子孙，则只显示子孙
  // 如果有子孙，则显示子孙
  return (
    <LocalCount title={props.title}>
      <Carrier greedy {...props} />
    </LocalCount>
  );
}
