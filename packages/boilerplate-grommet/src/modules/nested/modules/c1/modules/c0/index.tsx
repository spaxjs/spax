import { useChild } from "@wugui/router";
import LocalCount from "components/LocalCount";
import React, { ReactElement } from "react";

function UI(props: any): ReactElement<void> {
  return (
    <LocalCount title={props.title}>
      {useChild(props)}
    </LocalCount>
  );
}

/**
 * path 为空字符串，
 * 表示与父级拥有同样的 path，
 * 意味着会一同显示。
 */
export default {
  path: "",
  title: "C0",
  component: UI,
  modules: [{
    path: "",
    title: "C0",
    component: UI,
    modules: [{
      path: "",
      title: "C0",
      component: UI,
    }],
  }],
};
