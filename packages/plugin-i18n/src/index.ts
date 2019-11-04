import { IHooks, IOption, IPlugin } from "@spax/core";
import { setup } from "@spax/i18n";

export default {
  name: "I18n",
  plug: ({ init }: IHooks, option: IOption) => {
    init.tap(
      () => {
        setup(option);
      },
    );
  },
} as IPlugin;
