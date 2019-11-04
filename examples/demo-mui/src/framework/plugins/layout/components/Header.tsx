import { AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar } from "@material-ui/core";
import { AppBarProps } from "@material-ui/core/AppBar";
import { Menu as MenuIcon } from "@material-ui/icons";
import React from "react";
import { useLayout } from "../use/useLayout";

const useStyles = makeStyles((theme: Theme & { custom: any }) =>
  createStyles({
    appBar: {
      width: ({ open }: any) => open ? `calc(100% - ${theme.custom.sidebar.width}px)` : "100%",
      marginLeft: ({ open }: any) => open ? theme.custom.sidebar.width : 0,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }),
);

export const Header: React.FC<AppBarProps> = ({children, ...props}: any) => {
  const {open = false, setState} = useLayout();
  const {appBar, menuButton} = useStyles({ open });
  return (
    <AppBar
      className={appBar}
      position="fixed"
      {...props}>
      <Toolbar>
        <IconButton
          className={menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={() => setState({ open: !open })}
          edge="start">
          <MenuIcon />
        </IconButton>
        {children}
      </Toolbar>
    </AppBar>
  );
};
