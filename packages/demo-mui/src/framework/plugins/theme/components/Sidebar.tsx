import { Drawer, Theme } from "@material-ui/core";
import { DrawerProps } from "@material-ui/core/Drawer";
import { createStyles, makeStyles } from "@material-ui/styles";
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

export const Sidebar: React.FC<DrawerProps> = ({children, ...props}: any) => {
  const [open] = useGlobalState("sidebar-open", true);
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
