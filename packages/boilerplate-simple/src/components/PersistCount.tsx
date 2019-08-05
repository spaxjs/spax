import { usePersistState } from "@wugui/hooks";
import { Box, Button } from "grommet";
import React, { ReactElement } from "react";

export default function GlobalCount(props: any): ReactElement<void> {
  const [count, setCount] = usePersistState("count", 0);
  return (
    <Box className={props.className} title={props.meta.title}>
      <Button
        className="minus"
        onClick={() => setCount(prevCount => prevCount - 1)}
      >
        -
      </Button>
      {count}
      <Button
        className="plus"
        onClick={() => setCount(prevCount => prevCount + 1)}
      >
        +
      </Button>
    </Box>
  );
}
