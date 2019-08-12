import { Link } from "@wugui/router";
import { Box, Heading } from "grommet";
import React from "react";

export default function UI(props: any) {
  return (
    <Box>
      <Heading>Todo</Heading>
      <Link to="/login">Login</Link>
    </Box>
  );
}
