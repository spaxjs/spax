import { Box, Link as L, Typography } from "@material-ui/core";
import { Explore, NavigateNext } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useT } from "@spax/i18n";
import { Link } from "@spax/router";
import React, { ReactNode } from "react";

const useStyles = makeStyles({
  root: {
    "& > *": {
      verticalAlign: "middle",
    },
    "& > a": {
      fontSize: "24px",
    },
  },
});

export default function UI(props: any): ReactNode {
  const {root} = useStyles(props);
  const [ t ] = useT();

  return (
    <Box
      textAlign="center">
      <Box
        mb={2}>
        <Typography variant="h1">{t(props.title)}</Typography>
      </Box>
      <Box
        className={root}>
        <Explore />
        <NavigateNext />
        <Link
          component={L}
          to="/dashboard">{t("Dashboard")}</Link>
      </Box>
    </Box>
  );
}
