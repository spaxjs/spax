import { act, render } from "@testing-library/react";
import { act as actHook, renderHook } from "@testing-library/react-hooks";
import { usePathname } from "@wugui/history";
import pathToRegexp from "path-to-regexp";
import React from "react";
import { Carrier, Switch } from "../src/components";

// tslint:disable: react-hooks-nesting

describe("Switch", () => {
  test("NotFound", () => {
    const scope = "test10";
    const modules = [];
    const { container } = render(
      <Switch scope={scope} level={1} modules={modules} />,
    );
    expect(container.textContent).toBe("");
  });

  test("custom NotFound", () => {
    const scope = "test101";
    const modules = [];
    const { container } = render(
      <Switch scope={scope} level={1} modules={modules} NotFound={() => <p>NotFound</p>} />,
    );
    expect(container.textContent).toBe("NotFound");
  });

  test("custom NotFound and loose", () => {
    const scope = "test102";
    const modules = [];
    const { container } = render(
      <Switch loose scope={scope} level={1} modules={modules} NotFound={() => <p>NotFound</p>} />,
    );
    expect(container.textContent).toBe("");
  });

  test("Forbidden", () => {
    const { result } = renderHook(() => usePathname());
    actHook(() => {
      result.current[1]("/father12");
    });
    const scope = "test12";
    const modules = [
      {
        level: 1,
        path: "/father12",
        pathRE: pathToRegexp("/father12"),
        pathKeys: [],
        component: (props: any) => "/father12",
      },
    ];
    const { container } = render(
      <Switch
        scope={scope}
        level={1}
        modules={modules}
        useAuth={() => false}
      />,
    );
    expect(container.textContent).toBe("");
  });

  test("custom Forbidden", () => {
    const { result } = renderHook(() => usePathname());
    actHook(() => {
      result.current[1]("/father121");
    });
    const scope = "test121";
    const modules = [
      {
        level: 1,
        path: "/father121",
        pathRE: pathToRegexp("/father121"),
        pathKeys: [],
        component: (props: any) => "/father121",
      },
    ];
    const { container } = render(
      <Switch
        scope={scope}
        level={1}
        modules={modules}
        useAuth={() => false}
        Forbidden={() => <p>Forbidden</p>}
      />,
    );
    expect(container.textContent).toBe("Forbidden");
  });

  test("with Carrier", () => {
    const { result } = renderHook(() => usePathname());
    actHook(() => {
      result.current[1]("/father13");
    });
    const scope = "test13";
    const modules = [
      {
        level: 1,
        path: "/father13",
        pathRE: pathToRegexp("/father13"),
        pathKeys: [],
        component: Carrier,
      },
    ];
    const { container } = render(
      <Switch scope={scope} level={1} modules={modules} />,
    );
    expect(container.textContent).toBe("");
  });

  test("matching exactly", () => {
    const { result } = renderHook(() => usePathname());
    actHook(() => {
      result.current[1]("/father11");
    });
    const scope = "test11";
    const modules = [
      {
        level: 1,
        path: "/father11",
        pathRE: pathToRegexp("/father11"),
        pathKeys: [],
        component: (props: any) => "/father11",
      },
    ];
    const { container } = render(
      <Switch scope={scope} level={1} modules={modules} />,
    );
    expect(container.textContent).toBe("/father11");
  });

  test("matching nested", () => {
    const { result } = renderHook(() => usePathname());
    actHook(() => {
      result.current[1]("/father14");
    });
    const scope = "test14";
    const nestedModules = [
      {
        level: 1,
        path: "/father14",
        pathRE: pathToRegexp("/father14"),
        pathKeys: [],
        component: (props: any) => (
          <div>
            /father14
            <Carrier {...props} />
          </div>
        ),
        modules: [
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
      <Switch scope={scope} level={1} modules={nestedModules} />,
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
