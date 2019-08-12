import { Link } from "@wugui/router";
import React from "react";
import styled from "styled-components";

const Outer = styled(Link)`
`;

const LogoImage = styled("img")`
  height: 48px;
  transition: padding-left 0.15s;
  will-change: padding-left;
  &.collapsed {
    padding-left: 24px;
  }
`;

export default function Logo(props: any) {
  const { logoImage, siteTitle } = props.option;

  return (
    <Outer to="/">
      <LogoImage src={logoImage} alt={siteTitle} />
    </Outer>
  );
}
