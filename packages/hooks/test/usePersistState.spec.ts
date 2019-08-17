import { act, renderHook } from "@testing-library/react-hooks";
import { usePersistState } from "../src/usePersistState";

// tslint:disable: react-hooks-nesting

const prefix = "@spax&hooks&persist&";

beforeAll(() => {
  localStorage.removeItem(`${prefix}test1`);
  localStorage.removeItem(`${prefix}test10`);
  localStorage.removeItem(`${prefix}test100`);
  localStorage.removeItem(`${prefix}test1000`);
});

afterAll(() => {
  localStorage.removeItem(`${prefix}test1`);
  localStorage.removeItem(`${prefix}test10`);
  localStorage.removeItem(`${prefix}test100`);
  localStorage.removeItem(`${prefix}test1000`);
});

describe("initial value", () => {
  test("primitive", async () => {
    const { result }
      = renderHook(() => usePersistState("test1", 0));

    expect(result.current[0]).toBe(0);
  });

  test("function", async () => {
    const { result }
      = renderHook(() => usePersistState("test10", () => 0));

    expect(result.current[0]).toBe(0);
  });

  test("parse", async () => {
    localStorage.setItem(`${prefix}test1000`, "[123]");
    const { result }
      = renderHook(() => usePersistState("test1000", 0));

    expect(result.current[0]).toEqual([123]);
  });

  test("catch", async () => {
    localStorage.setItem(`${prefix}test1000`, "{123]");
    const { result }
      = renderHook(() => usePersistState("test1000", 0));

    expect(result.current[0]).toBe(0);
  });
});

describe("persist state", () => {
  test("first", async () => {
    const { result }
      = renderHook(() => usePersistState("test100", 0));

    expect(result.current[0]).toBe(0);

    act(() => {
      result.current[1](1);
    });

    expect(result.current[0]).toBe(1);
  });

  test("second", async () => {
    const { result }
      = renderHook(() => usePersistState("test100", 0));

    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1](0);
    });

    expect(result.current[0]).toBe(0);
  });
});
