import { IBlock, IHooks, IPO, TPlugin } from "@spax/core";
import React, { Suspense } from "react";

export default [
  "Lazy",
  [],
  ({ parse }: IHooks, option: IPO) => {
    parse.tap(
      (current: IBlock) => {
        return { ...current, ...handleLazy(current, option) };
      },
      (current: IBlock) => {
        // 有可能其它插件会输出异步的 Component，所以这里再做一道处理
        return { ...current, ...handleLazy(current, option) };
      },
    );
  },
] as TPlugin;

function handleLazy(current: IBlock, { fallback = <div>...</div> }: IPO) {
  const { lazy } = current;
  if (lazy) {
    return {
      lazy: null,
      component: (props: any) => {
        const L = React.lazy(lazy);
        return (
          <Suspense fallback={fallback}>
            <L {...props} />
          </Suspense>
        );
      },
    };
  }
  return null;
}
