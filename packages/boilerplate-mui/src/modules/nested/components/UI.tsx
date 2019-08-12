import { useMatchedChild } from "@wugui/router";
import LocalCount from "components/LocalCount";
import React, { ReactElement } from "react";

export default function UI(props: any): ReactElement<void> {
  const MatchedChild = useMatchedChild(props);

  return (
    <LocalCount title={props.title}>
      <MatchedChild />
    </LocalCount>
  );
}
