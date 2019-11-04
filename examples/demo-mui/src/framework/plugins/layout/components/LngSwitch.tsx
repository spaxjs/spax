import { Button, Menu, MenuItem } from "@material-ui/core";
import { Language } from "@material-ui/icons";
import { useLng } from "@spax/i18n";
import React from "react";

export const LngSwitch: React.FC<{}> = () => {
  const [lng, setLng] = useLng();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(selectedLng?: string) {
    setAnchorEl(null);
    if (selectedLng) {
      setLng(selectedLng);
    }
  }

  return (
    <>
      <Button
        aria-controls="locale-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
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
    </>
  );
};
