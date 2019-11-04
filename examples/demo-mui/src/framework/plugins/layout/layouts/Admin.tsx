import {
  Box,
  createStyles,
  Divider,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { ReactComponent as Logout } from "@mdi/svg/svg/logout.svg";
import { useT } from "@spax/i18n";
import React from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { Main } from "../components/Main";
import { Menu } from "../components/Menu";
import { Sidebar } from "../components/Sidebar";
import { useLayout } from "../use/useLayout";

const useStyles = makeStyles((theme: Theme & { custom: any }) =>
  createStyles({
    root: {},
    h1: {
      flexGrow: 1,
    },
  }),
);

export default function AdminLayout(props: any) {
  const classes = useStyles({});
  const [ t ] = useT();
  const { matched } = useLayout();

  const lastMatched = matched.length ? matched[matched.length - 1][1] : null;

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      className={classes.root}
    >
      <Header>
        <Typography className={classes.h1} variant="h1">
          {lastMatched && lastMatched.title ? t(lastMatched.title) : ""}
        </Typography>
        <IconButton color="inherit" edge="end">
          <Logout fill="currentColor" />
        </IconButton>
      </Header>
      <Sidebar>
        <Logo option={props.option} />
        <Divider />
        <Menu />
      </Sidebar>
      <Main>
        <Box mb={2}>
          <Breadcrumbs />
          <Divider />
        </Box>
        <Box flexGrow={1}>{props.children}</Box>
        <Footer pt={2} textAlign="center" />
      </Main>
    </Box>
  );
}
