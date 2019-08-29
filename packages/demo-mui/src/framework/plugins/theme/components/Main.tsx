import { Box, Theme } from "@material-ui/core";
import { BoxProps } from "@material-ui/core/Box";
import { createStyles, makeStyles } from "@material-ui/styles";
import React from "react";
import { useStore } from "../../../store";

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

export const Main: React.FC<BoxProps> = ({children, ...props}: any) => {
  const [open] = useStore<boolean>("sidebar-open");
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
