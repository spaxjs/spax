import { useGlobalState } from "@spax/hooks";
import React from "react";

export default function GlobalCounter(props: any) {
  const [counter, setCounter] = useGlobalState("GlobalCounter", 0);
  return (
    <h1 onClick={() => setCounter(counter + 1)}>{counter}</h1>
  );
}
