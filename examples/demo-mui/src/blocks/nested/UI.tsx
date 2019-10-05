import LocalCount from "components/LocalCount";
import React from "react";

export default function UI(props: any): React.ReactElement {
  return (
    <LocalCount title={props.title}>
      {props.greedy ? props.children : props.isExact ? "PLEASE CLICK" : null}
    </LocalCount>
  );
}
