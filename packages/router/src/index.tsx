import { AnyObject, DEFAULT_SCOPE } from "@wugui/core";
import { usePathname } from "@wugui/history";
import React, { useEffect, useState } from "react";
import { RouterProps, SwitchProps, TMatchedModule } from "./types";
import { getMatchedState, matchedDb } from "./utils";

export * from "./types";
export { default as Link } from "./Link";

export function Router({ scope, option: { modules }, ...props }: RouterProps) {
  const [pathname] = usePathname();
  // 为了外部能够第一时间获得匹配到的顶级模块
  const matchedState = getMatchedState(scope, pathname, 1, modules);
  return matchedState ? props.children : null;
}

export function Switch({ level, modules, scope, option, loose }: SwitchProps) {
  const [pathname] = usePathname();
  const matchedState = getMatchedState(scope, pathname, level, modules);
  const { useAuth = () => true, NotFound, Forbidden } = option;
  const authed = useAuth(matchedState ? matchedState[0] : undefined);

  if (matchedState) {
    if (authed) {
      // tslint:disable-next-line: no-shadowed-variable
      const { component: Matched, data } = matchedState[0];
      return (
        <Matched
          {...data}
          {...matchedState[1]}
          $$meta={matchedState[0]}
          $$scope={scope}
          $$option={option}
        />
      );
    }
    return Forbidden ? <Forbidden /> : null;
  }

  // 宽松模式，不显示 404
  if (loose) {
    return null;
  }

  return NotFound ? <NotFound /> : null;
}

export function ChildRoutes({ $$exact, renderChildModules }: AnyObject) {
  if ($$exact) {
    return null;
  }
  return renderChildModules ? renderChildModules() : null;
}

export function useExact({ $$exact }: any): boolean {
  return $$exact;
}

export function useMatched(scope: string = DEFAULT_SCOPE): TMatchedModule[] {
  const [state, setState] = useState(matchedDb.get(scope));

  useEffect(() => {
    return matchedDb.on(scope, setState);
  }, []);

  return state;
}

export function useMatchedChild({ $$exact, $$meta: { level, modules }, $$scope, $$option}: any): React.FC<any> {
  // 如果没有子模块，则返回空
  return modules.length ? (props: any) => (
    <Switch
      level={level + 1}
      modules={modules}
      scope={$$scope}
      option={$$option}
      loose={$$exact}
      {...props}
    />
  ) : () => null;
}
