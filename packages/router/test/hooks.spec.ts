import { act, renderHook } from "@testing-library/react-hooks";
import pathToRegexp from "path-to-regexp";
import { useExact, useMatched, useMeta } from "../src/hooks";
import { getMatched } from "../src/utils";

// tslint:disable: react-hooks-nesting

test("useMeta", () => {
  expect(useMeta({$$meta: { path: "/" }} as any)).toEqual({ path: "/"});
  expect(useMeta({$$meta: { path: "/login" }} as any)).toEqual({ path: "/login"});
});

test("useExact", () => {
  expect(useExact({$$exact: true} as any)).toBe(true);
  expect(useExact({$$exact: false} as any)).toBe(false);
});

test("useMatched", () => {
  const scope = "useMatched";
  const modules = [
    {
      level: 1,
      path: "/father",
      pathRE: pathToRegexp("/father"),
      pathKeys: [],
      modules: [
        {
          level: 2,
          path: "/father/child",
          pathRE: pathToRegexp("/father/child"),
          pathKeys: [],
        },
      ],
    },
  ];
  const { result } = renderHook(() => useMatched(scope));
  act(() => {
    getMatched(scope, "/father/child", 1, modules, false);
  });
  expect(result.current[0][0].path).toBe("/father");
  act(() => {
    getMatched(scope, "/father/child", 2, modules[0].modules, false);
  });
  expect(result.current[0][0].path).toBe("/father");
  expect(result.current[1][0].path).toBe("/father/child");
});
