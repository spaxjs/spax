import { DEFAULT_SCOPE, IBlock, parseBlocks } from "@spax/core";
import { debug } from "@spax/debug";
import React, { useEffect, useMemo, useState } from "react";
import { Switch } from "./components";
import { ComponentProps, MatchedParams, TMatchedState } from "./types";
import { matchedDb } from "./utils";

export function useBlock({ $$block }: ComponentProps): IBlock {
  return $$block;
}

export function useExact({ $$exact }: ComponentProps): boolean {
  return $$exact;
}

export function useScope({ $$scope }: ComponentProps): string {
  return $$scope;
}

export function useMatchedArrayOfBlockAndParams(scope: string = DEFAULT_SCOPE): TMatchedState[] {
  const [state, setState] = useState([]);

  useEffect(() => {
    // 因为 useMatchedArrayOfBlockAndParams 多处复用，
    // 所以每个组件加载后都要用 useEffect 同步状态
    setState(matchedDb.get(scope));
    return matchedDb.on(scope, setState);
  }, []);

  return state;
}

export function useMatchedBlockAndParams(
  scope: string = DEFAULT_SCOPE,
  pathname: string,
  level: number = 1,
  blocks: IBlock[],
  loose: boolean = false,
): TMatchedState {
  return useMemo(() => {
    // `/a/b/c` -> `["/a", "/b", "/c"]`
    const tokens = pathname.match(/\/[^?/]+/ig) || ["/"];

    const matchedBlockAndParams: TMatchedState = ((n) => {
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

    if (matchedBlockAndParams) {
      matchedDb.check(scope, pathname);
      matchedDb.add(scope, level, matchedBlockAndParams);
      return matchedBlockAndParams;
    }

    return null;
  }, [scope, pathname, level]);
}

export function useMatchedFromChildBocks({ $$exact, $$block, $$scope, $$useAuth, $$NotFound, $$Forbidden, $$blocks }: ComponentProps): React.FC<any> {
  // 如果没有子模块，则返回空
  return ($$block.blocks && $$block.blocks.length) ? ({children = null, ...props}: any) => (
    <Switch
      level={$$block.level + 1}
      blocks={$$block.blocks}
      scope={$$scope}
      // 当前已完整匹配到，如果未匹配到子模块，不用显示 404。
      loose={$$exact}
      useAuth={$$useAuth}
      NotFound={$$NotFound}
      Forbidden={$$Forbidden}
      {...props}
    >{children}</Switch>
  ) : ({ children = null }) => children;
}

export function useMatchedFromChildBocksOnTheFly({ $$exact, $$block, $$scope, $$useAuth, $$NotFound, $$Forbidden }: ComponentProps, $$blocks: IBlock[]): React.FC<any> {
  const [parsedBlocks, setParsedBlocks] = useState($$blocks || []);

  useEffect(() => {
    if ($$blocks) {
      parseBlocks($$blocks, $$block, $$scope).then(setParsedBlocks);
    } else {
      setParsedBlocks([]);
    }
  }, [$$blocks]);

  // 如果没有子模块，则返回空
  return (parsedBlocks.length) ? ({children = null, ...props}: any) => (
    <Switch
      level={$$block.level + 1}
      blocks={parsedBlocks}
      scope={$$scope}
      // 当前已完整匹配到，如果未匹配到子模块，不用显示 404。
      loose={$$exact}
      useAuth={$$useAuth}
      NotFound={$$NotFound}
      Forbidden={$$Forbidden}
      {...props}
    >{children}</Switch>
  ) : ({ children = null }) => children;
}
