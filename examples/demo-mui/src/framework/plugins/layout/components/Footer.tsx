import { Box, Link, Typography } from "@material-ui/core";
import { BoxProps } from "@material-ui/core/Box";
import { ReactComponent as Github } from "@mdi/svg/svg/github-circle.svg";
import { useT } from "@spax/i18n";
import React from "react";
import { LngSwitch } from "./LngSwitch";
import { ThemeSwitch } from "./ThemeSwitch";

export const Footer: React.FC<BoxProps> = ({children, ...props}: any) => {
  const [ t ] = useT("Theme");

  return (
    <Box
      {...props}
    >
      {children}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center">
        <Link href="https://github.com/spaxjs/spax">
          <Github fill="currentColor" />
        </Link>
        <Typography variant="subtitle1">
          {t("with heart")}
        </Typography>
      </Box>
      <Box>
        <LngSwitch />
      </Box>
      <Box>
        <ThemeSwitch />
      </Box>
    </Box>
  );
};
