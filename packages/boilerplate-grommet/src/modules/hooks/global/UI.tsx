import GlobalCount from "components/GlobalCount";
import { Box, Heading } from "grommet";
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
    <Box>
      <Heading>{props.title}</Heading>
      <UI1 {...props} />
      <UI2 {...props} />
    </Box>
  );
}
