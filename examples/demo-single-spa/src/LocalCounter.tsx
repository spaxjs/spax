import React from "react";

export default function GlobalCounter(props: any) {
  const [counter, setCounter] = React.useState(0);
  return (
    <h1 onClick={() => setCounter(counter + 1)}>{counter}</h1>
  );
}
