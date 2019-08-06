import { Box, Container, Typography } from "@material-ui/core";
import React, { ReactNode } from "react";

export default function UI(props: any): ReactNode {

  return (
    <Box>
      <Typography variant="h1">{props.title}</Typography>
      <Container>
        Todo
      </Container>
    </Box>
  );
}
