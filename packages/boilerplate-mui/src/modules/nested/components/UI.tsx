import { useChild } from "@wugui/router";
import LocalCount from "components/LocalCount";
import React, { ReactElement } from "react";

export default function UI(props: any): ReactElement<void> {
  const MatchedChild = useChild(props);

  return (
    <LocalCount title={props.title}>
      <MatchedChild />
    </LocalCount>
  );
}
