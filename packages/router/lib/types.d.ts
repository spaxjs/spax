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
export interface RouterProps extends AnyObject {
    scope: string;
    blocks: IBlock[];
    children?: ReactNode;
}
export interface SwitchProps extends AnyObject {
    level: number;
    blocks: IBlock[];
    scope: string;
    loose?: boolean;
    useAuth?: (imd: IBlock) => boolean;
    NotFound?: React.FC<{}>;
    Forbidden?: React.FC<{}>;
}
export interface CarrierProps extends AnyObject {
    $$block: IBlock;
    $$scope: string;
    $$useAuth: (imd: IBlock) => boolean;
    $$NotFound: React.FC<{}>;
    $$Forbidden: React.FC<{}>;
}
export interface MatchedParams extends AnyObject {
}
export declare type TMatchedState = [IBlock?, MatchedParams?];
