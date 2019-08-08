import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { ReactNode } from "react";

const useStyles = makeStyles({
  root: {
    fontSize: "24px",
    textAlign: "center",
  },
});

export default function UI(props: any): ReactNode {
  const {root} = useStyles(props);
  return (
    <Box>
      <pre className={root}>{props.description}</pre>
    </Box>
  );
}
