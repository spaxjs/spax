import { AnyObject, IModuleDescription } from "@wugui/core";
import { ReactNode } from "react";

export interface LinkProps extends AnyObject {
  to?: string | boolean | {
    pathname: string;
    params?: AnyObject;
    search?: AnyObject;
    hash?: AnyObject;
  };
  as?: any;
  component?: any;
  children?: ReactNode;
}

export interface RouterProps extends AnyObject {
  option: AnyObject;
}

export interface SwitchProps extends AnyObject {
  level: number;
  loose?: boolean;
  // modules: IModuleDescription[];
  option?: AnyObject;
}

export interface MatchedParams extends AnyObject {}

export type TMatchedModule = [IModuleDescription?, MatchedParams?];
