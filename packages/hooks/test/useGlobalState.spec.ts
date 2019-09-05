import { act as actHook, renderHook } from "@testing-library/react-hooks";
import { setGlobalState, useGlobalState } from "../src/useGlobalState";

// tslint:disable: react-hooks-nesting

beforeAll(() => {
  localStorage.clear();
});

afterAll(() => {
  localStorage.clear();
});

describe("initialState", () => {
  test("primitive values", () => {
    const hr
      = renderHook(() => useGlobalState("initialState-primitive-values", 0));
    expect(hr.result.current[0]).toBe(0);
  });

  describe("reference values", () => {
    test("function", () => {
      const hr
        = renderHook(() => useGlobalState("initialState-reference-values-function", () => 2));
      expect(hr.result.current[0]).toBe(2);
    });
  });
});

describe("rehydrate", () => {
  test("parse", () => {
    localStorage.setItem("test3", "[123]");

    const hr1
      = renderHook(() => useGlobalState("test3", 3, localStorage));
    expect(hr1.result.current[0]).toEqual([123]);
  });

  test("catch", () => {
    localStorage.setItem("test4", "{123]");

    const hr
      = renderHook(() => useGlobalState("test4", 4, localStorage));
    expect(hr.result.current[0]).toBe(4);
  });
});

describe("default Storage", () => {
  test("normal", () => {
    const hr1
      = renderHook(() => useGlobalState("default-storage-normal", 5));
    expect(hr1.result.current[0]).toBe(5);

    actHook(() => {
      hr1.result.current[1](1);
    });
    expect(hr1.result.current[0]).toBe(1);

    const hr2
      = renderHook(() => useGlobalState("default-storage-normal", 0));
    expect(hr2.result.current[0]).toBe(1);

    actHook(() => {
      hr2.result.current[1](0);
    });
    expect(hr2.result.current[0]).toBe(0);
  });

  describe("after setGlobalState", () => {
    test("should ignore initialState", () => {
      setGlobalState("default-storage-preset", 6);

      const hr1
        = renderHook(() => useGlobalState("default-storage-preset", 0));
      expect(hr1.result.current[0]).toBe(6);

      actHook(() => {
        hr1.result.current[1](1);
      });
      expect(hr1.result.current[0]).toBe(1);

      const hr2
        = renderHook(() => useGlobalState("default-storage-preset", 0));
      expect(hr2.result.current[0]).toBe(1);

      actHook(() => {
        hr2.result.current[1](0);
      });
      expect(hr1.result.current[0]).toBe(0);
      expect(hr2.result.current[0]).toBe(0);

      hr1.unmount();
      hr2.unmount();
    });
  });
});

describe("persist Storage", () => {
  test("normal", () => {
    const hr1
      = renderHook(() => useGlobalState("persist-storage-normal", 5, localStorage));
    expect(hr1.result.current[0]).toBe(5);

    actHook(() => {
      hr1.result.current[1](1);
    });
    expect(hr1.result.current[0]).toBe(1);

    const hr2
      = renderHook(() => useGlobalState("persist-storage-normal", 0, localStorage));
    expect(hr2.result.current[0]).toBe(1);

    actHook(() => {
      hr2.result.current[1](0);
    });
    expect(hr2.result.current[0]).toBe(0);
  });

  describe("after setGlobalState", () => {
    test("setGlobalState", () => {
      setGlobalState("persist-storage-preset", 6, localStorage);
      expect(localStorage.getItem("persist-storage-preset")).toBe("6");
    });

    test("should ignore initialState", () => {
      const hr1
        = renderHook(() => useGlobalState("persist-storage-preset", 0));
      expect(hr1.result.current[0]).toBe(6);

      actHook(() => {
        hr1.result.current[1](1);
      });
      expect(hr1.result.current[0]).toBe(1);

      const hr2
        = renderHook(() => useGlobalState("persist-storage-preset", 0));
      expect(hr2.result.current[0]).toBe(1);

      actHook(() => {
        hr2.result.current[1](0);
      });
      expect(hr1.result.current[0]).toBe(0);
      expect(hr2.result.current[0]).toBe(0);

      hr1.unmount();
      hr2.unmount();
    });
  });
});

test("sharing", () => {
  const hr1
    = renderHook(() => useGlobalState("test8", 0));
  const hr2
    = renderHook(() => useGlobalState("test8", 1));
  const hr3
    = renderHook(() => useGlobalState("test8", 2));

  expect(hr1.result.current[0]).toBe(0);
  expect(hr2.result.current[0]).toBe(0);
  expect(hr3.result.current[0]).toBe(0);

  actHook(() => {
    // set
    hr1.result.current[1](1);
  });

  expect(hr1.result.current[0]).toBe(1);
  expect(hr2.result.current[0]).toBe(1);
  expect(hr3.result.current[0]).toBe(1);

  hr3.unmount();

  actHook(() => {
    // set
    hr1.result.current[1](2);
  });

  expect(hr1.result.current[0]).toBe(2);
  expect(hr2.result.current[0]).toBe(2);
  expect(hr3.result.current[0]).toBe(1);

  hr1.unmount();
  hr2.unmount();
});
