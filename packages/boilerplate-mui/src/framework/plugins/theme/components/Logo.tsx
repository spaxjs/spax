import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { Link, LinkProps } from "@wugui/router";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme: Theme & { custom: any }) =>
  createStyles({
    logo: {
      ...theme.mixins.toolbar,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& > img": {
        maxWidth: "100%",
        maxHeight: 48,
      },
    },
  }),
);

export const Logo: React.FC<Partial<LinkProps> & { className?: any, option?: any }> = ({className, option, ...props}: any) => {
  const {logo} = useStyles(props);

  const { logoImage, siteTitle } = option;

  return (
    <Link
      to="/"
      className={clsx([logo, className])}
      {...props}
    >
      <img
        src={logoImage}
        alt={siteTitle} />
    </Link>
  );
};
