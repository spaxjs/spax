import { IBlock } from "@spax/core";
import React from "react";
import { CarrierProps, TMatchedState } from "./types";
export declare function useBlock({ $$block }: CarrierProps): IBlock;
export declare function useExact({ $$exact }: CarrierProps): boolean;
export declare function useScope({ $$scope }: CarrierProps): string;
export declare function useMatched(scope?: string): TMatchedState[];
export declare function useBlocks({ $$exact, $$block, $$scope, $$useAuth, $$NotFound, $$Forbidden, $$blocks }: CarrierProps): React.FC<any>;
export declare function useBlocksOnTheFly({ $$exact, $$block, $$scope, $$useAuth, $$NotFound, $$Forbidden }: CarrierProps, $$blocks: IBlock[]): React.FC<any>;
