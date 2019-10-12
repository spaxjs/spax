
import { IPlugin, IPO, ISlots } from "@spax/core";
import { log } from "@spax/debug";
import { setGlobalState } from "@spax/hooks";

export default {
  name: "Store",
  deps: [],
  plug: ({ init }: ISlots, { initialStates = [] }: IPO) => {
    init.tap(() => {
      /* istanbul ignore next */
      if (process.env.NODE_ENV === "development")
        log("Initialize global states: %O", initialStates);

      initialStates.forEach(({ storage, states }) => {
        Object.entries(states).forEach(([key, initialState]) => {
          setGlobalState(key, initialState, storage);
        });
      });
    });
  },
} as IPlugin;
