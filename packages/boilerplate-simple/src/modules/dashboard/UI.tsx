import { Box, Heading } from "grommet";
import React, { ReactNode } from "react";

export default function UI(props: any): ReactNode {
  return (
    <Box>
      <Heading>{props.meta.title}</Heading>
    </Box>
  );
}
