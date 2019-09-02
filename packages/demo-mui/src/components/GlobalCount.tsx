import { Badge, Box, Button, Paper, Typography } from "@material-ui/core";
import { Add, Favorite, Remove } from "@material-ui/icons";
import { useGlobalState } from "@spax/hooks";
import React, { ReactElement } from "react";

export default function GlobalCount(props: any): ReactElement<void> {
  const [count, setCount] = useGlobalState("GlobalCount");
  return (
    <Paper
      className={props.className}>
      <Box my={2} p={2}>
        <Typography variant="h1">{props.title}</Typography>
        <Button
          color="primary"
          onClick={() => setCount(prevCount => prevCount - 1)}
        ><Remove /></Button>
        <Badge badgeContent={count} max={10} color="primary">
          <Favorite />
        </Badge>
        <Button
          color="primary"
          onClick={() => setCount(prevCount => prevCount + 1)}
        ><Add /></Button>
      </Box>
    </Paper>
  );
}
