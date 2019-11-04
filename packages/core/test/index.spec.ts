import { Core } from "../src";
import { Core as _Core} from "../src/core";

test("should export", () => {
  expect(Core).toBe(_Core);
});
