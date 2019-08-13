import { AnyObject, DEFAULT_SCOPE, IMD } from "@wugui/core";
import { usePathname } from "@wugui/history";
import { debug } from "@wugui/utils";
import EventEmitter from "events";
import React, { useEffect, useState } from "react";
import { MatchedParams, RouterProps, SwitchProps, TMatchedModule } from "./types";

export * from "./types";
export { default as Link } from "./Link";

const db = {
  value: {},
  emitter: new EventEmitter(),
  get(scope: string) {
    if (!this.value.hasOwnProperty(scope)) {
      this.value[scope] = [];
    }
    return this.value[scope];
  },
  add(scope: string, level: number, v: TMatchedModule) {
    if (level === 1) {
      this.value[scope] = [];
    }
    this.value[scope][level - 1] = v;
    if (level === 1 || v[1].$$exact) {
      this.emit(scope);
    }
  },
  emit(scope: string) {
    this.emitter.emit(scope, [...this.value[scope]]);
  },
  on(scope: string, cb: any) {
    this.emitter.on(scope, cb);
    return () => {
      this.emitter.off(scope, cb);
    };
  },
};

export function Router({ scope, option: { modules }, ...props }: RouterProps) {
  // 为了外部能够第一时间获得匹配到的顶级模块
  useMatchedState(scope, 1, modules);
  return props.children;
}

export function Switch({ level, modules, scope, option, loose }: SwitchProps) {
  const matchedState = useMatchedState(scope, level, modules, level === 1);
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
  const [state, setState] = useState(db.get(scope));

  useEffect(() => {
    return db.on(scope, setState);
  }, []);

  return state;
}

const cacheMap: Map<string, TMatchedModule> = new Map();
function useMatchedState(
  scope: string = DEFAULT_SCOPE,
  level: number = 1,
  modules: IMD[],
  silent: boolean = false,
): TMatchedModule {
  const [pathname] = usePathname();
  const cacheKey = `${scope}&${pathname}&${level}`;
  if (!cacheMap.has(cacheKey)) {

    // `/a/b/c` -> `["/a", "/b", "/c"]`
    const tokens = pathname.match(/\/[^?/]+/ig) || ["/"];

    const matchedState: TMatchedModule = ((n) => {
      let fallbackModule: any = null;
      // 从寻找`完整`匹配到寻找`父级`匹配
      // TODO 优化为按指定 level 匹配？
      while (n--) {
        const toPath = tokens.slice(0, n + 1).join("");

        for (let i = 0; i < modules.length; i++) {
          const childModule: IMD = modules[i];

          if (childModule.path.indexOf("*") !== -1) {
            if (!fallbackModule) {
              fallbackModule = childModule;
            }
            continue;
          }

          const execArray = childModule.pathRE.exec(toPath);

          if (execArray) {
            const matchedParams: MatchedParams = childModule.pathKeys.reduce((params: MatchedParams, {name}, index: number) => ({
              ...params,
              [name]: execArray[index + 1],
            }), {
              $$exact: tokens.length === childModule.level,
            });

            if (process.env.NODE_ENV === "development")
              debug("Matched of `%s`%s: %O", toPath, matchedParams.$$exact ? " exactly" : "", childModule);

            return [childModule, matchedParams] as TMatchedModule;
          }
        }
      }

      return [fallbackModule, {}] as TMatchedModule;
    })(tokens.length);

    if (matchedState) {
      cacheMap.set(cacheKey, matchedState);
    }
  }

  const cached = cacheMap.get(cacheKey);

  if (!silent && cached) {
    db.add(scope, level, cached);
  }

  return cached || null;
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
