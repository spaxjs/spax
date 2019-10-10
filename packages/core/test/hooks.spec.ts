import { act as actHook, renderHook } from "@testing-library/react-hooks";
import { cache } from "../src/cache";
import { KEY_PARSED, KEY_RENDERED } from "../src/constants";
import { useParsed, useRendered } from "../src/hooks";

// tslint:disable: react-hooks-nesting

beforeAll(() => {
  cache.clear();
});

afterAll(() => {
  cache.clear();
});

test("useParsed", () => {
  cache.set(KEY_PARSED, [{ title: "foo" }]);
  const { result, unmount } = renderHook(() => useParsed());
  const { result: result2, unmount: unmount2 } = renderHook(() => useParsed());
  expect(result.current[0][0].title).toBe("foo");
  expect(result2.current[0][0].title).toBe("foo");
  actHook(() => {
    result.current[1]([{ title: "bar" }]);
  });
  expect(result.current[0][0].title).toBe("bar");
  expect(result2.current[0][0].title).toBe("bar");
  unmount();
  unmount2();
});

test("useRendered", () => {
  cache.set(KEY_RENDERED, "foo");
  const { result, unmount } = renderHook(() => useRendered());
  const { result: result2, unmount: unmount2 } = renderHook(() =>
    useRendered(),
  );
  expect(result.current[0]).toBe("foo");
  expect(result2.current[0]).toBe("foo");
  actHook(() => {
    result.current[1]("bar");
  });
  expect(result.current[0]).toBe("bar");
  expect(result2.current[0]).toBe("bar");
  unmount();
  unmount2();
});
