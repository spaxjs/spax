import { AnyObject, DEFAULT_SCOPE } from "@spax/core";
import { setGlobalState, useGlobalState } from "@spax/hooks";
import { Dispatch, SetStateAction } from "react";

let currentScope: string = DEFAULT_SCOPE;

export function useStore<S>(key: string): [S, Dispatch<SetStateAction<S>>] {
  return useGlobalState<S>(`${currentScope}&${key}`);
}

export function setStore(store: AnyObject): void {
  Object.entries(store).forEach(([key, value]) => {
    setGlobalState(`${currentScope}&${key}`, value);
  });
}

export function setScope(scope: string): void {
  currentScope = scope;
}
