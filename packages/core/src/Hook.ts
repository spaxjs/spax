import { IPluginOption, TPriority } from "./types";

abstract class Hook {
  public abstract hooks: {
    pre: any[];
    post: any[];
  };

  public depsMap: Map<string, number> = new Map();

  public tap(
    name: string,
    pre?: (...args: any[]) => any,
    post?: (...args: any[]) => any,
    deps?: string[],
  ) {
    if (pre) {
      if (this.depsMap.has(name)) {
        // 当前插件被其它插件依赖，则插入到该插件之前
        this.hooks.pre.splice(this.depsMap.get(name)!, 0, [name, pre]);
      } else {
        // 暂未检测到被其它插件依赖，则插入到列表最后
        this.hooks.pre.push([name, pre]);
      }
      // 保存索引，确保依赖先执行
      if (deps) {
        deps.forEach((dep: string) => {
          const index: number = this.depsMap.has(dep) ? this.depsMap.get(dep)! : 999;
          this.depsMap.set(dep, Math.min(this.hooks.pre.length - 1, index));
        });
      }
    }
    if (post) {
      this.hooks.post.unshift([name, post]);
    }
  }
}

export class InitHook extends Hook {
  public hooks: {
    pre: Array<[string, (c: IPluginOption) => any]>;
    post: Array<[string, (c: IPluginOption) => any]>;
  } = {
    pre: [],
    post: [],
  };

  public tap(
    name: string,
    pre?: (c: IPluginOption) => any,
    post?: (c: IPluginOption) => any,
    deps?: string[],
  ) {
    super.tap(name, pre, post, deps);
  }

  public async run(
    c: ((name: string) => IPluginOption),
    d: TPriority,
  ): Promise<any> {
    return Promise.all(this.hooks[d].map(([name, fn]) => fn(c(name))));
  }
}

export class ParseHook<A, B> extends Hook {
  public hooks: {
    pre: Array<[string, (a: A, b: B, c: IPluginOption) => any]>;
    post: Array<[string, (a: A, b: B, c: IPluginOption) => any]>;
  } = {
    pre: [],
    post: [],
  };

  public tap(
    name: string,
    pre?: (a: A, b: B, c: IPluginOption) => any,
    post?: (a: A, b: B, c: IPluginOption) => any,
    deps?: string[],
  ) {
    super.tap(name, pre, post, deps);
  }

  public async run(
    a: A,
    b: B,
    c: ((name: string) => IPluginOption),
    d: TPriority,
  ): Promise<any> {
    const hooks = this.hooks[d];
    const hookLength = hooks.length;
    for (let i = 0; i < hookLength; i++) {
      const [name, fn] = hooks[i];
      a = await fn(a, b, c(name));
    }
    return a;
  }
}

export class RenderHook<A> extends Hook {
  public hooks: {
    pre: Array<[string, (a: A, c: IPluginOption) => any]>;
    post: Array<[string, (a: A, c: IPluginOption) => any]>;
  } = {
    pre: [],
    post: [],
  };

  public tap(
    name: string,
    pre?: (a: A, c: IPluginOption) => any,
    post?: (a: A, c: IPluginOption) => any,
    deps?: string[],
  ) {
    super.tap(name, pre, post, deps);
  }

  public async run(
    a: A,
    c: ((name: string) => IPluginOption),
    d: TPriority,
  ): Promise<any> {
    const hooks = this.hooks[d];
    const hookLength = hooks.length;
    for (let i = 0; i < hookLength; i++) {
      const [name, fn] = hooks[i];
      a = await fn(a, c(name));
    }
    return a;
  }
}
