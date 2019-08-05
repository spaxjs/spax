import { Box } from "grommet";
import React from "react";
import styled from "styled-components";

const Outer = styled(Box)`
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.35);
`;

export default function Sider(props: any) {
  return <Outer
    gridArea="sidebar"
    background="dark-3"
    width="small"
    animation={[
      { type: "fadeIn", duration: 300 },
      { type: "slideRight", size: "xlarge", duration: 150 },
    ]}
  >
    {props.children}
  </Outer>;
}
