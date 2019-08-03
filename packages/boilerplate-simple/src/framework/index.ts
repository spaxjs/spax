import { TPluginFunction } from "@wugui/core";
import SimpleFramework from "@wugui/framework-simple";
import StorePlugin from "./plugins/store";
import ThemePlugin from "./plugins/theme";

const options = process.env.NODE_ENV === "production"
  ? require("./config/config.prod")
  : require("./config/config.dev");

export default class Framework extends SimpleFramework {
  public static plugins: TPluginFunction[] = [
    StorePlugin,
    ThemePlugin,
  ];

  public static options: any = options.default;
}
