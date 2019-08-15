import {
  Box,
  Divider,
  IconButton,
  Link as L,
  Theme,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { ReactComponent as Login } from "@mdi/svg/svg/login.svg";
import { ReactComponent as Logout } from "@mdi/svg/svg/logout.svg";
import { useGlobalState } from "@spax/hooks";
import { Link, useMatched } from "@spax/router";
import React from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { Main } from "../components/Main";
import { Menu } from "../components/Menu";
import { Sidebar } from "../components/Sidebar";

const useStyles = makeStyles((theme: Theme & { custom: any }) =>
  createStyles({
    h1: {
      flexGrow: 1,
    },
  }),
);

export default function AdminLayout(props: any) {
  const [role, setRole] = useGlobalState<string>("role");
  const matched = useMatched();
  const { h1 } = useStyles(props);

  const lastMatched = matched[matched.length - 1];

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header>
        <Typography className={h1} variant="h1">
          {lastMatched ? lastMatched[0].title : ""}
        </Typography>
        {role ? (
          <IconButton color="inherit" edge="end" onClick={() => setRole("")}>
            <Logout fill="currentColor" />
          </IconButton>
        ) : (
          <Link component={L} color="inherit" to="/login">
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
