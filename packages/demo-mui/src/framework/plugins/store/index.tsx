
import { IHooks, IPO } from "@spax/core";
import { debug } from "@spax/debug";
import { setGlobalState } from "@spax/hooks";

export default ({ init }: IHooks) => {
  init.tap(
    "Store",
    [],
    ({ initialStates = [] }: IPO) => {
      if (process.env.NODE_ENV === "development")
        debug("Initialize global states: %O", initialStates);

      Object.entries(initialStates).forEach(([key, initialState]) => {
        setGlobalState(key, initialState);
      });
    },
  );
};
