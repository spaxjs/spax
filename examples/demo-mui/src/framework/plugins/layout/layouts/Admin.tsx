import {
  Box,
  createStyles,
  Divider,
  IconButton,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { ReactComponent as Login } from "@mdi/svg/svg/login.svg";
import { ReactComponent as Logout } from "@mdi/svg/svg/logout.svg";
import { useGlobalState } from "@spax/hooks";
import { useT } from "@spax/i18n";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { Main } from "../components/Main";
import { Menu } from "../components/Menu";
import { Sidebar } from "../components/Sidebar";
import { useLayout } from "../hooks/useLayout";

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
  const [role, setRole] = useGlobalState<string>("role");
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
        {role ? (
          <IconButton color="inherit" edge="end" onClick={() => setRole("")}>
            <Logout fill="currentColor" />
          </IconButton>
        ) : (
            <Link component={RouterLink} color="inherit" to="/login">
              <IconButton color="inherit" edge="end">
                <Login fill="currentColor" />
              </IconButton>
            </Link>
          )}
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
