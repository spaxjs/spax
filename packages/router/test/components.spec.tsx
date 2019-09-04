import { usePathname } from "@spax/history";
import { act, render } from "@testing-library/react";
import { act as actHook, renderHook } from "@testing-library/react-hooks";
import pathToRegexp from "path-to-regexp";
import React from "react";
import { Link, MatchedChildBockOrChildren, Switch } from "../src/components";

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

describe("Switch", () => {
  test("NotFound", () => {
    const blocks = [];
    const { container } = render(
      <Switch level={1} blocks={blocks} />,
    );
    expect(container.textContent).toBe("");
  });

  test("custom NotFound", () => {
    const blocks = [];
    const { container } = render(
      <Switch level={1} blocks={blocks} NotFound={() => <p>NotFound</p>} />,
    );
    expect(container.textContent).toBe("NotFound");
  });

  test("custom NotFound and loose", () => {
    const blocks = [];
    const { container } = render(
      <Switch loose level={1} blocks={blocks} NotFound={() => <p>NotFound</p>} />,
    );
    expect(container.textContent).toBe("");
  });

  test("with MatchedChildBockOrChildren", () => {
    const { result } = renderHook(() => usePathname());
    actHook(() => {
      result.current[1]("/father13");
    });
    const blocks = [
      {
        level: 1,
        path: "/father13",
        pathRE: pathToRegexp("/father13"),
        pathKeys: [],
        component: MatchedChildBockOrChildren,
      },
    ];
    const { container } = render(
      <Switch level={1} blocks={blocks} />,
    );
    expect(container.textContent).toBe("");
  });

  test("matching exactly", () => {
    const { result } = renderHook(() => usePathname());
    actHook(() => {
      result.current[1]("/father11");
    });
    const blocks = [
      {
        level: 1,
        path: "/father11",
        pathRE: pathToRegexp("/father11"),
        pathKeys: [],
        component: (props: any) => "/father11",
      },
    ];
    const { container } = render(
      <Switch level={1} blocks={blocks} />,
    );
    expect(container.textContent).toBe("/father11");
  });

  test("matching nested", () => {
    const { result } = renderHook(() => usePathname());
    actHook(() => {
      result.current[1]("/father14");
    });
    const nestedBlocks = [
      {
        level: 1,
        path: "/father14",
        pathRE: pathToRegexp("/father14"),
        pathKeys: [],
        component: (props: any) => (
          <div>
            /father14
            <MatchedChildBockOrChildren {...props} />
          </div>
        ),
        blocks: [
          {
            level: 2,
            path: "/father14/child",
            pathRE: pathToRegexp("/father14/child"),
            pathKeys: [],
            component: (props: any) => "/father14/child",
          },
        ],
      },
    ];
    const { container } = render(
      <Switch level={1} blocks={nestedBlocks} />,
    );
    expect(container.textContent).toBe("/father14");
    act(() => {
      actHook(() => {
        result.current[1]("/father14/child");
      });
    });
    expect(container.textContent).toBe("/father14/father14/child");
    act(() => {
      actHook(() => {
        result.current[1]("/father14/child-no-exists");
      });
    });
    expect(container.textContent).toBe("/father14");
  });
});
