
import { ICoreHooks, IPluginOption } from "@wugui/core";
import { initGlobalState } from "@wugui/hooks";
import { debug } from "@wugui/utils";

export default ({ init }: ICoreHooks) => {
  init.tap("Store", ({ initialStates = [] }: IPluginOption) => {
    if (process.env.NODE_ENV !== "production")
      debug("Initialize global states: %O", initialStates);

    Object.entries(initialStates).forEach(([key, initialState]) => {
      initGlobalState(key, initialState);
    });
  });
};
