
import { ICH, IPO } from "@wugui/core";
import { debug } from "@wugui/debug";
import { setGlobalState } from "@wugui/hooks";

export default ({ init }: ICH) => {
  init.tap("Store", ({ initialStates = [] }: IPO) => {
    if (process.env.NODE_ENV === "development")
      debug("Initialize global states: %O", initialStates);

    Object.entries(initialStates).forEach(([key, initialState]) => {
      setGlobalState(key, initialState);
    });
  });
};
