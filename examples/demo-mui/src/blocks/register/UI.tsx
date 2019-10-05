import { Container, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export default function UI(props: any) {
  return (
    <Container>
      <Typography variant="h1">Todo</Typography>
      <Link to="/login">Login</Link>
    </Container>
  );
}
