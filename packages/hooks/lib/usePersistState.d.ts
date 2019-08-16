import { Dispatch, SetStateAction } from "react";
export declare function usePersistState<S>(key: string, initialState?: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
