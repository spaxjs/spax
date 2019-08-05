import { useGlobalState } from "@wugui/hooks";
import { Box, Button } from "grommet";
import { Refresh } from "grommet-icons";
import React, { ReactElement } from "react";

export default function GlobalCount(props: any): ReactElement<void> {
  const [count, setCount, resetCount] = useGlobalState("count");
  return (
    <Box className={props.className} title={props.meta.title}>
      <Button
        className="minus"
        onClick={() => setCount(prevCount => prevCount - 1)}
      >
        -
      </Button>
      {count}
      <Box round="full">
        <Refresh onClick={resetCount} />
      </Box>
      <Button
        className="plus"
        onClick={() => setCount(prevCount => prevCount + 1)}
      >
        +
      </Button>
    </Box>
  );
}
