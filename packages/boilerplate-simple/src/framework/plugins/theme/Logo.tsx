import { Link } from "@wugui/plugin-router";
import React from "react";
import styled from "styled-components";

const Outer = styled("div")`
  height: 64px;
  line-height: 64px;
  white-space: nowrap;
  overflow: "hidden";
`;

const LogoImage = styled("img")`
  padding-left: 12px;
  height: 32px;
  vertical-align: middle;
  transition: padding-left 0.15s;
  will-change: padding-left;
  &.collapsed {
    padding-left: 24px;
  }
`;

const LogoTitle = styled("h1")`
  display: inline-block;
  margin: 0 0 0 0.2em;
  font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: white;
  font-style: normal;
  font-size: 20px;
  line-height: 32px;
  vertical-align: middle;
  transition: opacity 0.15s;
  will-change: opacity;
  &.collapsed {
    opacity: 0;
  }
`;

export default function Logo(props: any) {
  const { logoImage, logoTitle } = props.option;

  return (
    <Outer>
      <Link to="/">
        <LogoImage src={logoImage} alt="wugui" />
        <LogoTitle>{logoTitle}</LogoTitle>
      </Link>
    </Outer>
  );
}
