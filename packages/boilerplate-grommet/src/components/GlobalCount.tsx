import { useGlobalState } from "@wugui/hooks";
import { Box, Button, Heading } from "grommet";
import { Add, Subtract } from "grommet-icons";
import React, { ReactElement } from "react";

export default function GlobalCount(props: any): ReactElement<void> {
  const [count, setCount] = useGlobalState("count");
  return (
    <Box className={props.className}>
      <Heading>{props.title}</Heading>
      <Button
        plain={false}
        icon={<Subtract />}
        onClick={() => setCount(prevCount => prevCount - 1)}
      />
      {count}
      <Button
        plain={false}
        icon={<Add />}
        onClick={() => setCount(prevCount => prevCount + 1)}
      />
    </Box>
  );
}
