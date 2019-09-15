import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { Link, LinkProps } from "@spax/router";
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

type LogoProps = Partial<LinkProps> & { className?: any, option?: any };

export const Logo: React.FC<LogoProps> = ({ className, option: { logoImage, siteTitle }, ...props }: LogoProps) => {
  const { logo } = useStyles(props);

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
