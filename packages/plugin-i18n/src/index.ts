import { IHooks, IPO, TPlugin } from "@spax/core";
import { setup } from "@spax/i18n";

export default [
  "I18n",
  [],
  ({ init }: IHooks, option: IPO) => {
    init.tap(
      () => {
        setup(option);
      },
    );
  },
] as TPlugin;
