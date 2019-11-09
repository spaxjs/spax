import React from "react";

export default function UI(props: any): React.ReactNode {
  return (
    <pre>{props.description}</pre>
  );
}
