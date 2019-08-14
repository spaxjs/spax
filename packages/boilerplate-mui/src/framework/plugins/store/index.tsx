
import { ICH, IPO } from "@wugui/core";
import { setGlobalState } from "@wugui/hooks";
import { debug } from "@wugui/debug";

export default ({ init }: ICH) => {
  init.tap("Store", ({ initialStates = [] }: IPO) => {
    if (process.env.NODE_ENV === "development")
      debug("Initialize global states: %O", initialStates);

    Object.entries(initialStates).forEach(([key, initialState]) => {
      setGlobalState(key, initialState);
    });
  });
};
