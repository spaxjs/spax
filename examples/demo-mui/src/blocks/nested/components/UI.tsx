import { MatchedChildBockOrChildren } from "@spax/router";
import LocalCount from "components/LocalCount";
import React, { ReactElement } from "react";

export default function UI(props: any): ReactElement<void> {
  return (
    <LocalCount title={props.title}>
      <MatchedChildBockOrChildren {...props} />
    </LocalCount>
  );
}
