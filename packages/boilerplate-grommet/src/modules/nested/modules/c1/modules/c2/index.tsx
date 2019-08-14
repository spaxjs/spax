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
  path: "c2",
  title: "C2",
  component: UI,
};
