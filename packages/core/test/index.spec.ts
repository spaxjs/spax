import "jest";
import { mount, useParsed, useRendered } from "../src";

test("exports", () => {
  expect(typeof mount).toBe("function");
  expect(typeof useParsed).toBe("function");
  expect(typeof useRendered).toBe("function");
});
