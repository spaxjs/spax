import LocalCounter from "components/LocalCounter";
import React from "react";

export default function UI(props: any): React.ReactElement {
  return (
    <LocalCounter title={props.title}>
      {props.children}
    </LocalCounter>
  );
}
