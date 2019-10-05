import { createStyles, Drawer, makeStyles, Theme } from "@material-ui/core";
import { DrawerProps } from "@material-ui/core/Drawer";
import { useGlobalState } from "@spax/hooks";
import React from "react";

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
  const [open] = useGlobalState<boolean>("sidebar-open");
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
