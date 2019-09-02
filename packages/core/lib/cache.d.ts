import { AnyObject } from "./types";
export declare const cache: {
    snapshot(): AnyObject<any>;
    restore(snapshot: AnyObject<any>): void;
    clear(): void;
    get<S = any>(key: string): S;
    set(key: string, value: any, shouldEmit?: boolean): void;
    has(key: string): boolean;
    on(key: string, listener: any): void;
    off(key: string, listener: any): void;
};
export declare function useCached<S>(key: string): [S, (v: S) => void];
