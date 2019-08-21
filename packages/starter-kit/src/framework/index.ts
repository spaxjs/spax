import { TPlugin } from "@spax/core";
import { IOptions } from "@spax/framework";
import FrameworkHook from "@spax/framework-hook";

const options = process.env.NODE_ENV === "production"
  ? require("./config/config.prod")
  : require("./config/config.dev");

export default class Framework extends FrameworkHook {
  public static plugins: TPlugin[] = [];
  public static options: IOptions = options.default;
}
