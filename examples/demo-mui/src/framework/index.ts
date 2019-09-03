import { TPlugin } from "@spax/core";
import { IOptions } from "@spax/framework";
import FrameworkHook from "@spax/framework-hook";
import options from "./config";
import StorePlugin from "./plugins/store";
import StrictPlugin from "./plugins/strict";
import ThemePlugin from "./plugins/theme";

export default class Framework extends FrameworkHook {
  public static plugins: TPlugin[] = [
    StorePlugin,
    ThemePlugin,
    StrictPlugin,
  ];

  public static options: IOptions = options;
}