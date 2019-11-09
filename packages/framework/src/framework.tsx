import { Core, IBlock, IOptions, IPlugin, ObjectOf } from "@spax/core";
import { group, groupEnd, log, warn } from "@spax/debug";
import isPlainObject from "lodash/isPlainObject";
import mergeWith from "lodash/mergeWith";
import React from "react";
import { Context } from "./context";

export abstract class Framework {
  // 插件
  public static plugins: IPlugin[] = [];
  // 选项
  public static options: IOptions = {};

  private plugins: IPlugin[] = [];
  private options: IOptions = {};
  private core: Core;

  constructor(options: IOptions = {}) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== "test") {
      log(`
   _____ ____  ___   _  __
  / ___// __ \\/   | | |/ /
  \\__ \\/ /_/ / /| | |   /
 ___/ / ____/ ___ |/   |
/____/_/   /_/  |_/_/|_|`);
    }

    /* istanbul ignore next */
    if (process.env.NODE_ENV === "development") {
      warn("Looks like we are in development mode!");
    }

    /* istanbul ignore next */
    if (process.env.NODE_ENV === "development") {
      group("Framework.Initialize");
    }

    this.initialize(options);

    /* istanbul ignore next */
    if (process.env.NODE_ENV === "development") {
      groupEnd();
    }

    this.core = new Core(this.plugins, this.options);
  }

  public async getApp(
    blocks: IBlock[],
  ): Promise<React.ComponentType<{}>> {
    // 解析
    const parsed = await this.core.parse(blocks);
    const rendered = await this.core.render(parsed);

    const App = () => {
      return (
        <Provider value={{ parsed, rendered }}>
          {Array.isArray(rendered)
            ? JSON.stringify(rendered)
            : rendered}
        </Provider>
      );
    };

    return App;
  }

  /**
   * 通过原型链实现递归合并
   */
  private initialize(ctorOptions: IOptions): void {
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

    /* istanbul ignore next */
    if (process.env.NODE_ENV === "development") {
      log("with plugins: %O", this.plugins);
      log("with options: %O", this.options);
    }
  }
}

function Provider({ value, ...props }: any) {
  const [state, setState] = React.useState({});

  let prevState: ObjectOf<any> = {};

  const setContext = React.useCallback(
    (v: ObjectOf<any>) => {
      const nextState = { ...prevState, ...v };
      setState(nextState);
      prevState = nextState;
    },
    [setState],
  );

  return (
    <Context.Provider {...props} value={{
      ...value,
      ...state,
      setContext,
    }} />
  );
}

/**
 * 合并对象与数组
 */
function merge(...args: any[]) {
  return mergeWith({}, ...args, (obj: any, src: any) => {
    // 合并数组
    if (Array.isArray(src) && Array.isArray(obj)) {
      return obj.concat(src);
    }
    // 合并对象
    if (isPlainObject(src) && isPlainObject(obj)) {
      return merge(obj, src);
    }
    // 其它，直接覆盖
    return src;
  });
}
