import { IOptions, IPlugin } from "@spax/core";
import { Framework } from "@spax/framework";
import LazyPlugin from "@spax/plugin-lazy";
import PathPlugin from "@spax/plugin-path";
import RouterPlugin from "@spax/plugin-router";
import options from "./config";

export default class SimpleFramework extends Framework {
  // 插件
  public static plugins: IPlugin[] = [
    PathPlugin,
    LazyPlugin,
    RouterPlugin,
  ];

  // 选项
  public static options: IOptions = options;
}
