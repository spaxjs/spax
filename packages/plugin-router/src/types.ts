import { AnyObject, IModule } from "@wugui/core";

export interface RouterProps extends AnyObject {
  option: AnyObject;
}

export interface SwitchProps extends AnyObject {
  level: number;
  loose?: boolean;
  // modules: IModule[];
  option?: AnyObject;
}

export interface MatchedParams extends AnyObject {}

export type TMatched = [IModule?, MatchedParams?];
export type TListener = (value: TMatched[]) => void;
export type TUnregisterCallback = () => void;
