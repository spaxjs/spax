import { Container, Typography } from "@material-ui/core";
import { Link } from "@wugui/router";
import React from "react";

export default function Forbidden(props: any) {
  return (
    <Container>
      <Typography variant="h1">403</Typography>
      Sorry, you don't have access to this page.
      <hr />
      <Link to="/login">Login</Link>
    </Container>
  );
}
