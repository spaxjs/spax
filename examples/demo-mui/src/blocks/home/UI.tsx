import { Box, Link, makeStyles, Typography } from "@material-ui/core";
import { Explore, NavigateNext } from "@material-ui/icons";
import { useT } from "@spax/i18n";
import React, { ReactNode } from "react";
import { Link as RouterLink} from "react-router-dom";

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
          component={RouterLink}
          to="/dashboard">{t("Dashboard")}</Link>
      </Box>
    </Box>
  );
}
