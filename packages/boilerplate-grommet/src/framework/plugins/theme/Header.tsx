import { Box } from "grommet";
import React from "react";
import styled from "styled-components";

const Outer = styled(Box)`
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

export default function Header({children, ...props}: any) {
  return (
    <Outer
      gridArea="header"
      align="center"
      justify="between"
      pad="small"
      {...props}
    >
      {children}
    </Outer>
  );
}
