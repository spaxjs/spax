import { Box, Card, CardActions, CardContent, Divider, Link, Typography } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export default function Forbidden(props: any) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h3">403</Typography>
        <Typography variant="body1">
          Sorry, you don't have access to this page.
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Box p={1}>
          <Link component={RouterLink} to="/login">Login</Link>
        </Box>
      </CardActions>
    </Card>
  );
}
