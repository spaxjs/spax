import { useMatchedChild } from "@wugui/router";
import LocalCount from "components/LocalCount";
import React, { ReactElement } from "react";

function UI(props: any): ReactElement<void> {
  return (
    <LocalCount title={props.title}>
      {useMatchedChild(props)}
    </LocalCount>
  );
}

export default {
  path: "c1",
  title: "C1",
  // description: "C1 from Nested",
  component: UI,
  modules: [
    import("./modules/c0"),
    import("./modules/c1"),
    import("./modules/c2"),
  ],
};
