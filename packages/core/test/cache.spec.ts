import { act as actHook, renderHook } from "@testing-library/react-hooks";
import { cache, useCached } from "../src/cache";

// tslint:disable: react-hooks-nesting

beforeAll(() => {
  cache.clear();
});

afterEach(() => {
  cache.clear();
});

describe("cache", () => {
  test("get/set/has/clear/snapshot/restore", () => {
    const key = "key";
    expect(cache.get(key)).toBe(undefined);
    expect(cache.has(key)).toBe(false);
    cache.set(key, "foo");
    expect(cache.get(key)).toBe("foo");
    expect(cache.has(key)).toBe(true);
    cache.set(key, undefined);
    expect(cache.get(key)).toBe(undefined);
    expect(cache.has(key)).toBe(true);
    const snapshot = cache.snapshot();
    expect(snapshot).toEqual({ [key]: undefined });
    cache.clear();
    expect(cache.has(key)).toBe(false);
    cache.restore(snapshot);
    expect(cache.get(key)).toBe(undefined);
    expect(cache.has(key)).toBe(true);
  });
});

describe("cache", () => {
  test("useCached", () => {
    const key = "key";
    cache.set(key, "foo");
    const { result, unmount } = renderHook(() => useCached(key));
    const { result: result2, unmount: unmount2 } = renderHook(() => useCached(key));
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
});
