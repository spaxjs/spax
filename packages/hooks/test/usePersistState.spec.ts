import { act, renderHook } from "@testing-library/react-hooks";
import { usePersistState } from "../src/usePersistState";

// tslint:disable: react-hooks-nesting

beforeAll(() => {
  localStorage.removeItem("test1");
  localStorage.removeItem("test10");
  localStorage.removeItem("test100");
});

afterAll(() => {
  localStorage.removeItem("test1");
  localStorage.removeItem("test10");
  localStorage.removeItem("test100");
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
