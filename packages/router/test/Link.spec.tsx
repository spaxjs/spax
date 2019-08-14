import { render } from "@testing-library/react";
import React from "react";
import { Link } from "../src/components";

// tslint:disable: react-hooks-nesting

describe("Link", () => {
  test("boolean", () => {
    const { container } = render(<Link to={false}>test</Link>);
    expect(container.textContent).toBe("test");
    expect(container.innerHTML).toBe("<a>test</a>");
  });

  test("empty string", () => {
    const { container } = render(<Link to="">test</Link>);
    expect(container.textContent).toBe("test");
    expect(container.innerHTML).toBe("<a href=\"/#/\">test</a>");
  });

  test("empty object", () => {
    const { container } = render(<Link to={{}}>test</Link>);
    expect(container.textContent).toBe("test");
    expect(container.innerHTML).toBe("<a href=\"/#/\">test</a>");
  });

  test("string", () => {
    const { container } = render(<Link to="/login">test</Link>);
    expect(container.textContent).toBe("test");
    expect(container.innerHTML).toBe("<a href=\"/#/login\">test</a>");
  });

  test("object", () => {
    const { container } = render(<Link to={{pathname: "login"}}>test</Link>);
    expect(container.textContent).toBe("test");
    expect(container.innerHTML).toBe("<a href=\"/#/login\">test</a>");
  });

  test("extra props", () => {
    const { container } = render(<Link to={{pathname: "/login"}} title="Login">test</Link>);
    expect(container.textContent).toBe("test");
    expect(container.querySelector("a").title).toBe("Login");
  });

  test("as", () => {
    const L = ({children, ...props}: any) => {
      return <a name="alias" {...props}>{children}</a>;
    };
    const { container } = render(<Link to={{pathname: "/login"}} as={L}>test</Link>);
    expect(container.textContent).toBe("test");
    expect(container.querySelector("a").name).toBe("alias");
  });

  test("component", () => {
    const { container } = render(<Link to={{pathname: "/login"}} component="a">test</Link>);
    expect(container.textContent).toBe("test");
    expect(container.querySelector("a").getAttribute("href")).toBe("/#/login");
  });
});
