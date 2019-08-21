import { DEFAULT_SCOPE, IBlock } from "@spax/core";
import { debug } from "@spax/debug";
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
  blocks: IBlock[],
  loose: boolean = false,
): TMatchedState {
  const cacheKey = `${scope}&${pathname}&${level}`;

  if (!cacheMap.has(cacheKey)) {
    // `/a/b/c` -> `["/a", "/b", "/c"]`
    const tokens = pathname.match(/\/[^?/]+/ig) || ["/"];

    const matchedState: TMatchedState = ((n) => {
      let fallbackBlock: any = null;
      // 从寻找`完整`匹配到寻找`父级`匹配
      while (n--) {
        const toPath = tokens.slice(0, n + 1).join("");

        for (let i = 0; i < blocks.length; i++) {
          const childBlock: IBlock = blocks[i];

          // 严格模式，才寻找 404
          if (!loose && childBlock.path.indexOf("*") !== -1) {
            if (!fallbackBlock) {
              fallbackBlock = childBlock;
            }
            continue;
          }

          const execArray = childBlock.pathRE.exec(toPath);

          if (execArray) {
            const matchedParams: MatchedParams = childBlock.pathKeys.reduce((params: MatchedParams, {name}, index: number) => ({
              ...params,
              [name]: execArray[index + 1],
            }), {
              $$exact: tokens.length === childBlock.level,
              // $$extra: tokens.length < childBlock.level,
            });

            /* istanbul ignore next */
            if (process.env.NODE_ENV === "development") {
              debug("Matched of `%s`%s: %O", toPath, matchedParams.$$exact ? " exactly" : "", childBlock);
            }

            return [childBlock, matchedParams] as TMatchedState;
          }
        }
      }

      return fallbackBlock ? [fallbackBlock, { $$is404: true }] as TMatchedState : null;
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
