import { IOptions, IPlugin } from "@spax/core";
import FrameworkSimple from "@spax/framework-simple";
import I18nPlugin from "@spax/plugin-i18n";
import options from "./config";
import LayoutPlugin from "./plugins/layout";
import StrictPlugin from "./plugins/strict";
import ThemePlugin from "./plugins/theme";

export default class Framework extends FrameworkSimple {
  public static plugins: IPlugin[] = [
    I18nPlugin,
    LayoutPlugin,
    ThemePlugin,
    StrictPlugin,
  ];

  public static options: IOptions = options;
}
