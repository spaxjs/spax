import { AnyObject, IBlock } from "@spax/core";
import { ReactNode } from "react";
export interface LinkProps extends AnyObject {
    to?: string | boolean | {
        pathname?: string;
        params?: AnyObject;
        search?: AnyObject;
        hash?: AnyObject;
    };
    as?: any;
    component?: any;
    children?: ReactNode;
}
export interface SwitchProps extends AnyObject {
    level: number;
    blocks: IBlock[];
    loose?: boolean;
    useAuth?: (block: IBlock) => boolean;
    NotFound?: React.FC<{}>;
    Forbidden?: React.FC<{}>;
}
export interface ComponentProps extends AnyObject {
    $$block: IBlock;
    $$useAuth: (block: IBlock) => boolean;
    $$NotFound: React.FC<{}>;
    $$Forbidden: React.FC<{}>;
}
export interface MatchedParams extends AnyObject {
}
export declare type TMatchedState = [IBlock?, MatchedParams?];
