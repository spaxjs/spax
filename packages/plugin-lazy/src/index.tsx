import { IBlock, IHooks, IOption, IPlugin } from "@spax/core";
import React, { Suspense } from "react";

export default {
  name: "Lazy",
  plug: ({ parse }: IHooks, option: IOption) => {
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
} as IPlugin;

function handleLazy(
  current: IBlock,
  { fallback = <div>...</div> }: IOption,
) {
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
