class Slot {
    tap(pre, post) {
        if (pre) {
            this.hooks.pre.push(pre);
        }
        if (post) {
            this.hooks.post.unshift(post);
        }
    }
}
export class InitSlot extends Slot {
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
export class ParseSlot extends Slot {
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
            // freeze object
            if (process.env.NODE_ENV === "development") {
                a = Object.freeze(a);
            }
            a = await fn(a, b);
        }
        return a;
    }
}
export class RenderSlot extends Slot {
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
            // freeze object
            if (process.env.NODE_ENV === "development") {
                a = Object.freeze(a);
            }
            a = await fn(a);
        }
        return a;
    }
}
