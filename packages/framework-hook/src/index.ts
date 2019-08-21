import { TPlugin } from "@spax/core";
import Framework, { IOptions } from "@spax/framework";
import LazyPlugin from "@spax/plugin-lazy";
import LevelPlugin from "@spax/plugin-level";
import PathPlugin from "@spax/plugin-path";
import RouterPlugin from "@spax/plugin-router";

const options = process.env.NODE_ENV === "production"
  ? require("./config/config.prod")
  : require("./config/config.dev");

export default class SimpleFramework extends Framework {
  // 插件
  public static plugins: TPlugin[] = [
    PathPlugin,
    LevelPlugin,
    LazyPlugin,
    RouterPlugin,
  ];

  // 选项
  public static options: IOptions = options.default;
}
