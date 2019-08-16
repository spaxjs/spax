import { Dispatch, SetStateAction } from "react";
export declare function useSharedState<S>(key: string, initialState?: S | (() => S), cacheMap?: Map<string, any>): [S, Dispatch<SetStateAction<S>>];
