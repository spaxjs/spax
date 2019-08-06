import { Link } from "@wugui/plugin-router";
import { Box, Heading } from "grommet";
import React from "react";

export default function Forbidden(props: any) {
  return (
    <Box>
      <Heading>403</Heading>
      Sorry, you don't have access to this page.
      <hr />
      <Link to="/login">Login</Link>
    </Box>
  );
}
