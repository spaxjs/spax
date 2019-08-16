import { AnyObject, IMD } from "@spax/core";
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
    modules: IMD[];
    children?: ReactNode;
}
export interface SwitchProps extends AnyObject {
    level: number;
    modules: IMD[];
    scope: string;
    loose?: boolean;
    useAuth?: (imd: IMD) => boolean;
    NotFound?: React.FC<{}>;
    Forbidden?: React.FC<{}>;
}
export interface CarrierProps extends AnyObject {
    $$meta: IMD;
    $$scope: string;
    $$useAuth: (imd: IMD) => boolean;
    $$NotFound: React.FC<{}>;
    $$Forbidden: React.FC<{}>;
}
export interface MatchedParams extends AnyObject {
}
export declare type TMatchedState = [IMD?, MatchedParams?];
