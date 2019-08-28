import { Dispatch, SetStateAction } from "react";
export declare const prefix = "@spax&hooks&global&";
export declare function useGlobalState<S>(key: string, initialState?: S | (() => S), storage?: Storage): [S, Dispatch<SetStateAction<S>>];
export declare function setGlobalState<S>(key: string, initialState: S | (() => S), storage?: Storage): void;
