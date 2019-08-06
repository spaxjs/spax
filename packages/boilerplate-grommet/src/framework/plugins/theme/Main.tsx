import { Box } from "grommet";
import React from "react";
import styled from "styled-components";

const Outer = styled(Box)`
`;

export default function Main(props: any) {
  return (
    <Outer
      gridArea="main"
      justify="center"
      align="center"
    >
      {props.children}
    </Outer>
  );
}
