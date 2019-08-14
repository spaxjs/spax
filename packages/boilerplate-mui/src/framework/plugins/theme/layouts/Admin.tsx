import { Box, Divider, IconButton, Link as L, Theme, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { ReactComponent as Github } from "@mdi/svg/svg/github-circle.svg";
import { ReactComponent as Login } from "@mdi/svg/svg/login.svg";
import { ReactComponent as Logout } from "@mdi/svg/svg/logout.svg";
import { useGlobalState } from "@wugui/hooks";
import { Link, useMatched } from "@wugui/router";
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
    root: {
    },
    h1: {
      flexGrow: 1,
    },
  }),
);

export default function AdminLayout(props: any) {
  const [repo] = useGlobalState<any>("repo");
  const [auth, setAuth] = useGlobalState<string>("auth");
  const matched = useMatched();
  const {root, h1} = useStyles(props);

  const lastMatched = matched[matched.length - 1];

  return (
    <Box
      className={root}
      display="flex"
      flexDirection="column"
      minHeight="100vh">
      <Header>
        <Typography
          className={h1}
          variant="h1">{lastMatched ? lastMatched[0].title : ""}</Typography>
        {
          auth ? (
            <>
              <IconButton color="inherit" edge="end" onClick={() => setAuth("")}><Logout fill="currentColor" /></IconButton>
            </>
          ) : (
            <Link
              component={L}
              color="inherit"
              to="/login">
              <IconButton color="inherit" edge="end"><Login fill="currentColor" /></IconButton>
            </Link>
          )
        }
      </Header>
      <Sidebar>
        <Logo
          option={props.option} />
        <Divider />
        <Menu />
      </Sidebar>
      <Main>
        <Box
          mb={2}>
          <Breadcrumbs />
          <Divider />
        </Box>
        <Box
          flexGrow={1}>
          {props.children}
        </Box>
        <Footer
          pt={2}
          textAlign="center">
          <a href={repo.url}>
            <Github />
          </a>
          <Typography variant="subtitle1">Copyright &copy; 2019 <L href="https://crossjs.com">crossjs.com</L></Typography>
        </Footer>
      </Main>
    </Box>
  );
}
