import { IHooks, IOptions, IPO } from "@spax/core";
import { setup } from "@spax/i18n";

export default ({ init }: IHooks) => {
  init.tap(
    "I18n",
    [],
    (option: IPO, options: IOptions) => {
      setup(option);
    },
  );
};
