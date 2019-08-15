import { Box, Card, CardActions, CardContent, Divider, Link as L, Typography } from "@material-ui/core";
import { Link } from "@spax/router";
import React from "react";

export default function Forbidden(props: any) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h3">403</Typography>
        <Typography variant="body1">Sorry, you don't have access to this page.</Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Box p={1}>
          <Link component={L} to="/login">Login</Link>
        </Box>
      </CardActions>
    </Card>
  );
}
