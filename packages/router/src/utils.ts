import { DEFAULT_SCOPE, IMD } from "@wugui/core";
import { debug } from "@wugui/debug";
import EventEmitter from "events";
import { MatchedParams, TMatchedState } from "./types";

export const matchedDb = {
  value: {},
  emitter: new EventEmitter(),
  pathname: undefined,
  check(scope: string, pathname: string) {
    if (this.pathname !== pathname) {
      this.pathname = pathname;
      this.value[scope] = [];
    }
  },
  ensure(scope: string) {
    if (!this.value.hasOwnProperty(scope)) {
      this.value[scope] = [];
    }
  },
  get(scope: string) {
    this.ensure(scope);
    return this.value[scope];
  },
  add(scope: string, level: number, v: TMatchedState) {
    this.ensure(scope);
    const newValue = [...this.value[scope]];
    newValue[level - 1] = v;
    this.value[scope] = newValue;
    this.emit(scope);
  },
  emit(scope: string) {
    this.emitter.emit(scope, this.value[scope]);
  },
  on(scope: string, cb: any) {
    this.emitter.on(scope, cb);
    return () => {
      this.emitter.off(scope, cb);
    };
  },
};

const cacheMap: Map<string, TMatchedState> = new Map();

export function getMatched(
  scope: string = DEFAULT_SCOPE,
  pathname: string,
  level: number = 1,
  modules: IMD[],
): TMatchedState {
  const cacheKey = `${scope}&${pathname}&${level}`;

  if (!cacheMap.has(cacheKey)) {
    // `/a/b/c` -> `["/a", "/b", "/c"]`
    const tokens = pathname.match(/\/[^?/]+/ig) || ["/"];

    const matchedState: TMatchedState = ((n) => {
      let fallbackModule: any = null;
      // 从寻找`完整`匹配到寻找`父级`匹配
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

            return [childModule, matchedParams] as TMatchedState;
          }
        }
      }

      return fallbackModule ? [fallbackModule, {}] as TMatchedState : null;
    })(tokens.length);

    if (matchedState) {
      cacheMap.set(cacheKey, matchedState);
    }
  }

  const cached = cacheMap.get(cacheKey);

  if (cached) {
    matchedDb.check(scope, pathname);
    matchedDb.add(scope, level, cached);
  }

  return cached || null;
}
