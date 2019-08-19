class Hook {
    constructor(scope) {
        this.scope = scope;
        this.preIdxMap = new Map();
        this.postIdxMap = new Map();
    }
    tap(name, pre, post, deps) {
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
            }
            else {
                // 暂未检测到被其它插件依赖，则直接插入到列表最后
                this.hooks.pre.push([name, pre]);
            }
            // 如果存在依赖项，则建立依赖项与当前项的索引关系
            if (deps) {
                deps.forEach((dep) => {
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
            }
            else {
                // 暂未检测到被其它插件依赖，则直接插入到列表最前
                this.hooks.post.unshift([name, post]);
            }
            // 如果存在依赖项，则建立依赖项与当前项的索引关系
            if (deps) {
                // 当前项的索引，作为依赖项的插入点
                const index = postIdxMap.has(name) ? postIdxMap.get(name) : 0;
                deps.forEach((dep) => {
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
        return Promise.all(this.hooks[d].map(([name, fn]) => fn(c(this.scope, name), o)));
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
            a = await fn(a, b, c(this.scope, name), o);
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
            a = await fn(a, c(this.scope, name), o);
        }
        return a;
    }
}
