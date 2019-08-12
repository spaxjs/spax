import { Container, Typography } from "@material-ui/core";
import { Link } from "@wugui/router";
import React from "react";

export default function UI(props: any) {
  return (
    <Container>
      <Typography variant="h1">Todo</Typography>
      <Link to="/login">Login</Link>
    </Container>
  );
}
