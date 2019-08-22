/// <reference types="node" />
import EventEmitter from "events";
export declare const matchedDb: {
    value: {};
    emitter: EventEmitter;
    pathname: any;
    check(scope: string, pathname: string): void;
    ensure(scope: string): void;
    get(scope: string): any;
    add(scope: string, level: number, v: [import("@spax/core").IBlock?, import("./types").MatchedParams?]): void;
    emit(scope: string): void;
    on(scope: string, cb: any): () => void;
};
