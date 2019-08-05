import { Box } from "grommet";
import React from "react";
import styled from "styled-components";

const Outer = styled(Box)`
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

export default function Header(props: any) {
  return (
    <Outer
      gridArea="header"
      direction="row"
      align="center"
      justify="between"
      pad={{ horizontal: "medium", vertical: "small" }}
      background="dark-2"
    >
      {props.children}
    </Outer>
  );
}
