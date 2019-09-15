import { Box, Typography } from "@material-ui/core";
import GlobalCount from "components/GlobalCount";
import React from "react";

export default function UI(props: any): React.ReactElement {
  return (
    <Box>
      <Typography variant="h1">{props.title}</Typography>
      <GlobalCount {...props} />
      <GlobalCount {...props} />
    </Box>
  );
}
