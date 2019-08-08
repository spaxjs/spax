import { TCP } from "@wugui/core";
import { IFO } from "@wugui/framework";
import FrameworkHook from "@wugui/framework-hook";
import StorePlugin from "./plugins/store";
import ThemePlugin from "./plugins/theme";

const options = process.env.NODE_ENV === "production"
  ? require("./config/config.prod")
  : require("./config/config.dev");

export default class Framework extends FrameworkHook {
  public static plugins: TCP[] = [
    StorePlugin,
    ThemePlugin,
  ];

  public static options: IFO = options.default;
}
