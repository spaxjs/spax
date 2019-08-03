import { Link } from "@wugui/plugin-router";
import React from "react";
import { Logo, LogoImage, LogoTitle, Outer } from "../styled";

export default function BlankLayout(props: any) {
  const { logoImage, logoTitle } = props.option;

  return (
    <Outer>
      <Logo>
        <Link to="/">
          <LogoImage src={logoImage} alt="wugui" />
          <LogoTitle>{logoTitle}</LogoTitle>
        </Link>
      </Logo>
      {props.children}
    </Outer>
  );
}
