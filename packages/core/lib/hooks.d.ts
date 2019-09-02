import { TPriority } from "./types";
declare abstract class Hook {
    abstract hooks: {
        pre: any[];
        post: any[];
    };
    tap(pre?: (...args: any[]) => any, post?: (...args: any[]) => any): void;
}
export declare class InitHook extends Hook {
    hooks: {
        pre: Array<() => any>;
        post: Array<() => any>;
    };
    tap(pre?: () => any, post?: () => any): void;
    run(d: TPriority): Promise<any>;
}
export declare class ParseHook<A, B> extends Hook {
    hooks: {
        pre: Array<(a: A, b: B) => any>;
        post: Array<(a: A, b: B) => any>;
    };
    tap(pre?: (a: A, b: B) => any, post?: (a: A, b: B) => any): void;
    run(a: A, b: B, d: TPriority): Promise<any>;
}
export declare class RenderHook<A> extends Hook {
    hooks: {
        pre: Array<(a: A) => any>;
        post: Array<(a: A) => any>;
    };
    tap(pre?: (a: A) => any, post?: (a: A) => any): void;
    run(a: A, d: TPriority): Promise<any>;
}
export {};
