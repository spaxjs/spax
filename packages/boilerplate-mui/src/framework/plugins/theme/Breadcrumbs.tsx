import { Breadcrumbs as B, Link as L} from "@material-ui/core";
import { BreadcrumbsProps } from "@material-ui/core/Breadcrumbs";
import { Link, useMatched } from "@wugui/router";
import React from "react";

const Breadcrumbs: React.FC<BreadcrumbsProps> = (props: any) => {
  const matched = useMatched();

  return (
    <B {...props}>
      {
        matched.map(([{key, path: pathname, title}, params], index) => {
          return (
            <Link
              key={key}
              component={L}
              to={{pathname, params}}
            >{title}</Link>
          );
        })
      }
    </B>
  );
};

export default Breadcrumbs;
