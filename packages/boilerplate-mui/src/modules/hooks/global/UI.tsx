import { Container, Typography } from "@material-ui/core";
import GlobalCount from "components/GlobalCount";
import React, { ReactElement } from "react";

export default function UI(props: any): ReactElement<void> {
  return (
    <Container>
      <Typography variant="h1">{props.title}</Typography>
      <GlobalCount {...props} />
      <GlobalCount {...props} />
    </Container>
  );
}
