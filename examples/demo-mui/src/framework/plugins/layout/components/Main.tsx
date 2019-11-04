import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { BoxProps } from "@material-ui/core/Box";
import React from "react";
import { useLayout } from "../use/useLayout";

const useStyles = makeStyles((theme: Theme & { custom: any }) =>
  createStyles({
    main: {
      marginLeft: ({ open }: any) => open ? theme.custom.sidebar.width : 0,
    },
    drawerHeader: {
      display: "flex",
      // alignItems: "center",
      ...theme.mixins.toolbar,
      // justifyContent: "flex-end",
    },
  }),
);

export const Main: React.FC<BoxProps> = ({children, ...props}: BoxProps) => {
  const {open = false} = useLayout();
  const {main, drawerHeader} = useStyles({ open });
  return (
    <Box
      className={main}
      p={3}
      display="flex"
      flexDirection="column"
      flexGrow={1}
      {...props}
    >
      <div className={drawerHeader} />
      {children}
    </Box>
  );
};
