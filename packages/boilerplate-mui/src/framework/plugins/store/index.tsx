
import { ICH, IPO } from "@wugui/core";
import { initGlobalState } from "@wugui/hooks";
import { debug } from "@wugui/utils";

export default ({ init }: ICH) => {
  init.tap("Store", ({ initialStates = [] }: IPO) => {
    if (process.env.NODE_ENV !== "production")
      debug("Initialize global states: %O", initialStates);

    Object.entries(initialStates).forEach(([key, initialState]) => {
      initGlobalState(key, initialState);
    });
  });
};
