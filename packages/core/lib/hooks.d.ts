import React from "react";
import { IBlock } from "./types";
export declare function useParsed(): [IBlock[], (v: IBlock[]) => void];
export declare function useRendered(): [React.ReactNode, (v: React.ReactNode) => void];
