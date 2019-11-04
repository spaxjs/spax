import { createStyles, Drawer, makeStyles, Theme } from "@material-ui/core";
import { DrawerProps } from "@material-ui/core/Drawer";
import React from "react";
import { useLayout } from "../use/useLayout";

const useStyles = makeStyles((theme: Theme & { custom: any }) =>
  createStyles({
    drawer: {
      width: theme.custom.sidebar.width,
      flexShrink: 0,
    },
    drawerPaper: {
      width: theme.custom.sidebar.width,
      flexShrink: 0,
    },
  }),
);

export const Sidebar = ({children, ...props}: DrawerProps) => {
  const {open = false} = useLayout();
  const {drawer, drawerPaper} = useStyles({ open });
  return (
    <Drawer
      className={drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: drawerPaper,
      }}
      {...props}
    >
      {children}
    </Drawer>
  );
};
