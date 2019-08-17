import { act, renderHook } from "@testing-library/react-hooks";
import { addT, changeLng, setup, useT } from "../src";

// tslint:disable: react-hooks-nesting

beforeAll(() => {
  setup();
});

test("useT", () => {
  addT({
    "dev": {
      "foo": "bar",
    },
  });
  const { result } = renderHook(() => useT());
  expect(result.current.t("foo")).toBe("bar");
});

test("changeLng", () => {
  const { result } = renderHook(() => useT());
  act(() => {
    changeLng("zh");
    addT({
      "zh": {
        "foo": "吧",
      },
    });
  });
  expect(result.current.t("foo")).toBe("吧");
});
