import { IOptions, IPO, TPriority } from "./types";

abstract class Hook {
  public abstract hooks: {
    pre: any[];
    post: any[];
  };

  public preIdxMap: Map<string, number> = new Map();
  public postIdxMap: Map<string, number> = new Map();

  constructor(protected scope: string) {}

  public tap(
    name: string,
    deps?: string[],
    pre?: (...args: any[]) => any,
    post?: (...args: any[]) => any,
  ) {
    if (pre) {
      const { preIdxMap } = this;
      // 如果存在，说明当前插件被依赖
      if (preIdxMap.has(name)) {
        // 插入到依赖项之前
        // 当前插件的依赖项的索引值
        const index = preIdxMap.get(name);
        this.hooks.pre.splice(index, 0, [name, pre]);
        // 前面被插入后，依赖项的索引值增大
        preIdxMap.set(name, index + 1);
      } else {
        // 暂未检测到被其它插件依赖，则直接插入到列表最后
        this.hooks.pre.push([name, pre]);
      }
      // 如果存在依赖项，则建立依赖项与当前项的索引关系
      if (deps && deps.length) {
        deps.forEach((dep: string) => {
          if (!preIdxMap.has(dep)) {
            // 如果依赖项不与其他插件存在索引关系，则使用当前项在队列的索引值
            preIdxMap.set(dep, this.hooks.pre.length - 1);
          }
          // 如果已存在索引值，则不作更新，
          // 因为该索引值必然小于新索引值，
          // 选择沿用旧的值，可以保证依赖项插入的顺序足够靠前。
        });
      }
    }
    if (post) {
      const { postIdxMap } = this;
      // 如果存在，说明当前插件被依赖
      if (postIdxMap.has(name)) {
        // 插入到依赖项之后
        // 当前插件的依赖项的索引值
        const index = postIdxMap.get(name);
        this.hooks.post.splice(index + 1, 0, [name, post]);
      } else {
        // 暂未检测到被其它插件依赖，则直接插入到列表最前
        this.hooks.post.unshift([name, post]);
      }
      // 如果存在依赖项，则建立依赖项与当前项的索引关系
      if (deps && deps.length) {
        // 当前项的索引，作为依赖项的插入点
        const index = postIdxMap.has(name) ? postIdxMap.get(name) : 0;
        deps.forEach((dep: string) => {
          if (!postIdxMap.has(dep)) {
            // 如果依赖项不与其他插件存在索引关系，则使用当前项在队列的索引值
            postIdxMap.set(dep, index);
          }
          // 如果已存在索引值，则不作更新，
          // 因为该索引值必然大于新索引值，
          // 选择沿用旧的值，可以保证依赖项插入的顺序足够靠后。
        });
      }
    }
  }
}

export class InitHook extends Hook {
  public hooks: {
    pre: Array<[string, (c: IPO, o: IOptions) => any]>;
    post: Array<[string, (c: IPO, o: IOptions) => any]>;
  } = {
    pre: [],
    post: [],
  };

  public tap(
    name: string,
    deps?: string[],
    pre?: (c: IPO, o: IOptions) => any,
    post?: (c: IPO, o: IOptions) => any,
  ) {
    super.tap(name, deps, pre, post);
  }

  public async run(
    c: ((scope: string, name: string) => IPO),
    o: IOptions,
    d: TPriority,
  ): Promise<any> {
    return Promise.all(this.hooks[d].map(([name, fn]) => fn(c(this.scope, name), o)));
  }
}

export class ParseHook<A, B> extends Hook {
  public hooks: {
    pre: Array<[string, (a: A, b: B, c: IPO, o: IOptions) => any]>;
    post: Array<[string, (a: A, b: B, c: IPO, o: IOptions) => any]>;
  } = {
    pre: [],
    post: [],
  };

  public tap(
    name: string,
    deps?: string[],
    pre?: (a: A, b: B, c: IPO, o: IOptions) => any,
    post?: (a: A, b: B, c: IPO, o: IOptions) => any,
  ) {
    super.tap(name, deps, pre, post);
  }

  public async run(
    a: A,
    b: B,
    c: ((scope: string, name: string) => IPO),
    o: IOptions,
    d: TPriority,
  ): Promise<any> {
    const hooks = this.hooks[d];
    const hookLength = hooks.length;
    for (let i = 0; i < hookLength; i++) {
      const [name, fn] = hooks[i];
      a = await fn(a, b, c(this.scope, name), o);
    }
    return a;
  }
}

export class RenderHook<A> extends Hook {
  public hooks: {
    pre: Array<[string, (a: A, c: IPO, o: IOptions) => any]>;
    post: Array<[string, (a: A, c: IPO, o: IOptions) => any]>;
  } = {
    pre: [],
    post: [],
  };

  public tap(
    name: string,
    deps?: string[],
    pre?: (a: A, c: IPO, o: IOptions) => any,
    post?: (a: A, c: IPO, o: IOptions) => any,
  ) {
    super.tap(name, deps, pre, post);
  }

  public async run(
    a: A,
    c: ((scope: string, name: string) => IPO),
    o: IOptions,
    d: TPriority,
  ): Promise<any> {
    const hooks = this.hooks[d];
    const hookLength = hooks.length;
    for (let i = 0; i < hookLength; i++) {
      const [name, fn] = hooks[i];
      a = await fn(a, c(this.scope, name), o);
    }
    return a;
  }
}
