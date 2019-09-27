import { act as actHook, renderHook } from "@testing-library/react-hooks";
import { setup, useLng, useT } from "../src";

// tslint:disable: react-hooks-nesting

beforeAll(() => {
  setup({
    initImmediate: false,
  });
});

test("useT", () => {
  const { result } = renderHook(() => useT());
  actHook(() => {
    result.current[1]({foo: "bar"});
  });
  expect(result.current[0]("foo")).toBe("bar");
});

test("useLng", () => {
  const { result } = renderHook(() => useLng());
  actHook(() => {
    result.current[1]("zh");
  });
  expect(result.current[0]).toBe("zh");
});
