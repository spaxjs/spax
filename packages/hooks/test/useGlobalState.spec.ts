import { act as actHook, renderHook } from "@testing-library/react-hooks";
import { prefix, setGlobalState ,useGlobalState } from "../src/useGlobalState";

// tslint:disable: react-hooks-nesting

beforeAll(() => {
  localStorage.removeItem(`${prefix}test1`);
  localStorage.removeItem(`${prefix}test2`);
  localStorage.removeItem(`${prefix}test3`);
  localStorage.removeItem(`${prefix}test4`);
  localStorage.removeItem(`${prefix}test5`);
  localStorage.removeItem(`${prefix}test6`);
  localStorage.removeItem(`${prefix}test7`);
  localStorage.removeItem(`${prefix}test8`);
  localStorage.removeItem(`${prefix}test9`);
});

afterAll(() => {
  localStorage.removeItem(`${prefix}test1`);
  localStorage.removeItem(`${prefix}test2`);
  localStorage.removeItem(`${prefix}test3`);
  localStorage.removeItem(`${prefix}test4`);
  localStorage.removeItem(`${prefix}test5`);
  localStorage.removeItem(`${prefix}test6`);
  localStorage.removeItem(`${prefix}test7`);
  localStorage.removeItem(`${prefix}test8`);
  localStorage.removeItem(`${prefix}test9`);
});

describe("initialState", () => {
  test("primitive", () => {
    const { result }
      = renderHook(() => useGlobalState("test1", 0));

    expect(result.current[0]).toBe(0);
  });

  test("function", () => {
    const { result }
      = renderHook(() => useGlobalState("test2", () => 2));

    expect(result.current[0]).toBe(2);
  });
});

describe("rehydrate", () => {
  test("parse", () => {
    localStorage.setItem(`${prefix}test3`, "[123]");
    const { result }
      = renderHook(() => useGlobalState("test3", 3));

    expect(result.current[0]).toEqual([123]);
  });

  test("catch", () => {
    localStorage.setItem(`${prefix}test4`, "{123]");
    const { result }
      = renderHook(() => useGlobalState("test4", 4));

    expect(result.current[0]).toBe(4);
  });
});

describe("persist", () => {
  test("first", () => {
    const { result }
      = renderHook(() => useGlobalState("test5", 5));

    expect(result.current[0]).toBe(5);

    actHook(() => {
      result.current[1](1);
    });

    expect(result.current[0]).toBe(1);
  });

  test("second", () => {
    const { result }
      = renderHook(() => useGlobalState("test5", 0));

    expect(result.current[0]).toBe(1);

    actHook(() => {
      result.current[1](0);
    });

    expect(result.current[0]).toBe(0);
  });
});

describe("persist after preset", () => {
  test("preset", () => {
    setGlobalState("test6", 6);

    expect(localStorage.getItem(`${prefix}test6`)).toBe("6");
  });

  test("first", () => {
    const { result }
      = renderHook(() => useGlobalState("test6", 0));

    expect(result.current[0]).toBe(6);

    actHook(() => {
      result.current[1](1);
    });

    expect(result.current[0]).toBe(1);
  });

  test("second", () => {
    const { result }
      = renderHook(() => useGlobalState("test6", 0));

    expect(result.current[0]).toBe(1);

    actHook(() => {
      result.current[1](0);
    });

    expect(result.current[0]).toBe(0);
  });
});

describe("no persist", () => {
  test("preset", () => {
    setGlobalState("test7", 7, null);

    expect(localStorage.getItem(`${prefix}test7`)).toBe(null);
  });

  test("first", () => {
    const { result }
      = renderHook(() => useGlobalState("test7", 7, null));

    expect(result.current[0]).toBe(7);

    actHook(() => {
      result.current[1](1);
    });

    expect(result.current[0]).toBe(1);
  });

  test("second", () => {
    const { result }
      = renderHook(() => useGlobalState("test7", 70, null));

    expect(result.current[0]).toBe(70);

    actHook(() => {
      result.current[1](0);
    });

    expect(result.current[0]).toBe(0);
  });
});

describe("shared", () => {
  test("primitive", () => {
    const { result, unmount }
      = renderHook(() => useGlobalState("test8", 0));
    const { result: result1, unmount: unmount1 }
      = renderHook(() => useGlobalState("test8", 1));
    const { result: result2, unmount: unmount2 }
      = renderHook(() => useGlobalState("test8", 2));

    expect(result.current[0]).toBe(0);
    expect(result1.current[0]).toBe(0);
    expect(result2.current[0]).toBe(0);

    actHook(() => {
      // set
      result.current[1](1);
    });

    expect(result.current[0]).toBe(1);
    expect(result1.current[0]).toBe(1);
    expect(result2.current[0]).toBe(1);

    unmount2();

    actHook(() => {
      // set
      result.current[1](2);
    });

    expect(result.current[0]).toBe(2);
    expect(result1.current[0]).toBe(2);
    expect(result2.current[0]).toBe(1);

    unmount();
    unmount1();
  });

  test("function", () => {
    const { result, unmount }
      = renderHook(() => useGlobalState("test9", () => 0));
    const { result: result1, unmount: unmount1 }
      = renderHook(() => useGlobalState("test9", () => 1));
    const { result: result2, unmount: unmount2 }
      = renderHook(() => useGlobalState("test9", () => 2));

    expect(result.current[0]).toBe(0);
    expect(result1.current[0]).toBe(0);
    expect(result2.current[0]).toBe(0);

    actHook(() => {
      // set
      result.current[1](1);
    });

    expect(result.current[0]).toBe(1);
    expect(result1.current[0]).toBe(1);
    expect(result2.current[0]).toBe(1);

    unmount2();

    actHook(() => {
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
