import { ICoreHooks, IModule, IPluginOption } from "@wugui/core";
import React, { Suspense } from "react";

export default ({ parse }: ICoreHooks) => {
  parse.tap("Lazy", (current: IModule, parent: IModule, option: IPluginOption) => {
    return { ...current, ...handleLazy(current, option) };
  }, (current: IModule, parent: IModule, option: IPluginOption) => {
    // 有可能其它插件会输出异步的 Component，所以这里再做一道处理
    return { ...current, ...handleLazy(current, option) };
  });
};

const weakMap: WeakMap<any, any> = new WeakMap();

function handleLazy(current: IModule, { fallback = <div>Loading...</div> }: IPluginOption) {
  const { lazy } = current;
  if (lazy) {
    if (!weakMap.has(lazy)) {
      // React.lazy 有 bug
      // https://github.com/facebook/react/issues/14188
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
