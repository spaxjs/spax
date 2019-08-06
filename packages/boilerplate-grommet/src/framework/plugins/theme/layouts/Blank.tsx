import { useGlobalState } from "@wugui/hooks";
import { Anchor, Box, Grid, Text } from "grommet";
import { Github } from "grommet-icons";
import React from "react";
import styled from "styled-components";
import Footer from "../Footer";
import Header from "../Header";
import bg from "../images/bg.svg";
import Logo from "../Logo";
import Main from "../Main";
import Slogan from "../Slogan";

export const Outer = styled(Grid)`
  max-width: 24rem;
  min-height: 100vh;
`;

export default function BlankLayout(props: any) {
  const [repo] = useGlobalState<any>("repo");

  return (
    <Box background={`url(${bg})`}>
      <Outer
      fill="vertical"
      rows={["auto", "flex", "auto"]}
      columns={["auto"]}
      areas={[
        { name: "header", start: [0, 0], end: [1, 0] },
        { name: "main", start: [0, 1], end: [1, 1] },
        { name: "footer", start: [0, 2], end: [1, 2] },
      ]}
      // gap="large"
      margin={{horizontal: "auto"}}
    >
      <Header
        direction="column"
        pad={{vertical: "xlarge"}}>
        <Logo option={props.option} />
        <Slogan />
      </Header>
      <Main>
        {props.children}
      </Main>
      <Footer
        pad={{vertical: "xlarge"}}>
        <a href={repo.url}>
          <Github />
        </a>
        <Text color="dark-4" size="small">Copyright &copy; 2019 <Anchor href="https://crossjs.com">crossjs.com</Anchor></Text>
      </Footer>
    </Outer>
    </Box>
  );
}
