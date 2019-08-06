import { useGlobalState } from "@wugui/hooks";
import { Box, Button, Heading } from "grommet";
import { Add, Refresh, Subtract } from "grommet-icons";
import React, { ReactElement } from "react";

export default function GlobalCount(props: any): ReactElement<void> {
  const [count, setCount, resetCount] = useGlobalState("count");
  return (
    <Box className={props.className}>
      <Heading>{props.title}</Heading>
      <Button
        plain={false}
        icon={<Subtract />}
        onClick={() => setCount(prevCount => prevCount - 1)}
      />
      {count}
      <Box round="full">
        <Refresh onClick={resetCount} />
      </Box>
      <Button
        plain={false}
        icon={<Add />}
        onClick={() => setCount(prevCount => prevCount + 1)}
      />
    </Box>
  );
}
