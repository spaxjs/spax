import { act, renderHook } from "@testing-library/react-hooks";
import { useSharedState } from "../src/useSharedState";

// tslint:disable: react-hooks-nesting

describe("useSharedState", () => {
  test("single", async () => {
    const { result, unmount }
      = renderHook(() => useSharedState("test30", 0));

    expect(result.current[0]).toBe(0);

    act(() => {
      // set
      result.current[1](1);
    });

    expect(result.current[0]).toBe(1);

    act(() => {
      // set
      result.current[1](2);
    });

    expect(result.current[0]).toBe(2);

    unmount();
  });

  test("dual", async () => {
    const { result, unmount }
      = renderHook(() => useSharedState("test3000", 0));

    expect(result.current[0]).toBe(0);

    act(() => {
      // set
      result.current[1](1);
    });

    const { result: result1, unmount: unmount1 }
      = renderHook(() => useSharedState("test3000", 0));

    expect(result.current[0]).toBe(1);
    expect(result1.current[0]).toBe(1);

    unmount();
    unmount1();
  });

  test("primitive", async () => {
    const { result, unmount }
      = renderHook(() => useSharedState("test3", 0));
    const { result: result1, unmount: unmount1 }
      = renderHook(() => useSharedState("test3", 1));
    const { result: result2, unmount: unmount2 }
      = renderHook(() => useSharedState("test3", 2));

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
      = renderHook(() => useSharedState("test31", () => 0));
    const { result: result1, unmount: unmount1 }
      = renderHook(() => useSharedState("test31", () => 1));
    const { result: result2, unmount: unmount2 }
      = renderHook(() => useSharedState("test31", () => 2));

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
