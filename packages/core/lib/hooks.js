class Hook {
    tap(pre, post) {
        if (pre) {
            this.hooks.pre.push(pre);
        }
        if (post) {
            this.hooks.post.unshift(post);
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
    tap(pre, post) {
        super.tap(pre, post);
    }
    async run(d) {
        return Promise.all(this.hooks[d].map((fn) => fn()));
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
    tap(pre, post) {
        super.tap(pre, post);
    }
    async run(a, b, d) {
        const hooks = this.hooks[d];
        const hookLength = hooks.length;
        for (let i = 0; i < hookLength; i++) {
            const fn = hooks[i];
            a = await fn(a, b);
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
    tap(pre, post) {
        super.tap(pre, post);
    }
    async run(a, d) {
        const hooks = this.hooks[d];
        const hookLength = hooks.length;
        for (let i = 0; i < hookLength; i++) {
            const fn = hooks[i];
            a = await fn(a);
        }
        return a;
    }
}
