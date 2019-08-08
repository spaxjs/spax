import { ICoreHooks, IModule, IPluginOption } from "@wugui/core";
import React, { ReactElement } from "react";
import { ChildRoutes, Router, Switch } from "./router";

import { LinkProps } from "./types";
export type LinkProps = LinkProps;

export { default as Link } from "./Link";
export { useExact, useMatched, useMatchedChild } from "./router";
export { useHash, useLocation, usePathname, useSearch } from "./hooks";

export default ({ parse, render }: ICoreHooks) => {
  parse.tap("Router", (current: IModule, parent: IModule, option: IPluginOption) => {
    return {
      ...current,
      ...normalizeComponent(current, option),
    };
  }, undefined, ["Loadable", "level"]);

  /**
   * @example
   * <Router>
   *   <...>
   *     <Switch>
   */
  render.tap(
    "Router",
    (modules: IModule[], option: IPluginOption): ReactElement => {
      // 不传入 modules，而是直接去 core 取
      return (
        <Switch
          level={1}
          option={option}
        />
      );
    },
    (element: ReactElement, option: IPluginOption): ReactElement => {
      return (
        <Router
          option={option}
        >
          {element}
        </Router>
      );
    },
    ["Path"],
  );
};

/**
 * 如果未指定 component，
 * 则将其设置为只显示子路由的“容器”。
 * 同时，设置 empty 属性，
 * 标识输入的 component 属性是否为空。
 */
function normalizeComponent(current: IModule, option: IPluginOption) {
  const { path, level, authority = [], data = {}, component, modules = [] } = current;
  const empty = component === undefined;
  return {
    key: `${path}&${level}`,
    empty,
    authority,
    data,
    component: empty ? ChildRoutes : component,
    modules,
  };
}
