class Hook {
    constructor() {
        this.depsMap = new Map();
    }
    tap(name, pre, post, deps) {
        if (pre) {
            if (this.depsMap.has(name)) {
                // 当前插件被其它插件依赖，则插入到该插件之前
                this.hooks.pre.splice(this.depsMap.get(name), 0, [name, pre]);
            }
            else {
                // 暂未检测到被其它插件依赖，则插入到列表最后
                this.hooks.pre.push([name, pre]);
            }
            // 保存索引，确保依赖先执行
            if (deps) {
                deps.forEach((dep) => {
                    const index = this.depsMap.has(dep) ? this.depsMap.get(dep) : 999;
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
    constructor() {
        super(...arguments);
        this.hooks = {
            pre: [],
            post: [],
        };
    }
    tap(name, pre, post, deps) {
        super.tap(name, pre, post, deps);
    }
    async run(c, o, d) {
        return Promise.all(this.hooks[d].map(([name, fn]) => fn(c(name), o)));
    }
}
export class ParseHook extends Hook {
    constructor() {
        super(...arguments);
        this.hooks = {
            pre: [],
            post: [],
        };
    }
    tap(name, pre, post, deps) {
        super.tap(name, pre, post, deps);
    }
    async run(a, b, c, o, d) {
        const hooks = this.hooks[d];
        const hookLength = hooks.length;
        for (let i = 0; i < hookLength; i++) {
            const [name, fn] = hooks[i];
            a = await fn(a, b, c(name), o);
        }
        return a;
    }
}
export class RenderHook extends Hook {
    constructor() {
        super(...arguments);
        this.hooks = {
            pre: [],
            post: [],
        };
    }
    tap(name, pre, post, deps) {
        super.tap(name, pre, post, deps);
    }
    async run(a, c, o, d) {
        const hooks = this.hooks[d];
        const hookLength = hooks.length;
        for (let i = 0; i < hookLength; i++) {
            const [name, fn] = hooks[i];
            a = await fn(a, c(name), o);
        }
        return a;
    }
}
