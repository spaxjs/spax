import { ICH, ICO, IPO } from "@spax/core";
import { setup } from "@spax/i18n";

export default ({ init }: ICH) => {
  init.tap("I18n", (option: IPO, options: ICO) => {
    setup(option);
  });
};
