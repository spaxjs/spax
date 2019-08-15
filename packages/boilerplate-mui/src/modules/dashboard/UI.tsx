import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useRes } from "@spax/i18n";
import React, { ReactNode } from "react";

const useStyles = makeStyles({
  root: {
    fontSize: "24px",
    textAlign: "center",
  },
});

export default function UI(props: any): ReactNode {
  const {root} = useStyles(props);
  const { t } = useRes();
  return (
    <Box>
      <pre className={root}>{t(props.description)}</pre>
    </Box>
  );
}
