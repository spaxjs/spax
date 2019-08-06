import { Container, Typography } from "@material-ui/core";
import GlobalCount from "components/GlobalCount";
import React, { ReactElement } from "react";
import styled from "styled-components";

const UI1 = styled(GlobalCount)`
  margin-top: 1rem;
`;

const UI2 = styled(GlobalCount)`
  margin-top: 1rem;
`;

export default function UI(props: any): ReactElement<void> {
  return (
    <Container>
      <Typography variant="h1">{props.meta.title}</Typography>
      <UI1 {...props} />
      <UI2 {...props} />
    </Container>
  );
}
