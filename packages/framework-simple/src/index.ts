import { Framework, IFrameworkOptions, TPluginFunction } from "@wugui/core";
import LazyPlugin from "@wugui/plugin-lazy";
import LevelPlugin from "@wugui/plugin-level";
import PathPlugin from "@wugui/plugin-path";
import RouterPlugin from "@wugui/plugin-router";

const options = process.env.NODE_ENV === "production"
  ? require("./config/config.prod")
  : require("./config/config.dev");

export default class SimpleFramework extends Framework {
  // 插件
  public static plugins: TPluginFunction[] = [
    PathPlugin,
    LevelPlugin,
    LazyPlugin,
    RouterPlugin,
  ];

  // 选项
  public static options: IFrameworkOptions = options.default;
}
