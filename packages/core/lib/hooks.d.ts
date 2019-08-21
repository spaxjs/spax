import { IOptions, IPO, TPriority } from "./types";
declare abstract class Hook {
    protected scope: string;
    abstract hooks: {
        pre: any[];
        post: any[];
    };
    preIdxMap: Map<string, number>;
    postIdxMap: Map<string, number>;
    constructor(scope: string);
    tap(name: string, pre?: (...args: any[]) => any, post?: (...args: any[]) => any, deps?: string[]): void;
}
export declare class InitHook extends Hook {
    hooks: {
        pre: Array<[string, (c: IPO, o: IOptions) => any]>;
        post: Array<[string, (c: IPO, o: IOptions) => any]>;
    };
    tap(name: string, pre?: (c: IPO, o: IOptions) => any, post?: (c: IPO, o: IOptions) => any, deps?: string[]): void;
    run(c: ((scope: string, name: string) => IPO), o: IOptions, d: TPriority): Promise<any>;
}
export declare class ParseHook<A, B> extends Hook {
    hooks: {
        pre: Array<[string, (a: A, b: B, c: IPO, o: IOptions) => any]>;
        post: Array<[string, (a: A, b: B, c: IPO, o: IOptions) => any]>;
    };
    tap(name: string, pre?: (a: A, b: B, c: IPO, o: IOptions) => any, post?: (a: A, b: B, c: IPO, o: IOptions) => any, deps?: string[]): void;
    run(a: A, b: B, c: ((scope: string, name: string) => IPO), o: IOptions, d: TPriority): Promise<any>;
}
export declare class RenderHook<A> extends Hook {
    hooks: {
        pre: Array<[string, (a: A, c: IPO, o: IOptions) => any]>;
        post: Array<[string, (a: A, c: IPO, o: IOptions) => any]>;
    };
    tap(name: string, pre?: (a: A, c: IPO, o: IOptions) => any, post?: (a: A, c: IPO, o: IOptions) => any, deps?: string[]): void;
    run(a: A, c: ((scope: string, name: string) => IPO), o: IOptions, d: TPriority): Promise<any>;
}
export {};
