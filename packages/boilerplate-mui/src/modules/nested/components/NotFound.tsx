import { Box, Card, CardActions, CardContent, Divider, Link as L, Typography } from "@material-ui/core";
import { Link } from "@wugui/router";
import React from "react";

export default function NotFound(props: any) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h3">404 from modules/nested</Typography>
        <Typography variant="body1">Sorry, the page you visited does not exist.</Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Box p={1}>
          <Link component={L} to="/nested">Nested</Link>
        </Box>
      </CardActions>
    </Card>
  );
}
