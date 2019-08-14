import "jest";
import { debug, error, fatal, log, trace, warn } from "../src";

test("debug", () => {
  expect(typeof log).toBe("function");
  expect(typeof debug).toBe("function");
  expect(typeof warn).toBe("function");
  expect(typeof trace).toBe("function");
  expect(typeof error).toBe("function");
  expect(typeof fatal).toBe("function");
});
