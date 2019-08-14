import { DEFAULT_SCOPE } from "@wugui/core";
import React, { useEffect, useState } from "react";
import { Switch } from "./components";
import { CarrierProps, TMatchedState } from "./types";
import { matchedDb } from "./utils";

export function useExact({ $$exact }: any): boolean {
  return $$exact;
}

export function useMatched(scope: string = DEFAULT_SCOPE): TMatchedState[] {
  const [state, setState] = useState(matchedDb.get(scope));

  useEffect(() => {
    return matchedDb.on(scope, setState);
  }, []);

  return state;
}

export function useChild({ $$exact, $$meta: { level, modules }, $$scope, $$useAuth, $$NotFound, $$Forbidden }: any): React.FC<any> {
  // 如果没有子模块，则返回空
  return modules.length ? (props: any) => (
    <Switch
      level={level + 1}
      modules={modules}
      scope={$$scope}
      loose={$$exact}
      useAuth={$$useAuth}
      NotFound={$$NotFound}
      Forbidden={$$Forbidden}
      {...props}
    />
  ) : () => null;
}
