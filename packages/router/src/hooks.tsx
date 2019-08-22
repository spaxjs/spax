import { DEFAULT_SCOPE, IBlock, parseBlocks } from "@spax/core";
import React, { useEffect, useState } from "react";
import { Switch } from "./components";
import { CarrierProps, TMatchedState } from "./types";
import { matchedDb } from "./utils";

export function useBlock({ $$block }: CarrierProps): IBlock {
  return $$block;
}

export function useExact({ $$exact }: CarrierProps): boolean {
  return $$exact;
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

export function useBlocks({ $$exact, $$block, $$scope, $$useAuth, $$NotFound, $$Forbidden, $$blocks }: CarrierProps): React.FC<any> {
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

export function useBlocksOnTheFly({ $$exact, $$block, $$scope, $$useAuth, $$NotFound, $$Forbidden }: CarrierProps, $$blocks: IBlock[]): React.FC<any> {
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
