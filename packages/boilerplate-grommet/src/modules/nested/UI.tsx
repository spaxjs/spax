import LocalCount from "components/LocalCount";
import React, { ReactElement } from "react";

export default function UI(props: any): ReactElement<void> {
  // 如果当前路由指向子孙，则只显示子孙
  return props.exact ? (
    <LocalCount title={props.title || props.meta.title} />
  ) : props.renderChildModules();
}
