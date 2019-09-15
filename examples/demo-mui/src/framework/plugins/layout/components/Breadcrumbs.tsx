import { Breadcrumbs as B, Link as L } from "@material-ui/core";
import { BreadcrumbsProps } from "@material-ui/core/Breadcrumbs";
import { useT } from "@spax/i18n";
import { Link } from "@spax/router";
import React from "react";
import { useMatchedList } from "../hooks";

export const Breadcrumbs: React.FC<BreadcrumbsProps> = (props: any) => {
  const [matched] = useMatchedList();
  const [ t ] = useT();

  return (
    <B {...props}>
      {matched
        // 过滤掉 404
        .filter(({ $$block: { path }}) => path.indexOf("*") === -1)
        .map(({ $$block: { key, path: pathname, title }, ...params }) => (
          <Link key={key} component={L} to={{ pathname, params }}>
            {t(title)}
          </Link>
        ))}
    </B>
  );
};
