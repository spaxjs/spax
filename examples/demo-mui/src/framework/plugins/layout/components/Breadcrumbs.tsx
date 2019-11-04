import { Breadcrumbs as B, Link } from "@material-ui/core";
import { BreadcrumbsProps } from "@material-ui/core/Breadcrumbs";
import { useT } from "@spax/i18n";
import pathToRegExp from "path-to-regexp";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useLayout } from "../use/useLayout";

export const Breadcrumbs: React.FC<BreadcrumbsProps> = (props: any) => {
  const { matched } = useLayout();
  const [t] = useT();

  return (
    <B {...props}>
      {matched
        .map(([{ params }, { path, title }]) => (
          <Link
            key={path}
            component={RouterLink}
            to={pathToRegExp.compile(path)(params)}>
            {t(title)}
          </Link>
        ))}
    </B>
  );
};
