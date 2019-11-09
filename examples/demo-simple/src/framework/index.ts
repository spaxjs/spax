import { IOptions, IPlugin } from "@spax/core";
import FrameworkSimple from "@spax/framework-simple";
import options from "./config";
import StrictPlugin from "./plugins/strict";
import WindowPlugin from "./plugins/window";

export default class Framework extends FrameworkSimple {
  public static plugins: IPlugin[] = [
    StrictPlugin,
    WindowPlugin,
  ];

  public static options: IOptions = options;
}
