import { Link } from "@wugui/router";
import { Box, Heading } from "grommet";
import React from "react";

export default function NotFound(props: any) {
  return (
    <Box>
      <Heading>404</Heading>
      Sorry, the page you visited does not exist.
      <hr />
      <Link to="/">Home</Link>
    </Box>
  );
}
