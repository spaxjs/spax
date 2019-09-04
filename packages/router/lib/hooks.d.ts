import { IBlock } from "@spax/core";
import React from "react";
import { ComponentProps, TMatchedState } from "./types";
export declare function useBlock({ $$block }: ComponentProps): IBlock;
export declare function useExact({ $$exact }: ComponentProps): boolean;
export declare function useMatchedBlockAndParams(level: number, blocks: IBlock[], loose?: boolean): TMatchedState;
export declare function useMatchedFromChildBocks({ $$exact, $$block, $$NotFound, }: ComponentProps): React.FC<any>;
export declare function useMatchedFromChildBocksOnTheFly({ $$exact, $$block, $$NotFound }: ComponentProps, $$blocks: IBlock[]): React.FC<any>;
