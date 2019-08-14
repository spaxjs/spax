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

export default {
  path: "c1",
  title: "C1",
  component: UI,
  modules: [{
    path: "",
    title: "C1",
    component: UI,
  }],
};
