import { useGlobalState, usePersistState } from "@wugui/hooks";
import { Link } from "@wugui/plugin-router";
import { Box, Button, DropButton, Heading } from "grommet";
import { Github, Logout } from "grommet-icons";
import React from "react";
import styled from "styled-components";
import Breadcrumb from "../Breadcrumb";
import Header from "../Header";
import Logo from "../Logo";
import Main from "../Main";
import Menu from "../Menu";
import Sider from "../Sider";

const Outer = styled(Box)`
  min-height: 100vh;
`;

export default function AdminLayout(props: any) {
  const [auth, setAuth] = useGlobalState<string>("auth");
  const [collapsed, setCollapse] = usePersistState<boolean>("plugin-theme-collapse", false);
  const [repo] = useGlobalState<any>("repo");

  return (
    <Outer>
      <Header>
        <Logo option={props.option} />
        <a className="github" href={repo.url}>
          <Github />
        </a>
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
            label="Logout"
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
