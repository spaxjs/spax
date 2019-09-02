import { IBlock, IHooks, IPO, TPlugin } from "@spax/core";
import React, { Suspense } from "react";

export default [
  "Lazy",
  [],
  ({ parse }: IHooks, option: IPO) => {
    parse.tap(
      (current: IBlock, parent: IBlock) => {
        return { ...current, ...handleLazy(current, option) };
      },
      (current: IBlock, parent: IBlock) => {
        // 有可能其它插件会输出异步的 Component，所以这里再做一道处理
        return { ...current, ...handleLazy(current, option) };
      },
    );
  },
] as TPlugin;

const weakMap: WeakMap<any, any> = new WeakMap();

function handleLazy(current: IBlock, { fallback = <div>...</div> }: IPO) {
  const { lazy } = current;
  if (lazy) {
    if (!weakMap.has(lazy)) {
      weakMap.set(lazy, React.lazy(lazy));
    }
    return {
      lazy: null,
      component: (props: any) => {
        const L = weakMap.get(lazy);
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
