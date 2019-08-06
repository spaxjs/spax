import LocalCount from "components/LocalCount";
import React, { ReactElement } from "react";

function UI(props: any): ReactElement<void> {
  return (
    <LocalCount title={props.title || props.meta.title}>
      {props.renderChildModules()}
    </LocalCount>
  );
}

export default {
  path: "c2",
  title: "C2",
  component: UI,
  modules: [
    import("../c1/modules/c1"),
    import("../c1/modules/c2"),
  ],
};