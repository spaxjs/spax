
import { IHooks, IOptions, IPO } from "@spax/core";
import { debug } from "@spax/debug";

export default ({ init }: IHooks) => {
  init.tap(
    "Store",
    [],
    ({ provider = [], initialStates = {} }: IPO, { scope }: IOptions) => {
      provider.forEach(({ setScope, setStore }, index: number) => {
        setScope(scope);

        if (index === 0) {
          /* istanbul ignore next */
          if (process.env.NODE_ENV === "development")
            debug("Initialize global states: %O", initialStates);

          setStore(initialStates);
        }
      });
    },
  );
};
