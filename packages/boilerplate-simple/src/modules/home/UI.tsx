import { Link } from "@wugui/plugin-router";
import { Box, Heading} from "grommet";
import React, { ReactNode } from "react";

export default function UI(props: any): ReactNode {
  return (
    <Box>
      <Heading>{props.title}</Heading>
      Goto: <Link to="/dashboard">Dashboard</Link>
    </Box>
  );
}
