import { mount, TCP } from "@wugui/core";
import { debug, error, warn } from "@wugui/utils";
import isPlainObject from "lodash/isPlainObject";
import mergeWith from "lodash/mergeWith";
import { IFO } from "./types";

export * from "./types";

export default abstract class Framework {
  // 插件
  public static plugins: TCP[] = [];
  // 选项
  public static options: IFO = {
    version: "1.0.0",
    // 插件选项
    plugins: {},
    // 业务模块
    modules: [],
    container: "#root",
  };

  private plugins: TCP[] = [];
  private options: IFO = {};

  constructor(options: IFO = {}) {
    debug(`
               __
    .,-;-;-,. /'_\\
  _/_/_/_|_\\_\\) /
'-<_><_><_><_>=/\\
  \`/_/====/_/-'\\_\\
   ""     ""    ""`);

    if (process.env.NODE_ENV === "development") {
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
  private initialize(ctorOptions: IFO): void {
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
    // 拍平
    this.plugins = plugins.flat();
    // 合并
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
  return mergeWith({}, ...args, (obj: any, src: any) => {
    // 合并数组
    if (Array.isArray(src)) {
      if (Array.isArray(obj)) {
        return obj.concat(src);
      }
    }
    // 合并对象
    if (isPlainObject(src)) {
      if (isPlainObject(obj)) {
        return merge(obj, src);
      }
    }
    // 其它，直接覆盖
    return obj;
  });
}
