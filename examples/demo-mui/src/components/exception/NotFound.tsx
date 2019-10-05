import { Box, Card, CardActions, CardContent, Divider, Link, Typography } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export default function NotFound(props: any) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h3">404</Typography>
        <Typography variant="body1">
          Sorry, the page you visited does not exist.
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Box p={1}>
          <Link component={RouterLink} to="/">Home</Link>
        </Box>
      </CardActions>
    </Card>
  );
}
