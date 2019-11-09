import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function UI(props: any): ReactNode {
  console.log(props);

  return (
    <div>
      <h1>{props.title}</h1>
      <nav>
        <ul>
          <li>
            <Link
              to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link
              to="/nested">Nested</Link>
              <ul>
                <li>
                  <Link
                    to="/nested/c1">Nested/C1</Link>
                    <ul>
                      <li>
                        <Link
                          to="/nested/c1/c1">Nested/C1/C1</Link>
                      </li>
                      <li>
                        <Link
                          to="/nested/c1/c2">Nested/C1/C2</Link>
                      </li>
                    </ul>
                </li>
              </ul>
          </li>
          <li>
            <Link
              to="/404">404</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
