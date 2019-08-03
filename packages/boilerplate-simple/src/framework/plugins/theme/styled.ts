import { Layout } from "antd";
import styled from "styled-components";

export const Outer: typeof Layout = styled(Layout)`
  min-height: 100vh;
`;

export const Sider: typeof Layout.Sider = styled(Layout.Sider)`
`;

export const Logo = styled("div")`
  height: 64px;
  line-height: 64px;
  white-space: nowrap;
  overflow: "hidden";
`;

export const LogoImage = styled("img")`
  margin-right: 0.2em;
  padding-left: 19px;
  height: 24px;
  vertical-align: baseline;
  transition: padding-left 0.15s;
  will-change: padding-left;
  &.collapsed {
    padding-left: 28px;
  }
`;

export const LogoTitle = styled("h1")`
  display: inline-block;
  color: white;
  font-style: normal;
  font-size: 20px;
  vertical-align: baseline;
  transition: opacity 0.15s;
  will-change: opacity;
  &.collapsed {
    opacity: 0;
  }
`;

export const Main: typeof Layout = styled(Layout)`
`;

export const Header: typeof Layout.Header = styled(Layout.Header)`
  background: white;
  padding: 0 1rem;
  text-align: right;
  .github {
    font-size: 20px;
    vertical-align: middle;
  }
  .avatar {
    margin-left: 0.5rem;
  }
  .username {
    margin-left: 0.25rem;
  }
  .logout {
    margin-left: 0.5rem;
  }
  .login {
    margin-left: 0.5rem;
  }
`;

export const Content: typeof Layout.Content = styled(Layout.Content)`
  padding: 1rem;
`;
