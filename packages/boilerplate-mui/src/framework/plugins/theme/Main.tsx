import React from "react";
import styled from "styled-components";

const Outer = styled.div`
`;

export default function Main(props: any) {
  return (
    <Outer>
      {props.children}
    </Outer>
  );
}
