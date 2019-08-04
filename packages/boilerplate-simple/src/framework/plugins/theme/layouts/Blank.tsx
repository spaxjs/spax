import { useGlobalState } from "@wugui/hooks";
import { Link } from "@wugui/plugin-router";
import { Icon, Layout } from "antd";
import React from "react";
import styled from "styled-components";
import { Logo, LogoImage, LogoTitle } from "../styled";

export const Outer: typeof Layout = styled(Layout)`
  margin: 5rem auto;
  max-width: 24rem;
  border-radius: 0.5rem;
  overflow: hidden;
`;

export const Header: typeof Layout.Header = styled(Layout.Header)`
  text-align: center;
`;

export const Content: typeof Layout.Content = styled(Layout.Content)`
  padding: 2rem;
`;

export const Footer: typeof Layout.Footer = styled(Layout.Footer)`
  text-align: center;
`;

export default function BlankLayout(props: any) {
  const { logoImage, logoTitle } = props.option;
  const [repo] = useGlobalState<any>("repo");

  return (
    <Outer>
      <Header>
        <Logo>
          <Link to="/">
            <LogoImage src={logoImage} alt="wugui" />
            <LogoTitle>{logoTitle}</LogoTitle>
          </Link>
        </Logo>
      </Header>
      <Content>
        {props.children}
      </Content>
      <Footer>
        <a className="github" href={repo.url}>
          <Icon type="github" />
        </a>
      </Footer>
    </Outer>
  );
}
