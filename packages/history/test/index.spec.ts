import { act, renderHook } from "@testing-library/react-hooks";
import { createMemoryHistory } from "history";
import { useHash, useLocation, usePathname, useSearch } from "../src";

const history = createMemoryHistory();

// tslint:disable: react-hooks-nesting

beforeEach(() => {
  const { result } = renderHook(() => useLocation(history));
  act(() =>{
    result.current[1]("/");
  });
});

test("useLocation", () => {
  const { result } = renderHook(() => useLocation(history));
  expect(result.current[0].pathname).toBe("/");
  act(() =>{
    result.current[1]("/login");
  });
  expect(result.current[0].pathname).toBe("/login");
  expect(result.current[0].search).toBe("");
  expect(result.current[0].hash).toBe("");
});

test("useLocation(params)", () => {
  const { result } = renderHook(() => useLocation(history));
  act(() => {
    result.current[1]("/login/:foo", {foo: "bar"});
  });
  expect(result.current[0].pathname).toBe("/login/bar");
  act(() => {
    result.current[1]("/login/:foo", {foo: "baz"});
  });
  expect(result.current[0].pathname).toBe("/login/baz");
});

test("useLocation(search)", () => {
  const { result } = renderHook(() => useLocation(history));
  act(() =>{
    result.current[1]("/login?foo=bar", {}, {buz: "qux"});
  });
  expect(result.current[0].pathname).toBe("/login");
  expect(result.current[0].search).toBe("?foo=bar&buz=qux");
});

test("useLocation(hash)", () => {
  const { result } = renderHook(() => useLocation(history));
  act(() =>{
    result.current[1]("/login#foo=bar", {}, {}, {buz: "qux"});
  });
  expect(result.current[0].pathname).toBe("/login");
  expect(result.current[0].hash).toBe("#foo=bar&buz=qux");
});

test("useLocation(replace)", () => {
  const { result } = renderHook(() => useLocation(history));
  act(() =>{
    result.current[1]("/login2");
    result.current[1]("/login", null, null, null, true);
    history.goBack();
  });
  expect(result.current[0].pathname).toBe("/");
});

test("usePathname", () => {
  const { result } = renderHook(() => usePathname(history));
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
    result.current[1]({});
  });
  expect(result.current[0]).toEqual({});
  act(() =>{
    result.current[1]({foo: "bar"});
  });
  expect(result.current[0]).toEqual({foo: "bar"});
});
