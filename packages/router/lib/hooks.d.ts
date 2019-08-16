import React from "react";
import { TMatchedState } from "./types";
export declare function useExact({ $$exact }: any): boolean;
export declare function useExtra({ $$extra }: any): boolean;
export declare function useMatched(scope?: string): TMatchedState[];
export declare function useChild({ $$exact, $$meta: { level, modules }, $$scope, $$useAuth, $$NotFound, $$Forbidden }: any): React.FC<any>;
