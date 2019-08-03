import "jest";
import { Framework, getParsedModules, getRenderedModules, mount } from "../src";

test("exports", () => {
  expect(typeof mount).toBe("function");
  expect(typeof getParsedModules).toBe("function");
  expect(typeof getRenderedModules).toBe("function");
  expect(typeof Framework).toBe("function");
});
