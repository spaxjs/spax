import { useGlobalState, usePersistState } from "@wugui/hooks";
import { Link } from "@wugui/plugin-router";
import { Box, Button, DropButton, Grid, Heading } from "grommet";
import { Github, Logout } from "grommet-icons";
import React from "react";
import styled from "styled-components";
import Breadcrumb from "../Breadcrumb";
import Header from "../Header";
import Logo from "../Logo";
import Main from "../Main";
import Menu from "../Menu";
import Sider from "../Sidebar";

const Outer = styled(Grid)`
  min-height: 100vh;
`;

export default function AdminLayout(props: any) {
  const [auth, setAuth] = useGlobalState<string>("auth");
  const [collapsed, setCollapse] = usePersistState<boolean>("plugin-theme-collapse", false);
  const [repo] = useGlobalState<any>("repo");

  return (
    <Outer
      fill
      rows={["auto", "flex"]}
      columns={["auto", "flex"]}
      areas={[
        { name: "header", start: [0, 0], end: [1, 0] },
        { name: "sidebar", start: [0, 1], end: [0, 1] },
        { name: "main", start: [1, 1], end: [1, 1] },
      ]}
    >
      <Header
        height="xxsmall"
        direction="row">
        <Box
          direction="row">
          <Logo option={props.option} />
          <a className="github" href={repo.url}>
            <Github />
          </a>
        </Box>
        <Box
          direction="row">
          {auth ? <>
            <Box
              className="avatar"
              height="36px"
              width="36px"
              round="full"
            >{auth.charAt(0).toUpperCase()}</Box>
            <em className="username">{auth}</em>
            <DropButton
              icon={<Logout />}
              a11yTitle="Logout"
              dropContent={<Box>
                <Box direction="row" justify="between" align="center">
                  <Heading level={3} margin="small">
                    Are you sure to logout?
                  </Heading>
                </Box>
                <Button onClick={() => setAuth("")}>Yes</Button>
              </Box>}
              dropProps={{ align: { top: "bottom" } }}
            />
          </> : <Link className="login" to="/login">
            Login
          </Link>}
        </Box>
      </Header>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(c) => setCollapse(c)}
      >
        <Menu />
      </Sider>
      <Main>
        <Breadcrumb />
        {props.children}
      </Main>
    </Outer>
  );
}
