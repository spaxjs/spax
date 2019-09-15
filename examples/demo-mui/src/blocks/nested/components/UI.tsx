import { MatchedChildBockOrChildren } from "@spax/router";
import LocalCount from "components/LocalCount";
import React from "react";

export default function UI(props: any): React.ReactElement {
  return (
    <LocalCount title={props.title}>
      <MatchedChildBockOrChildren {...props} />
    </LocalCount>
  );
}
