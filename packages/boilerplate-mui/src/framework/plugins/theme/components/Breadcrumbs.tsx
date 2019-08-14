import { Breadcrumbs as B, Link as L } from "@material-ui/core";
import { BreadcrumbsProps } from "@material-ui/core/Breadcrumbs";
import { Link, useMatched } from "@wugui/router";
import React from "react";

export const Breadcrumbs: React.FC<BreadcrumbsProps> = (props: any) => {
  const matched = useMatched();

  return (
    <B {...props}>
      {matched
        .filter(([{ path }]) => path.indexOf("*") === -1)
        .map(([{ key, path: pathname, title }, params]) => (
          <Link key={key} component={L} to={{ pathname, params }}>
            {title}
          </Link>
        ))}
    </B>
  );
};
