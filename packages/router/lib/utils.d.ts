/// <reference types="node" />
import { IBlock } from "@spax/core";
import EventEmitter from "events";
import { MatchedParams, TMatchedState } from "./types";
export declare const matchedDb: {
    value: {};
    emitter: EventEmitter;
    pathname: any;
    check(scope: string, pathname: string): void;
    ensure(scope: string): void;
    get(scope: string): any;
    add(scope: string, level: number, v: [IBlock?, MatchedParams?]): void;
    emit(scope: string): void;
    on(scope: string, cb: any): () => void;
};
export declare function getMatched(scope: string, pathname: string, level: number, blocks: IBlock[], loose?: boolean): TMatchedState;
