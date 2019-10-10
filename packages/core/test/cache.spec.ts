import { cache } from "../src/cache";

// tslint:disable: react-hooks-nesting

beforeAll(() => {
  cache.clear();
});

afterAll(() => {
  cache.clear();
});

describe("cache", () => {
  const key = "key";

  test("get/set/has", () => {
    expect(cache.get(key)).toBe(undefined);
    expect(cache.has(key)).toBe(false);
    cache.set(key, "foo");
    expect(cache.get(key)).toBe("foo");
    expect(cache.has(key)).toBe(true);
    cache.set(key, undefined);
    expect(cache.get(key)).toBe(undefined);
    expect(cache.has(key)).toBe(true);
  });

  test("clear/snapshot/restore", () => {
    const snapshot = cache.snapshot();
    expect(snapshot).toEqual({ [key]: undefined });
    cache.clear();
    expect(cache.has(key)).toBe(false);
    cache.restore(snapshot);
    expect(cache.get(key)).toBe(undefined);
    expect(cache.has(key)).toBe(true);
  });
});
