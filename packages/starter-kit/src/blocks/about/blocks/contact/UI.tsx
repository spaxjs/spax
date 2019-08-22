import React, { ReactNode } from "react";

export default function UI(props: any): ReactNode {
  return (
    <h1>
      {props.title}
    </h1>
  );
}
