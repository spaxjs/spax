import { AnyObject, IModule, useParsed } from "@wugui/core";
import { debug } from "@wugui/utils";
import React from "react";
import { usePathname } from "./hooks";
import { MatchedParams, RouterProps, SwitchProps, TMatched } from "./types";

function flatten(childModules: IModule[], a: IModule[] = []) {
  childModules.forEach((childModule) => {
    // 子模块优先匹配
    if (childModule.modules) {
      flatten(childModule.modules, a);
    }
    a.push(childModule);
  });
  return a;
}

let flattenedModules: IModule[];

function useFlattened() {
  const [childModules] = useParsed();

  if (!flattenedModules) {
    flattenedModules = flatten(childModules);

    if (process.env.NODE_ENV !== "production")
      debug("Flattened: %O", flattenedModules);

    return flattenedModules;
  }

  return flattenedModules;
}

const cacheMap: Map<string, TMatched[]> = new Map();

export function useMatched(level: number = 0): TMatched[] {
  const [pathname] = usePathname();
  const flattened = useFlattened();

  if (!cacheMap.has(pathname)) {
    const matched: TMatched[] = [];

    // `/a/b/c` -> `["/a", "/b", "/c"]`
    const tokens = pathname.match(/\/[^?/]+/ig) || ["/"];

    let shouldBreakWhile = false;
    let n = tokens.length;
    // 从寻找`完整`匹配到寻找`父级`匹配
    while (n--) {
      const toPath = tokens.slice(0, n + 1).join("");

      for (let i = 0; i < flattened.length; i++) {
        const childModule = flattened[i];

        // 如果子模块跟父模块拥有相同的路径，
        // 指向子模块的兄弟模块的路径会匹配到该子模块，
        // 所以需要跳过。
        if (n + 1 !== tokens.length && n + 1 !== childModule.level) {
          continue;
        }

        const execArray = childModule.pathRE.exec(toPath);

        if (execArray) {
          const matchedParams = childModule.pathKeys.reduce((params: MatchedParams, {name}, index: number) => ({
            ...params,
            [name]: execArray[index + 1],
          }), {
            exact: tokens.length === childModule.level,
          });

          // 推入
          matched.unshift([childModule, matchedParams]);

          // 如果当前 level 大于最大期望 level，
          // 则可能是与父模块拥有相同路径的子模块，
          // 所以需要继续向下查找，反之则跳出。
          if (childModule.level <= tokens.length) {
            if (childModule.level === 1) {
              shouldBreakWhile = true;
            }
            break;
          }
        }
      }

      if (shouldBreakWhile) {
        break;
      }
    }

    if (process.env.NODE_ENV !== "production")
      debug("Matched of `%s`: %O", pathname, matched);

    cacheMap.set(pathname, matched);
  }

  return level === 0 ?
    cacheMap.get(pathname) :
    cacheMap.get(pathname).filter(([childModule]) => childModule.level === level);
}

export function Router({ option, ...props }: RouterProps) {
  useMatched();
  return props.children;
}

export function Switch({ level, loose, option }: SwitchProps) {
  const [[childModule, matchedParams] = [undefined, undefined]] = useMatched(level);
  const { useAuth = () => true, NotFound, Forbidden } = option;
  const authed = useAuth(childModule);

  if (childModule) {
    if (authed) {
      // tslint:disable-next-line: no-shadowed-variable
      const { key, level, component: Matched, data, modules: childModules } = childModule;
      return (
        <Matched
          {...data}
          {...matchedParams}
          key={key}
          meta={childModule}
          renderChildModules={(props: AnyObject) => {
            // 如果没有子模块，则返回空
            return childModules.length ? (
              <Switch
                level={level + 1}
                option={option}
                loose={matchedParams.exact}
                {...props}
              />
            ) : null;
          }}
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

export function ChildRoutes({ exact, renderChildModules }: AnyObject) {
  if (exact) {
    return null;
  }
  return renderChildModules ? renderChildModules() : null;
}
