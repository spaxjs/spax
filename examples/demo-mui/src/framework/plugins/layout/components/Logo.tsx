import { createStyles, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { Link, LinkProps } from "react-router-dom";

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

type LogoProps = Partial<LinkProps> & { className?: any, option?: any };

export const Logo = ({
  className,
  option: { logoImage, siteTitle },
  ...props
}: LogoProps) => {
  const { logo } = useStyles(props);

  return (
    <Link
      to="/"
      className={clsx(logo, className)}
      {...props}
    >
      <img
        src={logoImage}
        alt={siteTitle} />
    </Link>
  );
};
