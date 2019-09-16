import { TPriority } from "./types";
declare abstract class Slot {
    abstract hooks: {
        pre: any[];
        post: any[];
    };
    tap(pre?: (...args: any[]) => any, post?: (...args: any[]) => any): void;
}
export declare class InitSlot extends Slot {
    hooks: {
        pre: Array<() => any>;
        post: Array<() => any>;
    };
    tap(pre?: () => any, post?: () => any): void;
    run(d: TPriority): Promise<any>;
}
export declare class ParseSlot<A, B> extends Slot {
    hooks: {
        pre: Array<(a: A, b: B) => any>;
        post: Array<(a: A, b: B) => any>;
    };
    tap(pre?: (a: A, b: B) => any, post?: (a: A, b: B) => any): void;
    run(a: A, b: B, d: TPriority): Promise<any>;
}
export declare class RenderSlot<A> extends Slot {
    hooks: {
        pre: Array<(a: A) => any>;
        post: Array<(a: A) => any>;
    };
    tap(pre?: (a: A) => any, post?: (a: A) => any): void;
    run(a: A, d: TPriority): Promise<any>;
}
export {};
