import { Box, Button, FormControlLabel, Link, Menu, MenuItem, Switch, Typography } from "@material-ui/core";
import { BoxProps } from "@material-ui/core/Box";
import { Language } from "@material-ui/icons";
import { ReactComponent as Github } from "@mdi/svg/svg/github-circle.svg";
import { useGlobalState } from "@spax/hooks";
import { changeLng, useT } from "@spax/i18n";
import React, { useEffect, useState } from "react";

export const Footer: React.FC<BoxProps> = ({children, ...props}: any) => {
  const [ repo ] = useGlobalState<any>("repo");
  const [ lng, setLng ] = useGlobalState<any>("lng");
  const [ themeType, setThemeType ] = useGlobalState<"light" | "dark">("themeType", "light");
  const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);
  const { t } = useT("Theme");

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(selectedLng?: string) {
    setAnchorEl(null);
    if (selectedLng) {
      setLng(selectedLng);
    }
  }

  useEffect(() => {
    if (lng) {
      changeLng(lng);
    }
  }, [lng]);

  return (
    <Box
      {...props}
    >
      {children}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center">
        <Link href={repo.url}>
          <Github fill="currentColor" />
        </Link>
        <Typography variant="subtitle1">
          {t("with heart")}
        </Typography>
      </Box>
      <Box>
        <Button aria-controls="locale-menu" aria-haspopup="true" onClick={handleClick}>
          <Language color="primary" /> {lng}
        </Button>
        <Menu
          id="locale-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleClose()}
          keepMounted
        >
          <MenuItem onClick={() => handleClose("zh")}>
            <span role="img" aria-label="简体中文">🇨🇳</span> 简体中文
          </MenuItem>
          <MenuItem onClick={() => handleClose("en")}>
            <span role="img" aria-label="English">🇺🇸</span> English
          </MenuItem>
        </Menu>
      </Box>
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
        label={t(themeType === "dark" ? "Light On" : "Light Off")}
        labelPlacement="end"
      />
    </Box>
  );
};
