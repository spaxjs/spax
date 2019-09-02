import { usePathname } from "@spax/history";
import { render } from "@testing-library/react";
import { act as actHook, renderHook } from "@testing-library/react-hooks";
import pathToRegexp from "path-to-regexp";
import React from "react";
import {
  useBlock,
  useExact,
  useMatchedArrayOfBlockAndParams,
  useMatchedBlockAndParams,
  useMatchedFromChildBocks,
  useMatchedFromChildBocksOnTheFly,
} from "../src/hooks";

// tslint:disable: react-hooks-nesting

test("useBlock", () => {
  expect(useBlock({ $$block: { path: "/" } } as any)).toEqual({ path: "/" });
  expect(useBlock({ $$block: { path: "/login" } } as any)).toEqual({
    path: "/login",
  });
});

test("useExact", () => {
  expect(useExact({ $$exact: true } as any)).toBe(true);
  expect(useExact({ $$exact: false } as any)).toBe(false);
});

test("useMatchedFromChildBocks", () => {
  const block = {
    level: 1,
    path: "/father",
    pathRE: pathToRegexp("/father"),
    pathKeys: [],
    component: () => "/father",
    blocks: [
      {
        level: 2,
        path: "/father/child",
        pathRE: pathToRegexp("/father/child"),
        pathKeys: [],
        component: () => "/father/child",
      },
    ],
  };
  const { result: result0 } = renderHook(() => usePathname());
  actHook(() => {
    result0.current[1]("/father/child");
  });
  const { result } = renderHook(() =>
    useMatchedFromChildBocks({
      $$exact: false,
      $$block: block,
      $$useAuth: () => true,
      $$NotFound: () => <p>NotFound</p>,
      $$Forbidden: () => <p>Forbidden</p>,
    }),
  );
  const C = result.current;
  const { container } = render(<C />);
  expect(container.textContent).toBe("/father/child");
});

test("useMatchedFromChildBocksOnTheFly", () => {
  const block = {
    level: 1,
    path: "/father",
    pathRE: pathToRegexp("/father"),
    pathKeys: [],
    component: () => "/father",
    blocks: [
      {
        level: 2,
        path: "/father/child",
        pathRE: pathToRegexp("/father/child"),
        pathKeys: [],
        component: () => "/father/child",
      },
    ],
  };
  const { result: result0 } = renderHook(() => usePathname());
  actHook(() => {
    result0.current[1]("/father/child");
  });
  const { result } = renderHook(() =>
    useMatchedFromChildBocksOnTheFly({
      $$exact: false,
      $$block: block,
      $$useAuth: () => true,
      $$NotFound: () => <p>NotFound</p>,
      $$Forbidden: () => <p>Forbidden</p>,
    }, block.blocks),
  );
  const C = result.current;
  const { container } = render(<C />);
  expect(container.textContent).toBe("/father/child");
});

test("useMatchedFromChildBocksOnTheFly 2", () => {
  const block = {
    level: 1,
    path: "/father",
    pathRE: pathToRegexp("/father"),
    pathKeys: [],
    component: () => "/father",
    blocks: null,
  };
  const { result: result0 } = renderHook(() => usePathname());
  actHook(() => {
    result0.current[1]("/father/child");
  });
  const { result } = renderHook(() =>
    useMatchedFromChildBocksOnTheFly({
      $$exact: false,
      $$block: block,
      $$useAuth: () => true,
      $$NotFound: () => <p>NotFound</p>,
      $$Forbidden: () => <p>Forbidden</p>,
    }, block.blocks),
  );
  const C = result.current;
  const { container } = render(<C />);
  expect(container.textContent).toBe("");
});

test("useMatchedArrayOfBlockAndParams", () => {
  const blocks = [
    {
      level: 1,
      path: "/father",
      pathRE: pathToRegexp("/father"),
      pathKeys: [],
      blocks: [
        {
          level: 2,
          path: "/father/child",
          pathRE: pathToRegexp("/father/child"),
          pathKeys: [],
        },
      ],
    },
  ];
  const { result: result0 } = renderHook(() =>
    useMatchedArrayOfBlockAndParams(),
  );
  renderHook(() =>
    useMatchedBlockAndParams("/father/child", 1, blocks, false),
  );
  expect(result0.current[0][0].path).toBe("/father");
  renderHook(() =>
    useMatchedBlockAndParams("/father/child", 2, blocks[0].blocks, false),
  );
  expect(result0.current[0][0].path).toBe("/father");
  expect(result0.current[1][0].path).toBe("/father/child");
});
