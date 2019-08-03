import { debug, error, warn } from "@wugui/utils";
import isPlainObject from "lodash/isPlainObject";
import mergeWith from "lodash/mergeWith";
import { mount } from "./core";
import { IFrameworkOptions, TPluginFunction } from "./types";

export abstract class Framework {
  // 插件
  public static plugins: TPluginFunction[] = [];
  // 选项
  public static options: IFrameworkOptions = {
    version: "1.0.0",
    // 插件选项
    plugins: {},
    // 业务模块
    modules: [],
    container: "#root",
  };

  private plugins: TPluginFunction[] = [];
  private options: IFrameworkOptions = {};

  constructor(options: IFrameworkOptions = {}) {
    debug(`
               __
    .,-;-;-,. /'_\\
  _/_/_/_|_\\_\\) /
'-<_><_><_><_>=/\\
  \`/_/====/_/-'\\_\\
   ""     ""    ""`);

    if (process.env.NODE_ENV !== "production") {
      warn("Looks like we are in development mode!");
    }

    this.initialize(options);
  }

  public async mount() {
    try {
      // 挂载！
      return mount(this.plugins, this.options);
    } catch (e) {
      error(e);
    }
  }

  /**
   * 通过原型链实现递归合并
   */
  private initialize(ctorOptions: IFrameworkOptions): void {
    let ctr: any = this.constructor;
    // 静态属性 plugins
    const plugins = [ctr.plugins];
    // 静态属性 options
    const options = [ctr.options];
    // 自动继承父类的 静态属性 plugins
    // 自动继承父类的 静态属性 options
    // tslint:disable-next-line
    while (ctr && (ctr = Object.getPrototypeOf(ctr))) {
      if (ctr.plugins) {
        // 父类的插件在前
        plugins.unshift(ctr.plugins);
      }
      if (ctr.options) {
        // 父类的选项在前
        options.unshift(ctr.options);
      }
    }
    this.plugins = plugins.flat();
    this.options = merge(...options, ctorOptions);
    if (process.env.NODE_ENV !== "production")
      debug("Start Framework with options: %O, plugins: ", this.options, this.plugins);
  }
}

/**
 * 对象：深拷贝
 * 数组：合并
 */
function merge(...args: any[]) {
  return mergeWith({}, ...args, (object: any, source: any) => {
    // 合并数组
    if (Array.isArray(source)) {
      if (Array.isArray(object)) {
        return object.concat(source);
      }
    }
    // 合并对象
    if (isPlainObject(source)) {
      if (isPlainObject(object)) {
        return merge(object, source);
      }
    }
    // 其它，直接覆盖
    return object;
  });
}
