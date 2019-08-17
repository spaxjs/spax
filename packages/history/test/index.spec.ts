import { act, renderHook } from "@testing-library/react-hooks";
import { createMemoryHistory } from "history";
import { useHash, useLocation, usePathname, useSearch } from "../src";

const history = createMemoryHistory();

// tslint:disable: react-hooks-nesting

test("useLocation", () => {
  const { result } = renderHook(() => useLocation(history));
  expect(result.current[0].pathname).toBe("/");
  act(() =>{
    result.current[1]("/login");
  });
  expect(result.current[0].pathname).toBe("/login");
});

test("useLocation(replace)", () => {
  const { result } = renderHook(() => useLocation(history));
  expect(result.current[0].pathname).toBe("/login");
  act(() =>{
    result.current[1]("/login2");
    result.current[1]("/login", null, null, null, true);
    history.goBack();
  });
  expect(result.current[0].pathname).toBe("/login");
});

test("usePathname", () => {
  const { result } = renderHook(() => usePathname(history));
  // from test:useLocation
  expect(result.current[0]).toBe("/login");
  act(() =>{
    result.current[1]("/register");
  });
  expect(result.current[0]).toBe("/register");
});

test("useSearch", () => {
  const { result } = renderHook(() => useSearch(history));
  expect(result.current[0]).toEqual({});
  act(() =>{
    result.current[1]({foo: "bar"});
  });
  expect(result.current[0].foo).toBe("bar");
});

test("useHash", () => {
  const { result } = renderHook(() => useHash(history));
  expect(result.current[0]).toEqual({});
  act(() =>{
    result.current[1]({foo: "bar"});
  });
  expect(result.current[0].foo).toBe("bar");
});
