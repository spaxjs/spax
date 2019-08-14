import { Box } from "@material-ui/core";
import { BoxProps } from "@material-ui/core/Box";
import React from "react";

export const Footer: React.FC<BoxProps> = ({children, ...props}: any) => {
  return (
    <Box
      {...props}
    >
      {children}
    </Box>
  );
};
