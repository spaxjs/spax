import { Box, FormControlLabel, Link, Switch, Typography } from "@material-ui/core";
import { BoxProps } from "@material-ui/core/Box";
import { ReactComponent as Github } from "@mdi/svg/svg/github-circle.svg";
import { useGlobalState } from "@spax/hooks";
import React from "react";

export const Footer: React.FC<BoxProps> = ({children, ...props}: any) => {
  const [repo] = useGlobalState<any>("repo", {});
  const [ themeType, setThemeType ] = useGlobalState<"light" | "dark">("themeType", "light");
  return (
    <Box
      {...props}
    >
      {children}
      <Link href={repo.url}>
        <Github fill="currentColor" />
      </Link>
      <Typography variant="subtitle1">
        Made with ❤ in China
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={themeType === "dark"}
            onChange={() => setThemeType(themeType === "light" ? "dark" : "light")}
            value="themeType"
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        }
        label={themeType === "dark" ? "Light On" : "Light Off"}
        labelPlacement="bottom"
      />
    </Box>
  );
};
