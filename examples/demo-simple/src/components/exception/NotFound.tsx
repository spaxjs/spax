import React from "react";
import { Link } from "react-router-dom";

export default function NotFound(props: any) {
  return (
    <div>
      <h3>404 ({props.from || "A"})</h3>
      <p>
        Sorry, the page you visited does not exist.
      </p>
      <hr />
      <p>
        <Link to="/">Home</Link>
      </p>
    </div>
  );
}
