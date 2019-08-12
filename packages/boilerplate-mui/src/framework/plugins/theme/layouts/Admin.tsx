import { Box, Divider, IconButton, Link as L, Theme, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { ReactComponent as Github } from "@mdi/svg/svg/github-circle.svg";
import { ReactComponent as Login } from "@mdi/svg/svg/login.svg";
import { ReactComponent as Logout } from "@mdi/svg/svg/logout.svg";
import { useGlobalState } from "@wugui/hooks";
import { Link, useMatched } from "@wugui/router";
import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import Footer from "../Footer";
import Header from "../Header";
import Logo from "../Logo";
import Main from "../Main";
import Menu from "../Menu";
import Sidebar from "../Sidebar";

const useStyles = makeStyles((theme: Theme & { custom: any }) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      // background: `url(${bg})  no-repeat center center`,
    },
    h1: {
      flexGrow: 1,
    },
  }),
);

export default function AdminLayout(props: any) {
  const [repo] = useGlobalState<any>("repo");
  const [auth, setAuth] = useGlobalState<string>("auth");
  const [[{title}]] = useMatched(-1);
  const {root, h1} = useStyles(props);

  return (
    <Box
      className={root}>
      <Header>
        <Typography
          className={h1}
          variant="h1">{title}</Typography>
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
          mb={1}>
          <Breadcrumbs />
        </Box>
        {props.children}
        <Footer
          px={2}
          py={4}
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
