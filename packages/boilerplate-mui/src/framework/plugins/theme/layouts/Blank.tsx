import { Box, Container, Link, Theme, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { ReactComponent as Github } from "@mdi/svg/svg/github-circle.svg";
import { useGlobalState } from "@wugui/hooks";
import React from "react";
import Footer from "../Footer";
import bg from "../images/bg.svg";
import Logo from "../Logo";
import Slogan from "../Slogan";

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
  const [repo] = useGlobalState<any>("repo");
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
          textAlign="center">
          <a href={repo.url}>
            <Github />
          </a>
          <Typography variant="subtitle1">Copyright &copy; 2019 <Link href="https://crossjs.com">crossjs.com</Link></Typography>
        </Footer>
      </Box>
    </Container>
  );
}
