import { Box } from "@material-ui/core";
import { BoxProps } from "@material-ui/core/Box";
import React from "react";

const Footer: React.FC<BoxProps> = ({children, ...props}: any) => {
  return (
    <Box
      {...props}
    >
      {children}
    </Box>
  );
};

export default Footer;
