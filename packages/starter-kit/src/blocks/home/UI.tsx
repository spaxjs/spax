import { Link } from "@spax/router";
import React, { ReactNode } from "react";

export default function UI(props: any): ReactNode {
  return (
    <div>
      <h1>{props.title}</h1>
      <nav>
        <Link to="/about">About us</Link>
      </nav>
    </div>
  );
}
