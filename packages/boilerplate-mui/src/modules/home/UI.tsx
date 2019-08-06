import { Box, Link as L, Typography } from "@material-ui/core";
import { Explore, NavigateNext } from "@material-ui/icons";
import { Link } from "@wugui/plugin-router";
import React, { ReactNode } from "react";

export default function UI(props: any): ReactNode {
  return (
    <Box>
      <Box>
        <Typography variant="h1">{props.title}</Typography>
      </Box>
      <Box>
        <Explore />
        <NavigateNext />
        <Link
          as={L}
          to="/dashboard">Dashboard</Link>
      </Box>
    </Box>
  );
}
