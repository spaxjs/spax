import { Button, Container, Typography } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import { usePersistState } from "@wugui/hooks";
import React, { ReactElement} from "react";

export default function PersistCount(props: any): ReactElement<void> {
  const [count, setCount] = usePersistState("count", 0);
  return (
    <Container className={props.className}>
      <Typography variant="h1">{props.title}</Typography>
      <Button
        onClick={() => setCount(prevCount => prevCount - 1)}
      ><Remove /></Button>
      {count}
      <Button
        onClick={() => setCount(prevCount => prevCount + 1)}
      ><Add /></Button>
    </Container>
  );
}
