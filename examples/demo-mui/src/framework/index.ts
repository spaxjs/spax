import { IPlugin } from "@spax/core";
import { IOptions } from "@spax/framework";
import FrameworkSimple from "@spax/framework-simple";
import I18nPlugin from "@spax/plugin-i18n";
import options from "./config";
import LayoutPlugin from "./plugins/layout";
import StorePlugin from "./plugins/store";
// import StrictPlugin from "./plugins/strict";
import ThemePlugin from "./plugins/theme";

export default class Framework extends FrameworkSimple {
  public static plugins: IPlugin[] = [
    I18nPlugin,
    LayoutPlugin,
    StorePlugin,
    ThemePlugin,
    // StrictPlugin,
  ];

  public static options: IOptions = options;
}
