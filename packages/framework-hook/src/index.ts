import { TCP } from "@wugui/core";
import Framework, { IFO } from "@wugui/framework";
import LazyPlugin from "@wugui/plugin-lazy";
import LevelPlugin from "@wugui/plugin-level";
import PathPlugin from "@wugui/plugin-path";
import RouterPlugin from "@wugui/plugin-router";

const options = process.env.NODE_ENV === "production"
  ? require("./config/config.prod")
  : require("./config/config.dev");

export default class SimpleFramework extends Framework {
  // 插件
  public static plugins: TCP[] = [
    PathPlugin,
    LevelPlugin,
    LazyPlugin,
    RouterPlugin,
  ];

  // 选项
  public static options: IFO = options.default;
}
