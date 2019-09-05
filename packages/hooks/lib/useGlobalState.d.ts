import { Dispatch, SetStateAction } from "react";
export declare function useGlobalState<S>(key: string, initialState?: S | (() => S), _storage?: Storage): [S, Dispatch<SetStateAction<S>>];
export declare function setGlobalState<S>(key: string, initialState: S | (() => S), _storage?: Storage): void;
