import { TPriority } from "./types";

abstract class Hook {
  public abstract hooks: {
    pre: any[];
    post: any[];
  };

  public tap(
    pre?: (...args: any[]) => any,
    post?: (...args: any[]) => any,
  ) {
    if (pre) {
      this.hooks.pre.push(pre);
    }
    if (post) {
      this.hooks.post.unshift(post);
    }
  }
}

export class InitHook extends Hook {
  public hooks: {
    pre: Array<() => any>;
    post: Array<() => any>;
  } = {
    pre: [],
    post: [],
  };

  public tap(
    pre?: () => any,
    post?: () => any,
  ) {
    super.tap(pre, post);
  }

  public async run(
    d: TPriority,
  ): Promise<any> {
    return Promise.all(this.hooks[d].map((fn) => fn()));
  }
}

export class ParseHook<A, B> extends Hook {
  public hooks: {
    pre: Array<(a: A, b: B) => any>;
    post: Array<(a: A, b: B) => any>;
  } = {
    pre: [],
    post: [],
  };

  public tap(
    pre?: (a: A, b: B) => any,
    post?: (a: A, b: B) => any,
  ) {
    super.tap(pre, post);
  }

  public async run(
    a: A,
    b: B,
    d: TPriority,
  ): Promise<any> {
    const hooks = this.hooks[d];
    const hookLength = hooks.length;
    for (let i = 0; i < hookLength; i++) {
      const fn = hooks[i];
      a = await fn(a, b);
    }
    return a;
  }
}

export class RenderHook<A> extends Hook {
  public hooks: {
    pre: Array<(a: A) => any>;
    post: Array<(a: A) => any>;
  } = {
    pre: [],
    post: [],
  };

  public tap(
    pre?: (a: A) => any,
    post?: (a: A) => any,
  ) {
    super.tap(pre, post);
  }

  public async run(
    a: A,
    d: TPriority,
  ): Promise<any> {
    const hooks = this.hooks[d];
    const hookLength = hooks.length;
    for (let i = 0; i < hookLength; i++) {
      const fn = hooks[i];
      a = await fn(a);
    }
    return a;
  }
}
