import React from "react";
import { IBlock } from "./types";
/**
 * Hook for cached value of the specified key
 */
export declare function useCached<S>(key: string): [S, (value: S) => void];
export declare function useParsed(): [IBlock[], (v: IBlock[]) => void];
export declare function useRendered(): [React.ReactNode, (v: React.ReactNode) => void];
