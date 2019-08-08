import { Box, Theme } from "@material-ui/core";
import { BoxProps } from "@material-ui/core/Box";
import { createStyles, makeStyles } from "@material-ui/styles";
import { useGlobalState } from "@wugui/hooks";
import React from "react";

const useStyles = makeStyles((theme: Theme & { custom: any }) =>
  createStyles({
    main: {
      flexGrow: 1,
      marginLeft: ({ open }: any) => open ? theme.custom.sidebar.width : 0,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: "0 8px",
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
  }),
);

const Main: React.FC<BoxProps> = ({children, ...props}: any) => {
  const [open] = useGlobalState("sidebar-open", true);
  const {main, drawerHeader} = useStyles({ open });
  return (
    <Box
      className={main}
      p={3}
      flexGrow={1}
      {...props}
    >
      <div className={drawerHeader} />
      {children}
    </Box>
  );
};

export default Main;
