/// <reference types="node" />
import EventEmitter from "events";
export declare const matchedDb: {
    value: any[];
    emitter: EventEmitter;
    pathname: any;
    check(pathname: string): void;
    get(): any;
    add(level: number, v: [import("@spax/core").IBlock?, import("./types").MatchedParams?]): void;
    emit(): void;
    on(cb: any): () => void;
};
