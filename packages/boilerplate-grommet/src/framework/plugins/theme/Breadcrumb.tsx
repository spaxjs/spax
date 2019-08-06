import { Link, useMatched } from "@wugui/plugin-router";
import React from "react";
import styled from "styled-components";

export const Outer = styled("div")`
  margin-bottom: 1rem;
  &:empty {
    display: none;
  }
`;

export default function Breadcrumb(props: any) {
  const matched = useMatched();

  return (
    <Outer {...props}>
      {
        matched.map(([{key, path, title}, params], index) => {
          return (
            <span key={key}>
              {matched.length === index + 1 ? "" : "/"}
              <Link to={{pathname: path, params}}>{title}</Link>
            </span>
          );
        })
      }
    </Outer>
  );
}
