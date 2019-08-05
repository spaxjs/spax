import { useGlobalState } from "@wugui/hooks";
import { Grid } from "grommet";
import { Github } from "grommet-icons";
import React from "react";
import styled from "styled-components";
import Header from "../Header";
import Logo from "../Logo";
import Main from "../Main";

export const Outer = styled(Grid)`
  margin: 5rem auto;
  max-width: 24rem;
  border-radius: 0.5rem;
  overflow: hidden;
`;

export default function BlankLayout(props: any) {
  const [repo] = useGlobalState<any>("repo");

  return (
    <Outer>
      <Header>
        <Logo option={props.option} />
        <a className="github" href={repo.url}>
          <Github />
        </a>
      </Header>
      <Main>
        {props.children}
      </Main>
    </Outer>
  );
}
