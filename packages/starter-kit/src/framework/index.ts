import { TCP } from "@spax/core";
import { IFO } from "@spax/framework";
import FrameworkHook from "@spax/framework-hook";

const options = process.env.NODE_ENV === "production"
  ? require("./config/config.prod")
  : require("./config/config.dev");

export default class Framework extends FrameworkHook {
  public static plugins: TCP[] = [];
  public static options: IFO = options.default;
}
