import { ICH, IMD, IPO } from "@wugui/core";
import React, { Suspense } from "react";

export default ({ parse }: ICH) => {
  parse.tap("Lazy", (current: IMD, parent: IMD, option: IPO) => {
    return { ...current, ...handleLazy(current, option) };
  }, (current: IMD, parent: IMD, option: IPO) => {
    // 有可能其它插件会输出异步的 Component，所以这里再做一道处理
    return { ...current, ...handleLazy(current, option) };
  });
};

const weakMap: WeakMap<any, any> = new WeakMap();

function handleLazy(current: IMD, { fallback = <div>...</div> }: IPO) {
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
          <Suspense fallback={fallback}><L {...props} /></Suspense>
        );
      },
    };
  }
  return null;
}
