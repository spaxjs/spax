import { useGlobalState } from "@wugui/hooks";
import { Link } from "@wugui/plugin-router";
import { Avatar, Button, Icon, Popconfirm } from "antd";
import classNames from "classnames";
import React, { useState } from "react";
import Breadcrumb from "../Breadcrumb";
import Menu from "../Menu";
import { Content, Header, Logo, LogoImage, LogoTitle, Main, Outer, Sider } from "../styled";

export default function AdminLayout(props: any) {
  const [auth, setAuth] = useGlobalState<string>("auth");
  const [collapsed, setCollapse] = useState(false);
  const [repo] = useGlobalState<any>("repo");

  const { logoImage, logoTitle } = props.option;

  return (
    <Outer>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(c) => setCollapse(c)}
      >
        <Logo>
          <Link to="/">
            <LogoImage className={classNames({ collapsed })} src={logoImage} alt="wugui" />
            <LogoTitle className={classNames({ collapsed })}>{logoTitle}</LogoTitle>
          </Link>
        </Logo>
        <Menu />
      </Sider>
      <Main>
        <Header>
          <a className="github" href={repo.url}>
            <Icon type="github" />
          </a>
          {auth ? <>
            <Avatar className="avatar">{auth.charAt(0).toUpperCase()}</Avatar>
            <em className="username">{auth}</em>
            <Popconfirm
              title="Are you sure to logout?"
              onConfirm={() => setAuth("")}
              okText="Yes"
              okType="danger"
              cancelText="No"
            >
              <Button className="logout" type="danger" icon="logout">
                Logout
              </Button>
            </Popconfirm>
          </> : <Link className="login" to="/login">
            Login
          </Link>}
        </Header>
        <Content>
          <Breadcrumb />
          {props.children}
        </Content>
      </Main>
    </Outer>
  );
}
