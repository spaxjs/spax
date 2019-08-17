import { act, renderHook } from "@testing-library/react-hooks";
import { setGlobalState, useGlobalState } from "../src/useGlobalState";

// tslint:disable: react-hooks-nesting

const prefix = "@spax&hooks&persist&";

beforeAll(() => {
  localStorage.removeItem(`${prefix}test2`);
  localStorage.removeItem(`${prefix}test21`);
});

afterAll(() => {
  localStorage.removeItem(`${prefix}test2`);
  localStorage.removeItem(`${prefix}test21`);
});

describe("setGlobalState", () => {
  test("number", async () => {
    const cacheMap = new Map();
    setGlobalState("test22", 0, cacheMap);

    expect(cacheMap.get("test22")).toBe(0);
  });

  test("function", async () => {
    const cacheMap = new Map();
    setGlobalState("test22", () => 0, cacheMap);

    expect(cacheMap.get("test22")).toBe(0);
  });
});

describe("useGlobalState", () => {
  test("primitive", async () => {
    const { result, unmount }
      = renderHook(() => useGlobalState("test2", 0));
    const { result: result1, unmount: unmount1 }
      = renderHook(() => useGlobalState("test2", 1));
    const { result: result2, unmount: unmount2 }
      = renderHook(() => useGlobalState("test2", 2));

    expect(result.current[0]).toBe(0);
    expect(result1.current[0]).toBe(0);
    expect(result2.current[0]).toBe(0);

    act(() => {
      // set
      result.current[1](1);
    });

    expect(result.current[0]).toBe(1);
    expect(result1.current[0]).toBe(1);
    expect(result2.current[0]).toBe(1);

    unmount2();

    act(() => {
      // set
      result.current[1](2);
    });

    expect(result.current[0]).toBe(2);
    expect(result1.current[0]).toBe(2);
    expect(result2.current[0]).toBe(1);

    unmount();
    unmount1();
  });

  test("function", async () => {
    const { result, unmount }
      = renderHook(() => useGlobalState("test21", () => 0));
    const { result: result1, unmount: unmount1 }
      = renderHook(() => useGlobalState("test21", () => 1));
    const { result: result2, unmount: unmount2 }
      = renderHook(() => useGlobalState("test21", () => 2));

    expect(result.current[0]).toBe(0);
    expect(result1.current[0]).toBe(0);
    expect(result2.current[0]).toBe(0);

    act(() => {
      // set
      result.current[1](1);
    });

    expect(result.current[0]).toBe(1);
    expect(result1.current[0]).toBe(1);
    expect(result2.current[0]).toBe(1);

    unmount2();

    act(() => {
      // set
      result.current[1](2);
    });

    expect(result.current[0]).toBe(2);
    expect(result1.current[0]).toBe(2);
    expect(result2.current[0]).toBe(1);

    unmount();
    unmount1();
  });
});
