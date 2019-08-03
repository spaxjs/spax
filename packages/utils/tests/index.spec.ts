import "jest";
import * as utils from "../src";

test("camelCase", () => {
  expect(typeof utils.camelCase).toBe("function");
  expect(utils.camelCase("a-b")).toBe("aB");
});

test("debug", () => {
  expect(typeof utils.log).toBe("function");
  expect(typeof utils.warn).toBe("function");
  expect(typeof utils.error).toBe("function");
  expect(typeof utils.trace).toBe("function");
});
