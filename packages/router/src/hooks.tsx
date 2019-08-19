import { DEFAULT_SCOPE, IMD } from "@spax/core";
import React, { useEffect, useState } from "react";
import { Switch } from "./components";
import { TMatchedState } from "./types";
import { matchedDb } from "./utils";

export function useExact({ $$exact }: any): boolean {
  return $$exact;
}

export function useMeta({ $$meta }: any): IMD {
  return $$meta;
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

export function useChild({ $$exact, $$meta: { level, modules }, $$scope, $$useAuth, $$NotFound, $$Forbidden }: any): React.FC<any> {
  // 如果没有子模块，则返回空
  return (modules && modules.length) ? ({children, ...props}: any) => (
    <Switch
      level={level + 1}
      modules={modules}
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
