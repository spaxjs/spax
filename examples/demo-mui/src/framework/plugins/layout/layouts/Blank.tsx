import { Box, Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import { Slogan } from "../components/Slogan";
import bg from "../images/bg.svg";

const useStyles = makeStyles((theme: Theme & { custom: any }) =>
  createStyles({
    root: {
      background: `url(${bg})  no-repeat center center`,
    },
    logo: {
      height: theme.spacing(6),
    },
  }),
);

export default function BlankLayout({children, ...props}: any) {
  const {root, logo} = useStyles(props);

  return (
    <Container
      maxWidth="xs">
      <Box
        py={8}
        className={root}>
        <Box
          px={2}
          py={4}
          textAlign="center">
          <Logo
            className={logo}
            option={props.option} />
          <Slogan />
        </Box>
        <Box
          p={4}
        >
          {children}
        </Box>
        <Footer
          px={2}
          py={4}
          textAlign="center"/>
      </Box>
    </Container>
  );
}
