import { Box, makeStyles } from "@material-ui/core";
import { useT } from "@spax/i18n";
import React, { ReactNode } from "react";

const useStyles = makeStyles({
  root: {
    fontSize: "24px",
    textAlign: "center",
  },
});

export default function UI(props: any): ReactNode {
  const { root } = useStyles(props);
  const [t] = useT();

  return (
    <Box
      textAlign="center">
      <pre className={root}>{t(props.description)}</pre>
    </Box>
  );
}
