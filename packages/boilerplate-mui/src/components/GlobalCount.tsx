import { Button, Container, Typography } from "@material-ui/core";
import { Add, Refresh, Remove } from "@material-ui/icons";
import { useGlobalState } from "@wugui/hooks";
import React, { ReactElement } from "react";

export default function GlobalCount(props: any): ReactElement<void> {
  const [count, setCount, resetCount] = useGlobalState("count");
  return (
    <Container className={props.className}>
      <Typography variant="h1">{props.title}</Typography>
      <Button
        onClick={() => setCount(prevCount => prevCount - 1)}
      ><Remove /></Button>
      {count}
      <Container>
        <Refresh onClick={resetCount} />
      </Container>
      <Button
        onClick={() => setCount(prevCount => prevCount + 1)}
      ><Add /></Button>
    </Container>
  );
}
