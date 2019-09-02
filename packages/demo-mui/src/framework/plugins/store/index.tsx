
import { IHooks, IPO, TPlugin } from "@spax/core";
import { debug } from "@spax/debug";
import { setGlobalState } from "@spax/hooks";

export default [
  "Store",
  [],
  ({ init }: IHooks, { initialStates = {} }: IPO) => {
    init.tap(() => {
      /* istanbul ignore next */
      if (process.env.NODE_ENV === "development")
        debug("Initialize global states: %O", initialStates);

      Object.entries(initialStates).forEach(([key, initialState]) => {
        setGlobalState(key, initialState);
      });
    },
  );
}] as TPlugin;
