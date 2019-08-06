import { Box } from "grommet";
import React from "react";
import styled from "styled-components";

const Outer = styled(Box)`
`;

export default function Footer({children, ...props}: any) {
  return (
    <Outer
      gridArea="footer"
      direction="column"
      align="center"
      justify="between"
      pad="small"
      {...props}
    >
      {children}
    </Outer>
  );
}
