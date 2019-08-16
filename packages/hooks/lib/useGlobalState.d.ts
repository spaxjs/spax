import { Dispatch, SetStateAction } from "react";
export declare function useGlobalState<S>(key: string, initialState?: S | (() => S), cacheMap?: Map<string, any>): [S, Dispatch<SetStateAction<S>>];
export declare function setGlobalState<S>(key: string, initialState?: S | (() => S), cacheMap?: Map<string, any>): void;
