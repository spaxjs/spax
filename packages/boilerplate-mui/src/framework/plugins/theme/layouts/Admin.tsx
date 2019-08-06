import { Container, Link, Typography } from "@material-ui/core";
import { Star } from "@material-ui/icons";
import { useGlobalState } from "@wugui/hooks";
import React from "react";
import styled from "styled-components";
import Footer from "../Footer";
import Header from "../Header";
import Logo from "../Logo";
import Main from "../Main";
import Slogan from "../Slogan";

export const Outer = styled.div`
  max-width: 24rem;
  min-height: 100vh;
`;

export default function BlankLayout(props: any) {
  const [repo] = useGlobalState<any>("repo");

  return (
    <Container>
      <Outer>
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
          <Star />
        </a>
        <Typography variant="subtitle1">Copyright &copy; 2019 <Link href="https://crossjs.com">crossjs.com</Link></Typography>
      </Footer>
    </Outer>
    </Container>
  );
}
