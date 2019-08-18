import { Carrier, Link } from "@spax/router";
import React, { ReactNode } from "react";

export default function UI(props: any): ReactNode {
  return (
    <div>
      <h1>{props.title}</h1>
      <Carrier {...props}>
        <nav>
          <Link to="about/contact">Contact us</Link>
        </nav>
      </Carrier>
    </div>
  );
}