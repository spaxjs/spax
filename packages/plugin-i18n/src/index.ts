import { IPlugin, IPO, ISlots } from "@spax/core";
import { setup } from "@spax/i18n";

export default {
  name: "I18n",
  deps: [],
  plug: ({ init }: ISlots, option: IPO) => {
    init.tap(
      () => {
        setup(option);
      },
    );
  },
} as IPlugin;
