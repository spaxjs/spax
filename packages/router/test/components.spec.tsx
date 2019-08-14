import { act, render } from "@testing-library/react";
import { act as actHook, renderHook } from "@testing-library/react-hooks";
import { usePathname } from "@wugui/history";
import pathToRegexp from "path-to-regexp";
import React from "react";
import { Carrier, Router, Switch } from "../src/components";

// tslint:disable: react-hooks-nesting

const nestedModules = [
  {
    level: 1,
    path: "/father",
    pathRE: pathToRegexp("/father"),
    pathKeys: [],
    component: (props: any) => (<div>/father<Carrier {...props} /></div>),
    modules: [
      {
        level: 2,
        path: "/father/child",
        pathRE: pathToRegexp("/father/child"),
        pathKeys: [],
        component: (props: any) => "/father/child",
      },
    ],
  },
];

describe("Router", () => {
  test("no matched!", () => {
    const modules = [];
    const { container } = render(
      <Router scope="test1" modules={modules}>
        test
      </Router>,
    );
    expect(container.textContent).toBe("");
  });

  test("matching exactly", () => {
    const modules = [
      { level: 1, path: "", pathRE: pathToRegexp(""), pathKeys: [] },
    ];
    const { container } = render(
      <Router scope="test2" modules={modules}>
        test
      </Router>,
    );
    expect(container.textContent).toBe("test");
  });

  test("matching ancestor", () => {
    const { result } = renderHook(() => usePathname());
    actHook(() => {
      result.current[1]("/father/child");
    });
    const modules = [
      {
        level: 1,
        path: "/father",
        pathRE: pathToRegexp("/father"),
        pathKeys: [],
      },
    ];
    const { container } = render(
      <Router scope="test3" modules={modules}>
        test
      </Router>,
    );
    expect(container.textContent).toBe("test");
    act(() => {
      actHook(() => {
        result.current[1]("/father");
      });
    });
    expect(container.textContent).toBe("test");
    act(() => {
      actHook(() => {
        result.current[1]("/child");
      });
    });
    expect(container.textContent).toBe("");
  });

  test("matching nested", () => {
    const { result } = renderHook(() => usePathname());
    actHook(() => {
      result.current[1]("/father/child");
    });
    const { container } = render(
      <Router scope="test4" modules={nestedModules}>
        test
      </Router>,
    );
    expect(container.textContent).toBe("test");
    act(() => {
      actHook(() => {
        result.current[1]("/father");
      });
    });
    expect(container.textContent).toBe("test");
    act(() => {
      actHook(() => {
        result.current[1]("/father/child");
      });
    });
    expect(container.textContent).toBe("test");
    act(() => {
      actHook(() => {
        result.current[1]("/father/child-no-exists");
      });
    });
    expect(container.textContent).toBe("test");
  });
});

describe("Switch", () => {
  test("no matched!", () => {
    const scope = "test11";
    const modules = [];
    const { container } = render(
      <Router scope={scope} modules={modules}>
        <Switch
          scope={scope}
          level={1}
          modules={modules} />
      </Router>,
    );
    expect(container.textContent).toBe("");
  });

  test("matching nested", () => {
    const { result } = renderHook(() => usePathname());
    actHook(() => {
      result.current[1]("/father");
    });
    const scope = "test12";
    const { container } = render(
      <Router
        scope={scope}
        modules={nestedModules}>
        <Switch
          scope={scope}
          level={1}
          modules={nestedModules} />
      </Router>,
    );
    expect(container.textContent).toBe("/father");
    act(() => {
      actHook(() => {
        result.current[1]("/father/child");
      });
    });
    expect(container.textContent).toBe("/father/father/child");
    act(() => {
      actHook(() => {
        result.current[1]("/father/child-no-exists");
      });
    });
    expect(container.textContent).toBe("/father");
  });
});
