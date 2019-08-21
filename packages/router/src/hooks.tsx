import { DEFAULT_SCOPE, IMD, parseModules } from "@spax/core";
import React, { useEffect, useState } from "react";
import { Switch } from "./components";
import { CarrierProps, TMatchedState } from "./types";
import { matchedDb } from "./utils";

export function useExact({ $$exact }: CarrierProps): boolean {
  return $$exact;
}

export function useMeta({ $$meta }: CarrierProps): IMD {
  return $$meta;
}

export function useScope({ $$scope }: CarrierProps): string {
  return $$scope;
}

export function useMatched(scope: string = DEFAULT_SCOPE): TMatchedState[] {
  const [state, setState] = useState(matchedDb.get(scope));

  useEffect(() => {
    // 因为 useMatched 多处复用，
    // 所以每个组件加载后都要用 useEffect 同步状态
    setState(matchedDb.get(scope));
    return matchedDb.on(scope, setState);
  }, []);

  return state;
}

export function useChild({ $$exact, $$meta, $$scope, $$useAuth, $$NotFound, $$Forbidden, $$modules }: CarrierProps): React.FC<any> {
  const [parsedDynamic, setParsedDynamic] = useState($$meta.modules);

  useEffect(() => {
    if ($$modules) {
      parseModules($$modules, $$meta, $$scope).then(setParsedDynamic);
    }
  }, [$$modules]);

  const allChildModules = [...$$meta.modules, ...parsedDynamic];

  // 如果没有子模块，则返回空
  return (allChildModules.length) ? ({children, ...props}: any) => (
    <Switch
      level={$$meta.level + 1}
      modules={allChildModules}
      scope={$$scope}
      // 当前已完整匹配到，如果未匹配到子模块，不用显示 404。
      loose={$$exact}
      useAuth={$$useAuth}
      NotFound={$$NotFound}
      Forbidden={$$Forbidden}
      {...props}
    >{children}</Switch>
  ) : ({ children }) => children;
}
