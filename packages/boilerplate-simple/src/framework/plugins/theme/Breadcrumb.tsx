import { Link, useMatched } from "@wugui/plugin-router";
import { Breadcrumb as AntBreadcrumb } from "antd";
import React from "react";
import styled from "styled-components";

export const BreadcrumbOuter: typeof AntBreadcrumb = styled(AntBreadcrumb)`
  margin-bottom: 1rem;
  &:empty {
    display: none;
  }
`;

export default function Breadcrumb(props: any) {
  const matched = useMatched();

  return (
    <BreadcrumbOuter {...props}>
      {
        matched.map(([{key, path, title}, params]) => {
          return (
            <AntBreadcrumb.Item key={key}>
              <Link to={{pathname: path, params}}>{title}</Link>
            </AntBreadcrumb.Item>
          );
        })
      }
    </BreadcrumbOuter>
  );
}
