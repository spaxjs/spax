import { run, useParsed, useRendered } from "../src";

test("should export", () => {
  expect(typeof run).toBe("function");
  expect(typeof useParsed).toBe("function");
  expect(typeof useRendered).toBe("function");
});
