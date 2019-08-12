import { act, renderHook } from "@testing-library/react-hooks";
import { useGlobalState } from "../src/useGlobalState";

// tslint:disable: react-hooks-nesting

beforeAll(() => {
  localStorage.removeItem("test2");
});

afterAll(() => {
  localStorage.removeItem("test2");
});

describe("useGlobalState", () => {
  test("shared", async () => {
    const { result, unmount }
      = renderHook(() => useGlobalState("test2", 0));
    const { result: result1, unmount: unmount1 }
      = renderHook(() => useGlobalState("test2", 0));
    const { result: result2, unmount: unmount2 }
      = renderHook(() => useGlobalState("test2", 0));

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

    act(() => {
      // reset
      result.current[2]();
    });

    expect(result.current[0]).toBe(0);
    expect(result1.current[0]).toBe(0);
    expect(result2.current[0]).toBe(1);

    unmount();
    unmount1();
  });
});
