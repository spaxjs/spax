import { TPlugin } from "@spax/core";
import { IOptions } from "@spax/framework";
import FrameworkHook from "@spax/framework-hook";
import I18nPlugin from "@spax/plugin-i18n";
import StorePlugin from "./plugins/store";
import ThemePlugin from "./plugins/theme";

const options = process.env.NODE_ENV === "production"
  ? require("./config/config.prod")
  : require("./config/config.dev");

export default class Framework extends FrameworkHook {
  public static plugins: TPlugin[] = [
    I18nPlugin,
    StorePlugin,
    ThemePlugin,
  ];

  public static options: IOptions = options.default;
}
