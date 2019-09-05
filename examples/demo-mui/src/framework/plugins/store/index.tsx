
import { IHooks, IPO, TPlugin } from "@spax/core";
import { debug } from "@spax/debug";
import { setGlobalState } from "@spax/hooks";

export default [
  "Store",
  [],
  ({ init }: IHooks, { initialStates = [] }: IPO) => {
    init.tap(() => {
      /* istanbul ignore next */
      if (process.env.NODE_ENV === "development")
        debug("Initialize global states: %O", initialStates);

      initialStates.forEach(({ storage, states }) => {
        Object.entries(states).forEach(([key, initialState]) => {
          setGlobalState(key, initialState, storage);
        });
      });
    },
  );
}] as TPlugin;
