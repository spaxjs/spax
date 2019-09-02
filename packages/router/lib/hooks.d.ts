import { IBlock } from "@spax/core";
import React from "react";
import { ComponentProps, TMatchedState } from "./types";
export declare function useBlock({ $$block }: ComponentProps): IBlock;
export declare function useExact({ $$exact }: ComponentProps): boolean;
export declare function useMatchedArrayOfBlockAndParams(): TMatchedState[];
export declare function useMatchedBlockAndParams(pathname: string, level: number, blocks: IBlock[], loose?: boolean): TMatchedState;
export declare function useMatchedFromChildBocks({ $$exact, $$block, $$useAuth, $$NotFound, $$Forbidden }: ComponentProps): React.FC<any>;
export declare function useMatchedFromChildBocksOnTheFly({ $$exact, $$block, $$useAuth, $$NotFound, $$Forbidden }: ComponentProps, $$blocks: IBlock[]): React.FC<any>;
