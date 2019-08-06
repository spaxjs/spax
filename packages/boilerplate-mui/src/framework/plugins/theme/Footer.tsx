import React from "react";
import styled from "styled-components";

const Outer = styled.div`
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
