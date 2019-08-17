import { act, renderHook } from "@testing-library/react-hooks";
import pathToRegexp from "path-to-regexp";
import { useMatched } from "../src/hooks";
import { getMatched } from "../src/utils";

// tslint:disable: react-hooks-nesting

describe("useMatched", () => {
  test("matching nested", () => {
    const nestedModules = [
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
    const { result } = renderHook(() => useMatched("hooks-useMatched"));
    act(() => {
      getMatched("hooks-useMatched", "/father/child", 1, nestedModules, false);
    });
    expect(result.current[0][0].path).toBe("/father");
    act(() => {
      getMatched("hooks-useMatched", "/father/child", 2, nestedModules[0].modules, false);
    });
    expect(result.current[0][0].path).toBe("/father");
    expect(result.current[1][0].path).toBe("/father/child");
  });
});
