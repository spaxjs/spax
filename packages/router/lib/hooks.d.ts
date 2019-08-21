import { IBlock } from "@spax/core";
import React from "react";
import { CarrierProps, TMatchedState } from "./types";
export declare function useExact({ $$exact }: CarrierProps): boolean;
export declare function useMeta({ $$meta }: CarrierProps): IBlock;
export declare function useScope({ $$scope }: CarrierProps): string;
export declare function useMatched(scope?: string): TMatchedState[];
export declare function useChild({ $$exact, $$meta, $$scope, $$useAuth, $$NotFound, $$Forbidden, $$blocks }: CarrierProps): React.FC<any>;
